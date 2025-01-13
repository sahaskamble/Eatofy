import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const sectionTypes = [
  'Takeaway',
  'Delivery',
  'Dine-In',
  'Swiggy',
  'Zomato',
  'QR-Orders'
];

export default function Sections() {

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

  // Fetch initial data
  useEffect(() => {
    fetchSections();
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

  return (
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
            className="flex items-center justify-between p-3 bg-gray-50 shadow-md shadow-gray-400 rounded-lg"
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
