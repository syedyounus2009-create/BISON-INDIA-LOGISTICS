from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
import os
from database import db
from models.truck_model import Truck
from models.driver_model import Driver
from models.load_model import Load
from models.trip_model import Trip
from models.user_model import User
# from models.transaction_model import Transaction  # Temporarily commented
from datetime import datetime, timedelta

dashboard_bp = Blueprint('dashboard_bp', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({"success": False, "message": "Token required"}), 401
        try:
            payload = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=['HS256'])
            request.user_id = payload['user_id']
            request.user_role = payload.get('role', 'user')
        except:
            return jsonify({"success": False, "message": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated

# =====================================
# GET DASHBOARD STATS
# =====================================
@dashboard_bp.route('/stats', methods=['GET'])
@token_required
def get_stats():
    try:
        # Count all records
        total_trucks = Truck.query.count()
        total_drivers = Driver.query.count()
        total_loads = Load.query.count()
        total_trips = Trip.query.count()
        
        # Count by status
        available_trucks = Truck.query.filter_by(status='AVAILABLE').count()
        busy_trucks = Truck.query.filter_by(status='BUSY').count()
        
        pending_loads = Load.query.filter_by(status='PENDING').count()
        assigned_loads = Load.query.filter_by(status='ASSIGNED').count()
        
        active_trips = Trip.query.filter(Trip.trip_status.in_(['CREATED', 'CONFIRMED', 'IN_TRANSIT'])).count()
        completed_trips = Trip.query.filter_by(trip_status='COMPLETED').count()
        
        # Get recent trips (last 5)
        recent_trips = Trip.query.order_by(Trip.created_at.desc()).limit(5).all()
        recent_trips_list = []
        for trip in recent_trips:
            recent_trips_list.append({
                'id': trip.id,
                'trip_number': trip.trip_number,
                'start_location': trip.start_location,
                'destination': trip.destination,
                'trip_status': trip.trip_status,
                'created_at': trip.created_at.isoformat() if trip.created_at else None
            })
        
        return jsonify({
            "success": True,
            "data": {
                "trucks": {
                    "total": total_trucks,
                    "available": available_trucks,
                    "busy": busy_trucks
                },
                "drivers": {
                    "total": total_drivers
                },
                "loads": {
                    "total": total_loads,
                    "pending": pending_loads,
                    "assigned": assigned_loads
                },
                "trips": {
                    "total": total_trips,
                    "active": active_trips,
                    "completed": completed_trips
                },
                "recent_trips": recent_trips_list
            }
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# GET REVENUE DATA (for chart)
# =====================================
@dashboard_bp.route('/revenue', methods=['GET'])
@token_required
def get_revenue():
    try:
        # Get last 6 months revenue
        revenue_data = []
        now = datetime.utcnow()
        
        for i in range(5, -1, -1):
            month = now - timedelta(days=30*i)
            month_name = month.strftime('%b')
            
            # Calculate revenue for that month from trips
            # You can modify this based on your actual revenue table
            monthly_revenue = 0
            
            revenue_data.append({
                "month": month_name,
                "revenue": monthly_revenue
            })
        
        return jsonify({
            "success": True,
            "data": revenue_data
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# GET ACTIVITY LOG
# =====================================
@dashboard_bp.route('/activity', methods=['GET'])
@token_required
def get_activity():
    try:
        limit = request.args.get('limit', 10, type=int)
        
        # Combine recent trips and loads
        recent_trips = Trip.query.order_by(Trip.created_at.desc()).limit(limit).all()
        
        activities = []
        for trip in recent_trips:
            activities.append({
                'type': 'trip',
                'id': trip.id,
                'title': f"Trip {trip.trip_number} created",
                'status': trip.trip_status,
                'created_at': trip.created_at.isoformat() if trip.created_at else None
            })
        
        return jsonify({
            "success": True,
            "data": activities[:limit]
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500