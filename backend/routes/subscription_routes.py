from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

subscription_bp = Blueprint('subscription_bp', __name__)

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
# HELPER FUNCTION (NO AWAIT - SYNCHRONOUS)
# =====================================
def get_current_month_loads(user_id):
    """Count loads for a transporter in current month"""
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT COUNT(*) as count 
            FROM trips 
            WHERE franchise_id IN (SELECT id FROM franchises WHERE user_id = %s)
            AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
            AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
        """, (user_id,))
        result = cur.fetchone()
        cur.close()
        conn.close()
        return result['count'] if result else 0
    except:
        return 0

# =====================================
# GET ALL SUBSCRIPTION PLANS
# =====================================
@subscription_bp.route('/plans', methods=['GET'])
def get_plans():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM subscription_plans ORDER BY monthly_fee")
        plans = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({"success": True, "data": plans}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# GET CURRENT USER'S SUBSCRIPTION
# =====================================
@subscription_bp.route('/my-subscription', methods=['GET'])
@token_required
def my_subscription():
    try:
        conn = get_connection()
        cur = conn.cursor()
        
        # Get user's current subscription
        cur.execute("""
            SELECT u.*, s.name as plan_name, s.monthly_fee, s.commission_rate, s.max_loads_per_month,
                   fs.start_date, fs.end_date
            FROM users u
            LEFT JOIN franchise_agreements fs ON u.id = fs.transporter_id AND fs.is_active = true
            LEFT JOIN subscription_plans s ON fs.plan_id = s.id
            WHERE u.id = %s
        """, (request.user_id,))
        
        subscription = cur.fetchone()
        cur.close()
        conn.close()
        
        # Count loads this month (NO AWAIT - direct function call)
        current_month_loads = get_current_month_loads(request.user_id)
        
        return jsonify({
            "success": True, 
            "data": subscription,
            "loads_used_this_month": current_month_loads
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# SUBSCRIBE TO A PLAN (UPGRADE)
# =====================================
@subscription_bp.route('/subscribe', methods=['POST'])
@token_required
def subscribe():
    try:
        data = request.get_json()
        plan_id = data.get('plan_id')
        
        conn = get_connection()
        cur = conn.cursor()
        
        # Get plan details
        cur.execute("SELECT * FROM subscription_plans WHERE id = %s", (plan_id,))
        plan = cur.fetchone()
        
        if not plan:
            return jsonify({"success": False, "message": "Plan not found"}), 404
        
        # Check if user has a franchise record
        cur.execute("SELECT id FROM franchises WHERE user_id = %s", (request.user_id,))
        franchise = cur.fetchone()
        
        if not franchise:
            # Create franchise record first
            cur.execute("""
                INSERT INTO franchises (user_id, franchise_name, commission_rate, monthly_fee, joined_date, is_active)
                VALUES (%s, %s, %s, %s, CURRENT_DATE, true)
                RETURNING id
            """, (request.user_id, f"Franchise_{request.user_id}", plan['commission_rate'], plan['monthly_fee']))
            franchise_id = cur.fetchone()['id']
        else:
            franchise_id = franchise['id']
        
        # Create or update franchise agreement
        cur.execute("""
            INSERT INTO franchise_agreements (transporter_id, plan_id, commission_rate, monthly_fee, start_date, end_date, is_active)
            VALUES (%s, %s, %s, %s, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', true)
            ON CONFLICT (transporter_id, is_active) 
            DO UPDATE SET plan_id = EXCLUDED.plan_id, commission_rate = EXCLUDED.commission_rate, 
                          monthly_fee = EXCLUDED.monthly_fee, start_date = EXCLUDED.start_date,
                          end_date = EXCLUDED.end_date
        """, (request.user_id, plan_id, plan['commission_rate'], plan['monthly_fee']))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({"success": True, "message": f"Subscribed to {plan['name']} plan"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# CHECK IF USER CAN BID (Load Limit)
# =====================================
@subscription_bp.route('/can-bid', methods=['GET'])
@token_required
def can_bid():
    try:
        current_loads = get_current_month_loads(request.user_id)
        
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT s.max_loads_per_month
            FROM users u
            LEFT JOIN franchise_agreements fs ON u.id = fs.transporter_id AND fs.is_active = true
            LEFT JOIN subscription_plans s ON fs.plan_id = s.id
            WHERE u.id = %s
        """, (request.user_id,))
        
        result = cur.fetchone()
        cur.close()
        conn.close()
        
        max_loads = result['max_loads_per_month'] if result else 5  # Default 5 loads
        
        can_bid = current_loads < max_loads
        remaining = max_loads - current_loads
        
        return jsonify({
            "success": True,
            "can_bid": can_bid,
            "loads_used": current_loads,
            "loads_limit": max_loads,
            "remaining_loads": remaining
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
