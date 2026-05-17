// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — MASTER API ROUTING ENGINE
// CODESPACE PATH: backend/src/routes/api.js
// ============================================================================

const express = require('express');
const router = express.Router();
const { authenticateAccess, verifyAdminPrivilege } = require('../middleware/auth');
const loadController = require('../controllers/loadController');
const pricingController = require('../controllers/pricingController');
const telemetryController = require('../controllers/telemetryController');

// 📦 FREIGHT MARKET LANES
router.get('/loads/market', authenticateAccess, loadController.fetchActiveMarket);
router.post('/loads/broadcast', authenticateAccess, loadController.broadcastNewDemand);
router.put('/loads/assign/:id', authenticateAccess, loadController.executeManifestLink);

// 🛠️ TARIFF CONFIGURATION LANES
router.get('/pricing/tariffs', pricingController.getActiveTariffs);
router.post('/pricing/update', authenticateAccess, verifyAdminPrivilege, pricingController.commitTariffConfig);

// 💻 TERMINAL SCADA INTERCEPT DOOR (RESTRICTED SYSTEM ACCESS ONLY)
router.get('/scada/diagnostics', authenticateAccess, verifyAdminPrivilege, telemetryController.streamScadaMetrics);

module.exports = router;