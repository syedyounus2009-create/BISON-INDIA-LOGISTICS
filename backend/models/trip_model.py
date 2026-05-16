from database import db
from datetime import datetime

class Trip(db.Model):
    __tablename__ = "trips"
    
    id = db.Column(db.Integer, primary_key=True)
    trip_number = db.Column(db.String(50), unique=True)
    load_id = db.Column(db.Integer)
    truck_id = db.Column(db.Integer)
    driver_id = db.Column(db.Integer)
    franchise_id = db.Column(db.Integer)
    start_location = db.Column(db.String(255))
    destination = db.Column(db.String(255))
    trip_status = db.Column(db.String(50), default="CREATED")
    payment_status = db.Column(db.String(50), default="PENDING")
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    pod_image = db.Column(db.String(500))
    pod_uploaded_at = db.Column(db.DateTime)
