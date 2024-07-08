"use client"
import React from 'react';

const EatofyApp: React.FC = () => {
  return (
    <div className="h-screen  flex items-center justify-center bg-gray-100">
      <div className="flex-1 w-screen h-screen p-6 bg-white rounded-lg shadow-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-500">EATOFY</h1>
          <input
            type="text"
            placeholder="Search for food, coffee, etc..."
            className="p-2 border rounded-lg w-64 md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <h2 className="text-xl font-semibold text-red-500 mb-4">KOT List</h2>
        <div className="border border-red-500 p-4 rounded-lg bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="text-red-500">
                <th className="pb-2">KOT #Token</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Table</th>
                <th className="pb-2">Guest Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-zinc-200 text-black">
                <td className="py-2">#02545</td>
                <td className="py-2">20-05-24</td>
                <td className="py-2">T3</td>
                <td className="py-2">Ritesh</td>
              </tr>
              <tr>
                <td className="py-2">#02545</td>
                <td className="py-2">25-05-24</td>
                <td className="py-2">T4</td>
                <td className="py-2">Harsh</td>
              </tr>
              <tr className="bg-zinc-200 text-black">
                <td className="py-2">#02545</td>
                <td className="py-2">20-06-24</td>
                <td className="py-2">T6</td>
                <td className="py-2">Ayan</td>
              </tr>
              <tr>
                <td className="py-2">#02545</td>
                <td className="py-2">11-08-24</td>
                <td className="py-2">T7</td>
                <td className="py-2">Ganesh</td>
              </tr>
              <tr className="bg-zinc-200 text-black">
                <td className="py-2">#02545</td>
                <td className="py-2">15-10-24</td>
                <td className="py-2">T5</td>
                <td className="py-2">Himanshi</td>
              </tr>
              <tr>
                <td className="py-2">#02545</td>
                <td className="py-2">31-12-24</td>
                <td className="py-2">T1</td>
                <td className="py-2">Shashank</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EatofyApp;
