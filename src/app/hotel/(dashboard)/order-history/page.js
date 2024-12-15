'use client';

import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useHotelAuth } from '../../contexts/AuthContext';

export default function OrderHistory() {
  const { loading } = useHotelAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState([]);

  // Delete order handler
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      const response = await fetch(`/api/hotel/bills/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bill_id: orderId }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        toast.success('Order deleted successfully');
        // Refresh the orders list
        fetchOrders();
      } else {
        toast.error(data.message || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  // fetch data
  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/hotel/bills/fetch');
      const data = await response.json();
      setOrders(data.output);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
      return [];
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">ORDER HISTORY</h1>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            placeholder="Search Table, Waiter, Payment Status or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${
              filter === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('qr')}
            className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${
              filter === 'qr'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            }`}
          >
            QR Orders
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-red-600">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">SR#</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Table</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Waiter</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Customer</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Type</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Balance</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Total</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Amount</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Payment Status</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders?.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {order?.TableId?.TableName || 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {order?.WaiterId?.FirstName || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {order?.CustomerId?.CustomerName || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {order?.Type || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {typeof order?.BalanceAmount === 'number' ? `Rs. ${order.BalanceAmount}` : 'Rs. -'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {typeof order?.TotalAmount === 'number' ? `Rs. ${order.TotalAmount}` : 'Rs. 0'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {typeof order?.Amount === 'number' ? `Rs. ${order.Amount}` : 'Rs. 0'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        <span className={`inline-flex rounded-full px-3 py-1 font-semibold leading-5 ${
                          order?.Status === 'Open' ? 'bg-green-200 text-green-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {order?.Status || "N/A"}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
                        <button
                          className="text-red-600 hover:text-red-900 mr-2"
                          title="View Order"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 mr-2"
                          title="Edit Order"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete Order"
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
