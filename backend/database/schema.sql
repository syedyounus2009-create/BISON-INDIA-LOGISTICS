-- Drop existing tables if needed
DROP TABLE IF EXISTS franchise_payouts CASCADE;
DROP TABLE IF EXISTS franchises CASCADE;
DROP TABLE IF EXISTS payment_orders CASCADE;
DROP TABLE IF EXISTS gps_logs CASCADE;
DROP TABLE IF EXISTS bids CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS loads CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS trucks CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'transporter',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trucks table
CREATE TABLE trucks (
    id SERIAL PRIMARY KEY,
    truck_number VARCHAR(50) UNIQUE NOT NULL,
    truck_type VARCHAR(50),
    capacity_ton DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'AVAILABLE',
    franchise_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    mobile VARCHAR(20) UNIQUE,
    license_number VARCHAR(50),
    status VARCHAR(50) DEFAULT 'AVAILABLE',
    franchise_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loads table
CREATE TABLE loads (
    id SERIAL PRIMARY KEY,
    reference_number VARCHAR(50),
    shipper_id INTEGER REFERENCES users(id),
    pickup_location VARCHAR(255),
    drop_location VARCHAR(255),
    material_type VARCHAR(100),
    weight_ton DECIMAL(10,2),
    offered_price DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATE
);

-- Trips table
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    trip_number VARCHAR(50) UNIQUE,
    load_id INTEGER REFERENCES loads(id),
    truck_id INTEGER REFERENCES trucks(id),
    driver_id INTEGER REFERENCES drivers(id),
    franchise_id INTEGER,
    start_location VARCHAR(255),
    destination VARCHAR(255),
    trip_status VARCHAR(50) DEFAULT 'CREATED',
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bids table (for load marketplace)
CREATE TABLE bids (
    id SERIAL PRIMARY KEY,
    load_id INTEGER REFERENCES loads(id),
    transporter_id INTEGER REFERENCES users(id),
    bid_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Franchises table
CREATE TABLE franchises (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    franchise_name VARCHAR(100) NOT NULL,
    gst_number VARCHAR(50),
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    monthly_fee DECIMAL(10,2) DEFAULT 3000.00,
    is_active BOOLEAN DEFAULT TRUE,
    joined_date DATE,
    address TEXT,
    city VARCHAR(50),
    pincode VARCHAR(10)
);

-- Franchise payouts
CREATE TABLE franchise_payouts (
    id SERIAL PRIMARY KEY,
    franchise_id INTEGER REFERENCES franchises(id),
    amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'PENDING',
    trip_ids INTEGER[],
    payout_date TIMESTAMP,
    razorpay_payout_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment orders
CREATE TABLE payment_orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(100) UNIQUE,
    trip_id INTEGER REFERENCES trips(id),
    amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'CREATED',
    razorpay_payment_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- GPS logs
CREATE TABLE gps_logs (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    speed DECIMAL(8,2),
    location_name VARCHAR(255),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT INTO users (mobile, password_hash, role) 
VALUES ('9999999999', 'scrypt:32768:8:1$J0tVqFkLmNpQrTvW$4a2b3c4d5e6f7g8h9i0j', 'admin')
ON CONFLICT (mobile) DO NOTHING;

-- Insert test transporter
INSERT INTO users (mobile, password_hash, role) 
VALUES ('8888888888', 'scrypt:32768:8:1$J0tVqFkLmNpQrTvW$4a2b3c4d5e6f7g8h9i0j', 'transporter')
ON CONFLICT (mobile) DO NOTHING;

-- Insert test shipper
INSERT INTO users (mobile, password_hash, role) 
VALUES ('7777777777', 'scrypt:32768:8:1$J0tVqFkLmNpQrTvW$4a2b3c4d5e6f7g8h9i0j', 'shipper')
ON CONFLICT (mobile) DO NOTHING;

-- Insert sample truck
INSERT INTO trucks (truck_number, truck_type, capacity_ton, status) 
VALUES ('TS09AB1234', 'Container', 12, 'AVAILABLE')
ON CONFLICT (truck_number) DO NOTHING;

-- Insert sample driver
INSERT INTO drivers (name, mobile, license_number, status) 
VALUES ('Rajesh Kumar', '9988776655', 'DL1234567890', 'AVAILABLE')
ON CONFLICT (mobile) DO NOTHING;