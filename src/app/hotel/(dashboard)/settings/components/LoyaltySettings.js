'use client';

import { useState, useEffect } from 'react';
import { fetchLoyaltySettings, updateLoyaltySettings } from '../api';

export default function LoyaltySettings() {
  const [settings, setSettings] = useState({
    enabled: false,
    pointsPerCurrency: '1',
    minimumPointsRedeem: '100',
    pointsValue: '0.1',
    expiryDays: '365',
    rewardType: 'points',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await fetchLoyaltySettings();
      setSettings({
        enabled: data.enabled ?? false,
        pointsPerCurrency: data.pointsPerCurrency || '1',
        minimumPointsRedeem: data.minimumPointsRedeem || '100',
        pointsValue: data.pointsValue || '0.1',
        expiryDays: data.expiryDays || '365',
        rewardType: data.rewardType || 'points',
      });
    } catch (err) {
      setError('Failed to load loyalty settings');
      console.error('Error loading loyalty settings:', err);
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
      await updateLoyaltySettings(settings);
      // Show success message or notification here
    } catch (err) {
      setError('Failed to save loyalty settings');
      console.error('Error saving loyalty settings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !settings.rewardType) {
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
          <label className="text-sm font-medium">Enable Loyalty Program</label>
          <p className="text-sm text-gray-500">
            Activate loyalty rewards for your customers
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={settings.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
        </label>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="rewardType" className="block text-sm font-medium">
            Reward Type
          </label>
          <select
            id="rewardType"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
            value={settings.rewardType}
            onChange={(e) => handleChange('rewardType', e.target.value)}
            disabled={!settings.enabled}
          >
            <option value="points">Points Based</option>
            <option value="cashback">Cashback</option>
            <option value="tier">Tier Based</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="pointsPerCurrency" className="block text-sm font-medium">
            Points per Currency Unit
          </label>
          <input
            type="number"
            id="pointsPerCurrency"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
            placeholder="Enter points per currency unit"
            value={settings.pointsPerCurrency}
            onChange={(e) => handleChange('pointsPerCurrency', e.target.value)}
            disabled={!settings.enabled}
          />
          <p className="text-sm text-gray-500">
            Number of points earned per currency unit spent
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="minimumPointsRedeem" className="block text-sm font-medium">
            Minimum Points for Redemption
          </label>
          <input
            type="number"
            id="minimumPointsRedeem"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
            placeholder="Enter minimum points"
            value={settings.minimumPointsRedeem}
            onChange={(e) => handleChange('minimumPointsRedeem', e.target.value)}
            disabled={!settings.enabled}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pointsValue" className="block text-sm font-medium">
            Points Value
          </label>
          <input
            type="number"
            id="pointsValue"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
            placeholder="Enter points value"
            value={settings.pointsValue}
            onChange={(e) => handleChange('pointsValue', e.target.value)}
            disabled={!settings.enabled}
          />
          <p className="text-sm text-gray-500">
            Currency value of each point when redeemed
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="expiryDays" className="block text-sm font-medium">
            Points Expiry (Days)
          </label>
          <input
            type="number"
            id="expiryDays"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
            placeholder="Enter days until points expire"
            value={settings.expiryDays}
            onChange={(e) => handleChange('expiryDays', e.target.value)}
            disabled={!settings.enabled}
          />
          <p className="text-sm text-gray-500">
            Number of days before earned points expire
          </p>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading || !settings.enabled}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Save Loyalty Settings'}
      </button>
    </div>
  );
} 