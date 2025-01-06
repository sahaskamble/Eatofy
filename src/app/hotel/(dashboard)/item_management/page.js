'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaTrash, FaSearch, FaBox, FaLayerGroup, FaEye } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from 'react-toastify';

export default function ItemManagement() {
  const [isLoading, setLoading] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [unit, setUnit] = useState('piece');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItemName, setEditItemName] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hotel/inventory/items/fetch', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setItems(data.output);
        console.log(data.output)
      } else {
        toast.error(data.message || 'Failed to fetch items');
      }
    } catch (error) {
      // console.error('Error fetching items:', error);
      toast.error('Failed to fetch items.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const unitValue = !isNaN(unit) ? unit.toString() : unit;

      const itemData = {
        category_name: categoryName,
        item_name: itemName,
        unit: unitValue
      };

      const response = await fetch('/api/hotel/inventory/items/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        toast.success('Item added successfully');
        setShowItemForm(false);
        fetchItems();
        resetForm();
      } else if (data.returncode === 409) {
        toast.error('Item with this name already exists');
      } else if (data.returncode === 403) {
        toast.error('You do not have permission to add items');
      } else if (data.returncode === 400) {
        toast.error('Missing required information');
      } else {
        toast.error(data.message || 'Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item. Please try again.');
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch('/api/hotel/inventory/items/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Item deleted successfully');
        fetchItems();
      } else if (data.returncode === 403) {
        toast.error('You do not have permission to delete items');
      } else if (data.returncode === 400) {
        toast.error('Invalid item ID');
      } else {
        toast.error(data.message || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item. Please try again.');
    }
  };

  const handleEditItem = async (item_id, item_name) => {
    if (!item_id || !item_name) {
        toast.error('Item ID and name are required.');
        return;
    }

    try {
        const response = await fetch('/api/hotel/inventory/items/edit', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id, item_name })
        });

        const data = await response.json();
        if (data.returncode === 200) {
            toast.success('Item edited successfully');
            fetchItems(); // Refresh the item list
        } else {
            toast.error(data.message || 'Failed to edit item');
        }
    } catch (error) {
        console.error('Error editing item:', error);
        toast.error('Failed to edit item');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetForm = () => {
    setCategoryName('');
    setItemName('');
    setUnit('piece');
  };

  const handleCloseItemForm = () => {
    setShowItemForm(false);
    resetForm();
  };

  const openEditModal = (item) => {
    setEditItemName(item.ItemName);
    setEditUnit(item.Unit);
    setEditItemId(item._id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const viewItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const filteredItems = items.filter((item) =>
    item.ItemName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Category?.CategoryName?.toLowerCase().includes(searchQuery.toLowerCase()) || ''
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Modal Form */}
      {showItemForm && (
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
                  Add New Item
                </h2>
                <button
                  onClick={handleCloseItemForm}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-all"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <div className="relative">
                    <FaLayerGroup className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      placeholder="Enter category name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <div className="relative">
                    <FaBox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      placeholder="Enter item name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                    >
                      <option value="piece">piece</option>
                      <option value="kg">kg (Kilograms)</option>
                      <option value="g">g (Grams)</option>
                      <option value="mg">mg (Milligrams)</option>
                      <option value="l">l (Litres)</option>
                      <option value="ml">ml (Millilitres)</option>
                      <option value="custom">Custom Unit</option>
                    </select>

                    {unit === 'custom' && (
                      <input
                        type="text"
                        value={typeof unit === 'string' ? unit : ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow both numbers and strings
                          setUnit(value);
                        }}
                        placeholder="Enter custom unit"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleCloseItemForm}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity ease-out duration-300" onClick={closeEditModal}></div>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-lg w-[400px] transform transition-all ease-out duration-300 scale-100 opacity-100 translate-y-0">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Item</h3>
                <input
                  type="text"
                  value={editItemName}
                  onChange={(e) => setEditItemName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 mb-4"
                  placeholder="Enter item name"
                />
                <select
                  value={editUnit}
                  onChange={(e) => setEditUnit(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 mb-4"
                >
                  <option value="piece">piece</option>
                  <option value="kg">kg (Kilograms)</option>
                  <option value="g">g (Grams)</option>
                  <option value="mg">mg (Milligrams)</option>
                  <option value="l">l (Litres)</option>
                  <option value="ml">ml (Millilitres)</option>
                  <option value="custom">Custom Unit</option>
                </select>
                <div className="flex justify-end space-x-3">
                  <button onClick={closeEditModal} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                  <button onClick={() => handleEditItem(editItemId, editItemName)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg transform transition-all overflow-hidden scale-100 hover:scale-105">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedItem.ItemName}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-all"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-lg text-gray-700">Category: {selectedItem.CategoryId?.CategoryName}</p>
                <p className="text-lg text-gray-700">Quantity: {selectedItem.Quantity} {selectedItem.Unit}</p>
                {/* Add more item details as needed */}
              </div>
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
              Item Management
            </h1>
          </div>
          <button
            onClick={() => setShowItemForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
          >
            <FaPlus size={12} />
            Add Item
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
              placeholder="Search items by name or category..."
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
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gray-50 rounded-full p-3 mb-4">
                  <FaBox className="text-gray-400 w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Items Found</h3>
                <p className="text-gray-500 text-sm text-center mb-4">
                  {searchQuery
                    ? "No items match your search criteria"
                    : "Start by adding your first item"}
                </p>
                <button
                  onClick={() => setShowItemForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                >
                  <FaPlus size={12} />
                  Add Item
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Item Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Unit</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredItems.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {item.CategoryId?.CategoryName || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-medium mr-2">
                            {item.ItemName.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-700">{item.ItemName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">
                          {item.Unit || '-'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
                          >
                            <FaTrash size={14} />
                          </button>
                          <button
                            onClick={() => viewItem(item)}
                            className="p-1.5 text-gray-400 hover:text-blue-500 rounded transition-colors"
                          >
                            <FaEye size={16} />
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
