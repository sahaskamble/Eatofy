'use client';

import { HotelAuthProvider } from './contexts/AuthContext';

export default function HotelLayout({ children }) {
  return (
    <HotelAuthProvider>
      {children}
    </HotelAuthProvider>
  );
}
