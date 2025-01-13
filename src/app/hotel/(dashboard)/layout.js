'use client';

import { useHotelAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/hotel/dashboard', icon: HomeIcon },
  { name: 'Punch Order', href: '/hotel/punch-order', icon: ClipboardDocumentListIcon },
  { name: 'Manage Restaurant', href: '/hotel/manage', icon: Cog8ToothIcon },
];

export default function DashboardLayout({ children }) {
  const { user, loading } = useHotelAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/hotel/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-white items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen text-black bg-gray-100">
      <Navbar navigation={navigation} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 ml-16">
        <div className="mx-auto my-1 px-2 py-2">
          {children}
        </div>
      </main>
    </div>
  );
}
