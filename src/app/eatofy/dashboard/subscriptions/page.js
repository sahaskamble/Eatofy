'use client';

import { useEatofyAuth } from '../../contexts/AuthContext';
import EatofyProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSearch } from 'react-icons/fa';
import { fetchSubscriptions, addSubscription, updateSubscription, deactivateSubscription, addHotelSubscription, editSubscriptionPayment, removeSubscription } from './api';

export default function SubscriptionsPage() {
  const { user } = useEatofyAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddToHotelModalOpen, setIsAddToHotelModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [formData, setFormData] = useState({
    subscription_name: '',
    validity: '',
    price: '',
    hotel_id: '',
    subscription_id: '',
    is_valid: '',
    start_date: '',
    end_date: '',
    payment_status: '',
    payment_mode: '',
    cash: '',
    upi: '',
    credit_card: '',
  });
  const [hotelFormData, setHotelFormData] = useState({
    is_valid: '',
    start_date: '',
    end_date: '',
    payment_status: '',
    payment_mode: '',
    cash: '',
    upi: '',
    credit_card: '',
  });
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch subscriptions on component mount
  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await fetchSubscriptions();
      setSubscriptions(data.output || []);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubscription = async (e) => {
    e.preventDefault();
    try {
      await addSubscription({
        subscription_name: formData.subscription_name,
        validity: formData.validity,
        price: formData.price,
      });
      await loadSubscriptions();
      setIsAddModalOpen(false);
      setFormData({
        subscription_name: '',
        validity: '',
        price: '',
      });
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
  };

  const handleAddSubscriptionToHotel = async (e) => {
    e.preventDefault();
    try {
      await addHotelSubscription({
        hotel_id: formData.hotel_id,
        subscription_id: selectedSubscriptionId,
        is_valid: hotelFormData.is_valid,
        start_date: hotelFormData.start_date,
        end_date: hotelFormData.end_date,
        payment_status: hotelFormData.payment_status,
        payment_mode: hotelFormData.payment_mode,
        cash: hotelFormData.cash,
        upi: hotelFormData.upi,
        credit_card: hotelFormData.credit_card,
      });
      await loadSubscriptions();
      setIsAddToHotelModalOpen(false);
      setHotelFormData({
        is_valid: '',
        start_date: '',
        end_date: '',
        payment_status: '',
        payment_mode: '',
        cash: '',
        upi: '',
        credit_card: '',
      });
    } catch (error) {
      console.error('Error adding subscription to hotel:', error);
    }
  };

  const handleEditSubscriptionPayment = async (e) => {
    e.preventDefault();
    try {
      await editSubscriptionPayment({
        hotel_subscription_id: editingSubscription._id,
        payment_status: formData.payment_status,
        payment_mode: formData.payment_mode,
        cash: formData.cash,
        upi: formData.upi,
        credit_card: formData.credit_card,
      });
      await loadSubscriptions();
      setIsEditModalOpen(false);
      setEditingSubscription(null);
      setFormData({
        payment_status: '',
        payment_mode: '',
        cash: '',
        upi: '',
        credit_card: '',
      });
    } catch (error) {
      console.error('Error editing subscription payment:', error);
    }
  };

  const handleRemoveSubscription = async (subscriptionId) => {
    try {
      await removeSubscription(subscriptionId);
      await loadSubscriptions();
    } catch (error) {
      console.error('Error removing subscription:', error);
    }
  };

  const convertToDays = (validity) => {
    const monthDays = 30; // assuming 30 days per month
    const validityNumber = parseInt(validity);
    return validityNumber * monthDays;
  };

  return (
    <EatofyProtectedRoute>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">My Subscriptions</h3>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Add Subscription
          </button>
        </div>
        <div className="space-y-4">
          {subscriptions.map((sub, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors shadow-md">
              <div className="flex items-center">
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">{sub.SubscriptionName}</h4>
                  <p className="text-sm text-gray-600">Validity: {sub.Validity} days</p>
                </div>
              </div>
              <div className="flex space-x-4">
                {/* <button
                  onClick={() => {
                    setEditingSubscription(sub);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Edit Payment
                </button> */}
                <button
                  onClick={() => {
                    setSelectedSubscriptionId(sub._id);
                    setIsAddToHotelModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Add to Hotel
                </button>
                <button
                  onClick={() => handleRemoveSubscription(sub._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Subscription Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Subscription</h2>
              <form onSubmit={handleAddSubscription} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Name</label>
                  <input
                    type="text"
                    name="subscription_name"
                    value={formData.subscription_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter subscription name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Validity</label>
                  <input
                    type="number"
                    name="validity"
                    value={formData.validity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter validity in days"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    Add Subscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Subscription to Hotel Modal */}
        {isAddToHotelModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative max-h-[80vh] overflow-y-auto shadow-lg">
              <button
                onClick={() => setIsAddToHotelModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Subscription to Hotel</h2>
              <form onSubmit={handleAddSubscriptionToHotel} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription ID</label>
                  <select
                    value={selectedSubscriptionId}
                    onChange={(e) => setSelectedSubscriptionId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="" disabled>Select a subscription</option>
                    {subscriptions.map((sub) => (
                      <option key={sub._id} value={sub._id}>{sub.SubscriptionName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Is Valid</label>
                  <input
                    type="text"
                    name="is_valid"
                    value={hotelFormData.is_valid}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, is_valid: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter validity"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={hotelFormData.start_date}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, start_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={hotelFormData.end_date}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, end_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                  <input
                    type="text"
                    name="payment_status"
                    value={hotelFormData.payment_status}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, payment_status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter payment status"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
                  <input
                    type="text"
                    name="payment_mode"
                    value={hotelFormData.payment_mode}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, payment_mode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter payment mode"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cash</label>
                  <input
                    type="number"
                    name="cash"
                    value={hotelFormData.cash}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, cash: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter cash"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UPI</label>
                  <input
                    type="text"
                    name="upi"
                    value={hotelFormData.upi}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, upi: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter UPI"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credit Card</label>
                  <input
                    type="text"
                    name="credit_card"
                    value={hotelFormData.credit_card}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, credit_card: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter credit card"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsAddToHotelModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    Add Subscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Payment Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Subscription Payment</h2>
              <form onSubmit={handleEditSubscriptionPayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                  <input
                    type="text"
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter payment status"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    Edit Subscription Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </EatofyProtectedRoute>
  );
}
