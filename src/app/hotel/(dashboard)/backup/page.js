'use client'

import { useEffect, useState } from 'react';
import { ArrowUpTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import billsCrud from '@/app/offline/crud/Bills';

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
      const backupCheck = await billsCrud.getHotelBills();
      const pending = [];
      if (backupCheck.output.length > 0) {
        pending.push({ type: 'Bills', count: backupCheck.output.length });
      }
      setPendingBackups(pending);
    } catch (error) {
      toast.error('Error checking pending backups');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async (type) => {
    try {
      let result;
      switch (type) {
        case 'Bills':
          result = await billsCrud.syncToServer();
          break;
        default:
          throw new Error('Invalid backup type');
      }

      console.log('Backup result:', result);

      if (result.returncode === 200) {
        toast.success(`${type} backed up successfully`);
        setPendingBackups([]);
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
              <ArrowUpTrayIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Click to backup {backup.type.toLowerCase()}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
