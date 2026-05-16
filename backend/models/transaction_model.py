from database import db
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = "transactions"
    
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    direction = db.Column(db.String(10), nullable=False)  # Credit or Debit
    transaction_type = db.Column(db.String(50), nullable=False)  # Payment, Commission, Refund
    party_name = db.Column(db.String(100))
    party_type = db.Column(db.String(50))  # Shipper, Transporter, Platform
    payment_mode = db.Column(db.String(50))  # NEFT, UPI, Cash
    reference_number = db.Column(db.String(100))
    status = db.Column(db.String(50), default="Completed")
    transaction_date = db.Column(db.Date, default=datetime.utcnow)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'direction': self.direction,
            'transaction_type': self.transaction_type,
            'party_name': self.party_name,
            'party_type': self.party_type,
            'payment_mode': self.payment_mode,
            'reference_number': self.reference_number,
            'status': self.status,
            'transaction_date': self.transaction_date.isoformat() if self.transaction_date else None,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }