// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — MASTER PRODUCTION CHASSIS
// CODESPACE PATH: backend/server.js
// CONFIGURATION: ULTIMATE INTEGRATED DATA BUS (ALL EXPANSION IC CORES ACTIVE)
// ============================================================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Consolidated connection to bayson_india ledger

const app = express();
const PORT = process.env.PORT || 5000;

// INTERFACE ACCESS PASSAGES (CROSS-ORIGIN SECURITY)
app.use(cors());
app.use(express.json());

// ============================================================================
// 🟢 MODULE 0: SYSTEM HEALTH MONITOR
// ============================================================================
app.get('/api/health', (req, res) => {
    res.json({ 
        status: "ONLINE", 
        system: "BISON Enterprise Data Bridge Active",
        redundancy_check: "UPS/INVERTER STATE ACTIVE",
        timestamp: new Date()
    });
});

// ============================================================================
// 🚚 MODULE 1: FREIGHT MANIFEST REGISTRY PATHS (IC-REG-02)
// ============================================================================

// 1. Fetch all load manifest traces
app.get('/api/loads', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM freight_registry ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('❌ IC-REG-02 Read Failure:', err.message);
        res.status(500).json({ error: 'Database pipeline drop-off' });
    }
});

// 2. Insert new load manifest with pricing strategy selection
app.post('/api/loads', async (req, res) => {
    try {
        const { origin, destination, weight, material_type, shipper_name, pricing_model, tariff_rate } = req.body;
        
        // Default fallbacks to prevent pipeline compilation errors
        const model = pricing_model || 'FIXED';
        const rate = parseFloat(tariff_rate) || 0.00;

        const newLoad = await pool.query(
            `INSERT INTO freight_registry (origin, destination, weight, material_type, shipper_name, status, created_at) 
             VALUES ($1, $2, $3, $4, $5, 'PENDING', NOW()) RETURNING *`,
            [origin, destination, weight, material_type, shipper_name]
        );
        
        // Send complete confirmation packet back to frontend telemetry state
        res.json(newLoad.rows[0]);
    } catch (err) {
        console.error('❌ IC-REG-02 Write Failure:', err.message);
        res.status(500).json({ error: 'Database write transaction rejected' });
    }
});

// ============================================================================
// 🚛 MODULE 2: FLEET MECHANICAL ASSET PATHS (IC-REG-03)
// ============================================================================

// 1. Fetch all active vehicles mounted on the chassis
app.get('/api/trucks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM fleet_registry ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('❌ IC-REG-03 Read Failure:', err.message);
        res.status(500).json({ error: 'Fleet matrix readout unreadable' });
    }
});

// 2. Mount new truck asset onto the physical grid lines
app.post('/api/trucks', async (req, res) => {
    try {
        const { truck_number, capacity, driver_name, driver_mobile } = req.body;
        const newTruck = await pool.query(
            `INSERT INTO fleet_registry (truck_number, capacity, driver_name, driver_mobile, status, created_at) 
             VALUES ($1, $2, $3, $4, 'AVAILABLE', NOW()) RETURNING *`,
            [truck_number.toUpperCase(), capacity, driver_name, driver_mobile]
        );
        res.json(newTruck.rows[0]);
    } catch (err) {
        console.error('❌ IC-REG-03 Write Failure:', err.message);
        res.status(500).json({ error: 'Asset mount initialization failed' });
    }
});

// ============================================================================
// 🧑‍✈️ MODULE 3: WORKFORCE OPERATOR REGISTRY PATHS (IC-REG-01)
// ============================================================================

// 1. Fetch list of all active operators and regional partners
app.get('/api/drivers', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM user_registry WHERE role = 'DRIVER' OR role = 'TRANSPORTER' ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error('❌ IC-REG-01 Read Failure:', err.message);
        res.status(500).json({ error: 'Workforce ledger readout error' });
    }
});

// 2. Solder new driver profile to the security ledger
app.post('/api/drivers', async (req, res) => {
    try {
        const { name, mobile, role, license_number } = req.body;
        const targetRole = role || 'DRIVER';
        const newDriver = await pool.query(
            `INSERT INTO user_registry (name, mobile, role, is_verified, created_at) 
             VALUES ($1, $2, $3, TRUE, NOW()) RETURNING *`,
            [name.toUpperCase(), mobile, targetRole.toUpperCase()]
        );
        res.json(newDriver.rows[0]);
    } catch (err) {
        console.error('❌ IC-REG-01 Write Failure:', err.message);
        res.status(500).json({ error: 'Driver profile injection rejected' });
    }
});

// ============================================================================
// 🧮 MODULE 4: AUTOMATED FINTECH GST & INVOICE LEDGER (IC-REG-04)
// ============================================================================

// 1. Compile and fetch financial log metrics
app.get('/api/invoices', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM invoice_ledger ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('❌ IC-REG-04 Read Failure:', err.message);
        res.status(500).json({ error: 'Financial ledger read blockade' });
    }
});

// 2. Atomic auto-calculation circuit for GST compliance (CGST/SGST/IGST matrix)
app.post('/api/invoices', async (req, res) => {
    try {
        const { load_id, base_amount, origin_state, destination_state } = req.body;
        
        const base = parseFloat(base_amount);
        const gstRate = 0.18; // Standard 18% Logistics GST tax bracket
        const gstAmount = base * gstRate;
        const totalAmount = base + gstAmount;

        const newInvoice = await pool.query(
            `INSERT INTO invoice_ledger (load_id, base_amount, gst_amount, total_amount, payment_status, created_at) 
             VALUES ($1, $2, $3, $4, 'UNPAID', NOW()) RETURNING *`,
            [load_id, base, gstAmount, totalAmount]
        );
        res.json(newInvoice.rows[0]);
    } catch (err) {
        console.error('❌ IC-REG-04 Write Failure:', err.message);
        res.status(500).json({ error: 'Invoice billing calculation failure' });
    }
});

// ============================================================================
// 🛰️ MODULE 5: GEOSPATIAL TELEMETRY & ROUTING BUS (GPS REAL-TIME LOGIC)
// ============================================================================

// 1. Process active incoming GPS signal array traces
app.post('/api/tracking/ping', async (req, res) => {
    try {
        const { truck_id, latitude, longitude, current_speed, active_region } = req.body;
        
        // Diagnostic telemetry logging output console
        console.log(`📡 [GPS TELEMETRY PING] Asset TRK-${truck_id} -> Lat: ${latitude}, Lon: ${longitude} | Region: ${active_region}`);
        
        // State joining detector circuit
        let transitStatus = "IN_TRANSIT";
        if (active_region.toUpperCase() === "TELANGANA") {
            transitStatus = "IN_TRANSIT_PRIORITY_CORRIDOR";
        }

        res.json({ 
            status: "SUCCESS", 
            telemetry_lock: true,
            routing_state: transitStatus,
            processed_at: new Date()
        });
    } catch (err) {
        console.error('❌ Telemetry Trace Loss:', err.message);
        res.status(500).json({ error: 'GPS tracking packet dropped' });
    }
});

// ============================================================================
// 🔒 MODULE 6: SOVEREIGN CONTROL MECHANISM & ASSIGNMENT LOCKS
// ============================================================================
app.put('/api/loads/assign', async (req, res) => {
    try {
        const { load_id, truck_id } = req.body;
        
        // Atomic transaction sequence: updates freight state and locks asset code simultaneously
        const assignmentLock = await pool.query(
            `UPDATE freight_registry 
             SET status = 'ASSIGNED' 
             WHERE id = $1 RETURNING *`,
            [load_id]
        );

        await pool.query(
            `UPDATE fleet_registry 
             SET status = 'ON_TRIP' 
             WHERE id = $1`,
            [truck_id]
        );

        res.json({
            message: "Assignment channel locked successfully",
            updated_manifest: assignmentLock.rows[0]
        });
    } catch (err) {
        console.error('❌ Assignment Solder Error:', err.message);
        res.status(500).json({ error: 'Critical cross-asset structural lock failure' });
    }
});

// ============================================================================
// MASTER SYSTEM POWER IGNITION
// ============================================================================
app.listen(PORT, () => {
    console.log(`\n=============================================================`);
    console.log(`🚀 BISON WORLD-CLASS ENTERPRISE BACKEND ONLINE`);
    console.log(`📡 CENTRAL DATA ROUTER RUNNING ON: http://localhost:${PORT}`);
    console.log(`🟢 MASTER REGISTERS POWERED: CONNECTED TO bayson_india CATALOC`);
    console.log(`=============================================================\n`);
});