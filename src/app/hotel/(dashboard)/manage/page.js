'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [editingTableData, setEditingTableData] = useState({
    table_name: '',
    persons_occupiable: '',
    section_id: ''
  });
  const [multipleTableCount, setMultipleTableCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchSections();
    fetchTables();
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
      }
    } catch (error) {
      toast.error('Failed to fetch tables');
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

  const openEditTableModal = (table) => {
    setEditingTableId(table._id);
    setEditingTableData({
      table_name: table.TableName,
      persons_occupiable: table.PersonsOccupiable,
      section_id: table.SectionId._id
    });
  };

  const closeEditTableModal = () => {
    setEditingTableId(null);
    setEditingTableData({
      table_name: '',
      persons_occupiable: '',
      section_id: ''
    });
  };

  const handleEditTable = async () => {
    if (!editingTableData.table_name.trim() || !editingTableData.persons_occupiable || !editingTableData.section_id) {
      toast.error('Table name, capacity, and section are required');
      return;
    }

    try {
      console.log(parseInt(editingTableData.persons_occupiable), "Not Updated")
      const response = await fetch('/api/hotel/tables/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table_id: editingTableId,
          table_name: editingTableData.table_name,
          persons_occupiable: parseInt(editingTableData.persons_occupiable),
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Table updated successfully');
        closeEditTableModal();
        fetchTables();
      } else {
        toast.error(data.message || 'Failed to update table');
      }
    } catch (error) {
      console.error('Error updating table:', error);
      toast.error('Failed to update table');
    }
  };

  const handleDeleteTable = async (table_id) => {
    if (!table_id) {
      toast.error('Table ID is required.');
      return;
    }

    try {
      const response = await fetch('/api/hotel/tables/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table_id })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Table deleted successfully');
        fetchTables(); // Refresh the table list
      } else {
        toast.error(data.message || 'Failed to delete table');
      }
    } catch (error) {
      console.error('Error deleting table:', error);
      toast.error('Failed to delete table');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddMultipleTables = async () => {
    if (!multipleTableCount || multipleTableCount <= 0) {
      toast.error('Please enter a valid number of tables to add.');
      return;
    }

    try {
      const response = await fetch('/api/hotel/tables/add/multiple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_id: newTable.section_id,
          count: multipleTableCount
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Tables added successfully');
        fetchTables(); // Refresh the table list
        closeModal(); // Close the modal on success
      } else {
        toast.error(data.message || 'Failed to add tables');
      }
    } catch (error) {
      console.error('Error adding tables:', error);
      toast.error('Failed to add tables');
    }
  };

  async function editTable(data) {
    try {
      const response = await fetch('/api/hotel/tables/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify({
          table_id: data.table_id,
          table_name: data.table_name,
          persons_occupiable: data.persons_occupiable
        })
      });

      const result = await response.json();
      if (result.returncode === 200) {
        console.log('Table edited successfully:', result);
      } else {
        console.error('Error editing table:', result.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Section and Table Management</h1>

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
            <button
              onClick={openModal}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Add Multiple Tables
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
                  <button onClick={() => openEditTableModal(table)} className="text-gray-600 hover:text-red-500">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDeleteTable(table._id)} className="text-gray-600 hover:text-red-700">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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

        {/* Edit Table Modal */}
        {editingTableId && (
          <div className="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            {/* Background overlay with fade */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity ease-out duration-300"
              onClick={closeEditTableModal}
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
                      Edit Table
                    </h3>
                    <button
                      onClick={closeEditTableModal}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="transform transition ease-out duration-200 hover:translate-y-[-2px]">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Table Name
                      </label>
                      <input
                        type="text"
                        value={editingTableData.table_name}
                        onChange={(e) =>
                          setEditingTableData({ ...editingTableData, table_name: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        placeholder="Enter table name"
                      />
                    </div>

                    <div className="transform transition ease-out duration-200 hover:translate-y-[-2px]">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity
                      </label>
                      <input
                        type="number"
                        value={editingTableData.persons_occupiable}
                        onChange={(e) =>
                          setEditingTableData({ ...editingTableData, persons_occupiable: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        placeholder="Enter capacity"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={closeEditTableModal}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEditTable}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        Update Table
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for adding multiple tables */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity ease-out duration-300" onClick={closeModal}></div>
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="relative bg-white rounded-lg w-[400px] transform transition-all ease-out duration-300 scale-100 opacity-100 translate-y-0">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Multiple Tables</h3>
                  <select
                    value={newTable.section_id}
                    onChange={(e) => setNewTable({ ...newTable, section_id: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border bg-white rounded-lg focus:ring-2 focus:ring-white focus:border-none shadow-sm text-gray-700 font-medium cursor-pointer hover:border-red-300 transition-colors duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">Select Section</option>
                    {sections.map((section) => (
                      <option key={section._id} value={section._id}>
                        {section.SectionName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Number of tables to add"
                    value={multipleTableCount}
                    onChange={(e) => setMultipleTableCount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 mb-4"
                  />
                  <div className="flex justify-end space-x-3">
                    <button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                    <button onClick={handleAddMultipleTables} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Add Tables</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
