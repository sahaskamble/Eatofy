'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaTrash, FaSearch, FaUser, FaPhone, FaEnvelope, FaEdit, FaBirthdayCake, FaHeart, FaCoins } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from 'react-toastify';

export default function CustomerRelationship() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    customer_name: '',
    contact: '',
    email: '',
    birthday: '',
    anniversary: '',
    apartment: '',
    street_address: '',
    landmark: '',
    city: '',
    state: '',
    zip_code: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hotel/customers/fetch', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.returncode === 200) {
        setCustomers(data.output);
      } else {
        toast.error(data.message || 'Failed to load customers');
      }
    } catch (error) {
      toast.error('Error loading customers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/hotel/customers/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Customer added successfully');
        setShowCustomerForm(false);
        loadCustomers();
        resetForm();
      } else {
        toast.error(data.message || 'Failed to add customer');
      }
    } catch (error) {
      toast.error('Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/hotel/customers/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, customer_id: editingCustomer._id })
      });
      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Customer updated successfully');
        setShowCustomerForm(false);
        setEditingCustomer(null);
        loadCustomers();
        resetForm();
      } else {
        toast.error(data.message || 'Failed to update customer');
      }
    } catch (error) {
      toast.error('Failed to update customer');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    setLoading(true);
    try {
      const response = await fetch('/api/hotel/customers/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: customerId })
      });
      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Customer deleted successfully');
        loadCustomers();
      } else {
        toast.error(data.message || 'Failed to delete customer');
      }
    } catch (error) {
      toast.error('Failed to delete customer');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      contact: '',
      email: '',
      birthday: '',
      anniversary: '',
      apartment: '',
      street_address: '',
      landmark: '',
      city: '',
      state: '',
      zip_code: ''
    });
    setEditingCustomer(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      customer_name: customer.CustomerName,
      contact: customer.Contact || '',
      email: customer.Email || '',
      birthday: customer.Birthday || '',
      anniversary: customer.Anniversary || '',
      apartment: customer.Apartment || '',
      street_address: customer.StreetAddress || '',
      landmark: customer.Landmark || '',
      city: customer.City || '',
      state: customer.State || '',
      zip_code: customer.ZipCode || ''
    });
    setShowCustomerForm(true);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.Contact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.Email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {showCustomerForm && (
        <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg transform transition-all overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h2>
                <button onClick={() => { setShowCustomerForm(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-all">
                  <FaTimes size={20} />
                </button>
              </div>
              <form onSubmit={editingCustomer ? handleEditCustomer : handleAddCustomer} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="customer_name" value={formData.customer_name} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" required placeholder="Enter customer name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" placeholder="1234567890" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" placeholder="Enter email" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                    <div className="relative">
                      <FaBirthdayCake className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Anniversary</label>
                    <div className="relative">
                      <FaHeart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="date" name="anniversary" value={formData.anniversary} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apartment</label>
                    <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" placeholder="Apt/Suite/Unit" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input type="text" name="street_address" value={formData.street_address} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" placeholder="Street address" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" placeholder="State" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input type="text" name="zip_code" value={formData.zip_code} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" placeholder="Zip code" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                  <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" placeholder="Nearby landmark" />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button type="button" onClick={() => { setShowCustomerForm(false); resetForm(); }} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium" disabled={isLoading}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium disabled:bg-red-300" disabled={isLoading}>
                    {isLoading ? 'Saving...' : editingCustomer ? 'Update Customer' : 'Add Customer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <IoIosArrowBack size={24} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Customer Relationship</h1>
          </div>
          <button onClick={() => { resetForm(); setShowCustomerForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm">
            <FaPlus size={12} />Add Customer
          </button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-xl">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search customers by name, contact, or email..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gray-50 rounded-full p-3 mb-4">
                  <FaUser className="text-gray-400 w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Customers Found</h3>
                <p className="text-gray-500 text-sm text-center mb-4">
                  {searchQuery ? "No customers match your search criteria" : "Start by adding your first customer"}
                </p>
                <button onClick={() => { resetForm(); setShowCustomerForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm">
                  <FaPlus size={12} />Add Customer
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Eatocoins</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Special Dates</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCustomers.map((customer, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-medium mr-2">
                            {customer.CustomerName?.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-700">{customer.CustomerName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{customer.Contact || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{customer.Email || '-'}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <FaCoins className="text-yellow-500 mr-1" size={12} />
                          <span className="text-sm text-gray-600">{customer.EatocoinsWallet || 0}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <div className="space-y-1">
                          {customer.Birthday && <div className="flex items-center"><FaBirthdayCake className="text-pink-500 mr-1" size={10} /><span className="text-xs">Birthday: {customer.Birthday}</span></div>}
                          {customer.Anniversary && <div className="flex items-center"><FaHeart className="text-red-500 mr-1" size={10} /><span className="text-xs">Anniversary: {customer.Anniversary}</span></div>}
                          {!customer.Birthday && !customer.Anniversary && '-'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEditClick(customer)} className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors">
                            <FaEdit size={14} />
                          </button>
                          <button onClick={() => handleDeleteCustomer(customer._id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors">
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}