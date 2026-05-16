import React, { createContext, useState, useContext, useEffect } from 'react';
import { bisonAPI } from '@/api/bisonClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.clear();
      }
    }
    setIsLoadingAuth(false);
  }, []);

  const login = async (mobile, password) => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const result = await bisonAPI.auth.login(mobile, password);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      } else {
        setAuthError({ message: result.message });
        return false;
      }
    } catch (err) {
      setAuthError({ message: err.message || 'Login failed' });
      return false;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const register = async (mobile, password, role) => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const result = await bisonAPI.auth.register(mobile, password, role);
      if (result.success) {
        return await login(mobile, password);
      } else {
        setAuthError({ message: result.message });
        return false;
      }
    } catch (err) {
      setAuthError({ message: err.message || 'Registration failed' });
      return false;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = () => {
    bisonAPI.auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      authError,
      login,
      register,
      logout,
      navigateToLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
