'use client';

import { EatofyAuthProvider } from './contexts/AuthContext';

export default function EatofyLayout({ children }) {
  return (
    <EatofyAuthProvider>
      <main className="min-h-screen bg-gray-50">
        {/* Add any shared layout elements here */}
        {children}
      </main>
    </EatofyAuthProvider>
  );
}
