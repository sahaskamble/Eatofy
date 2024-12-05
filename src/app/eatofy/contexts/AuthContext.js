'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EatofyAuthContext = createContext({});

export function EatofyAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
    fetchHotelData();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/eatofy/authentication/check');
      const data = await response.json();

      if (data.returncode === 200 && data.output) {
        setUser(data.output);
        // console.log(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/eatofy/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setUser(data.output);
        // Fetch dashboard data immediately after successful login
        await checkAuth();
        await fetchDashboardData();
        await fetchHotelData();
        router.push('/eatofy/dashboard');
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Failed to login. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/eatofy/authentication/logout', { method: 'POST' });
      setUser(null);
      console.log('Logout successful');
      await checkAuth();
      router.push('/eatofy/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/eatofy/dashboard');
      const data = await response.json();
      setDashboard(data.output);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      return null;
    }
  };

  const fetchHotelData = async () => {
    try {
      const response = await fetch('/api/eatofy/hotel/fetch');
      const data = await response.json();
      setHotels(data.output);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      return null;
    }
  };

  const value = {
    user,
    dashboard,
    hotels,
    loading,
    login,
    logout,
    checkAuth,
    fetchHotelData
  };

  return (
    <EatofyAuthContext.Provider value={value}>
      {children}
    </EatofyAuthContext.Provider>
  );
}

export const useEatofyAuth = () => {
  const context = useContext(EatofyAuthContext);
  if (!context) {
    throw new Error('useEatofyAuth must be used within an EatofyAuthProvider');
  }
  return context;
};
