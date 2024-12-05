'use client';

import { useEatofyAuth } from '../../contexts/AuthContext';
import EatofyProtectedRoute from '../../components/ProtectedRoute';
import { useState } from 'react';
import { FaSearch, FaPlus, FaHotel, FaTimes } from 'react-icons/fa';

export default function SubscriptionsPage() {
  const { user, dashboard } = useEatofyAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    validity: '',
    price: ''
  });

  const currentDate = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const activeSubscriptions = [
    {
      id: 1,
      name: 'Sahas Hotel',
      type: 'Monthly Subscription',
      status: 'Due today!',
      avatar: '🏨'
    },
    {
      id: 2,
      name: 'Shashank Hotel',
      type: 'Annual Payment',
      status: 'Due tomorrow',
      avatar: '🏨'
    },
    {
      id: 3,
      name: 'John Hotel',
      type: 'Set payment reminder',
      status: 'Due today',
      avatar: '🏨'
    }
  ];

  const upcomingPayments = [
    {
      day: 2,
      title: 'Subscription renewal alert',
      time: '10:00-11:30',
      details: '3 of 4 payments, Recharge'
    },
    {
      day: 8,
      title: 'Payment Due',
      time: '11:00-12:30',
      details: '3 of 4 payments, Electricity'
    },
    {
      day: 11,
      title: 'Subscription upgrade',
      time: '10:00-11:30',
      details: '1 of 2 upgrades, Phone'
    },
    {
      day: 23,
      title: 'Bill payment alert',
      time: '10:00-11:30',
      details: '2 of 4 payments, Tuition fees'
    },
    {
      day: 27,
      title: 'Subscription Due',
      time: '10:00-11:30',
      details: '1 of 4 payments, Water Bill'
    }
  ];

  const convertToDays = (validity) => {
    const monthDays = 30; // assuming 30 days per month
    const validityNumber = parseInt(validity);
    return validityNumber * monthDays;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Convert validity to days
      const validityInDays = convertToDays(formData.validity);

      // Prepare data for backend
      const subscriptionData = {
        subscription_name: formData.name,
        validity: validityInDays,
        price: parseFloat(formData.price)
      };

      // Add your subscription logic here
      const res = await fetch('/api/eatofy/subscription/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData)
      });

      if (res.ok) {
        // Refresh the subscriptions data
        // await fetchSubscriptions();

        console.log('Form submitted:', subscriptionData);
        // Reset form and close modal
        setIsModalOpen(false);
        setFormData({
          name: '',
          validity: '',
          price: ''
        });
        alert('Subscription added successfully!');
      } else {
        console.error('Failed to add subscription');
      }

    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Failed to add subscription');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <EatofyProtectedRoute>
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Date Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search for subscriptions, payouts, and reminders"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="ml-4 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold">
              {currentDate.getDate()} {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Get Started Section */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Get started with SubsManage</h2>
                    <p className="text-gray-600 mt-2">View, progress and manage subscription efficiently</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    Add Subscription
                  </button>
                </div>
              </div>

              {/* Active Subscriptions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  My subscriptions <span className="text-gray-500">({activeSubscriptions.length} active)</span>
                </h3>
                <div className="space-y-4">
                  {activeSubscriptions.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full text-xl">
                          {sub.avatar}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-800">{sub.name}</h4>
                          <p className="text-sm text-gray-600">{sub.type}</p>
                        </div>
                      </div>
                      <span className="text-red-500 font-medium">{sub.status}</span>
                    </div>
                  ))}
                  <button className="w-full py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors">
                    View all subscriptions
                  </button>
                </div>
              </div>

              {/* Annual Subscriptions Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Annual Subscriptions</h3>
                <div className="h-64 bg-gray-50 rounded-xl p-4">
                  {/* Add your chart component here */}
                  <div className="text-center text-gray-500 mt-20">
                    Subscription analytics chart will be displayed here
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Current Month Overview */}
              {/* <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Month Overview</h3>
                <div className="flex justify-between items-center overflow-scroll">
                  {months.slice(0, 9).map((month, index) => (
                    <div key={month} className={`text-center ${index === currentDate.getMonth() ? 'bg-red-500 text-white' : 'text-gray-600'} rounded-lg p-2`}>
                      <div className="text-sm">{month}</div>
                      <div className="font-semibold">{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Upcoming Payments */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming payment this month</h3>
                <div className="space-y-4">
                  {upcomingPayments.map((payment, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full font-semibold text-gray-700">
                        {payment.day}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{payment.title}</h4>
                        <p className="text-sm text-gray-600">{payment.details}</p>
                      </div>
                      <div className="text-sm text-gray-500">{payment.time}</div>
                    </div>
                  ))}
                  <button className="w-full py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors">
                    View full list
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Subscription</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter subscription name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription Validity
                </label>
                <select
                  name="validity"
                  value={formData.validity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select validity period</option>
                  <option value="1">1 Month (30 days)</option>
                  <option value="3">3 Months (90 days)</option>
                  <option value="6">6 Months (180 days)</option>
                  <option value="12">1 Year (360 days)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter price"
                  min="0"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
    </EatofyProtectedRoute>
  );
}
