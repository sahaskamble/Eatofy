'use client';

import React from 'react';
import HotelSideNav from '@/components/SideNavHotel';
import { FaBell } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <>
      <HotelSideNav />
      <div className="ml-[69px] px-4 flex h-screen" >
        <div className="flex-1 bg-zinc-100 py-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-red-500 text-2xl font-bold">Hotel</h1>
            <div className="flex items-center space-x-4">
              <FaBell size={30} className='text-slate-400' />
              <div className="w-[50px] h-[50px] bg-slate-300 rounded-full inline-flex justify-center items-center">P</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 px-3">
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
    </>
  );
}

export default Dashboard;
