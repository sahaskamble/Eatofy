'use client';

import { useState, useEffect } from 'react';
import { fetchPrinterSettings, updatePrinterSettings, fetchKOTSettings, updateKOTSettings } from '../api';

export default function BillKOTSettings() {
  const [settings, setSettings] = useState({
    restaurantName: '',
    showHotelName: true,
    address: '',
    phoneNumber: '',
    footerText: '',
    paperSize: 'thermal',
    autoPrintKOT: true,
    printCustomerCopy: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const [printerData, kotData] = await Promise.all([
        fetchPrinterSettings(),
        fetchKOTSettings()
      ]);

      setSettings({
        restaurantName: printerData.restaurantName || '',
        showHotelName: printerData.showHotelName ?? true,
        address: printerData.address || '',
        phoneNumber: printerData.phoneNumber || '',
        footerText: printerData.footerText || '',
        paperSize: printerData.paperSize || 'thermal',
        autoPrintKOT: kotData.autoPrint ?? true,
        printCustomerCopy: printerData.printCustomerCopy ?? true
      });
    } catch (err) {
      setError('Failed to load printer settings');
      console.error('Error loading printer settings:', err);
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

      // Split settings into printer and KOT settings
      const printerSettings = {
        restaurantName: settings.restaurantName,
        showHotelName: settings.showHotelName,
        address: settings.address,
        phoneNumber: settings.phoneNumber,
        footerText: settings.footerText,
        paperSize: settings.paperSize,
        printCustomerCopy: settings.printCustomerCopy
      };

      const kotSettings = {
        autoPrint: settings.autoPrintKOT
      };

      // Update both settings in parallel
      await Promise.all([
        updatePrinterSettings(printerSettings),
        updateKOTSettings(kotSettings)
      ]);

      // Show success message or notification here
    } catch (err) {
      setError('Failed to save settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !settings.restaurantName) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const BillPreview = () => (
    <div className="bg-white border rounded-lg p-4 w-full max-w-[300px] text-sm space-y-3 shadow-sm">
      <div className="text-center space-y-1">
        {settings.showHotelName && (
          <h3 className="font-bold text-lg">{settings.restaurantName || 'Restaurant Name'}</h3>
        )}
        <p className="text-gray-600 text-xs">{settings.address || 'Restaurant Address'}</p>
        <p className="text-gray-600 text-xs">{settings.phoneNumber || 'Phone Number'}</p>
      </div>

      <div className="border-t border-b py-2 space-y-1">
        <div className="flex justify-between">
          <span>Bill No:</span>
          <span>12345</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Table No:</span>
          <span>T-01</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span>Item</span>
          <div className="flex gap-4">
            <span>Qty</span>
            <span>Amount</span>
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <span>Chicken Biryani</span>
          <div className="flex gap-8">
            <span>1</span>
            <span>₹250</span>
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <span>Butter Naan</span>
          <div className="flex gap-8">
            <span>2</span>
            <span>₹60</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-2 space-y-1">
        <div className="flex justify-between text-xs">
          <span>Subtotal</span>
          <span>₹310</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>GST (5%)</span>
          <span>₹15.50</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹325.50</span>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pt-2 border-t">
        {settings.footerText || 'Thank you for dining with us!'}
      </div>
    </div>
  );

  const KOTPreview = () => (
    <div className="bg-white border rounded-lg p-4 w-full max-w-[300px] text-sm space-y-3 shadow-sm">
      <div className="text-center font-bold border-b pb-2">
        <h3 className="text-lg">KOT</h3>
        <p className="text-xs">Kitchen Order Ticket</p>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>KOT No:</span>
          <span>K-12345</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Time:</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Table:</span>
          <span>T-01</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Waiter:</span>
          <span>John</span>
        </div>
      </div>

      <div className="border-t pt-2 space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span>Item</span>
          <span>Qty</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Chicken Biryani</span>
          <span>1</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Butter Naan</span>
          <span>2</span>
        </div>
      </div>

      <div className="text-xs border-t pt-2">
        <p className="font-medium">Special Instructions:</p>
        <p className="text-gray-600">- Spicy</p>
        <p className="text-gray-600">- No onions</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="restaurantName" className="block text-sm font-medium">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="Enter restaurant name"
            value={settings.restaurantName}
            onChange={(e) => handleChange('restaurantName', e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Show Hotel Name on Bill</label>
            <p className="text-sm text-gray-500">
              Toggle hotel name visibility on printed bills
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.showHotelName}
              onChange={(e) => handleChange('showHotelName', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
          </label>
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <textarea
            id="address"
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="Enter restaurant address"
            value={settings.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="Enter phone number"
            value={settings.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="footerText" className="block text-sm font-medium">
            Bill Footer Text
          </label>
          <textarea
            id="footerText"
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="Enter footer text"
            value={settings.footerText}
            onChange={(e) => handleChange('footerText', e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="paperSize" className="block text-sm font-medium">
              Paper Size
            </label>
            <select
              id="paperSize"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              value={settings.paperSize}
              onChange={(e) => handleChange('paperSize', e.target.value)}
            >
              <option value="thermal">Thermal (80mm)</option>
              <option value="a4">A4</option>
              <option value="a5">A5</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Auto Print KOT</label>
              <p className="text-sm text-gray-500">
                Automatically print KOT when order is placed
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.autoPrintKOT}
                onChange={(e) => handleChange('autoPrintKOT', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Print Customer Copy</label>
              <p className="text-sm text-gray-500">
                Print an additional copy for the customer
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.printCustomerCopy}
                onChange={(e) => handleChange('printCustomerCopy', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:bg-red-300"
        >
          {loading ? 'Saving...' : 'Save Bill & KOT Settings'}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Bill Preview</h3>
          <div className="flex justify-center">
            <BillPreview />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3">KOT Preview</h3>
          <div className="flex justify-center">
            <KOTPreview />
          </div>
        </div>
      </div>
    </div>
  );
} 