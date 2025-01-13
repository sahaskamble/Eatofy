'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function MenuItems() {

  // State for menu items
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    type: '',
    code: ''
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  // Fetch initial data
  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
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

  const handleDeleteMenuItem = async (Id, dishName) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the dish "${dishName}"? This action cannot be undone.`);

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch('/api/hotel/menu/management/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_id: Id })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Item deleted successfully');
        fetchMenuItems(); // Refresh menu items as some might have been deleted
      } else {
        toast.error(data.message || 'Failed to delete Menu Item');
      }
    } catch (error) {
      toast.error('Failed to delete Menu Item');
    }
  };

  const EditPricePopup = () => {
    return (
      isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Menu Item Price</h2>
            <select onChange={(e) => setSelectedMenuItem(e.target.value)} className="w-full mb-4 p-2 border rounded">
              {menuItems.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.DishId.DishName}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Enter new price"
              className="mb-4 p-2 border rounded w-full"
            />
            <div className="flex justify-between">
              <button onClick={handleUpdatePrice} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Update Price
              </button>
              <button onClick={() => setIsPopupOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  const handleUpdatePrice = async () => {
    try {
      const response = await fetch('/api/hotel/menu/management/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menu_id: selectedMenuItem,
          price: newPrice
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Price updated successfully');
        setNewPrice('');
        fetchCategories();
      } else {
        toast.error(data.message || 'Failed to update price');
      }
    } catch (error) {
      toast.error('Failed to update price');
    }
  };

  const editMenuItem = (id) => {
    setSelectedMenuItem(id);
    setIsPopupOpen(true);
  };

  return (
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
            className="p-4 bg-white shadow-md shadow-gray-400 border border-gray-200 rounded-lg"
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
                <button onClick={() => editMenuItem(item._id)} className="text-gray-600 hover:text-red-500">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button onClick={() => handleDeleteMenuItem(item._id, item.DishId.DishName)} className="text-gray-600 hover:text-red-500">
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
      <EditPricePopup />
    </div>
  );
}
