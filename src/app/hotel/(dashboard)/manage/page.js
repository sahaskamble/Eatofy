'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const sectionTypes = [
  'Takeaway',
  'Delivery',
  'Dine-In',
  'Swiggy',
  'Zomato',
  'QR-Orders'
];

export default function ManagePage() {
  // State for sections
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState('');
  const [selectedSectionType, setSelectedSectionType] = useState('Dine-In');
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    section_name: '',
    type: ''
  });

  // State for tables
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({ 
    number: '', 
    capacity: '', 
    section_id: ''
  });
  const [editingTableId, setEditingTableId] = useState(null);

  // State for menu items
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    type: '',
    code: ''
  });
  const [editingMenuItemId, setEditingMenuItemId] = useState(null);

  // State for categories
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  // Fetch initial data
  useEffect(() => {
    fetchSections();
    fetchTables();
    fetchMenuItems();
    fetchCategories();
  }, []);

  // Fetch functions
  const fetchSections = async () => {
    try {
      const response = await fetch('/api/hotel/sections/fetch');
      const data = await response.json();
      if (data.returncode === 200) {
        setSections(data.output);
      }
    } catch (error) {
      toast.error('Failed to fetch sections');
    }
  };

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/hotel/tables/fetch');
      const data = await response.json();
      if (data.returncode === 200) {
        setTables(data.output);
        console.log(data.output);
      }
    } catch (error) {
      toast.error('Failed to fetch tables');
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/hotel/menu/fetch');
      const data = await response.json();
      if (data.returncode === 200) {
        setMenuItems(data.output[0].Menus);
      }
    } catch (error) {
      toast.error('Failed to fetch menu items');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/hotel/menu_categories/fetch');
      const data = await response.json();
      if (data.returncode === 200) {
        setCategories(data.output);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  // Section handlers
  const openEditModal = (section) => {
    setEditingSectionId(section._id);
    setEditFormData({
      section_name: section.SectionName,
      type: section.SectionType
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingSectionId(null);
    setEditFormData({ section_name: '', type: '' });
  };

  const handleEditSection = async () => {
    if (!editFormData.section_name.trim() || !editFormData.type) {
      toast.error('Section name and type are required');
      return;
    }

    try {
      const response = await fetch(`/api/hotel/sections/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_id: editingSectionId,
          section_name: editFormData.section_name,
          type: editFormData.type
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Section updated successfully');
        closeEditModal();
        fetchSections();
      } else {
        toast.error(data.message || 'Failed to update section');
      }
    } catch (error) {
      console.error('Error updating section:', error);
      toast.error('Failed to update section');
    }
  };

  const handleDeleteSection = async (sectionId, sectionName) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(`Are you sure you want to delete the section "${sectionName}"? This action cannot be undone.`);
    
    if (!isConfirmed) {
      return; // User cancelled the deletion
    }

    try {
      const response = await fetch(`/api/hotel/sections/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section_id: sectionId })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Section deleted successfully');
        fetchSections();
      } else {
        toast.error(data.message || 'Failed to delete section');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Failed to delete section');
    }
  };

  const handleAddSection = async () => {
    if (!newSection.trim()) {
      toast.error('Section name is required');
      return;
    }

    try {
      const response = await fetch('/api/hotel/sections/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          section_name: newSection,
          type: selectedSectionType
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Section added successfully');
        setNewSection('');
        fetchSections();
      } else {
        toast.error(data.message || 'Failed to add section');
      }
    } catch (error) {
      toast.error('Failed to add section');
    }
  };

  // Table handlers
  const handleAddTable = async () => {
    if (!newTable.number || !newTable.capacity || !newTable.section_id) {
      toast.error('Table number, capacity, and section are required');
      return;
    }

    try {
      const response = await fetch('/api/hotel/tables/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table_name: newTable.number,
          persons_occupiable: parseInt(newTable.capacity),
          section_id: newTable.section_id
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Table added successfully');
        setNewTable({ number: '', capacity: '', section_id: '' });
        fetchTables();
      } else {
        toast.error(data.message || 'Failed to add table');
      }
    } catch (error) {
      toast.error('Failed to add table');
    }
  };

  // Menu item handlers
  const handleAddMenuItem = async () => {
    if (!newMenuItem.name || !newMenuItem.price || !newMenuItem.category) {
      toast.error('Name, price, and category are required');
      return;
    }

    try {
      const response = await fetch('/api/hotel/menu/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dish_name: newMenuItem.name,
          price: parseFloat(newMenuItem.price),
          description: newMenuItem.description,
          category_name: newMenuItem.category,
          type: newMenuItem.type,
          code: newMenuItem.code
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Menu item added successfully');
        setNewMenuItem({
          name: '',
          price: '',
          description: '',
          category: ''
        });
        fetchMenuItems();
      } else {
        toast.error(data.message || 'Failed to add menu item');
      }
    } catch (error) {
      toast.error('Failed to add menu item');
    }
  };

  // Category handlers
  const handleAddCategory = async () => {
    if (!newCategory.name) {
      toast.error('Category name is required');
      return;
    }

    try {
      const response = await fetch('/api/hotel/menu_categories/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_name: newCategory.name
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Category added successfully');
        setNewCategory({ name: '', description: '' });
        fetchCategories();
      } else {
        toast.error(data.message || 'Failed to add category');
      }
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the category "${categoryName}"? This will also delete all menu items in this category.`);
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch('/api/hotel/menu_categories/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_id: categoryId })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Category deleted successfully');
        fetchCategories();
        fetchMenuItems(); // Refresh menu items as some might have been deleted
      } else {
        toast.error(data.message || 'Failed to delete category');
      }
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  console.log('Categories:', categories);
  console.log('Dishes:', menuItems);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Manage Restaurant</h1>

        {/* Sections Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Sections</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Section Name"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <select
              value={selectedSectionType}
              onChange={(e) => setSelectedSectionType(e.target.value)}
              className="w-[200px] px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-white focus:border-none shadow-sm text-gray-700 font-medium cursor-pointer hover:border-red-300 transition-colors duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat"
            >
              <option value="">Select Section Type</option>
              {sectionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddSection}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Add Section
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <div
                key={section._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>{section.SectionName}</span>
                <span className="text-gray-500 ml-2">{section.SectionType}</span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(section)} className="text-gray-600 hover:text-red-500">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteSection(section._id, section.SectionName)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tables Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tables</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Table Number"
              value={newTable.number}
              onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={newTable.capacity}
              onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <select
              value={newTable.section_id}
              onChange={(e) => setNewTable({ ...newTable, section_id: e.target.value })}
              className="w-[200px] px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-white focus:border-none shadow-sm text-gray-700 font-medium cursor-pointer hover:border-red-300 transition-colors duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat"
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section._id} value={section._id}>
                  {section.SectionName}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddTable}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Add Table
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <div
                key={table._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="font-semibold">{table.TableName}</span>
                  <span className="text-gray-500 ml-2">({table.PersonsOccupiable} seats)</span>
                  <span className="text-gray-500 ml-2">({table.SectionId.SectionName})</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-red-500">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-red-500">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Categories Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Menu Categories</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={handleAddCategory}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 md:col-span-2"
            >
              Add Category
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{category.CategoryName}</h3>
                    {category.Description && (
                      <p className="text-gray-600 text-sm mt-1">{category.Description}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => handleDeleteCategory(category._id, category.CategoryName)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Dish Name"
              value={newMenuItem.name}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={newMenuItem.price}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="text"
              placeholder="code"
              value={newMenuItem.code}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, code: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <textarea
              placeholder="Description"
              value={newMenuItem.description}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
              rows="2"
            />
            <select
              value={newMenuItem.category}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.CategoryName}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
            <select
              value={newMenuItem.type}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, type: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Type</option>
              <option value="VEG">Vegetarian</option>
              <option value="NON-VEG">Non-Vegetarian</option>
              <option value="EGG">Eggytarian</option>
              <option value="BEV">Beverage</option>
            </select>
            <button
              onClick={handleAddMenuItem}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 md:col-span-2"
            >
              Add Menu Item
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.DishId.DishName}</h3>
                    <Image
                      src={item.DishId.Type?.startsWith('V') ? '/veg-icon.svg' : 
                           item.DishId.Type?.startsWith('N') ? '/non-veg-icon.svg' : 
                           item.DishId.Type?.startsWith('B') ? '/beverage-icon.svg' :
                           '/egg-icon.svg'}
                      alt={item.DishId.Type}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-600 hover:text-red-500">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-red-500">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{item.DishId.Description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-black font-semibold">₹{item.Price}</span>
                  <span className="text-sm text-gray-500">
                    {sections.find(s => s.SectionName === item.SectionId.SectionName)?.SectionName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />

      {/* Edit Section Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Background overlay with fade */}
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity ease-out duration-300" 
            onClick={closeEditModal}
          ></div>

          {/* Modal panel with slide and fade */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-lg w-[400px] transform transition-all ease-out duration-300 scale-100 opacity-100 translate-y-0"
              data-aos="zoom-in"
            >
              {/* Modal content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Section
                  </h3>
                  <button
                    onClick={closeEditModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="transform transition ease-out duration-200 hover:translate-y-[-2px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.section_name}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, section_name: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      placeholder="Enter section name"
                    />
                  </div>

                  <div className="transform transition ease-out duration-200 hover:translate-y-[-2px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Type
                    </label>
                    <select
                      value={editFormData.type}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, type: e.target.value })
                      }
                      className="w-full px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 cursor-pointer hover:border-red-300"
                    >
                      <option value="">Select Section Type</option>
                      {sectionTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={closeEditModal}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSection}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Update Section
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
