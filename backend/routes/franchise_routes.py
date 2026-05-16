from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
import os
import psycopg2
from psycopg2.extras import RealDictCursor

franchise_bp = Blueprint('franchise_bp', __name__)

def get_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'bayson_india'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'postgres123')
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

# =====================================
# CREATE FRANCHISE (Admin only)
# =====================================
@franchise_bp.route('/create', methods=['POST'])
@token_required
def create_franchise():
    if request.user_role != 'admin':
        return jsonify({"success": False, "message": "Admin only"}), 403
    
    try:
        data = request.get_json()
        conn = get_connection()
        cur = conn.cursor()
        
        cur.execute("""
            INSERT INTO franchises (user_id, franchise_name, gst_number, commission_rate, 
                                   monthly_fee, joined_date, address, city, pincode)
            VALUES (%s, %s, %s, %s, %s, CURRENT_DATE, %s, %s, %s)
            RETURNING id
        """, (data['user_id'], data['franchise_name'], data.get('gst_number'),
              data.get('commission_rate', 10), data.get('monthly_fee', 3000),
              data.get('address'), data.get('city'), data.get('pincode')))
        
        franchise_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({"success": True, "franchise_id": franchise_id}), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# GET FRANCHISE DASHBOARD
# =====================================
@franchise_bp.route('/dashboard', methods=['GET'])
@token_required
def franchise_dashboard():
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Get franchise details
        cur.execute("""
            SELECT f.*, u.mobile 
            FROM franchises f
            JOIN users u ON f.user_id = u.id
            WHERE u.id = %s
        """, (request.user_id,))
        
        franchise = cur.fetchone()
        
        if not franchise:
            return jsonify({"success": False, "message": "Not a franchise"}), 404
        
        # Get trips by this franchise
        cur.execute("""
            SELECT COUNT(*) as total_trips, 
                   SUM(CASE WHEN trip_status = 'COMPLETED' THEN 1 ELSE 0 END) as completed_trips
            FROM trips
            WHERE franchise_id = %s
        """, (franchise['id'],))
        
        trip_stats = cur.fetchone()
        
        # Get earnings
        cur.execute("""
            SELECT SUM(amount) as total_earnings, 
                   SUM(CASE WHEN status = 'PAID' THEN amount ELSE 0 END) as paid_earnings
            FROM franchise_payouts
            WHERE franchise_id = %s
        """, (franchise['id'],))
        
        earnings = cur.fetchone()
        
        cur.close()
        conn.close()
        
        return jsonify({
            "success": True,
            "franchise": franchise,
            "stats": trip_stats,
            "earnings": earnings
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
