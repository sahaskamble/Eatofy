'use client';

import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function DishManagement() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDish, setNewDish] = useState({
    dish_name: '',
    code: '',
    type: 'Veg',
    description: '',
    category_id: ''
  });
  const [editingDish, setEditingDish] = useState(null);

  useEffect(() => {
    fetchDishes();
    fetchCategories();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch('/api/hotel/dishes/fetch');
      const data = await response.json();
      if (data.returncode === 200) {
        setDishes(data.output);
      }
    } catch (error) {
      toast.error('Failed to fetch dishes');
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

  const handleAddDish = async () => {
    if (!newDish.dish_name || !newDish.code || !newDish.category_id) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch('/api/hotel/dishes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDish)
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Dish added successfully');
        setNewDish({ dish_name: '', code: '', type: 'Veg', description: '', category_id: '' });
        fetchDishes();
      } else {
        toast.error(data.message || 'Failed to add dish');
      }
    } catch (error) {
      toast.error('Failed to add dish');
    }
  };

  const handleEditDish = async () => {
    try {
      const response = await fetch('/api/hotel/dishes/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDish)
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Dish updated successfully');
        setEditingDish(null);
        fetchDishes();
      } else {
        toast.error(data.message || 'Failed to update dish');
      }
    } catch (error) {
      toast.error('Failed to update dish');
    }
  };

  const handleDeleteDish = async (dishId, dishName) => {
    if (!window.confirm(`Are you sure you want to delete "${dishName}"?`)) return;

    try {
      const response = await fetch('/api/hotel/dishes/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dish_id: dishId })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Dish deleted successfully');
        fetchDishes();
      } else {
        toast.error(data.message || 'Failed to delete dish');
      }
    } catch (error) {
      toast.error('Failed to delete dish');
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.CategoryName : 'Unknown';
  };

  return (
    <div>
      {/* Add Dish Form */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Dish</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Dish Name *"
            value={newDish.dish_name}
            onChange={(e) => setNewDish({ ...newDish, dish_name: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
          />
          <input
            type="text"
            placeholder="Code *"
            value={newDish.code}
            onChange={(e) => setNewDish({ ...newDish, code: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
          />
          <select
            value={newDish.type}
            onChange={(e) => setNewDish({ ...newDish, type: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Beverage">Beverage</option>
          </select>
          <select
            value={newDish.category_id}
            onChange={(e) => setNewDish({ ...newDish, category_id: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select Category *</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.CategoryName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            value={newDish.description}
            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
          />
          <button
            onClick={handleAddDish}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Add Dish
          </button>
        </div>
      </div>

      {/* Dishes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes.map((dish) => (
          <div key={dish._id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{dish.DishName}</h4>
                <p className="text-sm text-gray-600">Code: {dish.Code}</p>
                <p className="text-sm text-gray-600">Category: {getCategoryName(dish.CategoryId)}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                  dish.Type === 'Veg' ? 'bg-green-100 text-green-800' :
                  dish.Type === 'Non-Veg' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {dish.Type}
                </span>
                {dish.Description && (
                  <p className="text-sm text-gray-500 mt-2">{dish.Description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingDish(dish)}
                  className="text-gray-600 hover:text-blue-500"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteDish(dish._id, dish.DishName)}
                  className="text-gray-600 hover:text-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Dish</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Dish Name"
                value={editingDish.DishName}
                onChange={(e) => setEditingDish({ ...editingDish, DishName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Code"
                value={editingDish.Code}
                onChange={(e) => setEditingDish({ ...editingDish, Code: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
              />
              <select
                value={editingDish.Type}
                onChange={(e) => setEditingDish({ ...editingDish, Type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Beverage">Beverage</option>
              </select>
              <select
                value={editingDish.CategoryId}
                onChange={(e) => setEditingDish({ ...editingDish, CategoryId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
              >
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Description"
                value={editingDish.Description || ''}
                onChange={(e) => setEditingDish({ ...editingDish, Description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleEditDish}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Update
              </button>
              <button
                onClick={() => setEditingDish(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}