"use client";

import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaSearch, FaBox } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AvailableStock() {
    const [isLoading, setLoading] = useState(false);
    const [stock, setStock] = useState([]);
    const [items, setItems] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        item_id: '',
        quantity: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchItems();
        fetchStock();
    }, []);

    const fetchStock = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/hotel/inventory/stock/fetch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.returncode === 200) {
                setStock(data.output);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error fetching stock:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchItems = async () => {
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
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error fetching items:', error);
        }
    };

    const handleAddStock = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/hotel/inventory/stock/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.returncode === 200) {
                setShowAddForm(false);
                fetchStock();
                resetForm();
            } else {
                alert(data.message || 'Failed to add stock');
            }
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };

    const handleEditStock = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/hotel/inventory/stock/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stock_id: formData.stock_id,
                    quantity: formData.quantity
                }),
            });

            const data = await response.json();
            if (data.returncode === 200) {
                setShowEditForm(false);
                fetchStock();
                resetForm();
            } else {
                alert(data.message || 'Failed to update stock');
            }
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            item_id: '',
            quantity: '',
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredStock = stock.filter((item) =>
        item.Items.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Items.Category.CategoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (quantity) => {
        if (quantity === 0) return 'bg-red-100 text-red-600';
        if (quantity < 20) return 'bg-yellow-100 text-yellow-600';
        return 'bg-green-100 text-green-600';
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Add Stock Modal */}
            {showAddForm && (
                <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white w-full max-w-xl rounded-lg shadow-lg transform transition-all overflow-hidden">
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Add Stock</h2>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-all"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleAddStock} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Item
                                    </label>
                                    <select
                                        name="item_id"
                                        value={formData.item_id}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select an item</option>
                                        {items.map((item) => (
                                            <option key={item.id} value={item._id}>
                                                {item.ItemName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                                            required
                                            placeholder="Enter quantity"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium"
                                    >
                                        Add Stock
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Stock Modal */}
            {showEditForm && (
                <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white w-full max-w-xl rounded-lg shadow-lg transform transition-all overflow-hidden">
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Update Stock</h2>
                                <button
                                    onClick={() => setShowEditForm(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-all"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleEditStock} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                                        required
                                        placeholder="Enter new quantity"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditForm(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium"
                                    >
                                        Update Stock
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
                            Available Stock
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                    >
                        <FaPlus size={12} />
                        Add Stock
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
                            placeholder="Search by item name or category..."
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
                        ) : filteredStock.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <div className="bg-gray-50 rounded-full p-3 mb-4">
                                    <FaBox className="text-gray-400 w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No Stock Items Found</h3>
                                <p className="text-gray-500 text-sm text-center mb-4">
                                    {searchQuery
                                        ? "No stock items match your search criteria"
                                        : "Start by adding your first stock item"}
                                </p>
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                                >
                                    <FaPlus size={12} />
                                    Add Stock
                                </button>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Item</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
                                        <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredStock.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-3 px-4">
                                                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                                    {item.Items.Category.CategoryName}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center">
                                                    <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-medium mr-2">
                                                        {item.Items.ItemName.charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-gray-700">{item.Items.ItemName}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                {`${item.Quantity} ${item.Unit}`}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex justify-center">
                                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(Number(item.Quantity))}`}>
                                                        {item.Status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                stock_id: item.id,
                                                                quantity: item.Quantity
                                                            });
                                                            setShowEditForm(true);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
                                                    >
                                                        <MdOutlineEdit size={16} />
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
