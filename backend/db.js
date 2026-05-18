// ============================================================================
// PLATFORM: BISON INDIA LOGISTICS — TARGET LEDGER FIXED HANDSHAKE
// CODESPACE PATH: backend/db.js
// ============================================================================

const { Pool } = require('pg');

console.log("📡 [IST Engine] Initializing database pool sequence...");
console.log(`📡 [IST Engine] Attempting connection to target catalog: "bayson_india"`);

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bayson_india', // ⚡ ABSOLUTE FORCE OVERRIDE — No fallbacks allowed
  password: 'postgres123',
  port: 5432,
});

// Immediate execution trace test
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ CONNECTION BLOCKED. pgAdmin reports error:', err.message);
  } else {
    console.log('🟢 SUCCESS: [IST-Sovereign Bridge] Connected to bayson_india ledger tables!');
  }
});

module.exports = pool;