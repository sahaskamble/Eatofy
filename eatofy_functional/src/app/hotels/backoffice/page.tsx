"use client"
import HotelSideNav from '@/components/SideNavHotel';
import Link from 'next/link';
import React, { useState } from 'react';

const EatofyApp: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);

  };

  const menuItems = [
    {
      'name': 'Menu Management',
      'href': '/hotels/menu_management'
    },
    {
      'name': 'Staff',
      'href': '/hotels/staff'
    },
    {
      'name': 'Table Management',
      'href': '/hotels/table_management'
    },
  ];

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] h-screen flex items-center justify-center bg-gray-100">
        <div className="w-screen h-screen px-6 bg-white rounded-lg shadow-lg" >
          <div className="flex justify-center items-center my-8">
            <h1 className="text-red-500 text-2xl font-bold">EATOFY</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`border rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer ${activeIndex === index ? 'bg-red-500 text-white' : 'bg-white text-zinc-700 border-red-500'
                  }`}
                onClick={() => handleItemClick(index)}
              >
                <img
                  src="https://placehold.co/48x48"
                  alt={item.name}
                  className="w-12 h-12 mb-2"
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EatofyApp;
