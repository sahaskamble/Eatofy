'use client';

import { useHotelAuth } from '../../contexts/AuthContext';
import {
  ChartBarIcon,
  UserGroupIcon,
  BanknotesIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Bookings', icon: CalendarDaysIcon, value: '---', change: '+4.75%' },
  { name: 'Total Revenue', icon: BanknotesIcon, value: '$---', change: '+54.02%' },
  { name: 'Active Guests', icon: UserGroupIcon, value: '---', change: '-1.39%' },
  { name: 'Occupancy Rate', icon: ChartBarIcon, value: '--%', change: '+10.18%' }
];

export default function Dashboard() {
  const { user } = useHotelAuth();

  console.log(user);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user[0]?.hotelName}
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Here&apos;s what&apos;s happening with your hotel today.
        </p>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.change.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p>
              </dd>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Bookings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Bookings
          </h2>
          <div className="text-sm text-gray-500">
            No recent bookings to display.
          </div>
        </div>

        {/* Upcoming Check-ins */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Check-ins
          </h2>
          <div className="text-sm text-gray-500">
            No upcoming check-ins to display.
          </div>
        </div>
      </div>
    </div>
  );
}
