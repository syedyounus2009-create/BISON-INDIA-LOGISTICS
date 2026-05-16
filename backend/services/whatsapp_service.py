import requests
import os
from datetime import datetime

class WhatsAppService:
    def __init__(self):
        # Use WhatsApp Cloud API (Meta)
        self.access_token = os.getenv('WHATSAPP_ACCESS_TOKEN', '')
        self.phone_number_id = os.getenv('WHATSAPP_PHONE_NUMBER_ID', '')
        self.api_url = f"https://graph.facebook.com/v18.0/{self.phone_number_id}/messages"
    
    def send_message(self, to_number, message):
        """Send WhatsApp message using Cloud API"""
        if not self.access_token or not self.phone_number_id:
            print("WhatsApp credentials not configured")
            return False
        
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        
        data = {
            "messaging_product": "whatsapp",
            "to": to_number,
            "type": "text",
            "text": {"body": message}
        }
        
        try:
            response = requests.post(self.api_url, headers=headers, json=data)
            return response.status_code == 200
        except Exception as e:
            print(f"WhatsApp send error: {e}")
            return False
    
    def send_load_assigned(self, driver_mobile, load_details):
        """Send notification when load is assigned to driver"""
        message = f"""🚛 *Load Assigned - BISON Logistics*

Load ID: {load_details.get('load_id')}
Material: {load_details.get('material_type')}
Weight: {load_details.get('weight_tons')}T
Pickup: {load_details.get('pickup_location')}
Delivery: {load_details.get('drop_location')}
Price: ₹{load_details.get('offered_price')}

Please login to app for full details.
BISON Smart Logistics"""
        return self.send_message(driver_mobile, message)
    
    def send_trip_update(self, driver_mobile, trip_number, status, location):
        """Send trip status update"""
        message = f"""🚛 *Trip Update - BISON Logistics*

Trip #{trip_number}
Status: {status}
Location: {location}
Time: {datetime.now().strftime('%d %b %Y, %H:%M')}

Track live on BISON app."""
        return self.send_message(driver_mobile, message)
    
    def send_payment_confirmation(self, user_mobile, amount, trip_id):
        """Send payment confirmation"""
        message = f"""💰 *Payment Confirmation - BISON Logistics*

Amount: ₹{amount}
Trip: {trip_id}
Status: Completed

Thank you for using BISON!
Download invoice from app."""
        return self.send_message(user_mobile, message)

# Create singleton instance
whatsapp_service = WhatsAppService()
