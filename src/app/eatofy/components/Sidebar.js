'use client';

import { useEatofyAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { FaList, FaUsers, FaStore, FaBox, FaCog, FaChartBar, FaUtensils, FaChartLine, FaHeart, FaUser, FaLock } from 'react-icons/fa';

const adminNavItems = [
  { name: 'Dashboard', href: '/eatofy/dashboard', icon: <FaList /> },  
  { name: 'Users', href: '/eatofy/dashboard/users', icon: <FaUsers /> },
  { name: 'Hotels', href: '/eatofy/dashboard/hotels', icon: <FaStore /> },
  { name: 'Subscriptions', href: '/eatofy/dashboard/subscriptions', icon: <FaBox /> },
  { name: 'Settings', href: '/eatofy/dashboard/settings', icon: <FaCog /> },
];

const restaurantNavItems = [
  { name: 'Dashboard', href: '/eatofy/dashboard', icon: <FaChartBar /> },
  { name: 'Menu', href: '/eatofy/dashboard/menu', icon: <FaUtensils /> },
  { name: 'Orders', href: '/eatofy/dashboard/orders', icon: <FaBox /> },
  { name: 'Analytics', href: '/eatofy/dashboard/analytics', icon: <FaChartLine /> },
  { name: 'Settings', href: '/eatofy/dashboard/settings', icon: <FaCog /> },
];

const customerNavItems = [
  { name: 'Dashboard', href: '/eatofy/dashboard', icon: <FaChartBar /> },
  { name: 'Orders', href: '/eatofy/dashboard/orders', icon: <FaBox /> },
  { name: 'Favorites', href: '/eatofy/dashboard/favorites', icon: <FaHeart /> },
  { name: 'Profile', href: '/eatofy/dashboard/profile', icon: <FaUser /> },
];

export default function Sidebar() {
  const { user, logout } = useEatofyAuth();

  const getNavItems = () => {
    switch (user[0]?.role) {
      case 'Administration':
        return adminNavItems;
      case 'Management':
        return restaurantNavItems;
      case 'Sales':
        return customerNavItems;
      default:
        return [];
    }
  };

  return (
    <div className="group fixed h-screen bg-black shadow-lg w-16 hover:w-64 transition-all duration-300 z-50">
      <div className="p-[10px] flex justify-start items-center gap-4">
        <h2 className="p-3 font-bold rounded-full text-white bg-red-500 transition-opacity duration-300">
          {user[0]?.firstName?.slice(0, 1)}{user[0]?.lastName?.slice(0, 1)}         
        </h2>
        <span className='text-white font-semibold opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>{user[0]?.firstName} {user[0]?.lastName}</span>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {getNavItems().map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center p-2 rounded hover:bg-red-500 text-white"
              >
                <span className="text-xl min-w-[24px]">{item.icon}</span>
                <span className="ml-3 text-xl hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center p-2 rounded hover:bg-red-500 text-white"
              >
                <span className="text-xl min-w-[24px]"><FaLock/></span>
                <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Logout
                </span>
              </button>
            </li>
        </ul>
      </nav>
    </div>
  );
}
