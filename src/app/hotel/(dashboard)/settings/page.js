'use client';

import { useState } from 'react';
import GSTSettings from './components/GSTSettings';
import VATSettings from './components/VATSettings';
import BillKOTSettings from './components/BillKOTSettings';
import LoyaltySettings from './components/LoyaltySettings';
import HotelProfile from './components/HotelProfile';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Restaurant Settings</h1>

      <div className="w-full">
        <div className="grid w-full grid-cols-5 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-4 rounded-md transition-all ${activeTab === 'profile'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
              }`}
          >
            Hotel Profile
          </button>
          <button
            onClick={() => setActiveTab('gst')}
            className={`py-2 px-4 rounded-md transition-all ${activeTab === 'gst'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
              }`}
          >
            GST Settings
          </button>
          <button
            onClick={() => setActiveTab('vat')}
            className={`py-2 px-4 rounded-md transition-all ${activeTab === 'vat'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
              }`}
          >
            VAT Settings
          </button>
          <button
            onClick={() => setActiveTab('bill-kot')}
            className={`py-2 px-4 rounded-md transition-all ${activeTab === 'bill-kot'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
              }`}
          >
            Bill & KOT
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`py-2 px-4 rounded-md transition-all ${activeTab === 'loyalty'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
              }`}
          >
            Loyalty Program
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Hotel Profile</h2>
              <HotelProfile />
            </div>
          )}

          {activeTab === 'gst' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">GST Configuration</h2>
              <GSTSettings />
            </div>
          )}

          {activeTab === 'vat' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">VAT Configuration</h2>
              <VATSettings />
            </div>
          )}

          {activeTab === 'bill-kot' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Bill & KOT Customization</h2>
              <BillKOTSettings />
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Loyalty Program Settings</h2>
              <LoyaltySettings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
