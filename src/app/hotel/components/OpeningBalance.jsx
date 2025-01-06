"use client";

import React, { useState } from 'react'
import { useEffect } from 'react';
import { BiRupee } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

export default function OpeningBalance() {
  const [displayModal, setdisplayModal] = useState(false);
  const [opening_balance, setopening_balance] = useState('');

  const handleSubmit = async (e) => {
    await e.preventDefault();

    if (opening_balance === "") {
      setopening_balance("0")
    }

    try {
      const response = await fetch(`/api/hotel/cash_drawer/opening_balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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

    try {
      const response = await fetch(`/api/hotel/cash_drawer/opening_balance`);
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
      {displayModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-[450px] rounded-xl shadow-2xl transform transition-all">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  Opening Balance Entry
                </h3>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="opening-balance" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Opening Balance <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-lg border border-gray-300 shadow-sm hover:border-gray-400 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500 transition-all">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BiRupee className="text-gray-500" size={20} />
                    </div>
                    <input
                      type="text"
                      id="opening-balance"
                      placeholder="Enter cash amount in drawer"
                      value={opening_balance}
                      required
                      className="block w-full pl-10 pr-3 py-3 text-gray-700 rounded-lg focus:outline-none sm:text-sm"
                      onChange={(e) => setopening_balance(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => setdisplayModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Start Working
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
