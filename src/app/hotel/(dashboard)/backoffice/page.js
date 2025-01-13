import { HomeIcon, UsersIcon, CalendarIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function BackofficePage() {
  const sections = [
    { name: 'Inventory Management', href: '/hotel/backoffice/inventory', icon: <ClipboardDocumentListIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Menu Management', href: '/hotel/menu-management', icon: <ClipboardDocumentListIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Staff Management', href: '/hotel/staff-management', icon: <UsersIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Table & Section Management', href: '/hotel/manage', icon: <HomeIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Customer Relationship Management', href: '/hotel/customer', icon: <UsersIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Orders History', href: '/hotel/order-history', icon: <CalendarIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Staff Attendance', href: '/hotel/staff-attendance', icon: <UsersIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Expense Management', href: '/hotel/expense', icon: <Cog6ToothIcon className="w-12 h-12 text-gray-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gradient">BACKOFFICE</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link key={section.name} href={section.href} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              {section.icon}
              <h2 className="mt-4 text-lg font-semibold text-center text-gray-700">{section.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
