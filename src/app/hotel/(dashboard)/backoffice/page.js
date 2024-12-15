import { HomeIcon, UsersIcon, CalendarIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function BackofficePage() {
  const sections = [
    { name: 'Inventory Management', icon: <ClipboardDocumentListIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Menu Management', icon: <ClipboardDocumentListIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Staff Management', icon: <UsersIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Table Management', icon: <HomeIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Customer Relationship Management', icon: <UsersIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Orders History', icon: <CalendarIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Staff Attendance', icon: <UsersIcon className="w-12 h-12 text-gray-500" /> },
    { name: 'Expense Management', icon: <Cog6ToothIcon className="w-12 h-12 text-gray-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gradient">BACKOFFICE</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <div key={section.name} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              {section.icon}
              <h2 className="mt-4 text-lg font-semibold text-center text-gray-700">{section.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
