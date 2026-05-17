// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — MASTER NETWORK ROUTER INTERCEPTOR
// CODESPACE PATH: frontend/src/api/bisonClient.js
// ============================================================================

import axios from 'axios';

// Initialize the master network communication node instance
const bisonClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000, // Terminate signal trace if backend node drops for > 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * BUS INTERCEPTOR: OUTBOUND REQUESTS
 * Automatically captures tokens and solders the multi-tenant isolation context
 * directly onto the outbound header packets before they leave the application frame.
 */
bisonClient.interceptors.request.use(
  (config) => {
    // Extract state parameters from local storage registries
    const sessionToken = localStorage.getItem('BISON_SESSION_TOKEN');
    const activeTenantId = localStorage.getItem('BISON_ACTIVE_TENANT_ID') || '1';

    if (sessionToken) {
      config.headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    // ENFORCING IST-SOVEREIGN ROW LEVEL ISOLATION (RLS) IN THE DATABASE
    config.headers['X-Tenant-ID'] = activeTenantId;

    return config;
  },
  (error) => {
    // Log trace anomalies immediately to the systems log buffer
    console.error('[PORT GATEWAY ERROR] Outbound request failure:', error);
    return Promise.reject(error);
  }
);

/**
 * BUS INTERCEPTOR: INBOUND RESPONSES
 * Intercepts incoming backend signals and handles emergency network resets
 * if terminal authorization drops out.
 */
bisonClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Port Access Revoked: Token expired or dropped by BAYSON_DB authorization rules
      if (response.status === 401 || response.status === 403) {
        console.warn('[SECURITY BREACH / SESSION TIMEOUT] Revoking token access.');
        localStorage.removeItem('BISON_SESSION_TOKEN');
        // Triggers safe interface return to the entrance gate if needed
      }
    }
    
    return Promise.reject(error);
  }
);

export default bisonClient;