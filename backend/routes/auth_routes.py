from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import os
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

auth_bp = Blueprint('auth_bp', __name__)

def get_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'bayson_india'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'postgres123')
    )

# =====================================
# REGISTER
# =====================================
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        mobile = data.get('mobile')
        password = data.get('password')
        role = data.get('role', 'transporter')
        
        if not mobile or not password:
            return jsonify({"success": False, "message": "Mobile and password required"}), 400
        
        conn = get_connection()
        cur = conn.cursor()
        
        # Check if user exists
        cur.execute("SELECT id FROM users WHERE mobile = %s", (mobile,))
        if cur.fetchone():
            cur.close()
            conn.close()
            return jsonify({"success": False, "message": "User already exists"}), 409
        
        # Create user
        password_hash = generate_password_hash(password)
        cur.execute("""
            INSERT INTO users (mobile, password_hash, role, is_active, created_at)
            VALUES (%s, %s, %s, true, %s)
            RETURNING id
        """, (mobile, password_hash, role, datetime.now()))
        
        user_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        # Generate token
        token = jwt.encode({
            'user_id': user_id,
            'mobile': mobile,
            'role': role,
            'exp': datetime.utcnow() + timedelta(days=7)
        }, os.getenv('JWT_SECRET', 'bayson_super_secure_secret_key_2026'), algorithm='HS256')
        
        return jsonify({
            "success": True,
            "message": "Registration successful",
            "token": token,
            "user": {"id": user_id, "mobile": mobile, "role": role}
        }), 201
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# LOGIN
# =====================================
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        mobile = data.get('mobile')
        password = data.get('password')
        
        if not mobile or not password:
            return jsonify({"success": False, "message": "Mobile and password required"}), 400
        
        conn = get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("""
            SELECT id, mobile, password_hash, role, is_active
            FROM users
            WHERE mobile = %s
        """, (mobile,))
        
        user = cur.fetchone()
        cur.close()
        conn.close()
        
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 401
        
        if not user['is_active']:
            return jsonify({"success": False, "message": "Account disabled"}), 401
        
        if not check_password_hash(user['password_hash'], password):
            return jsonify({"success": False, "message": "Invalid password"}), 401
        
        token = jwt.encode({
            'user_id': user['id'],
            'mobile': user['mobile'],
            'role': user['role'],
            'exp': datetime.utcnow() + timedelta(days=7)
        }, os.getenv('JWT_SECRET', 'bayson_super_secure_secret_key_2026'), algorithm='HS256')
        
        return jsonify({
            "success": True,
            "message": "Login successful",
            "token": token,
            "user": {
                "id": user['id'],
                "mobile": user['mobile'],
                "role": user['role']
            }
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
