import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config

# Load environment variables
load_dotenv()

# =====================================
# CREATE FLASK APP
# =====================================
app = Flask(__name__)
app.config.from_object(Config)

# Initialize database FIRST
from database import db
db.init_app(app)

# Initialize CORS
CORS(app)

# =====================================
# HEALTH CHECK
# =====================================
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"success": True, "message": "BISON backend is running"}), 200

# =====================================
# TEST DATABASE CONNECTION
# =====================================
@app.route('/test-db', methods=['GET'])
def test_db():
    try:
        from sqlalchemy import text
        with app.app_context():
            result = db.session.execute(text("SELECT 1 as test"))
            db.session.commit()
        return jsonify({"success": True, "message": "Database connected"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# =====================================
# ROOT ENDPOINT
# =====================================
@app.route('/', methods=['GET'])
def root():
    return jsonify({
        "success": True,
        "name": "BISON SMART LOGISTICS API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "test-db": "/test-db",
            "auth": "/auth/login, /auth/register",
            "trucks": "/trucks/all, /trucks/add",
            "drivers": "/drivers/all, /drivers/add",
            "loads": "/loads/all, /loads/add",
            "trips": "/trips/all, /trips/add, /trips/complete/<id>",
            "subscriptions": "/subscription/plans, /subscription/subscribe",
            "bids": "/bids/place, /bids/load/<id>",
            "payments": "/payment/create-order, /payment/capture/<order_id>",
            "notifications": "/notifications/all",
            "expenses": "/expenses/all",
            "transactions": "/transactions/all"
        }
    }), 200

# =====================================
# IMPORT MODELS (AFTER db.init_app)
# =====================================
from models.user_model import User
from models.truck_model import Truck
from models.driver_model import Driver
from models.load_model import Load
from models.trip_model import Trip
from models.franchise_model import Franchise, FranchisePayout
from models.bid_model import Bid
from models.notification_model import Notification

# =====================================
# IMPORT ROUTES
# =====================================
from routes.auth_routes import auth_bp
from routes.truck_routes import truck_bp
from routes.driver_routes import driver_bp
from routes.load_routes import load_bp
from routes.trip_routes import trip_bp
from routes.dashboard_routes import dashboard_bp
from routes.franchise_routes import franchise_bp
from routes.payment_routes import payment_bp
from routes.bid_routes import bid_bp
from routes.subscription_routes import subscription_bp
from routes.notification_routes import notification_bp

# =====================================
# REGISTER BLUEPRINTS
# =====================================
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(truck_bp, url_prefix='/trucks')
app.register_blueprint(driver_bp, url_prefix='/drivers')
app.register_blueprint(load_bp, url_prefix='/loads')
app.register_blueprint(trip_bp, url_prefix='/trips')
app.register_blueprint(dashboard_bp, url_prefix='/dashboard')
app.register_blueprint(franchise_bp, url_prefix='/franchise')
app.register_blueprint(payment_bp, url_prefix='/payment')
app.register_blueprint(bid_bp, url_prefix='/bids')
app.register_blueprint(subscription_bp, url_prefix='/subscription')
app.register_blueprint(notification_bp, url_prefix='/notifications')

# =====================================
# CREATE TABLES
# =====================================
with app.app_context():
    db.create_all()
    print("=" * 50)
    print("✅ BISON BACKEND STARTING...")
    print("=" * 50)
    print(f"📊 Database: {os.getenv('DB_NAME', 'bayson_india')}")
    print(f"🌐 Server: http://localhost:5000")
    print(f"🔗 Health: http://localhost:5000/health")
    print(f"🔗 Test DB: http://localhost:5000/test-db")
    print(f"🔗 Root: http://localhost:5000/")
    print("=" * 50)

# =====================================
# ERROR HANDLERS
# =====================================
@app.errorhandler(404)
def not_found(error):
    return jsonify({"success": False, "message": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"success": False, "message": "Internal server error"}), 500

# =====================================
# RUN SERVER
# =====================================
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
