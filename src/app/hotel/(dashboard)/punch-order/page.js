'use client';

import { useState, useEffect, useRef } from 'react';
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ShoppingBagIcon,
  TruckIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHotelAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FaArrowAltCircleDown } from 'react-icons/fa';

export default function PunchOrderPage() {
  const router = useRouter();
  const { user } = useHotelAuth();
  const searchInputRef = useRef(null);
  const [tables, setTables] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsResponse = await fetch('/api/hotel/sections/fetch');
        const sectionsData = await sectionsResponse.json();
        if (sectionsData.returncode === 200) {
          setSections(sectionsData.output);
        }

        const tablesResponse = await fetch('/api/hotel/tables/fetch');
        const tablesData = await tablesResponse.json();
        if (tablesData.returncode === 200) {
          setTables(tablesData.output);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load restaurant data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Focus search input when loading is complete
    if (!loading && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [loading]);

  const handleTableClick = async (table) => {
    router.push(`/hotel/punch-order/${table._id}`);
  };

  const getTableStatus = (tableId) => {
    return 'available';
  };

  const filteredTables = tables.filter((table) => {
    const matchesSearch = table.TableName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = !selectedSection || table.SectionId?._id === selectedSection;
    return matchesSearch && matchesSection;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ArrowPathIcon className="h-8 w-8 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Tables Overview</h1>
        <div className="flex space-x-4 mb-4">
          <select
            style={{ appearance: 'none' }}
            className="bg-white p-2 px-4 border border-gray-200 rounded-xl focus:outline-none cursor-pointer"
            value={selectedSection || ''}
            onChange={(e) => setSelectedSection(e.target.value || null)}
          >
            <option value="">All Sections</option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.SectionName}
              </option>
            ))}
          </select>
          <div className="flex-1">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTables.map((table) => {
          const status = table.Status;
          return (
            <div
              key={table._id}
              onClick={() => handleTableClick(table)}
              className={`
                cursor-pointer rounded-lg border-[3px] bg-white p-6 transition-shadow hover:shadow-lg
                ${status === 'Booked' ? 'border-red-500' : (status === 'Bill Pending' ? 'border-green-500'
                  : 'border-black')}
              `}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {table.TableName}
                </h3>
                <div className="flex items-center justify-center text-gray-600 mb-2">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  <span>{table.PersonsOccupiable} Persons</span>
                </div>
                <div className="flex items-center justify-center">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${status === 'Booked'
                        ? 'bg-yellow-100 text-yellow-800'
                        : (status === 'Bill Pending' ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        )}
                      }
                    `}
                  >
                    {status === 'Booked' ? 'Occupied' : (status === 'Bill Pending' ? 'Bill Pending' : 'Available')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}