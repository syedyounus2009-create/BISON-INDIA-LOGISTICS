import razorpay
import os
import hmac
import hashlib
from datetime import datetime

class RazorpayService:
    def __init__(self):
        self.key_id = os.getenv('RAZORPAY_KEY_ID', '')
        self.key_secret = os.getenv('RAZORPAY_KEY_SECRET', '')
        self.client = razorpay.Client(auth=(self.key_id, self.key_secret)) if self.key_id else None
    
    def create_order(self, amount, currency='INR', receipt=None, notes=None):
        """Create a Razorpay order"""
        if not self.client:
            return {"success": False, "message": "Razorpay not configured"}
        
        data = {
            'amount': int(amount * 100),  # Convert to paise
            'currency': currency,
            'receipt': receipt or f"order_{datetime.now().timestamp()}",
            'notes': notes or {}
        }
        
        try:
            order = self.client.order.create(data)
            return {"success": True, "order": order}
        except Exception as e:
            return {"success": False, "message": str(e)}
    
    def verify_payment(self, order_id, payment_id, signature):
        """Verify payment signature"""
        if not self.key_secret:
            return False
        
        expected_signature = hmac.new(
            self.key_secret.encode(),
            f"{order_id}|{payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(expected_signature, signature)
    
    def capture_payment(self, payment_id, amount):
        """Capture a pre-authorized payment"""
        if not self.client:
            return {"success": False, "message": "Razorpay not configured"}
        
        try:
            payment = self.client.payment.capture(payment_id, int(amount * 100))
            return {"success": True, "payment": payment}
        except Exception as e:
            return {"success": False, "message": str(e)}
    
    def refund_payment(self, payment_id, amount=None):
        """Refund a payment"""
        if not self.client:
            return {"success": False, "message": "Razorpay not configured"}
        
        data = {}
        if amount:
            data['amount'] = int(amount * 100)
        
        try:
            refund = self.client.payment.refund(payment_id, data)
            return {"success": True, "refund": refund}
        except Exception as e:
            return {"success": False, "message": str(e)}
    
    def create_subscription(self, plan_id, customer_email, customer_contact):
        """Create a subscription for recurring payments"""
        if not self.client:
            return {"success": False, "message": "Razorpay not configured"}
        
        data = {
            'plan_id': plan_id,
            'customer_notify': 1,
            'total_count': 12,  # Monthly for 1 year
            'notes': {
                'customer_email': customer_email,
                'customer_contact': customer_contact
            }
        }
        
        try:
            subscription = self.client.subscription.create(data)
            return {"success": True, "subscription": subscription}
        except Exception as e:
            return {"success": False, "message": str(e)}

# Create singleton instance
razorpay_service = RazorpayService()
