'use client';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuCategories from './components/MenuCategories';
import MenuItems from './components/MenuItems';

export default function MenuManagementPage() {

  const [activeTab, setActiveTab] = useState('MenuCategories');

  return (
    <div className="menu-management px-2 py-3">
      <h1 className='text-3xl font-semibold mb-4'>Menu Management</h1>

      <div className="w-full">
        <div className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('MenuCategories')}
            className={`py-2 px-4 rounded-md transition-all ${activeTab === 'MenuCategories'
              ? 'bg-white shadow-sm'
              : 'hover:bg-gray-200'
              }`}
          >
            Menu Category
          </button>
          <button
            onClick={() => setActiveTab('MenuItems')}
            className={`py-2 px-4 rounded-md transition-all ${activeTab === 'MenuItems'
              ? 'bg-white shadow-sm'
              : 'hover:bg-gray-200'
              }`}
          >
            Menu Items
          </button>
          <button
            onClick={() => setActiveTab('MenuDishes')}
            className={`py-2 px-4 rounded-md transition-all ${activeTab === 'MenuDishes'
              ? 'bg-white shadow-sm'
              : 'hover:bg-gray-200'
              }`}
          >
            Menu Dishes
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'MenuCategories' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Menu Category</h2>
              <MenuCategories />
            </div>
          )}

          {activeTab === 'MenuItems' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
              <MenuItems />
            </div>
          )}

          {activeTab === 'MenuDishes' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Menu Dishes</h2>
            </div>
          )}

        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
