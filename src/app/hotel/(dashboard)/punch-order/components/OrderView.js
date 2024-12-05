'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  MinusIcon, 
  PrinterIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

export default function OrderView({ 
  order, 
  table, 
  onPayBill, 
  onAddItems,
  onUpdateQuantity 
}) {
  const [showPayment, setShowPayment] = useState(false);

  const orderSummary = {
    subtotal: order.menu_data.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    tax: order.menu_data.reduce((sum, item) => sum + (item.price * item.quantity * 0.1), 0),
    total: order.menu_data.reduce((sum, item) => sum + (item.price * item.quantity * 1.1), 0)
  };

  return (
    <div className="space-y-6">
      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Order Details</h2>
            <p className="text-gray-600">Order #{order._id.slice(-6)}</p>
          </div>
          <button
            onClick={() => onAddItems()}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Items
          </button>
        </div>

        <div className="divide-y">
          {order.menu_data.map((item) => (
            <div key={item.menu_id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price} per item</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onUpdateQuantity(item.menu_id, item.quantity - 1)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                    disabled={item.quantity <= 1}
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.menu_id, item.quantity + 1)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {item.note && (
                <p className="mt-1 text-sm text-gray-500">Note: {item.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Bill Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{orderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span>₹{orderSummary.tax.toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{orderSummary.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6">
          {!showPayment ? (
            <button
              onClick={() => setShowPayment(true)}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <CurrencyRupeeIcon className="h-5 w-5 mr-2" />
              Process Payment
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() => onPayBill('cash')}
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cash Payment
                </button>
                <button
                  onClick={() => onPayBill('card')}
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Card Payment
                </button>
              </div>
              <button
                onClick={() => onPayBill('upi')}
                className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                UPI Payment
              </button>
              <button
                onClick={() => setShowPayment(false)}
                className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <PrinterIcon className="h-5 w-5 mr-2" />
        Print Bill
      </button>
    </div>
  );
}
