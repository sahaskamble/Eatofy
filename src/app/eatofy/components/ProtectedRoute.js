'use client';

import { useEatofyProtectedRoute } from '../hooks/useProtectedRoute';

export default function EatofyProtectedRoute({ children }) {
  const { loading } = useEatofyProtectedRoute();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return children;
}
