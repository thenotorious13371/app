import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const AUTH_URL = 'https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data';
const REDIRECT_URL = `${window.location.origin}/dashboard`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if we have a session_id in URL fragment
      const hash = window.location.hash;
      if (hash.includes('session_id=')) {
        const sessionId = hash.split('session_id=')[1].split('&')[0];
        await processSessionId(sessionId);
        // Clean URL
        window.history.replaceState(null, '', window.location.pathname);
        return;
      }

      // Otherwise check existing session
      const response = await axios.get(`${BACKEND_URL}/api/auth/me`, {
        withCredentials: true
      });
      setUser(response.data);
    } catch (error) {
      console.log('No active session');
    } finally {
      setLoading(false);
    }
  };

  const processSessionId = async (sessionId) => {
    try {
      // Get session data from Emergent Auth
      const authResponse = await axios.get(AUTH_URL, {
        headers: { 'X-Session-ID': sessionId }
      });

      // Store session in our backend
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/session`,
        authResponse.data,
        { withCredentials: true }
      );

      setUser(response.data.user);
    } catch (error) {
      console.error('Session processing failed:', error);
      throw error;
    }
  };

  const login = () => {
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(REDIRECT_URL)}`;
  };

  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};