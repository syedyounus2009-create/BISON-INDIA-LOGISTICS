-- ============================================================================
-- SYSTEM IDENTIFIER: BAYSON INDIA LOGISTICS — CENTRAL STORAGE ENGINE REGISTRY
-- CODESPACE PATH: backend/src/models/schema.sql
-- ============================================================================

-- 1. FLEET VEHICLE LOG INDEX MAPPING (REF: IMAGE_FLEET_FORM)
CREATE TABLE IF NOT EXISTS fleet_registry (
    asset_key VARCHAR(50) PRIMARY KEY,
    truck_number VARCHAR(20) UNIQUE NOT NULL,
    chassis_configuration VARCHAR(50) NOT NULL,
    capacity_tons INT NOT NULL,
    model_manufacturer VARCHAR(50),
    manufacturing_year INT,
    permit_type VARCHAR(30) DEFAULT 'National',
    gps_enabled BOOLEAN DEFAULT TRUE,
    kyc_verified BOOLEAN DEFAULT FALSE,
    rc_expiry_date DATE,
    insurance_expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. FREIGHT DEMAND EXCHANGE BOARD
CREATE TABLE IF NOT EXISTS freight_registry (
    id VARCHAR(50) PRIMARY KEY,
    origin_hub VARCHAR(100) NOT NULL,
    destination_hub VARCHAR(100) NOT NULL,
    cargo_profile VARCHAR(150) NOT NULL,
    weight_mt INT NOT NULL,
    tariff_rate NUMERIC(12, 2) NOT NULL,
    pricing_model VARCHAR(20) CHECK (pricing_model IN ('FIXED', 'BIDDING')),
    status VARCHAR(30) DEFAULT 'Open Transmit',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. FINANCIAL INVOICE METRICS REGISTRY (REF: IMAGE_FINANCE_VIEW)
CREATE TABLE IF NOT EXISTS invoice_ledger (
    invoice_id SERIAL PRIMARY KEY,
    booking_reference VARCHAR(50) NOT NULL,
    outstanding_unpaid NUMERIC(12, 2) DEFAULT 0.00,
    collected_paid NUMERIC(12, 2) DEFAULT 0.00,
    gst_compliance_status VARCHAR(20) DEFAULT 'VALIDATED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);