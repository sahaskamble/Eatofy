"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchStaff, addStaff, editStaff, removeStaff } from './api';

const StaffManagementPage = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    salary: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    setLoading(true);
    try {
      const data = await fetchStaff();
      if (data.returncode === 200) {
        setStaff(data.output);
      } else {
        toast.error(data.message || 'Failed to load staff');
      }
    } catch (error) {
      toast.error('Error loading staff');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateStaff();
    } else {
      await createStaff();
    }
    setFormData({
      name: '',
      position: '',
      salary: 0,
    });
    setIsOpenPopup(false);
  };

  const createStaff = async () => {
    try {
      const response = await addStaff(formData);
      if (response.returncode === 200) {
        toast.success('Staff added successfully');
        loadStaff();
      } else {
        toast.error(response.message || 'Failed to add staff');
      }
    } catch (error) {
      toast.error('Error adding staff');
    }
  };

  const updateStaff = async () => {
    try {
      const response = await editStaff(editingId, formData);
      if (response.returncode === 200) {
        toast.success('Staff updated successfully');
        loadStaff();
      } else {
        toast.error(response.message || 'Failed to update staff');
      }
    } catch (error) {
      toast.error('Error updating staff');
    }
  };

  const handleEdit = (staffMember) => {
    setEditingId(staffMember._id);
    setFormData({
      name: staffMember.name,
      position: staffMember.position,
      salary: staffMember.salary,
    });
    setIsOpenPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const response = await removeStaff(id);
        if (response.returncode === 200) {
          toast.success('Staff deleted successfully');
          loadStaff();
        } else {
          toast.error(response.message || 'Failed to delete staff');
        }
      } catch (error) {
        toast.error('Error deleting staff');
      }
    }
  };

  const StaffPopup = () => {
    return (
      <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white w-96 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Staff' : 'Add Staff'}</h2>
          <button onClick={() => setIsOpenPopup(false)} className="text-red-500 float-right">Close</button>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="text" placeholder="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="number" placeholder="Salary" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })} required className="border p-2 rounded mb-4 w-full" />
            <button type="submit" className="bg-red-500 text-white p-2 rounded">{editingId ? 'Update Staff' : 'Add Staff'}</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 pt-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <button onClick={() => setIsOpenPopup(true)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Add Staff</button>
      </div>
      {isOpenPopup && <StaffPopup />}
      {loading ? (
        <p>Loading staff...</p>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staff.map(member => (
                    <tr key={member._id}>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{member.position}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{member.salary}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        <button onClick={() => handleEdit(member)} className="text-blue-500 mr-2">Edit</button>
                        <button onClick={() => handleDelete(member._id)} className="text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagementPage;