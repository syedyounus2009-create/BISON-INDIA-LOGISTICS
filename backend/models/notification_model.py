from database import db
from datetime import datetime

class Notification(db.Model):
    __tablename__ = "notifications"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    extra_data = db.Column(db.JSON, default={})  # Changed from 'metadata'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
