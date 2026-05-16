from database import db
from datetime import datetime

class Driver(db.Model):
    __tablename__ = "drivers"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    mobile = db.Column(db.String(20), unique=True)
    license_number = db.Column(db.String(50))
    status = db.Column(db.String(50), default="AVAILABLE")
    franchise_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
