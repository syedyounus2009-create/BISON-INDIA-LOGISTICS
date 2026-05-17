// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SYSTEM MATRIX ROUTER
// CODESPACE PATH: frontend/src/App.jsx
// ============================================================================

import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // CORE GLOBAL STATE HOOK FOR MANAGEMENT CONTROL OVER SYSTEM PRICING DATA
  const [systemPricing, setSystemPricing] = useState({
    standard: {
      rate: '4,999',
      features: ['Basic Routing', '5 Active Trucks Tracker', 'Standard GST Billing']
    },
    enterprise: {
      rate: '12,499',
      features: ['Unlimited Routes', 'Multi-Tenant Isolation', 'Hardware GPS Hook', 'Advanced SCADA Mimic']
    }
  });

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        
        {!isAuthenticated ? (
          <LandingPage 
            currentPricing={systemPricing}
            onLoginSuccess={() => setIsAuthenticated(true)} 
          />
        ) : (
          <Dashboard 
            currentPricing={systemPricing}
            onUpdatePricing={(updatedRates) => setSystemPricing(updatedRates)}
            onLogout={() => setIsAuthenticated(false)} 
          />
        )}

      </div>
    </AuthProvider>
  );
}