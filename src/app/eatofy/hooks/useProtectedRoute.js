'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEatofyAuth } from '../contexts/AuthContext';

export function useEatofyProtectedRoute() {
  const { user, loading } = useEatofyAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/eatofy/login');
    }
  }, [user, loading, router]);

  return { user, loading };
}
