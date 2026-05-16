from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
import os
from database import db
from services.razorpay_service import razorpay_service
from models.trip_model import Trip
from models.user_model import User

payment_bp = Blueprint('payment_bp', __name__)

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

# Create payment order for a trip
@payment_bp.route('/create-order', methods=['POST'])
@token_required
def create_order():
    try:
        data = request.get_json()
        trip_id = data.get('trip_id')
        amount = data.get('amount')
        
        trip = Trip.query.get(trip_id)
        if not trip:
            return jsonify({"success": False, "message": "Trip not found"}), 404
        
        # Create Razorpay order
        result = razorpay_service.create_order(
            amount=amount,
            receipt=f"trip_{trip_id}",
            notes={'trip_id': trip_id, 'user_id': request.user_id}
        )
        
        if not result['success']:
            return jsonify({"success": False, "message": result['message']}), 500
        
        # Store order in database
        # You need to create a payment_orders table
        order = result['order']
        
        return jsonify({
            "success": True,
            "order_id": order['id'],
            "amount": amount,
            "key_id": razorpay_service.key_id
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Verify payment after successful payment
@payment_bp.route('/verify-payment', methods=['POST'])
@token_required
def verify_payment():
    try:
        data = request.get_json()
        order_id = data.get('order_id')
        payment_id = data.get('payment_id')
        signature = data.get('signature')
        
        is_valid = razorpay_service.verify_payment(order_id, payment_id, signature)
        
        if is_valid:
            # Update trip payment status
            # Get trip_id from order notes
            return jsonify({"success": True, "message": "Payment verified"}), 200
        else:
            return jsonify({"success": False, "message": "Invalid signature"}), 400
            
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Webhook for Razorpay events
@payment_bp.route('/webhook', methods=['POST'])
def webhook():
    try:
        data = request.get_json()
        event = data.get('event')
        
        if event == 'payment.captured':
            payment = data['payload']['payment']['entity']
            # Update your database
            pass
        elif event == 'subscription.charged':
            subscription = data['payload']['subscription']['entity']
            # Update subscription status
            pass
        
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
