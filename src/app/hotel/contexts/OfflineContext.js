'use client';

import { set } from 'mongoose';
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const OfflineContext = createContext();

export function OfflineProvider({ children }) {
  const [isOffline, setIsOffline] = useState(true);

  const toggleOfflineMode = () => {
    setIsOffline(prev => !prev);
  };

  // Use useEffect to handle side effects (toast notifications)
  useEffect(() => {
    // Skip the initial render
    const message = isOffline ? 'Switched to Offline Mode' : 'Switched to Online Mode';
    toast.info(message);
  }, [isOffline]); // Only run when isOffline changes

  return (
    <OfflineContext.Provider value={{ isOffline, setIsOffline, toggleOfflineMode }}>
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
} 