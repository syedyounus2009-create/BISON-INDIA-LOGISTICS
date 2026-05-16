from database import db
from datetime import datetime

class Load(db.Model):
    __tablename__ = "loads"
    
    id = db.Column(db.Integer, primary_key=True)
    reference_number = db.Column(db.String(50))
    shipper_id = db.Column(db.Integer)
    pickup_location = db.Column(db.String(255))
    drop_location = db.Column(db.String(255))
    material_type = db.Column(db.String(100))
    weight_ton = db.Column(db.Float)
    offered_price = db.Column(db.Float)
    status = db.Column(db.String(50), default="PENDING")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    delivery_date = db.Column(db.Date)
