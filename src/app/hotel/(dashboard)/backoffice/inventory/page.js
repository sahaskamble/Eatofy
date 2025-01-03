import { HomeIcon, UsersIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function BackofficePage() {
  const sections = [
    { name: 'Items Management', href: '/hotel/item_management', icon: <ClipboardDocumentListIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Purchase Management', href: '/hotel/purchase', icon: <ClipboardDocumentListIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Available Stock', href: '/hotel/available_stock', icon: <UsersIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Supplier Management', href: '/hotel/supplier_management', icon: <HomeIcon className="w-12 h-12 text-gray-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gradient">INVENTORY</h1>
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
