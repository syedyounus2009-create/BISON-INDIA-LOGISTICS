from database import db
from datetime import datetime

class Truck(db.Model):
    __tablename__ = "trucks"
    
    id = db.Column(db.Integer, primary_key=True)
    truck_number = db.Column(db.String(50), unique=True, nullable=False)
    truck_type = db.Column(db.String(50))
    capacity_ton = db.Column(db.Float)
    status = db.Column(db.String(50), default="AVAILABLE")
    franchise_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
