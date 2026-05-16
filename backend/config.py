import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('JWT_SECRET', 'bayson_super_secure_secret_key_2026')
    
    # Database
    SQLALCHEMY_DATABASE_URI = f"postgresql://{os.getenv('DB_USER', 'postgres')}:{os.getenv('DB_PASSWORD', 'postgres123')}@{os.getenv('DB_HOST', 'localhost')}/{os.getenv('DB_NAME', 'bayson_india')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT
    JWT_SECRET = os.getenv('JWT_SECRET', 'bayson_super_secure_secret_key_2026')
    
    # Razorpay
    RAZORPAY_KEY_ID = os.getenv('RAZORPAY_KEY_ID', '')
    RAZORPAY_KEY_SECRET = os.getenv('RAZORPAY_KEY_SECRET', '')
