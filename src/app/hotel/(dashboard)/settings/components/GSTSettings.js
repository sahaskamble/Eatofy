'use client';

import { useState, useEffect } from 'react';
import { fetchGSTSettings, updateGSTSettings } from '../api';

export default function GSTSettings() {
  const [gstEnabled, setGstEnabled] = useState(false);
  const [gstNumber, setGstNumber] = useState('');
  const [gstPercentage, setGstPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGSTSettings();
  }, []);

  const loadGSTSettings = async () => {
    try {
      setLoading(true);
      const data = await fetchGSTSettings();
      console.log(data)
      setGstEnabled(data.output.Visibility || false);
      setGstPercentage(data.output.GSTPercent);
    } catch (err) {
      setError('Failed to load GST settings');
      console.error('Error loading GST settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await updateGSTSettings({
        visibility: gstEnabled,
        gst_percent: gstPercentage
      });
      // Show success message or notification here
    } catch (err) {
      setError('Failed to save GST settings');
      console.error('Error saving GST settings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Enable GST</label>
          <p className="text-sm text-gray-500">
            Toggle GST calculations for your restaurant
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={gstEnabled}
            onChange={(e) => setGstEnabled(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
        </label>
      </div>

      <div className="space-y-2">
        <label htmlFor="gstNumber" className="block text-sm font-medium">
          GST Registration Number
        </label>
        <input
          type="text"
          id="gstNumber"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Enter your GST number"
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
          disabled={!gstEnabled}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="gstPercentage" className="block text-sm font-medium">
          GST Percentage
        </label>
        <input
          type="number"
          id="gstPercentage"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Enter GST percentage"
          value={gstPercentage}
          onChange={(e) => setGstPercentage(e.target.value)}
          disabled={!gstEnabled}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:bg-red-300"
      >
        {loading ? 'Saving...' : 'Save GST Settings'}
      </button>
    </div>
  );
} 
