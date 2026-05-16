from flask import Blueprint, request, jsonify
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from functools import wraps
import jwt

driver_bp = Blueprint('driver_bp', __name__)

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
        except:
            return jsonify({"success": False, "message": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated

@driver_bp.route('/all', methods=['GET'])
@token_required
def get_drivers():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM drivers ORDER BY id DESC")
        drivers = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({"success": True, "data": drivers}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@driver_bp.route('/add', methods=['POST'])
@token_required
def add_driver():
    try:
        data = request.get_json()
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO drivers (name, mobile, license_number, status)
            VALUES (%s, %s, %s, 'AVAILABLE')
            RETURNING id
        """, (data['name'], data['mobile'], data.get('license_number')))
        driver_id = cur.fetchone()['id']
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"success": True, "driver_id": driver_id}), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
