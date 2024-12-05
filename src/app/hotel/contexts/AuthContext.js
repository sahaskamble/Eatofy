'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HotelAuthContext = createContext();

export function HotelAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [waiter_id, setWaiter_id] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/hotel/auth/check');
      const data = await response.json();
      
      if (data.returncode === 200 && data.output) {
        setUser(data.output);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/hotel/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (data.returncode === 200 && data.output.length > 0) {
        setUser(data.output[0]);
        setWaiter_id(data.output[0].staff_info._id);
        await checkAuth();
        router.push('/hotel/dashboard');
        return { success: true };
      }
      
      return { 
        success: false, 
        message: data.message || 'Login failed'
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'An error occurred during login'
      };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/hotel/auth/logout',{ method: 'POST' });
      setUser(null);
      router.push('/hotel/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch('/api/hotel/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      return {
        success: data.returncode === 200,
        message: data.message
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'Failed to process password reset request'
      };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch('/api/hotel/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      
      const data = await response.json();
      return {
        success: data.returncode === 200,
        message: data.message
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Failed to reset password'
      };
    }
  };

  return (
    <HotelAuthContext.Provider value={{
      user,
      waiter_id,
      loading,
      login,
      logout,
      forgotPassword,
      resetPassword,
      checkAuth
    }}>
      {children}
    </HotelAuthContext.Provider>
  );
}

export function useHotelAuth() {
  const context = useContext(HotelAuthContext);
  if (!context) {
    throw new Error('useHotelAuth must be used within a HotelAuthProvider');
  }
  return context;
}
