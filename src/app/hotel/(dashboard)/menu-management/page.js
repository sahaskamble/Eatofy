'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export default function MenuManagementPage() {
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
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  // Fetch initial data
  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  // Fetch functions
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
    <div className="menu-management px-2 py-3">
      <h1 className='text-3xl font-semibold mb-4'>Menu Management</h1>
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
                  {/* sections.find(s => s.SectionName === item.SectionId.SectionName)?.SectionName */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
