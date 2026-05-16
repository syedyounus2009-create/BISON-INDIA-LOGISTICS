from database import db
from datetime import datetime, date

class Franchise(db.Model):
    __tablename__ = "franchises"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    franchise_name = db.Column(db.String(100))
    gst_number = db.Column(db.String(50))
    commission_rate = db.Column(db.Float, default=10.0)
    monthly_fee = db.Column(db.Float, default=3000.0)
    is_active = db.Column(db.Boolean, default=True)
    joined_date = db.Column(db.Date, default=date.today)
    address = db.Column(db.Text)
    city = db.Column(db.String(50))
    pincode = db.Column(db.String(10))

class FranchisePayout(db.Model):
    __tablename__ = "franchise_payouts"
    
    id = db.Column(db.Integer, primary_key=True)
    franchise_id = db.Column(db.Integer)
    amount = db.Column(db.Float)
    status = db.Column(db.String(50), default="PENDING")
    trip_ids = db.Column(db.JSON)
    payout_date = db.Column(db.DateTime)
    razorpay_payout_id = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
