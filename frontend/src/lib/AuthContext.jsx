// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SYSTEM ACCESS GATEWAY PROVIDER
// FILE PATH: frontend/src/lib/AuthContext.jsx
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState({ id: 1, name: "BISON INDIA MAIN", subdomain: "localhost" });
  const [loading, setLoading] = useState(false);

  // Simulates a secure token login validation check matching your users database
  const login = async (mobile, password, role) => {
    setLoading(true);
    try {
      // Mock validation matching public.users columns constraints
      const mockUser = {
        id: mobile === '9848022338' ? 1 : 99,
        tenant_id: tenant.id,
        mobile: mobile,
        role: role, // admin, transporter, shipper, driver
        is_active: true
      };
      setUser(mockUser);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, tenant, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be executed within an explicit AuthProvider container');
  }
  return context;
}