from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
import os
from datetime import datetime
from werkzeug.utils import secure_filename
from database import db
from models.trip_model import Trip
from models.truck_model import Truck
from models.driver_model import Driver
from models.load_model import Load
from models.user_model import User

# Optional WhatsApp service (comment out if not configured)
try:
    from services.whatsapp_service import whatsapp_service
except ImportError:
    whatsapp_service = None

# Create blueprint
trip_bp = Blueprint('trip_bp', __name__)

# Configure upload folder for POD
UPLOAD_FOLDER = 'uploads/pod'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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
# GET ALL TRIPS
# =====================================
@trip_bp.route('/all', methods=['GET'])
@token_required
def get_trips():
    try:
        trips = Trip.query.all()
        trip_list = []
        for trip in trips:
            trip_list.append({
                "id": trip.id,
                "trip_number": trip.trip_number,
                "truck_id": trip.truck_id,
                "driver_id": trip.driver_id,
                "load_id": trip.load_id,
                "start_location": trip.start_location,
                "destination": trip.destination,
                "trip_status": trip.trip_status,
                "payment_status": trip.payment_status,
                "start_date": trip.start_date.isoformat() if trip.start_date else None,
                "end_date": trip.end_date.isoformat() if trip.end_date else None,
                "pod_image": getattr(trip, 'pod_image', None),
                "pod_uploaded_at": getattr(trip, 'pod_uploaded_at', None)
            })
        return jsonify({"success": True, "data": trip_list}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# CREATE TRIP
# =====================================
@trip_bp.route('/add', methods=['POST'])
@token_required
def add_trip():
    try:
        data = request.get_json()
        
        new_trip = Trip(
            trip_number=data.get('trip_number'),
            truck_id=int(data.get('truck_id')),
            driver_id=int(data.get('driver_id')),
            load_id=int(data.get('load_id')),
            start_location=data.get('start_location'),
            destination=data.get('destination'),
            trip_status='CREATED',
            payment_status='PENDING',
            start_date=data.get('start_date'),
            end_date=data.get('end_date')
        )
        
        db.session.add(new_trip)
        
        # Update truck status
        truck = Truck.query.get(int(data.get('truck_id')))
        if truck:
            truck.status = 'BUSY'
        
        # Update driver status
        driver = Driver.query.get(int(data.get('driver_id')))
        if driver:
            driver.status = 'BUSY'
        
        # Update load status
        load = Load.query.get(int(data.get('load_id')))
        if load:
            load.status = 'ASSIGNED'
        
        db.session.commit()
        
        # Send WhatsApp notification (if service available)
        if whatsapp_service and driver and driver.mobile:
            whatsapp_service.send_load_assigned(driver.mobile, {
                'load_id': load.id,
                'material_type': load.material_type,
                'weight_tons': load.weight_ton,
                'pickup_location': load.pickup_location,
                'drop_location': load.drop_location,
                'offered_price': load.offered_price
            })
        
        return jsonify({"success": True, "message": "Trip created successfully", "trip_id": new_trip.id}), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# COMPLETE TRIP
# =====================================
@trip_bp.route('/complete/<int:trip_id>', methods=['PUT'])
@token_required
def complete_trip(trip_id):
    try:
        trip = Trip.query.get(trip_id)
        if not trip:
            return jsonify({"success": False, "message": "Trip not found"}), 404
        
        trip.trip_status = 'COMPLETED'
        
        # Free truck
        truck = Truck.query.get(trip.truck_id)
        if truck:
            truck.status = 'AVAILABLE'
        
        # Free driver
        driver = Driver.query.get(trip.driver_id)
        if driver:
            driver.status = 'AVAILABLE'
        
        # Complete load
        load = Load.query.get(trip.load_id)
        if load:
            load.status = 'DELIVERED'
        
        db.session.commit()
        
        # Send notification
        if whatsapp_service and driver and driver.mobile:
            whatsapp_service.send_trip_update(driver.mobile, trip.trip_number, 'COMPLETED', trip.destination)
        
        return jsonify({"success": True, "message": "Trip completed successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# UPLOAD PROOF OF DELIVERY (POD)
# =====================================
@trip_bp.route('/upload-pod/<int:trip_id>', methods=['POST'])
@token_required
def upload_pod(trip_id):
    try:
        trip = Trip.query.get(trip_id)
        if not trip:
            return jsonify({"success": False, "message": "Trip not found"}), 404
        
        if 'file' not in request.files:
            return jsonify({"success": False, "message": "No file provided"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"success": False, "message": "No file selected"}), 400
        
        if file and allowed_file(file.filename):
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            
            filename = secure_filename(f"pod_trip_{trip_id}_{int(datetime.now().timestamp())}.{file.filename.rsplit('.', 1)[1].lower()}")
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            
            trip.pod_image = filepath
            trip.pod_uploaded_at = datetime.now()
            
            db.session.commit()
            
            return jsonify({
                "success": True,
                "message": "POD uploaded successfully",
                "file_path": filepath
            }), 200
        else:
            return jsonify({"success": False, "message": "File type not allowed. Use PNG, JPG, JPEG, or PDF"}), 400
            
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# GET POD FOR A TRIP
# =====================================
@trip_bp.route('/pod/<int:trip_id>', methods=['GET'])
@token_required
def get_pod(trip_id):
    try:
        trip = Trip.query.get(trip_id)
        if not trip:
            return jsonify({"success": False, "message": "Trip not found"}), 404
        
        pod_image = getattr(trip, 'pod_image', None)
        pod_uploaded_at = getattr(trip, 'pod_uploaded_at', None)
        
        if not pod_image:
            return jsonify({"success": False, "message": "POD not available for this trip"}), 404
        
        return jsonify({
            "success": True,
            "pod_image": pod_image,
            "uploaded_at": pod_uploaded_at.isoformat() if pod_uploaded_at else None
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# UPDATE TRIP STATUS
# =====================================
@trip_bp.route('/update-status/<int:trip_id>', methods=['PUT'])
@token_required
def update_trip_status(trip_id):
    try:
        data = request.get_json()
        new_status = data.get('status')
        
        trip = Trip.query.get(trip_id)
        if not trip:
            return jsonify({"success": False, "message": "Trip not found"}), 404
        
        trip.trip_status = new_status
        db.session.commit()
        
        # Send notification
        driver = Driver.query.get(trip.driver_id)
        if whatsapp_service and driver and driver.mobile:
            whatsapp_service.send_trip_update(driver.mobile, trip.trip_number, new_status, trip.destination)
        
        return jsonify({"success": True, "message": f"Trip status updated to {new_status}"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500