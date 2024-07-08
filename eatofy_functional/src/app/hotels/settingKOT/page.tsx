"use client"
import React, { useState } from 'react';

interface Staff {
  id: number;
  name: string;
  time: string;
  type: string;
  phone: string;
  status: string;
}

const StaffTable: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([
    { id: 1, name: "Ritesh", time: "8:15 AM", type: "Waiter", phone: "703594556", status: "Active" },
    { id: 2, name: "Harsh", time: "9:00 AM", type: "Cashier", phone: "703594556", status: "Inactive" },
    { id: 3, name: "Ayan", time: "7:01 AM", type: "Cashier", phone: "703594556", status: "Active" },
    { id: 4, name: "Ganesh", time: "8:15 AM", type: "Waiter", phone: "703594556", status: "Active" },
    { id: 5, name: "Himanshi", time: "10:20 AM", type: "Waiter", phone: "703594556", status: "Active" },
    { id: 6, name: "Shashank", time: "9:15 PM", type: "Waiter", phone: "703594556", status: "Inactive" },
    { id: 7, name: "Yanush", time: "8:00 PM", type: "Cashier", phone: "703594556", status: "Active" },
    { id: 8, name: "Shaks", time: "8:15 PM", type: "Waiter", phone: "703594556", status: "Inactive" },
  ]);

  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    type: "",
    phone: "",
    status: "Active",
  });

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff = {
      id: staffList.length + 1,
      ...formData,
    };
    setStaffList([...staffList, newStaff]);
    setFormData({ name: "", time: "", type: "", phone: "", status: "Active" });
    setFormVisible(false);
  };

  return (
    <div className="flex-1 h-screen p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-red-500 text-2xl font-bold">EATOFY</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for food, coffee, etc.."
            className="border rounded-full px-4 py-2"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <img src="https://placehold.co/16x16" alt="search icon" />
          </button>
        </div>
      </div>
      <h2 className="text-red-500 text-xl mb-4">Staff</h2>

      <div className="flex space-x-4 mb-4">
        <button className="bg-zinc-800 text-white px-4 py-2 rounded">Staff</button>
        <button 
          className="bg-zinc-800 text-white px-4 py-2 rounded"
          onClick={toggleFormVisibility}
        >
          Staff Add +
        </button>
      </div>

      <div className="flex">
        <div className="flex-1">
          <table className="min-w-full text-black border-collapse">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="border px-4 py-2">SR#</th>
                <th className="border px-4 py-2">Staff Name</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Phone No</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={staff.id} className={index % 2 === 0 ? "bg-zinc-200" : ""}>
                  <td className="border px-4 py-2">{staff.id}</td>
                  <td className="border px-4 py-2">{staff.name}</td>
                  <td className="border px-4 py-2">{staff.time}</td>
                  <td className="border px-4 py-2">{staff.type}</td>
                  <td className="border px-4 py-2">{staff.phone}</td>
                  <td className={`border px-4 py-2 ${staff.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                    {staff.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isFormVisible && (
          <div className="w-1/3 p-4 border-l">
            <h3 className="text-lg font-bold mb-4 text-red-500">Add New Staff</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-black">Staff Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 text-black w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-black">Time</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 text-black w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-black">Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 text-black w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-black">Phone No</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 text-black w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="border rounded bg-slate-800 px-4 py-2 w-full"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded w-full">
                Add Staff
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffTable;
