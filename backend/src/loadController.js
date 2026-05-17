// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — OPERATIONS CONTROL CONTROLLER
// CODESPACE PATH: backend/src/controllers/loadController.js
// ============================================================================

const db = require('../config/db');

/**
 * Broadcasts a new load demand out to the open freight exchange network.
 */
exports.broadcastNewDemand = async (req, res) => {
  const { origin, destination, cargo, weight, rate, priceModel } = req.body;
  const traceId = `LOAD-2026-${Math.floor(100 + Math.random() * 900)}`;

  try {
    const queryText = `
      INSERT INTO freight_registry (id, origin, destination, cargo_profile, weight_mt, tariff_rate, pricing_model, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'Open Transmit')
      RETURNING *;
    `;
    const values = [traceId, origin, destination, cargo, weight, rate, priceModel];
    const result = await db.query(queryText, values);

    return res.status(201).json({
      success: true,
      message: '[SYSTEM LINK CONFIRMED] Demand broadcast successful.',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('[OPERATIONS REGISTRY ERROR]', error.message);
    return res.status(500).json({ success: false, error: 'Database pipeline transaction rejected.' });
  }
};

/**
 * Links a load directly to a fleet vehicle and generates an active dispatch tracking log.
 */
exports.executeManifestLink = async (req, res) => {
  const loadId = req.params.id;
  const { operatorKey } = req.body;
  const tripNumber = `TRIP-${Math.floor(77000 + Math.random() * 999)}`;

  try {
    // Phase 1: Lock the resource to eliminate multi-booking conflicts
    await db.query('BEGIN');

    const updateLoadText = `
      UPDATE freight_registry 
      SET status = 'Assigned' 
      WHERE id = $1 AND status = 'Open Transmit'
      RETURNING *;
    `;
    const loadCheck = await db.query(updateLoadText, [loadId]);

    if (loadCheck.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(409).json({ success: false, error: '[CONCURRENCY INTERCEPT] Resource locked or already assigned.' });
    }

    // Phase 2: Open a telemetry line tracking unit inside the trips subsystem
    const insertTripText = `
      INSERT INTO telemetry_registry (trip_number, load_id, active_state, integration_mode)
      VALUES ($1, $2, 'IN_TRANSIT', 'HARDWARE_GPS')
      RETURNING *;
    `;
    const tripResult = await db.query(insertTripText, [tripNumber, loadId]);

    await db.query('COMMIT');

    return res.status(200).json({
      success: true,
      message: '[SYSTEM LINK CONFIRMED] Manifest link established successfully.',
      trip_number: tripResult.rows[0].trip_number
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('[MANIFEST EXECUTOR CRASH]', error.message);
    return res.status(500).json({ success: false, error: 'Failed to process manifest handshaking lock.' });
  }
};

/**
 * Fetches all active operations listings on the market.
 */
exports.fetchActiveMarket = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM freight_registry WHERE status = 'Open Transmit' ORDER BY created_at DESC;");
    return res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to stream active exchange table.' });
  }
};