import React from 'react';
import Sidebar from '../Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 bg-zinc-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-red-500 text-2xl font-bold">EATOFY</h1>
          <div className="flex items-center space-x-4">
            <img src="https://placehold.co/40x40" alt="Notifications Icon" className="w-8 h-8" />
            <div className="bg-zinc-300 rounded-full w-8 h-8"></div>
            <span>Profile &gt;&gt;&gt;&gt;&gt;</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500">
            <h2 className="text-zinc-500">Total Expenses</h2>
            <p className="text-2xl font-bold">₹ 16,598</p>
            <p className="text-green-500">+2.5%</p>
            
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500">
            <h2 className="text-zinc-500">Total Sales</h2>
            <p className="text-2xl font-bold">₹ 11,598</p>
            <p className="text-red-500">-3.5%</p>
           
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500">
            <h2 className="text-zinc-500">Total Revenue</h2>
            <p className="text-2xl font-bold">₹ 35,598</p>
            <p className="text-green-500">+5.5%</p>
            
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-zinc-500">Sales over time</h2>
            <div className="flex space-x-2">
              <button className="bg-zinc-200 text-zinc-700 py-1 px-3 rounded">Revenues</button>
              <button className="bg-zinc-200 text-zinc-700 py-1 px-3 rounded">Ordered items</button>
            </div>
          </div>
          <img className=' w-full h-full' src="/Frame.png" alt="Sales Chart" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
