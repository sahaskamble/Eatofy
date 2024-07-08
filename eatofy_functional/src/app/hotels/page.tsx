"use client"
import React, { useState } from 'react';

const Widget: React.FC = () => {
  
    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            
            <div className={`flex-1 w-screen bg-gradient-to-r from-red-500 to-zinc-800 p-8 transition-margin duration-300 flex items-center justify-center`}>
                <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-3xl">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white">Hotel Name</label>
                            <input type="text" className="w-full p-2 bg-zinc-700 text-white rounded" />
                        </div>
                        <div>
                            <label className="block text-white">Email</label>
                            <input type="email" className="w-full p-2 bg-zinc-700 text-white rounded" />
                        </div>
                        <div>
                            <label className="block text-white">Password</label>
                            <input type="password" className="w-full p-2 bg-zinc-700 text-white rounded" />
                        </div>
                        <div>
                            <label className="block text-white">Address</label>
                            <input type="text" className="w-full p-2 bg-zinc-700 text-white rounded" />
                        </div>
                        <div>
                            <label className="block text-white">Address</label>
                            <input type="text" className="w-full p-2 bg-zinc-700 text-white rounded" />
                        </div>
                        <div>
                            <label className="block text-white">Contact</label>
                            <input type="text" className="w-full p-2 bg-zinc-700 text-white rounded" />
                        </div>
                        <div>
                            <label className="block text-white">Contact</label>
                            <input type="text" className="w-full p-2 bg-zinc-700 text-white rounded" />
                        </div>
                        <div>
                            <label className="block text-white">Hotel Logo (Images)</label>
                            <input type="file" className="w-full p-2 bg-zinc-700 text-white rounded" />
                        </div>
                        <div className="col-span-1 md:col-span-2 flex justify-between mt-4">
                            <button type="button" className="bg-red-500 text-white px-4 py-2 rounded">Back</button>
                            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Add Hotel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Widget;
