'use client';

import { useState, useEffect } from 'react';
import { fetchHotelProfile, updateHotelProfile } from '../api';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function HotelProfile() {
  const [settings, setSettings] = useState({
    hotelName: '',
    email: '',
    phone: '',
    address: '',
    logo: '',
    website: '',
    cuisineType: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    loadHotelProfile();
  }, []);

  const loadHotelProfile = async () => {
    try {
      setLoading(true);
      const data = await fetchHotelProfile();
      if (data.returncode === 200) {
        const hotelData = {
          hotelName: data?.output?.HotelName || '',
          email: data?.output?.Email || '',
          phone: data?.output?.Contacts ? data.output.Contacts.join(', ') : '',
          address: data?.output?.Address || '',
          logo: data?.output?.Logo || '',
          website: data?.output?.Website || '',
          cuisineType: data?.output?.Speciality ? data.output.Speciality.join(', ') : ''
        };
        setSettings(hotelData);
      } else {
        toast.error(data.message || 'Failed to load hotel profile');
      }
    } catch (err) {
      setError('Failed to load hotel profile');
      console.error('Error loading hotel profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await updateHotelProfile(settings);
      if (data.returncode === 200) {
        toast.success('Hotel profile updated successfully');
      } else {
        toast.error(data.message || 'Failed to update hotel profile');
      }
    } catch (err) {
      setError('Failed to save hotel profile');
      console.error('Error saving hotel profile:', err);
    } finally {
      setLoading(false);
    }
  };

  console.log(settings)

  if (loading && !settings.hotelName) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Hotel Name
          </label>
          <input
            type="text"
            value={settings.hotelName}
            onChange={(e) => handleChange('hotelName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Enter hotel name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            value={settings.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Enter hotel address"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            value={settings.website}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Enter website URL"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Cuisine Type
          </label>
          <input
            type="text"
            value={settings.cuisineType}
            onChange={(e) => handleChange('cuisineType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Enter cuisine type"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:bg-red-300"
      >
        {loading ? 'Saving...' : 'Save Hotel Profile'}
      </button>
    </div>
  );
} 
