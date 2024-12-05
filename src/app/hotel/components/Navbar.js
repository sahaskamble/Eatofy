'use client';

import { useHotelAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { 
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/hotel/dashboard', icon: <HomeIcon className="w-6 h-6" /> },
  { name: 'Punch Order', href: '/hotel/punch-order', icon: <ClockIcon className="w-6 h-6" /> },
  { name: 'Bookings', href: '/hotel/bookings', icon: <CalendarIcon className="w-6 h-6" /> },
  { name: 'Rooms', href: '/hotel/rooms', icon: <ClipboardDocumentListIcon className="w-6 h-6" /> },
  { name: 'Staff', href: '/hotel/staff', icon: <UsersIcon className="w-6 h-6" /> },
  { 
    name: 'Settings', 
    href: '/hotel/settings', 
    icon: <Cog6ToothIcon className="w-6 h-6" />,
    subItems: [
      { 
        name: 'Manage', 
        href: '/hotel/manage', 
        icon: <WrenchScrewdriverIcon className="w-5 h-5" /> 
      }
    ]
  },
];

export default function Navbar() {
  const { user, logout } = useHotelAuth();
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div className="group fixed h-screen bg-black shadow-lg w-16 hover:w-64 transition-all duration-300 z-50">
      <div className="p-[10px] flex justify-start items-center gap-4">
        <h2 className="p-3 py-2.5 font-bold rounded-full text-white bg-red-500 transition-opacity duration-300">
          {user[0]?.hotelName?.slice(0, 2) || 'H'}
        </h2>
        <span className='text-white font-semibold opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
          {user[0]?.hotelName}
        </span>
      </div>
      
      <nav className="p-3">
        <ul className="space-y-2">
          {navigation.map((item, index) => (
            <li key={item.name}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="w-full flex items-center p-2 gap-4 rounded hover:bg-red-500 text-white"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xl hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className={`transition-transform duration-200 ${expandedItem === index ? 'rotate-180' : ''} opacity-0 group-hover:opacity-100`}>
                      ▼
                    </span>
                  </button>
                  {expandedItem === index && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className="flex items-center p-2 rounded hover:bg-red-500 text-white"
                          >
                            <span className="text-lg">{subItem.icon}</span>
                            <span className="ml-3 text-lg hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                              {subItem.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center p-2 rounded hover:bg-red-500 text-white"
                >
                  <span className="text-xl min-w-[24px]">{item.icon}</span>
                  <span className="ml-3 text-xl hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={logout}
              className="w-full flex items-center p-2 rounded hover:bg-red-500 text-white"
            >
              <span className="text-xl min-w-[24px]">
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </span>
              <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Sign out
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
