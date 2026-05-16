from database import db
from datetime import datetime

class Bid(db.Model):
    __tablename__ = "bids"
    
    id = db.Column(db.Integer, primary_key=True)
    load_id = db.Column(db.Integer)
    transporter_id = db.Column(db.Integer)
    bid_amount = db.Column(db.Float)
    status = db.Column(db.String(50), default="PENDING")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
