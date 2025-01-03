'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaTrash, FaSearch, FaPhone, FaEnvelope, FaBuilding, FaTag, FaEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from 'react-toastify';
import { fetchSuppliers, addSupplier, editSupplier, removeSupplier } from './api';

export default function SupplierManagement() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState([]);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    supplier_id: '',
    supplier_name: '',
    contact: '',
    email: '',
    gstin: '',
    address: '',
    supplier_type: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const data = await fetchSuppliers();
      if (data.returncode === 200) {
        setSuppliers(data.output);
      } else {
        toast.error(data.message || 'Failed to load suppliers');
      }
    } catch (error) {
      toast.error('Error loading suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await addSupplier(formData);
      if (data.returncode === 200) {
        toast.success('Supplier added successfully');
        setShowSupplierForm(false);
        loadSuppliers();
        resetForm();
      } else {
        toast.error(data.message || 'Failed to add supplier');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add supplier');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSupplier = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await editSupplier({
        ...formData,
        supplier_id: editingSupplier._id
      });
      if (data.returncode === 200) {
        toast.success('Supplier updated successfully');
        setShowSupplierForm(false);
        setEditingSupplier(null);
        loadSuppliers();
        resetForm();
      } else {
        toast.error(data.message || 'Failed to update supplier');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update supplier');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;

    setLoading(true);
    try {
      const data = await removeSupplier(supplierId);
      if (data.returncode === 200) {
        toast.success('Supplier deleted successfully');
        loadSuppliers();
      } else {
        toast.error(data.message || 'Failed to delete supplier');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete supplier');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetForm = () => {
    setFormData({
      supplier_id: '',
      supplier_name: '',
      contact: '',
      email: '',
      gstin: '',
      address: '',
      supplier_type: ''
    });
    setEditingSupplier(null);
  };

  const handleCloseForm = () => {
    setShowSupplierForm(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = (supplier) => {
    setEditingSupplier(supplier);
    console.log(supplier);
    setFormData({
      supplier_id: supplier._id,
      supplier_name: supplier.SupplierName,
      contact: supplier.Contact,
      email: supplier.Email,
      gstin: supplier.GSTIN,
      address: supplier.Address,
      supplier_type: supplier.SupplierType
    });
    setShowSupplierForm(true);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.SupplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.Contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Modal Form */}
      {showSupplierForm && (
        <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div
            className="bg-white w-full max-w-xl rounded-lg shadow-lg transform transition-all overflow-hidden"
            style={{
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-all"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <form onSubmit={editingSupplier ? handleEditSupplier : handleAddSupplier} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier Name
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="supplier_name"
                      value={formData.supplier_name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      placeholder="Enter supplier name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier Type
                  </label>
                  <div className="relative">
                    <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="supplier_type"
                      value={formData.supplier_type}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      placeholder="eg; Groceries, Beverages, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                        placeholder="1234567890"
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                    placeholder="Enter GSTIN"
                  // pattern="[0-9A-Z]{15}"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    required
                    placeholder="Enter address"
                    rows="2"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleCloseForm}
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
                    {isLoading ? 'Saving...' : editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoIosArrowBack size={24} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Supplier Management
            </h1>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowSupplierForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
          >
            <FaPlus size={12} />
            Add Supplier
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search suppliers by name or contact..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            ) : filteredSuppliers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gray-50 rounded-full p-3 mb-4">
                  <FaBuilding className="text-gray-400 w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Suppliers Found</h3>
                <p className="text-gray-500 text-sm text-center mb-4">
                  {searchQuery
                    ? "No suppliers match your search criteria"
                    : "Start by adding your first supplier"}
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowSupplierForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                >
                  <FaPlus size={12} />
                  Add Supplier
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">GSTIN</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Address</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSuppliers.map((supplier, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-medium mr-2">
                            {supplier.SupplierName.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-700">{supplier.SupplierName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {supplier.SupplierType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{supplier.Contact}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{supplier.Email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{supplier.GSTIN}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                        {supplier.Address}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(supplier)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteSupplier(supplier._id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
                          >
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

      <style jsx>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(10px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
    </div>
  );
}
