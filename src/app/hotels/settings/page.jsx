"use client"

import HotelSideNav from '@/components/SideNavHotel';
import React, { useEffect, useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const EatofyApp = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchBar, setsearchBar] = useState('');
  const [ThemeMode, setThemeMode] = useState('Light');
  const [isOpen, setisOpen] = useState(false);
  const search = useRef();
  const darkMode = useRef();
  const [parent, enableAnimations] = useAutoAnimate()
  const [isDarkTheme, setisDarkTheme] = useState(false);
  const [isVat, setisVat] = useState(false);
  const [isEtoCoin, setisEtoCoin] = useState(false);

  const handleItemClick = () => {
    setisOpen(!isOpen);
    if (ThemeMode === 'Dark') {
      setThemeMode('Light');
    } else if (ThemeMode === 'Light') {
      setThemeMode('Dark')
    }
  };

  const menuItems = [
    { id: 1, name: 'Theme' },
    { id: 2, name: 'VAT Settings' },
    // { id: 3, name: 'GST Settings' },
    { id: 3, name: 'Loyalty Program' },
  ];

  function handleDarkMode() {
    setisDarkTheme(!isDarkTheme);
    handledark();
  }

  function handledark() {
    if (isDarkTheme) {
      darkMode.current.classList.remove('bg-slate-900')
      darkMode.current.classList.remove('text-white')
      darkMode.current.classList.remove('shadow-slate-900')
    } else {
      darkMode.current.classList.add('bg-slate-900')
      darkMode.current.classList.add('text-white')
      darkMode.current.classList.add('shadow-slate-900')
    }
  }

  function CheckAndLoadSettings() {

  }

  useEffect(() => {
    if (search.current) {
      search.current.focus();
    }
  }, [search])

  return (
    <>
      <HotelSideNav />
      <div ref={parent} className="h-screen flex items-center justify-center ml-[70px]">
        <div ref={darkMode} className="w-screen h-screen p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-start items-center mb-6">
            <h1 className='text-3xl font-bold'>
              <span className='text-red-500'> Settings</span>
            </h1>
          </div>
          <div ref={parent} className="flex flex-col gap-8">
            <div ref={parent} className='w-full rounded-md shadow-gray-400 shadow-md py-4 px-4'>
              <div className='flex justify-between items-center'>
                <span>Theme</span>
                <div className='inline-flex items-center gap-4'>
                  <div className="theme-switch">
                    <input
                      type="checkbox"
                      id="theme-toggle"
                      checked={isDarkTheme}
                      onChange={handleDarkMode}
                      className="theme-toggle-checkbox"
                    />
                    <label htmlFor="theme-toggle" className="theme-toggle-label">
                      <span className="theme-toggle-inner"></span>
                      <span className="theme-toggle-switch"></span>
                    </label>
                  </div>
                  <button className='py-2 px-4 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Save</button>
                </div>
              </div>
            </div>
            <div ref={parent} className='w-full rounded-md shadow-gray-400 shadow-md py-4 px-4'>
              <div className='flex justify-between items-center'>
                <span>VAT Settings</span>
                <div className='inline-flex items-center gap-4'>
                  <button onClick={() => { setisVat(!isVat) }} className='py-2 px-4 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Change</button>
                </div>
              </div>
              {
                isVat && (
                  <div className='flex items-center w-full h-auto my-6'>
                    <div className='flex gap-4'>
                      <label>
                        <input type='text' placeholder='Enter Vat in percentage' className='rounded-md' />
                      </label>
                      <button className='py-2 px-4 h-10 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Save</button>
                    </div>
                  </div>
                )
              }
            </div>
            <div ref={parent} className='w-full rounded-md shadow-gray-400 shadow-md py-4 px-4'>
              <div className='flex justify-between items-center'>
                <span>EatoCoins</span>
                <div className='inline-flex items-center gap-4'>
                  <button onClick={() => { setisEtoCoin(!isEtoCoin) }} className='py-2 px-4 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Change</button>
                </div>
              </div>
              {
                isEtoCoin && (
                  <div className='flex items-center w-full h-auto my-6'>
                    <div className='flex gap-4'>
                      <label>
                        <input type='text' placeholder='Enter Max Order price' className='rounded-md' />
                      </label>
                      <label>
                        <input type='text' placeholder='Enter Eatocoins to deduct in %' className='rounded-md' />
                      </label>
                      <span className='w-[2px] h-[40px] bg-black' />
                      <label>
                        <input type='text' placeholder='Enter Min Order price' className='rounded-md' />
                      </label>
                      <label>
                        <input type='text' placeholder='Enter Eatocoins to add in %' className='rounded-md' />
                      </label>
                      <button className='py-2 px-4 h-10 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Save</button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EatofyApp;
