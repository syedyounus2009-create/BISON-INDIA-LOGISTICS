// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — DATABASE LAYER CONNECTOR
// CODESPACE PATH: backend/src/config/db.js
// ============================================================================

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 25, // Maximum active connections in pool matching high-demand SCADA traffic
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('[DATABASE SYSTEM] ACTIVE RELATION FLOW REGISTERED');
});

pool.on('error', (err) => {
  console.error('[DATABASE CRITICAL CRASH]', err.message);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};