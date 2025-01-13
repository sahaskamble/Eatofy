'use client';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sections from './components/Sections';
import Tables from './components/Tables';

export default function ManagePage() {

  const [activeTab, setActiveTab] = useState('Sections');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Section and Table Management</h1>
        <div className="w-full">
          <div className="grid w-full grid-cols-2 gap-2 bg-gray-300 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('Sections')}
              className={`py-2 px-4 rounded-md transition-all ${activeTab === 'Sections'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
                }`}
            >
              Sections
            </button>
            <button
              onClick={() => setActiveTab('Tables')}
              className={`py-2 px-4 rounded-md transition-all ${activeTab === 'Tables'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
                }`}
            >
              Tables
            </button>
          </div>

          <div className="mt-6">
            {activeTab === 'Sections' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Sections</h2>
                <Sections />
              </div>
            )}

            {activeTab === 'Tables' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Tables</h2>
                <Tables />
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
