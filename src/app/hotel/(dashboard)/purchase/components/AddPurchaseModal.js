'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addPurchase, fetchItems } from '../../inventory/api';
import { fetchSuppliers } from '../../supplier_management/api';

export default function AddPurchaseModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    invoice_no: '',
    payment_mode: 'Cash',
    payment_status: 'Paid',
    amount_paid: 0,
    balance_amount: 0,
    supplier_id: '',
    invoice_date: '',
    cash: 0,
    upi: 0,
    credit_card: 0,
    stock_data: []
  });

  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSuppliers();
    loadItems();

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  const loadSuppliers = async () => {
    try {
      const data = await fetchSuppliers();
      if (data.returncode === 200) {
        setSuppliers(data.output);
      } else {
        toast.error(data.message || 'Failed to load suppliers');
      }
    } catch (error) {
      toast.error('Error loading suppliers');
      console.error('Error:', error);
    }
  };


  const loadItems = async () => {
    try {
      const data = await fetchItems();
      if (data.returncode === 200) {
        setItems(data.output);
        console.log(data)
      } else {
        toast.error(data.message || 'Failed to load items');
      }
    } catch (error) {
      toast.error('Error loading items');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await addPurchase(formData);
      if (data.returncode === 200) {
        toast.success('Purchase added successfully');
        onSuccess();
      } else {
        toast.error(data.message || 'Failed to add purchase');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add purchase');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name',name);
    console.log('Value',value);
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount_paid' ? parseFloat(value) || 0 : value,
      ...(name === 'amount_paid' && {
        [prev.payment_mode.toLowerCase()]: parseFloat(value) || 0,
        balance_amount: 0
      })
    }));
  };

  const addStockItem = () => {
    setFormData(prev => ({
      ...prev,
      stock_data: [...prev.stock_data, {
        item_id: '',
        quantity: 0,
        per_price: 0,
        total_price: 0
      }]
    }));
  };

  const removeStockItem = (index) => {
    setFormData(prev => ({
      ...prev,
      stock_data: prev.stock_data.filter((_, i) => i !== index)
    }));
  };

  const updateStockItem = (index, field, value) => {
    setFormData(prev => {
      const newStockData = [...prev.stock_data];
      newStockData[index] = {
        ...newStockData[index],
        [field]: field === 'item_id' ? value : parseFloat(value) || 0,
        ...(field === 'item_id' && {
          unit: items.find(item => item.id === value)?.Unit || ''
        }),
        ...(field === 'quantity' || field === 'per_price' ? {
          total_price: (
            parseFloat(field === 'quantity' ? value : newStockData[index].quantity || 0) *
            parseFloat(field === 'per_price' ? value : newStockData[index].per_price || 0)
          )
        } : {})
      };

      // Calculate total amount as number
      const totalAmount = newStockData.reduce((sum, item) => sum + (item.total_price || 0), 0);

      return {
        ...prev,
        stock_data: newStockData,
        amount_paid: totalAmount,
        [prev.payment_mode.toLowerCase()]: totalAmount
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Purchase
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-all"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    name="invoice_no"
                    value={formData.invoice_no}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    name="invoice_date"
                    value={formData.invoice_date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                  </label>
                  <select
                    name="supplier_id"
                    value={formData.supplier_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier, index) => (
                      <option key={index} value={supplier._id}>
                        {supplier.SupplierName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  >
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Mode
                  </label>
                  <select
                    name="payment_mode"
                    value={formData.payment_mode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit_Card">Credit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount Paid
                  </label>
                  <input
                    type="number"
                    name="amount_paid"
                    value={formData.amount_paid}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Stock Items */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Stock Items</h3>
                <button
                  type="button"
                  onClick={addStockItem}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                  <FaPlus size={12} />
                  Add Item
                </button>
              </div>

              {formData.stock_data.map((item, index) => (
                <div key={index} className="grid grid-cols-6 gap-3 items-end mb-4 p-3 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item
                    </label>
                    <select
                      value={item.item_id}
                      onChange={(e) => updateStockItem(index, 'item_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                      required
                    >
                      <option value="">Select Item</option>
                      {items.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.ItemName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateStockItem(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                      required
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price/Unit
                    </label>
                    <input
                      type="number"
                      value={item.per_price}
                      onChange={(e) => updateStockItem(index, 'per_price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                      required
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total
                    </label>
                    <input
                      type="number"
                      value={item.total_price}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeStockItem(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium disabled:bg-red-300"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Purchase'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
