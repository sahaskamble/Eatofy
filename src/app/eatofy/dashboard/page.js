'use client';

import { useEatofyAuth } from '../contexts/AuthContext';
import EatofyProtectedRoute from '../components/ProtectedRoute';

export default function DashboardPage() {
  const { user, dashboard } = useEatofyAuth();

  return (
    <EatofyProtectedRoute>
      <div className="bg-gray-200 h-auto rounded-xl">
        <div className="container mx-auto p-0 rounded-xl">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                <span className="text-xl text-white font-bold">
                  {user[0]?.firstName?.slice(0, 1)}{user[0]?.lastName?.slice(0, 1)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, <span className="text-red-600">{user[0]?.firstName} {user[0]?.lastName}</span>
                </h1>
                <p className="text-gray-600">Manage your Eatofy efficiently</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-lg p-6 text-white shadow-md transform hover:scale-105 transition-transform duration-200">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Role</h3>
                <p className="text-2xl font-bold">{user[0]?.role}</p>
                <div className="mt-4 h-1 w-16 bg-white/30 rounded"></div>
              </div>

              <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-lg p-6 text-white shadow-md transform hover:scale-105 transition-transform duration-200">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Total Hotels</h3>
                <p className="text-2xl font-bold truncate">{dashboard?.total_hotels}</p>
                <div className="mt-4 h-1 w-16 bg-white/30 rounded"></div>
              </div>

              <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-lg p-6 text-white shadow-md transform hover:scale-105 transition-transform duration-200">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Hotel Subscribed</h3>
                <p className="text-2xl font-bold">{dashboard?.total_subscribed_hotels}</p>
                <div className="mt-4 h-1 w-16 bg-white/30 rounded"></div>
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="bg-red-100 rounded-xl p-6 border border-red-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="group relative bg-white p-4 rounded-lg shadow-sm border border-red-100 hover:shadow-md hover:border-red-200 transition-all duration-200">
                  <div className="text-red-600 font-medium group-hover:text-red-700">View Orders</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>

                <button className="group relative bg-white p-4 rounded-lg shadow-sm border border-red-100 hover:shadow-md hover:border-red-200 transition-all duration-200">
                  <div className="text-red-600 font-medium group-hover:text-red-700">Manage Menu</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>

                <button className="group relative bg-white p-4 rounded-lg shadow-sm border border-red-100 hover:shadow-md hover:border-red-200 transition-all duration-200">
                  <div className="text-red-600 font-medium group-hover:text-red-700">View Reports</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>

                <button className="group relative bg-white p-4 rounded-lg shadow-sm border border-red-100 hover:shadow-md hover:border-red-200 transition-all duration-200">
                  <div className="text-red-600 font-medium group-hover:text-red-700">Settings</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </EatofyProtectedRoute>
  );
}
