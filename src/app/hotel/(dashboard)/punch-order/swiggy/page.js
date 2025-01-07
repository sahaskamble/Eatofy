'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { useHotelAuth } from '@/app/hotel/contexts/AuthContext';
import { useReactToPrint } from 'react-to-print';
import { useHotkeys } from 'react-hotkeys-hook';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Switch } from '@headlessui/react';
import billsCrud from '@/app/offline/crud/Bills';
import menusCrud from '@/app/offline/crud/Menus';
import menuCategoryCrud from '@/app/offline/crud/MenuCategory';
import { useOffline } from '@/app/hotel/contexts/OfflineContext';

export default function TableOrderPage() {
  const router = useRouter();
  const { user, waiter_id } = useHotelAuth();
  const [loading, setLoading] = useState(true);
  const [table, setTable] = useState(null);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [existingBill, setExistingBill] = useState(null);
  const [existingOrder, setExistingOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [latestBillId, setLatestBillId] = useState(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: 'Cash',
    paymentStatus: 'Unpaid',
    amount: 0,
    discountPercentage: 0,
    balanceAmount: 0
  });
  const printComponentRef = useRef(null);
  const billPrintRef = useRef();
  const customerNameRef = useRef(null);
  const searchInputRef = useRef(null);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [reasonInput, setReasonInput] = useState('');
  const { isOffline, toggleOfflineMode } = useOffline();

  const handlePrint = useReactToPrint({
    contentRef: printComponentRef,
    documentTitle: 'KOT Print',
    onAfterPrint: () => {
      toast.success('Order Saved & KOT printed successfully');
      fetchData();
      // Add delay before redirect
    },
    onPrintError: (error) => {
      console.error('Print error:', error);
      toast.error('Failed to print KOT');
    },
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  const handlePrintBill = useReactToPrint({
    contentRef: billPrintRef,
    documentTitle: 'Bill Print',
    onAfterPrint: () => {
      toast.success('Bill printed successfully');
      setShowPaymentForm(false);
    },
    onPrintError: (error) => {
      console.error('Bill print error:', error);
      toast.error('Failed to print bill');
    },
    pageStyle: `
      @page {
        size: 50mm auto;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleKotPrint = async () => {
    if (cart.length === 0) {
      toast.error('Please add items to the order');
      return;
    }
    try {
      let data;
      if (isOffline) {
        const customer_name = customerDetails.name
        data = await billsCrud.createBill({
          customer_name: customer_name || null,
          contact: customerDetails.phone,
          email: customerDetails.email,
          type: 'Swiggy',
          waiter_id: waiter_id,
          hotel_id: user[0].hotelId,
          menu_data: cart.map(item => ({
            menu_id: item._id,
            quantity: item.quantity,
            total_amount: item.Price,
            note: item.note || '',
          }))
        });
      } else {
        const response = await fetch('/api/hotel/bills/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'Swiggy',
            waiter_id: waiter_id,
            hotel_id: user[0].hotelId,
            customer_name: customerDetails.name,
            contact: customerDetails.phone,
            email: customerDetails.email,
            menu_data: cart.map(item => ({
              menu_id: item._id,
              quantity: item.quantity,
              total_amount: item.Price,
              note: item.note || '',
            }))
          }),
        });
        data = await response.json();
      }

      if (data.returncode === 200) {
        handlePrint();
      } else {
        toast.error(data.message || 'Failed to generate KOT');
      }
    } catch (error) {
      console.error('KOT generation error:', error);
      toast.error('Failed to generate KOT');
    }
  };

  const handleKotUpdatePrint = async () => {
    if (cart.length === 0) {
      toast.error('Please add items to the order');
      return;
    }

    if (existingBill) {
      try {
        let data;
        if (isOffline) {
          const ordersInfo = cart.map(item => ({
            menu_id: item._id,
            quantity: item.quantity,
            total_amount: item.Price,
            note: item.note || '',
          }));
          data = await billsCrud.addOrdersInBill(latestBillId, ordersInfo);
        } else {
          const requestData = {
            bill_id: latestBillId,
            response_data: cart.map(item => ({
              menu_id: item._id,
              quantity: item.quantity,
              total_amount: item.Price,
              note: item.note || '',
            }))
          };
          const response = await fetch('/api/hotel/bills/order/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
          data = await response.json();
        }

        if (data.returncode === 200) {
          handlePrint();
        } else {
          toast.error(data.message || 'Failed to generate Updated KOT');
        }
      } catch (error) {
        console.error('KOT generation error:', error);
        toast.error('Failed to generate Updated KOT');
      }
    } else {
      toast.error('Please generate KOT first');
    }
  };

  const handlePayment = async () => {
    setShowPaymentForm(false);
    const disamt = (paymentDetails.amount * paymentDetails.discountPercentage) / 100;
    try {
      let data;
      if (isOffline) {
        data = await billsCrud.BillPayment({
          bill_id: latestBillId,
          payment_mode: paymentDetails.paymentMethod,
          payment_status: paymentDetails.paymentStatus,
          balance_amount: paymentDetails.balanceAmount,
          discount_rate: paymentDetails.discountPercentage,
          discount_amount: disamt,
        });
      } else {
        const response = await fetch('/api/hotel/bills/edit/payment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bill_id: latestBillId,
            payment_mode: paymentDetails.paymentMethod,
            payment_status: paymentDetails.paymentStatus,
            balance_amount: paymentDetails.balanceAmount,
            discount_rate: paymentDetails.discountPercentage,
            discount_amount: disamt,
          }),
        });
        data = await response.json();
      }
      if (data.returncode === 200) {
        toast.success('Payment successful');
        handlePrintBill();
      } else {
        toast.error(data.message || 'Failed to process payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to process payment');
    }
  };

  const calculateFinalAmount = (amount, discountPercentage) => {
    const discount = (amount * discountPercentage) / 100;
    return amount - discount;
  };

  const calculateTotal = () => {
    const cartTotal = cart.reduce((total, item) => total + (item.Price * item.quantity), 0);
    const existingTotal = existingOrder?.reduce((total, item) => total + (item.TotalAmount || 0), 0) || 0;
    return cartTotal + existingTotal;
  };

  const handleContextMenu = (e, itemId) => {
    e.preventDefault();
    setExpandedNoteId(expandedNoteId === itemId ? null : itemId);
    setReasonInput('');
  };

  const handleNoteSubmit = async (itemId) => {
    try {
      // Here you can add the API call to update the note
      // For now, just closing the note input
      setExpandedNoteId(null);
      setReasonInput('');
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note');
    }
  };

  useHotkeys('shift+k', () => {
    if (cart.length > 0) {
      existingBill?._id ? handleKotUpdatePrint() : handleKotPrint();
    } else {
      toast.error('Cart is empty');
    }
  });

  useHotkeys('shift+c', () => {
    setShowCustomerForm(true);
    setTimeout(() => {
      customerNameRef.current?.focus();
    }, 100);
  });

  useHotkeys('shift+p', () => {
    setShowPaymentForm(true);
    setPaymentDetails(prev => ({
      ...prev,
      amount: calculateTotal()
    }));
  });

  useHotkeys('shift+b', () => {
    handlePrintBill();
    handleTableStatusUpdate('Bill Pending');
  });

  useHotkeys('esc', () => {
    setShowPaymentForm(false);
    setShowCustomerForm(false);
  });

  // Focus search input after data is loaded and only if there's no existing bill
  useEffect(() => {
    if (!loading && Array.isArray(existingBill) && existingBill.length === 0) {
      searchInputRef.current?.focus();
    }
  }, [loading, existingBill]);

  const fetchData = useCallback(async () => {
    try {
      let menusData = null;
      let categoryData = null;

      if (isOffline) {
        // Fetch menus
        menusData = await menusCrud.readSwiggyMenus();
        // Fetch categories
        categoryData = await menuCategoryCrud.readMenuCategories();
      } else {
        const response = await fetch(`/api/hotel/bill_order/swiggy`);
        const swiggyResponse = await response.json();
        if (swiggyResponse.returncode === 200 && swiggyResponse.output.length > 0) {
          const { Categories, Menus } = swiggyResponse.output[0];
          console.log(Menus, Categories);
          menusData = { output: Menus, returncode: 200 };
          categoryData = { output: Categories, returncode: 200 };
        }
      }

      console.log(menusData)
      if (menusData?.returncode === 200) {
        setMenus(menusData.output);
      }

      if (categoryData?.returncode === 200) {
        setCategories(categoryData.output);
      }

      setLoading(false);
    } catch (error) {
      toast.error('Failed to load data');
      setLoading(false);
    }
  }, [isOffline]);

  useEffect(() => {
    fetchData();
  }, [isOffline]);

  const handleOrderItemDelete = async (orderId) => {
    try {
      const response = await fetch(`/api/hotel/bills/order/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          reason: reasonInput,
        }),
      });
      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Order deleted successfully');
        fetchData();
      } else {
        toast.error(data.message || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  const handleAddToCart = (item) => {
    setCart(prev => {
      const existingItem = prev.find(i => i._id === item._id);
      if (existingItem) {
        return prev.map(i =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, delta) => {
    setCart(prev => {
      const newCart = prev.map(item => {
        if (item._id === itemId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          if (newQuantity === 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return newCart.filter(Boolean);
    });
  };

  const handleRemoveItem = (itemId) => {
    setCart(prev => prev.filter(item => item._id !== itemId));
  };

  const filteredMenus = useMemo(() => {
    return menus.filter(menu => {
      const matchesSearch = menu?.DishId?.DishName?.toLowerCase().includes(searchQuery.toLowerCase()) || menu?.DishId?.Code?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || menu?.DishId?.CategoryId?._id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menus, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Left side - Menu */}
      <div className="flex-1 overflow-y-auto pr-[400px]">

        <div className="p-6">
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

          {/* Search and Category Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="p-2 bg-white mb-6 flex justify-center items-center">
            <div className="w-full flex gap-2 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${!selectedCategory
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                All
              </button>
              {categories?.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === category._id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {category.CategoryName}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenus?.map((item) => (
              <div key={item._id}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(item);
                }}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item?.DishId?.DishName}</h3>
                    {item?.DishId?.Type && (
                      <div className="w-6 h-6">
                        {item.DishId.Type.toLowerCase() === 'veg' && (
                          <div className="w-5 h-5 border-2 border-green-600 p-0.5">
                            <div className="w-full h-full rounded-full bg-green-600"></div>
                          </div>
                        )}
                        {item.DishId.Type.toLowerCase() === 'non-veg' && (
                          <div className="w-5 h-5 border-2 border-red-600 p-0.5">
                            <div className="w-full h-full rounded-full bg-red-600"></div>
                          </div>
                        )}
                        {item.DishId.Type.toLowerCase() === 'eggetarian' && (
                          <div className="w-5 h-5 border-2 border-yellow-600 p-0.5">
                            <div className="w-full h-full rounded-full bg-yellow-600"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-black font-semibold">₹{item?.Price}</p>
                    <p className="text-sm text-gray-700">Code: {item.DishId?.Code || 'N/A'}</p>
                    <button
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Cart */}
      <div className="w-[400px] bg-white shadow-lg fixed right-0 h-screen flex flex-col">
        {/* Cart Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">ITEMS</h2>
            <button
              onClick={() => setShowCustomerForm(true)}
              disabled={existingBill?._id}
              className={`col-span-1 px-4 py-2 rounded-lg transition-colors ${existingBill?._id
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
                }`}
            >
              Add Customer
            </button>
          </div>
          <div className="flex justify-between text-sm font-semibold text-gray-600">
            <span>QTY</span>
            <span>PRICE</span>
          </div>
        </div>

        {/* Cart Items - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          {existingBill && (
            <div className="space-y-4 p-4">
              {existingOrder?.map((item, index) => (
                <div
                  key={`${item._id}-${index}`}
                  onContextMenu={(e) => handleContextMenu(e, item._id)}
                  className={`flex flex-col justify-start items-center p-3 bg-gray-100 rounded-lg ${item?.Status === 'Cancelled' ? 'line-through grayscale' : ''
                    }`}
                >
                  <div className='flex justify-between w-full'>
                    <div className="w-[65%]">
                      <h3 className="font-medium">{item?.MenuId?.DishId?.DishName}</h3>
                      <p className="text-gray-600">{item?.MenuId?.DishId?.Description}</p>
                      {item.Note && (
                        <p className="text-sm text-gray-500">Note: {item.Note}</p>
                      )}
                      {/* Slide down note input */}
                    </div>
                    <div className="flex items-center">
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Qty: {item.Quantity}
                      </div>
                      <div className="text-lg font-semibold ml-4">₹{item?.TotalAmount}</div>
                    </div>
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden w-full ${expandedNoteId === item._id ? 'max-h-24 mt-3' : 'max-h-0'
                      }`}
                  >
                    <div className="flex justify-between gap-2">
                      <input
                        type="text"
                        value={reasonInput}
                        onChange={(e) => setReasonInput(e.target.value)}
                        placeholder="Reason to delete..."
                        className="flex-1 px-3 py-1 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleNoteSubmit(item._id);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleOrderItemDelete(item._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show total only for existing order when cart is empty */}
              {cart.length === 0 && (
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span>₹{existingOrder?.reduce((sum, item) => sum + (item.TotalAmount || 0), 0)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            {cart.length === 0 && existingBill ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <ShoppingBagIcon className="h-12 w-12 mb-2" />
                <p>Your new cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {cart.map(item => (
                  <div
                    key={item._id}
                    className={`${styles.cartItem} flex items-center justify-between p-3 bg-gray-100 rounded-lg`}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{item?.DishId?.DishName}</h3>
                      {/* <p className="text-sm text-gray-500">Code: {item.DishId?.DishCode || 'N/A'}</p> */}
                      <p className="text-gray-600">{item?.DishId?.Description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-white rounded-lg px-2 py-1">
                        <button
                          onClick={() => handleUpdateQuantity(item._id, -1)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item._id, 1)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-semibold">₹{item.Price * item.quantity}</span>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Show total only for new cart items */}
                {cart.length > 0 && (
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>₹{cart.reduce((total, item) => total + (item.Price * item.quantity), 0)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="border-t p-4 bg-white">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                if (existingBill) {
                  setPaymentDetails(prev => ({
                    ...prev,
                    amount: calculateTotal()
                  }));
                  setShowPaymentForm(true);
                } else {
                  toast.error('No bill to pay');
                }
              }}
              disabled={!existingBill}
              className={`col-span-1 py-2 rounded-lg transition-colors ${!existingBill
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
                }`}
            >
              Pay
            </button>
            <button
              onClick={() => { handlePrintBill(); handleTableStatusUpdate('Bill Pending') }}
              disabled={!existingBill}
              className={`col-span-1 py-2 rounded-lg transition-colors ${!existingBill
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
                }`}
            >
              Print Bill
            </button>
            <button
              onClick={() => { existingBill?._id ? handleKotUpdatePrint() : handleKotPrint(); }}

              disabled={cart.length === 0 && !existingBill}
              className={`col-span-1 py-2 rounded-lg transition-colors ${cart.length === 0 && !existingBill
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
                }`}
            >
              {existingBill?._id ? 'Update Kot' : 'Print Kot'}
            </button>
          </div>
        </div>
      </div>

      {/* Customer Form Slide-over */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${showCustomerForm ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-all duration-300 ease-out ${showCustomerForm ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Add Customer</h2>
                <button
                  onClick={() => setShowCustomerForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    ref={customerNameRef}
                    type="text"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter customer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={customerDetails.date}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCustomerForm(false)}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle form submission here
                    console.log('Customer details:', customerDetails);
                    setShowCustomerForm(false);
                  }}
                >
                  Save Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPaymentForm(false)} />

          {/* Slide-in panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            {/* Header - Fixed */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Form Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <form className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentDetails(prev => ({ ...prev, paymentMethod: 'Cash' }))}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${paymentDetails.paymentMethod === 'Cash'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Cash
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentDetails(prev => ({ ...prev, paymentMethod: 'Credit-card' }))}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${paymentDetails.paymentMethod === 'Credit-card'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentDetails(prev => ({ ...prev, paymentMethod: 'UPI' }))}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${paymentDetails.paymentMethod === 'UPI'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      UPI
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentDetails(prev => ({ ...prev, paymentStatus: 'Paid', balanceAmount: 0 }))}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${paymentDetails.paymentStatus === 'Paid'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Paid
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentDetails(prev => ({ ...prev, paymentStatus: 'Unpaid' }))}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${paymentDetails.paymentStatus === 'Unpaid'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Unpaid
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentDetails(prev => ({ ...prev, paymentStatus: 'Part-paid' }))}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${paymentDetails.paymentStatus === 'Part-paid'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Part Paid
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentDetails(prev => ({ ...prev, paymentStatus: 'Eatoyconis' }))}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${paymentDetails.paymentStatus === 'Eatoyconis'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Eatoyconis
                    </button>
                  </div>
                </div>

                {/* Balance Amount - Only show for unpaid or part-paid */}
                {(paymentDetails.paymentStatus === 'Unpaid' || paymentDetails.paymentStatus === 'Part-paid') && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Balance Amount</label>
                    <input
                      type="number"
                      value={paymentDetails.balanceAmount}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, balanceAmount: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter balance amount"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Menu Total
                    </label>
                    <input
                      type="number"
                      value={paymentDetails.amount}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={paymentDetails.discountPercentage}
                      onChange={(e) => {
                        const value = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                        setPaymentDetails(prev => ({ ...prev, discountPercentage: value }));
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                      placeholder="Enter discount %"
                    />
                  </div>
                </div>

                {paymentDetails.discountPercentage > 0 && (
                  <div className="mt-2 p-3 text-base bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Menu Total:</span>
                      <span className="font-medium">₹{paymentDetails.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount ({paymentDetails.discountPercentage}%):</span>
                      <span className="font-medium text-red-500">- ₹{(paymentDetails.amount * paymentDetails.discountPercentage / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-800">Final Amount:</span>
                      <span className="text-green-600">₹{calculateFinalAmount(paymentDetails.amount, paymentDetails.discountPercentage).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Action Buttons - Fixed */}
            <div className="border-t border-gray-200 p-6">
              <button
                onClick={handlePayment}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print component */}
      <div style={{ display: 'none' }}>
        <div ref={printComponentRef} style={{ width: '50mm', padding: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '0px' }}>
            <h2 style={{ margin: '0', fontSize: '16px' }}>** KOT **</h2>
            <div>Type: Dine-In</div>
            <div>Date: {new Date().toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}</div>
            <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />
          </div>

          {/* Table Name */}
          <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
            {table?.TableName || ''}
            <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />
          </div>

          {/* Items Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>Item</span>
            <span style={{ fontWeight: 'bold' }}>Qty</span>
          </div>
          <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />

          {/* Items */}
          <div>
            {Array.isArray(cart) && cart.map((item, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item?.DishId?.DishName?.substring(0, 20) || ''}</span>
                  <span>{item?.quantity || ''}</span>
                </div>
                {item?.note && (
                  <div style={{ fontSize: '10px', fontStyle: 'italic', marginLeft: '10px', color: '#666' }}>
                    Note: {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ borderBottom: '1px dashed black', margin: '10px 0' }} />
        </div>
      </div>

      {/* Bill Print Component (Hidden) */}
      <div style={{ display: 'none' }}>
        <div ref={billPrintRef} style={{ width: '50mm', padding: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '0px' }}>
            <h2 style={{ margin: '0', fontSize: '16px' }}>** BILL **</h2>
            <div>Table: {table?.TableName || ''}</div>
            <div>Date: {new Date().toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}</div>
            <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />
          </div>

          {/* Items */}
          <div>
            {existingOrder?.map((item, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item?.MenuId?.DishId?.DishName?.substring(0, 20)}</span>
                  <span>{item?.Quantity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span>₹{item?.TotalAmount}</span>
                </div>
                {item?.Note && (
                  <div style={{ fontSize: '10px', fontStyle: 'italic' }}>
                    Note: {item.Note}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />

          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>₹{existingOrder?.reduce((sum, item) => sum + (item.TotalAmount || 0), 0)}</span>
          </div>

          {/* Payment Details */}
          <div style={{ marginTop: '10px' }}>
            <div>Payment Method: {paymentDetails.paymentMethod.toUpperCase()}</div>
            <div>Amount Paid: ₹{paymentDetails.amount}</div>
            {paymentDetails.note && <div>Note: {paymentDetails.note}</div>}
          </div>

          <div style={{ borderBottom: '1px dashed black', margin: '10px 0' }} />

          {/* Footer */}
          <div style={{ textAlign: 'center', fontSize: '10px' }}>
            <div>Thank you for dining with us!</div>
            <div>Please visit again</div>
          </div>
        </div>
      </div>
    </div>
  );
}
