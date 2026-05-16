from flask import Blueprint, request, jsonify
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from functools import wraps
import jwt

load_bp = Blueprint('load_bp', __name__)

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

@load_bp.route('/all', methods=['GET'])
def get_loads():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM loads ORDER BY id DESC")
        loads = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({"success": True, "data": loads}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@load_bp.route('/add', methods=['POST'])
@token_required
def add_load():
    try:
        data = request.get_json()
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO loads (reference_number, shipper_id, pickup_location, drop_location, 
                              material_type, weight_ton, offered_price, status, delivery_date)
            VALUES (%s, %s, %s, %s, %s, %s, %s, 'PENDING', %s)
            RETURNING id
        """, (data.get('reference_number'), request.user_id, data['pickup_location'], 
              data['drop_location'], data.get('material_type'), data.get('weight_ton'), 
              data.get('offered_price'), data.get('delivery_date')))
        load_id = cur.fetchone()['id']
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"success": True, "load_id": load_id}), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
