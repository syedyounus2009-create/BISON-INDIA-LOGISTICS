from flask import Blueprint, request, jsonify
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from functools import wraps
import jwt

truck_bp = Blueprint('truck_bp', __name__)

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'bayson_india'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'postgres123'),
        cursor_factory=RealDictCursor
    )

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({"success": False, "message": "Token required"}), 401
        try:
            payload = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=['HS256'])
            request.user_id = payload['user_id']
            request.user_role = payload['role']
        except:
            return jsonify({"success": False, "message": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated

@truck_bp.route('/all', methods=['GET'])
@token_required
def get_trucks():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM trucks ORDER BY id DESC")
        trucks = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({"success": True, "data": trucks}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@truck_bp.route('/add', methods=['POST'])
@token_required
def add_truck():
    try:
        data = request.get_json()
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO trucks (truck_number, truck_type, capacity_ton, status)
            VALUES (%s, %s, %s, 'AVAILABLE')
            RETURNING id
        """, (data['truck_number'], data.get('truck_type'), data.get('capacity_ton')))
        truck_id = cur.fetchone()['id']
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"success": True, "truck_id": truck_id}), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
