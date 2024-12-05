'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/hotel/dashboard', icon: HomeIcon },
  { name: 'Bookings', href: '/hotel/bookings', icon: CalendarIcon },
  { name: 'Rooms', href: '/hotel/rooms', icon: ClipboardDocumentListIcon },
  { name: 'Staff', href: '/hotel/staff', icon: UsersIcon },
  { name: 'Settings', href: '/hotel/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-red-900 text-white'
                        : 'text-gray-300 hover:bg-red-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-red-300' : 'text-gray-400 group-hover:text-red-300'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
