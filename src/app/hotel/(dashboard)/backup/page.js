'use client'

import { useEffect, useState } from 'react';
import { ArrowDownTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import customersCrud from '@/app/offline/crud/Customers';
import menusCrud from '@/app/offline/crud/Menus';
import menuCategoryCrud from '@/app/offline/crud/MenuCategory';
import sectionsCrud from '@/app/offline/crud/Sections';
import tablesCrud from '@/app/offline/crud/Tables';
import staffsCrud from '@/app/offline/crud/Staffs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BackupPage() {
  const [pendingBackups, setPendingBackups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check for pending backups on component mount
  useEffect(() => {
    checkPendingBackups();
  }, []);

  const checkPendingBackups = async () => {
    setIsLoading(true);
    try {
      const backupChecks = await Promise.all([
        customersCrud.checkPendingBackups(),
        menusCrud.checkPendingBackups(),
        menuCategoryCrud.checkPendingBackups(),
        sectionsCrud.checkPendingBackups(),
        tablesCrud.checkPendingBackups(),
        staffsCrud.checkPendingBackups()
      ]);

      const pending = [];
      
      if (backupChecks[0].length > 0) pending.push({ type: 'Customers', count: backupChecks[0].length });
      if (backupChecks[1].length > 0) pending.push({ type: 'Menus', count: backupChecks[1].length });
      if (backupChecks[2].length > 0) pending.push({ type: 'Menu Categories', count: backupChecks[2].length });
      if (backupChecks[3].length > 0) pending.push({ type: 'Sections', count: backupChecks[3].length });
      if (backupChecks[4].length > 0) pending.push({ type: 'Tables', count: backupChecks[4].length });
      if (backupChecks[5].length > 0) pending.push({ type: 'Staff', count: backupChecks[5].length });

      setPendingBackups(pending);
    } catch (error) {
      toast.error('Error checking pending backups');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async (type) => {
    try {
      let result;
      switch (type) {
        case 'Customers':
          result = await customersCrud.syncToServer();
          break;
        case 'Menus':
          result = await menusCrud.syncToServer();
          break;
        case 'Menu Categories':
          result = await menuCategoryCrud.syncToServer();
          break;
        case 'Sections':
          result = await sectionsCrud.syncToServer();
          break;
        case 'Tables':
          result = await tablesCrud.syncToServer();
          break;
        case 'Staff':
          result = await staffsCrud.syncToServer();
          break;
        default:
          throw new Error('Invalid backup type');
      }

      if (result.returncode === 200) {
        toast.success(`${type} backed up successfully`);
        checkPendingBackups(); // Refresh the pending backups list
      } else {
        toast.error(result.message || `Failed to backup ${type}`);
      }
    } catch (error) {
      toast.error(`Error backing up ${type}`);
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (pendingBackups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CheckCircleIcon className="h-24 w-24 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">You're All Set!</h1>
        <p className="text-gray-600">All your data is backed up and synchronized</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Backups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingBackups.map((backup, index) => (
          <div
            key={index}
            onClick={() => handleBackup(backup.type)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{backup.type}</h2>
                <p className="text-gray-600 mt-1">
                  {backup.count} {backup.count === 1 ? 'item' : 'items'} pending
                </p>
              </div>
              <ArrowDownTrayIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Click to backup {backup.type.toLowerCase()}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
