'use client';

import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function MenuCategories() {

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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

  return (
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
            className="p-4 bg-white shadow-gray-400 shadow-md border border-gray-200 rounded-lg"
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
  );
}
