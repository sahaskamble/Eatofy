'use client'

import { useEffect, useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import customersCrud from '@/app/offline/crud/Customers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import menusCrud from '@/app/offline/crud/Menus';
import menuCategoryCrud from '@/app/offline/crud/MenuCategory';
import sectionsCrud from '@/app/offline/crud/Sections';
import tablesCrud from '@/app/offline/crud/Tables';
import staffsCrud from '@/app/offline/crud/Staffs';
import gstSettingsCrud from '@/app/offline/crud/GSTSettings';
import vatSettingsCrud from '@/app/offline/crud/VATSettings';
import eatoCoinsSettingsCrud from '@/app/offline/crud/EatoCoinsSettings';

export default function RestorePage() {
  const [customers, setCustomers] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [tables, setTables] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loadingStates, setLoadingStates] = useState({
    customers: false,
    menus: false,
    menuCategories: false,
    tables: false,
    staffs: false,
    sections: false
  });
  const [restoreAllLoading, setRestoreAllLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      const result = await customersCrud.readCustomers();
      if (result.returncode === 200) {
        setCustomers(result.output);
      } else {
        toast.error('Failed to fetch customers');
      }
    } catch (error) {
      toast.error('Error fetching customers');
      console.error(error);
    }
  };

  const fetchMenus = async () => {
    try {
      const result = await menusCrud.readMenus();
      if (result.returncode === 200) {
        setMenus(result.output);
      } else {
        toast.error('Failed to fetch Menus');
      }
    } catch (error) {
      toast.error('Error fetching Menus');
    }
  };

  const fetchMenuCategories = async () => {
    try {
      const result = await menuCategoryCrud.readMenuCategories();
      if (result.returncode === 200) {
        setMenuCategories(result.output);
      } else {
        toast.error('Failed to fetch Menu Categories');
      }
    } catch (error) {
      toast.error('Error fetching Menu Categories');
    }
  };

  const fetchTables = async () => {
    try {
      const result = await tablesCrud.readTables();
      if (result.returncode === 200) {
        setTables(result.output);
      } else {
        toast.error('Failed to fetch Tables');
      }
    } catch (error) {
      toast.error('Error fetching Tables');
      console.error(error);
    }
  };

  const fetchSections = async () => {
    try {
      const result = await sectionsCrud.readAllSections();
      if (result.returncode === 200) {
        setSections(result.output);
      } else {
        toast.error('Failed to fetch Sections');
      }
    } catch (error) {
      toast.error('Error fetching Sections');
    }
  };

  const fetchStaffs = async () => {
    try {
      const result = await staffsCrud.fetchStaffByHotelId();
      if (result.returncode === 200) {
        setStaff(result.output);
      } else {
        toast.error('Failed to fetch Staff');
      }
    } catch (error) {
      toast.error('Error fetching Staff');
      console.error(error);
    }
  };

  const fetchSettings = async () => {
    try {
      const gst_result = await gstSettingsCrud.syncFromServer();
      const vat_result = await vatSettingsCrud.syncFromServer();
      const eatocoins_result = await eatoCoinsSettingsCrud.syncFromServer();
      if (gst_result.returncode === 200 && vat_result.returncode === 200 && eatocoins_result.returncode === 200) {
        gst_result
      } else {
        toast.error('Failed to fetch Staff');
      }
    } catch (error) {
      toast.error('Error fetching Staff');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchMenus();
    fetchMenuCategories();
    fetchSections();
    fetchTables();
    fetchStaffs();
    fetchSettings();
  }, []);

  const handleRestore = async (type) => {
    setLoadingStates(prev => ({ ...prev, [type]: true }));
    try {
      let result;
      switch (type) {
        case 'customers':
          result = await customersCrud.syncFromServer();
          if (result.returncode === 200) {
            await fetchCustomers();
          }
          break;
        case 'menus':
          result = await menusCrud.syncFromServer();
          if (result.returncode === 200) {
            await fetchMenus();
          }
          break;
        case 'menu Categories':
          result = await menuCategoryCrud.syncFromServer();
          if (result.returncode === 200) {
            await fetchMenuCategories();
          }
          break;
        case 'sections':
          result = await sectionsCrud.syncFromServer();
          if (result.returncode === 200) {
            await fetchSections();
          }
          break;
        case 'tables':
          result = await tablesCrud.syncFromServer();
          if (result.returncode === 200) {
            await fetchTables();
          }
          break;
        case 'staffs':
          result = await staffsCrud.syncFromServer();
          if (result.returncode === 200) {
            await fetchTables();
          }
          break;
        default:
          throw new Error('Invalid restore type');
      }

      if (result.returncode === 200) {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} restored successfully`);
      } else {
        toast.error(result.message || `Failed to restore ${type}`);
      }
    } catch (error) {
      toast.error(error.message || `Error restoring ${type}`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleRestoreAll = async () => {
    setRestoreAllLoading(true);
    setLoadingStates(prev => ({
      customers: true,
      menus: true,
      menuCategories: true,
      tables: true,
      staffs: true,
      sections: true
    }));

    try {
      const customersResult = await customersCrud.syncFromServer();
      if (customersResult.returncode === 200) {
        await fetchCustomers();
      }

      const menusResult = await menusCrud.syncFromServer();
      if (menusResult.returncode === 200) {
        await fetchMenus();
      }

      const menuCategoriesResult = await menuCategoryCrud.syncFromServer();
      if (menuCategoriesResult.returncode === 200) {
        await fetchMenuCategories();
      }

      const sectionsResult = await sectionsCrud.syncFromServer();
      if (sectionsResult.returncode === 200) {
        await fetchSections();
      }

      const tablesResult = await tablesCrud.syncFromServer();
      if (tablesResult.returncode === 200) {
        await fetchTables();
      }
      const staffResult = await staffsCrud.syncFromServer();
      if (staffResult.returncode === 200) {
        await fetchStaffs();
      }

      await fetchSettings();
      toast.success('All data restored successfully!');
    } catch (error) {
      toast.error(error.message || 'Error restoring all data');
      console.error(error);
    } finally {
      setRestoreAllLoading(false);
      setLoadingStates(prev => ({
        customers: false,
        menus: false,
        menuCategories: false,
        tables: false,
        staffs: false,
        sections: false
      }));
    }
  };

  return (
    <div className="p-6">
      <div className='flex justify-between pb-8'>
        <h1 className="text-2xl font-bold mb-6">Data From Server</h1>

        <button
          onClick={handleRestoreAll}
          disabled={restoreAllLoading}
          className={`bg-red-500 text-white px-4 rounded-xl flex items-center h-12 ${loadingStates.customers ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
          {loadingStates.customers ? 'Restoring...' : 'Restore Everything'}
        </button>
      </div>

      {/* Customers Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Customers</h2>
          <div className="space-x-2">
            <button
              onClick={() => handleRestore('customers')}
              disabled={loadingStates.customers}
              className={`bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.customers ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              {loadingStates.customers ? 'Restoring...' : 'Restore'}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-red-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Wallet</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                customers.length > 0 ?
                  (
                    customers.map((customer, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{customer.CustomerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{customer.Contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{customer.Email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{customer.City}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{customer.Wallet || 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="8">No Customers Found</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Menus Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Menus</h2>
          <div className="space-x-2">
            <button
              onClick={() => handleRestore('menus')}
              disabled={loadingStates.menus}
              className={`bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.menus ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              {loadingStates.menus ? 'Restoring...' : 'Restore'}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-red-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                menus.length > 0 ?
                  (
                    menus.map((menu, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{menu.DishId.DishName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{menu.DishId.Code}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{menu.DishId.Description || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{menu.SectionId.SectionName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{menu.DishId.CategoryId.CategoryName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{menu.DishId.Type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{menu.Price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="8">No Menus Found</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Menu Categories Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Menu Categories</h2>
          <div className="space-x-2">
            <button
              onClick={() => handleRestore('menu Categories')}
              disabled={loadingStates.menuCategories}
              className={`bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.menus ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              {loadingStates.menuCategories ? 'Restoring...' : 'Restore'}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-red-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Name</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                menuCategories.length > 0 ?
                  (
                    menuCategories.map((menu, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{menu.CategoryName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="8">No Menu Categories Found</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sections</h2>
          <div className="space-x-2">
            <button
              onClick={() => handleRestore('sections')}
              disabled={loadingStates.sections}
              className={`bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.sections ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              {loadingStates.sections ? 'Restoring...' : 'Restore'}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-red-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                sections.length > 0 ?
                  (
                    sections.map((section, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{section.SectionName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{section.Type}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="8">No Sections Found</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Tables Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tables</h2>
          <div className="space-x-2">
            <button
              onClick={() => handleRestore('tables')}
              disabled={loadingStates.tables}
              className={`bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.tables ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              {loadingStates.tables ? 'Restoring...' : 'Restore'}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-red-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Capacity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                tables.length > 0 ?
                  (
                    tables.map((table, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{table.TableName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{table.PersonsOccupiable} Persons</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="8">No Tables Found</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Staff</h2>
          <div className="space-x-2">
            <button
              onClick={() => handleRestore('staffs')}
              disabled={loadingStates.staffs}
              className={`bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.staffs ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              {loadingStates.staffs ? 'Restoring...' : 'Restore'}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-red-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider">Designation</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                staff.length > 0 ?
                  (
                    staff.map((person, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{person.FirstName} {person.LastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{person.Contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{person.Email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{person.DepartmentName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{person.Designation}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="8">No Staff Found</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}
