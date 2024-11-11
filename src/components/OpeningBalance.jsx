"use client";

import { ApiHost } from '@/constants/url_consts';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { BiRupee } from 'react-icons/bi';

export default function OpeningBalance() {
  const [displayModal, setdisplayModal] = useState(false);
  const [opening_balance, setopening_balance] = useState('');

  const handleSubmit = async (e) => {
    await e.preventDefault();

    const hotel_id = localStorage.getItem("hotel_id");

    if (opening_balance === "") {
      setopening_balance("0")
    }

    try {
      const response = await fetch(`${ApiHost}/api/hotel/cash_drawer/opening_balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotel_id,
          opening_balance: parseInt(opening_balance) || 0
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setdisplayModal(false);
        location.reload();
      }
      else {
        setdisplayModal(true);
      }

    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  }

  const check_opening_balance = async () => {

    const hotel_id = localStorage.getItem("hotel_id");

    try {
      const response = await fetch(`${ApiHost}/api/hotel/cash_drawer/opening_balance/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotel_id
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setdisplayModal(false);
      }
      else {
        setdisplayModal(true);
      }

    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  }

  useEffect(() => {
    check_opening_balance();
  }, []);

  return (
    <>
      {
        displayModal && (
          <div className="fixed top-0 left-0 w-full h-dvh bg-black bg-opacity-55 flex justify-center items-center backdrop-blur-sm">
            <div className='w-[450px] h-[260px] bg-white p-2 relative rounded-lg'>
              <div className='absolute flex justify-between items-center z-0 top-0 left-0 w-full h-[60px] rounded-lg pl-8'>
                <h3 className='text-2xl font-bold text-red-500'> Opening Balance (Galla Entry) </h3>
              </div>
              <form className="h-full w-full flex justify-center items-center flex-col" onSubmit={handleSubmit}>
                <div className="w-full flex justify-evenly items-start rounded-lg p-4">
                  <div className='w-full'>
                    <div className='p-2 w-full flex flex-col gap-2'>
                      <label htmlFor="customer">Opening Balance<span className="text-red-500 text-lg">*</span></label>
                      <div className='border-2 border-zinc-500 rounded-lg flex px-2 items-center'>
                        <div className='border-r-2 border-zinc-500 py-1'>
                          <BiRupee size={25} />
                        </div>
                        <input
                          type="text"
                          placeholder="Please enter cash amount in your Drawer(Galla)"
                          value={opening_balance}
                          required
                          className="w-full text-sm outline-none border-none"
                          onChange={(e) => {
                            setopening_balance(`${e.target.value}`)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full px-5 flex gap-4 justify-end mt-4'>
                  <button type='submit' className="bg-red-500 text-white p-2 font-bold rounded-lg">Start Working</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  )
}

