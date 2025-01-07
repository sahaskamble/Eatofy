"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchAttendance, addAttendance, editAttendance, removeAttendance } from './api';

const StaffAttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    staff_name: '',
    date: '',
    status: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const data = await fetchAttendance();
      if (data.returncode === 200) {
        setAttendance(data.output);
      } else {
        toast.error(data.message || 'Failed to load attendance');
      }
    } catch (error) {
      toast.error('Error loading attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateAttendance();
    } else {
      await createAttendance();
    }
    setFormData({
      staff_name: '',
      date: '',
      status: '',
    });
    setIsOpenPopup(false);
  };

  const createAttendance = async () => {
    try {
      const response = await addAttendance(formData);
      if (response.returncode === 200) {
        toast.success('Attendance added successfully');
        loadAttendance();
      } else {
        toast.error(response.message || 'Failed to add attendance');
      }
    } catch (error) {
      toast.error('Error adding attendance');
    }
  };

  const updateAttendance = async () => {
    try {
      const response = await editAttendance(editingId, formData);
      if (response.returncode === 200) {
        toast.success('Attendance updated successfully');
        loadAttendance();
      } else {
        toast.error(response.message || 'Failed to update attendance');
      }
    } catch (error) {
      toast.error('Error updating attendance');
    }
  };

  const handleEdit = (attendanceRecord) => {
    setEditingId(attendanceRecord._id);
    setFormData({
      staff_name: attendanceRecord.staff_name,
      date: attendanceRecord.date,
      status: attendanceRecord.status,
    });
    setIsOpenPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        const response = await removeAttendance(id);
        if (response.returncode === 200) {
          toast.success('Attendance deleted successfully');
          loadAttendance();
        } else {
          toast.error(response.message || 'Failed to delete attendance');
        }
      } catch (error) {
        toast.error('Error deleting attendance');
      }
    }
  };

  const AttendancePopup = () => {
    return (
      <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white w-96 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Attendance' : 'Add Attendance'}</h2>
          <button onClick={() => setIsOpenPopup(false)} className="text-red-500 float-right">Close</button>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Staff Name" value={formData.staff_name} onChange={(e) => setFormData({ ...formData, staff_name: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="date" placeholder="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} required className="border p-2 rounded mb-4 w-full">
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            <button type="submit" className="bg-red-500 text-white p-2 rounded">{editingId ? 'Update Attendance' : 'Add Attendance'}</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 pt-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Staff Attendance</h1>
        <button onClick={() => setIsOpenPopup(true)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Add Attendance</button>
      </div>
      {isOpenPopup && <AttendancePopup />}
      {loading ? (
        <p>Loading attendance...</p>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendance.map(record => (
                    <tr key={record._id}>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{record.staff_name}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{record.date}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{record.status}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        <button onClick={() => handleEdit(record)} className="text-blue-500 mr-2">Edit</button>
                        <button onClick={() => handleDelete(record._id)} className="text-red-500">Delete</button>
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

export default StaffAttendancePage;