'use client';

import { useEatofyAuth } from '../../contexts/AuthContext';
import EatofyProtectedRoute from '../../components/ProtectedRoute';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCloudUploadAlt, FaEye } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';


export default function HotelsPage() {
  const { hotels, loading, fetchHotelData } = useEatofyAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    hotel_name: '',
    email: '',
    address: '',
    speciality: '',
    contacts: '',
    website: '',
    fssai_code: '',
    gstin: '',
    logo: null,
    // Owner Account Fields
    first_name: '',
    last_name: '',
    owner_address: '',
    owner_contact: '',
    password: '',
    department_name: '',
    designation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      const res = await fetch('/api/eatofy/hotel/add', {
        method: 'POST',
        body: submitData
      });

      if (res.ok) {
        // Refresh the hotels data
        await fetchHotelData();
        
        // Reset form and close modal
        setIsModalOpen(false);
        setFormData({
          hotel_name: '',
          email: '',
          address: '',
          speciality: '',
          contacts: '',
          website: '',
          fssai_code: '',
          gstin: '',
          logo: null,
          first_name: '',
          last_name: '',
          owner_address: '',
          owner_contact: '',
          password: '',
          department_name: '',
          designation: ''
        });
        setSelectedImage(null);
        
        alert('Hotel saved successfully');
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save hotel');
      }
    } catch (error) {
      console.error('Failed to save hotel:', error);
      alert(error.message || 'Failed to save hotel');
    }
  };


  const handleDelete = async (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        const res = await fetch(`/api/eatofy/hotel/remove/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hotel_id: hotelId })
        });

        if (res.ok) {
          await fetchHotelData();
          alert('Hotel deleted successfully');
        } else {
          throw new Error('Failed to delete hotel');
        }
      } catch (error) {
        console.error('Failed to delete hotel:', error);
        alert('Failed to delete hotel');
        await fetchHotelData();
      }
    }
  };

  console.log(hotels);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <EatofyProtectedRoute>
      <div className="bg-gray-200 h-auto rounded-xl">
        <div className="container mx-auto p-0 rounded-xl">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Hotels</h1>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <FaPlus /> Add Hotel
              </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Hotel</h2>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Logo Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hotel Logo
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {selectedImage ? (
                              <div className="flex flex-col items-center">
                                <div className="relative w-32 h-32 mb-4">
                                  <Image
                                    src={selectedImage}
                                    alt="Preview"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedImage(null);
                                    setFormData(prev => ({ ...prev, logo: null }));
                                  }}
                                  className="text-sm text-red-600 hover:text-red-700"
                                >
                                  Remove Image
                                </button>
                              </div>
                            ) : (
                              <>
                                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                  <label htmlFor="logo" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                                    <span>Upload a file</span>
                                    <input
                                      id="logo"
                                      name="logo"
                                      type="file"
                                      accept="image/*"
                                      className="sr-only"
                                      onChange={handleLogoChange}
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hotel Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hotel Name
                        </label>
                        <input
                          type="text"
                          name="hotel_name"
                          value={formData.hotel_name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          required
                        />
                      </div>

                      {/* Address */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          required
                        ></textarea>
                      </div>

                      {/* Speciality */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Speciality
                        </label>
                        <input
                          type="text"
                          name="speciality"
                          value={formData.speciality}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          required
                        />
                      </div>

                      {/* Contact */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          name="contacts"
                          value={formData.contacts}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          required
                        />
                      </div>

                      {/* Website */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          placeholder="https://"
                          required
                        />
                      </div>

                      {/* FSSAI Code */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          FSSAI Code
                        </label>
                        <input
                          type="text"
                          name="fssai_code"
                          value={formData.fssai_code}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          required
                        />
                      </div>

                      {/* GSTIN */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          GSTIN
                        </label>
                        <input
                          type="text"
                          name="gstin"
                          value={formData.gstin}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Owner Account Section */}
                    <div className="md:col-span-2 mt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Owner Account Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                          />
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                          />
                        </div>

                        {/* Owner Address */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Owner Address
                          </label>
                          <textarea
                            name="owner_address"
                            value={formData.owner_address}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                          />
                        </div>

                        {/* Owner Contact */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Number
                          </label>
                          <input
                            type="tel"
                            name="owner_contact"
                            value={formData.owner_contact}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                          />
                        </div>

                        {/* Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                          />
                        </div>

                        {/* Department Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                          </label>
                          <input
                            type="text"
                            name="department_name"
                            value={formData.department_name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                          />
                        </div>

                        {/* Designation */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Designation
                          </label>
                          <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Save Hotel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr no</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {hotels?.map((hotel, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{index + 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={`data:image/*;base64,${hotel?.Logo}` || ''} 
                              alt={hotel?.HotelName}
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{hotel?.HotelName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[60dvh] whitespace-nowrap">
                        <div className="text-sm overflow-hidden text-wrap text-gray-700">{hotel?.Address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{hotel?.Contacts[0]}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-all duration-200 group relative"
                          >
                            <FaEye size={18} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              View Details
                            </span>
                          </button>
                          <button 
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-200 group relative"
                          >
                            <FaEdit size={18} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Edit Hotel
                            </span>
                          </button>
                          <button 
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200 group relative"
                            onClick={() => handleDelete(hotel._id)}
                          >
                            <FaTrash size={18} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Delete Hotel
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </EatofyProtectedRoute>
  );
}
