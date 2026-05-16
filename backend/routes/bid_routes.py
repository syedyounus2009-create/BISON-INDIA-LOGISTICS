from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

bid_bp = Blueprint('bid_bp', __name__)

def get_connection():
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
            payload = jwt.decode(token, os.getenv('JWT_SECRET', 'bayson_super_secure_secret_key_2026'), algorithms=['HS256'])
            request.user_id = payload['user_id']
            request.user_role = payload['role']
        except:
            return jsonify({"success": False, "message": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated

# =====================================
# PLACE A BID ON A LOAD
# =====================================
@bid_bp.route('/place', methods=['POST'])
@token_required
def place_bid():
    try:
        data = request.get_json()
        load_id = data.get('load_id')
        bid_amount = data.get('bid_amount')
        
        # Check if user can bid (subscription limit)
        # Call subscription check here
        
        conn = get_connection()
        cur = conn.cursor()
        
        # Check if bid already exists
        cur.execute("""
            SELECT id FROM load_bids 
            WHERE load_id = %s AND transporter_id = %s AND status = 'PENDING'
        """, (load_id, request.user_id))
        
        existing = cur.fetchone()
        
        if existing:
            # Update existing bid
            cur.execute("""
                UPDATE load_bids 
                SET bid_amount = %s, created_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (bid_amount, existing['id']))
        else:
            # Create new bid
            cur.execute("""
                INSERT INTO load_bids (load_id, transporter_id, bid_amount, status)
                VALUES (%s, %s, %s, 'PENDING')
            """, (load_id, request.user_id, bid_amount))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({"success": True, "message": "Bid placed successfully"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# GET ALL BIDS FOR A LOAD (Shipper view)
# =====================================
@bid_bp.route('/load/<int:load_id>', methods=['GET'])
@token_required
def get_load_bids(load_id):
    try:
        conn = get_connection()
        cur = conn.cursor()
        
        cur.execute("""
            SELECT b.*, u.mobile as transporter_mobile, 
                   (SELECT COUNT(*) FROM trucks WHERE franchise_id = 
                    (SELECT id FROM franchises WHERE user_id = b.transporter_id)) as truck_count
            FROM load_bids b
            JOIN users u ON b.transporter_id = u.id
            WHERE b.load_id = %s AND b.status = 'PENDING'
            ORDER BY b.bid_amount ASC
        """, (load_id,))
        
        bids = cur.fetchall()
        cur.close()
        conn.close()
        
        return jsonify({"success": True, "data": bids}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# ACCEPT A BID (Shipper accepts transporter)
# =====================================
@bid_bp.route('/accept/<int:bid_id>', methods=['PUT'])
@token_required
def accept_bid(bid_id):
    try:
        conn = get_connection()
        cur = conn.cursor()
        
        # Get bid details
        cur.execute("""
            SELECT b.*, l.id as load_id, l.shipper_id
            FROM load_bids b
            JOIN loads l ON b.load_id = l.id
            WHERE b.id = %s
        """, (bid_id,))
        
        bid = cur.fetchone()
        
        if not bid:
            return jsonify({"success": False, "message": "Bid not found"}), 404
        
        # Check if user is the shipper who posted the load
        if bid['shipper_id'] != request.user_id:
            return jsonify({"success": False, "message": "Not authorized"}), 403
        
        # Accept this bid, reject others
        cur.execute("UPDATE load_bids SET status = 'ACCEPTED' WHERE id = %s", (bid_id,))
        cur.execute("UPDATE load_bids SET status = 'REJECTED' WHERE load_id = %s AND id != %s", (bid['load_id'], bid_id))
        
        # Update load status
        cur.execute("UPDATE loads SET status = 'ASSIGNED', assigned_to = %s WHERE id = %s", (bid['transporter_id'], bid['load_id']))
        
        # Create trip record
        cur.execute("""
            INSERT INTO trips (trip_number, load_id, franchise_id, trip_status, created_at)
            VALUES (%s, %s, %s, 'CONFIRMED', CURRENT_TIMESTAMP)
            RETURNING id
        """, (f"TRP-{datetime.now().strftime('%Y%m%d%H%M%S')}", bid['load_id'], bid['transporter_id']))
        
        trip_id = cur.fetchone()['id']
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({
            "success": True, 
            "message": "Bid accepted. Trip created.",
            "trip_id": trip_id
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
