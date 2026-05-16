from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
import os
from database import db
from models.notification_model import Notification
from datetime import datetime

notification_bp = Blueprint('notification_bp', __name__)

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

# Get all notifications for logged-in user
@notification_bp.route('/all', methods=['GET'])
@token_required
def get_notifications():
    try:
        limit = request.args.get('limit', 50, type=int)
        notifications = Notification.query.filter_by(user_id=request.user_id)\
            .order_by(Notification.created_at.desc())\
            .limit(limit).all()
        return jsonify({"success": True, "data": [n.to_dict() for n in notifications]}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Get unread count
@notification_bp.route('/unread-count', methods=['GET'])
@token_required
def get_unread_count():
    try:
        count = Notification.query.filter_by(user_id=request.user_id, is_read=False).count()
        return jsonify({"success": True, "count": count}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Mark notification as read
@notification_bp.route('/read/<int:notification_id>', methods=['PUT'])
@token_required
def mark_read(notification_id):
    try:
        notification = Notification.query.filter_by(id=notification_id, user_id=request.user_id).first()
        if not notification:
            return jsonify({"success": False, "message": "Notification not found"}), 404
        notification.is_read = True
        db.session.commit()
        return jsonify({"success": True, "message": "Marked as read"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Mark all as read
@notification_bp.route('/read-all', methods=['PUT'])
@token_required
def mark_all_read():
    try:
        Notification.query.filter_by(user_id=request.user_id, is_read=False).update({'is_read': True})
        db.session.commit()
        return jsonify({"success": True, "message": "All notifications marked as read"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Delete notification
@notification_bp.route('/<int:notification_id>', methods=['DELETE'])
@token_required
def delete_notification(notification_id):
    try:
        notification = Notification.query.filter_by(id=notification_id, user_id=request.user_id).first()
        if not notification:
            return jsonify({"success": False, "message": "Notification not found"}), 404
        db.session.delete(notification)
        db.session.commit()
        return jsonify({"success": True, "message": "Notification deleted"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
