'use client';

import { Switch } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { useOffline } from '../contexts/OfflineContext';

export default function OfflineSwitch() {
  const { isOffline, toggleOfflineMode } = useOffline();

  return (
    <div className="flex items-center mb-4">
      <Switch
        checked={isOffline}
        onChange={toggleOfflineMode}
        className={`${isOffline ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span className="sr-only">Toggle Offline/Online Mode</span>
        <span
          className={`${isOffline ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition`}
        />
      </Switch>
      <span className="ml-3 text-sm font-medium text-gray-900">
        {isOffline ? 'Offline' : 'Online'}
      </span>
    </div>
  );
}
