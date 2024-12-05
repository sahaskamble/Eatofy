'use client';

import Sidebar from '../components/Sidebar';
import { useEatofyAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { user, loading, } = useEatofyAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/eatofy/login');
    }
  }, [user, loading, router]);
  console.log(user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex text-black">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50 min-h-screen ml-20">
        {children}
      </main>
    </div>
  );
}
