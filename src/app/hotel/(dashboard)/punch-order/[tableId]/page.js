'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  PrinterIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import styles from './styles.module.css';
import { useHotelAuth } from '@/app/hotel/contexts/AuthContext';
import { useReactToPrint } from 'react-to-print';
import { useHotkeys } from 'react-hotkeys-hook';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function TableOrderPage() {
  const params = useParams();
  const router = useRouter();
  const { user, fetchWaiterId } = useHotelAuth();
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
  const waiter_id = fetchWaiterId();
  const [kotNumber, setKotNumber] = useState(() => {
    const savedKotNumber = localStorage.getItem('lastKotNumber');
    return savedKotNumber ? parseInt(savedKotNumber) : 0;
  });

  const getNextKotNumber = useCallback(() => {
    const nextNumber = kotNumber + 1;
    setKotNumber(nextNumber);
    localStorage.setItem('lastKotNumber', nextNumber.toString());
    return nextNumber;
  }, [kotNumber]);

  const handlePrint = useReactToPrint({
    contentRef: printComponentRef,
    documentTitle: 'KOT Print',
    onAfterPrint: () => {
      toast.success('Order Saved & KOT printed successfully');
      fetchData();
      setTimeout(() => {
        router.push('/hotel/punch-order');
      }, 100.0);
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
      setTimeout(() => {
        router.push('/hotel/punch-order');
      }, 100.0);
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
      const currentKotNumber = getNextKotNumber();

      const response = await fetch('/api/hotel/bills/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'Dine-In',
          table_id: params.tableId,
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

      const data = await response.json();
      if (data.returncode === 200) {
        handlePrint();
      } else {
        toast.error(data.message || 'Failed to generate KOT');
        setKotNumber(prev => prev - 1);
        localStorage.setItem('lastKotNumber', (currentKotNumber - 1).toString());
      }
    } catch (error) {
      console.error('KOT generation error:', error);
      toast.error('Failed to generate KOT');
    }
  };

  const handleTableStatusUpdate = async (Status) => {
    try {
      const response = await fetch('/api/hotel/tables/edit/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table_id: params.tableId,
          status: Status,
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        toast.success('Table status updated successfully');
      } else {
        toast.error(data.message || 'Failed to update table status');
      }
    } catch (error) {
      console.error('Table status update error:', error);
      toast.error('Failed to update table status');
    }
  };

  const handleKotUpdatePrint = async () => {
    if (cart.length === 0) {
      toast.error('Please add items to the order');
      return;
    }

    if (existingBill) {
      try {
        const currentKotNumber = getNextKotNumber();

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

        const data = await response.json();

        if (data.returncode === 200) {
          setExistingOrder(data.output);
          handlePrint();
        } else {
          toast.error(data.message || 'Failed to generate Updated KOT');
          setKotNumber(prev => prev - 1);
          localStorage.setItem('lastKotNumber', (currentKotNumber - 1).toString());
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

      const data = await response.json();
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

  useEffect(() => {
    console.log('existingBill:', existingBill);
    if (!loading && Array.isArray(existingBill) && existingBill.length === 0) {
      searchInputRef.current?.focus();
    }
  }, [loading, existingBill]);

  const fetchData = useCallback(async () => {
    try {
      const tableResponse = await fetch(`/api/hotel/bill_order/dine_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table_id: params.tableId,
        }),
      });
      const tableData = await tableResponse.json();
      if (tableData.returncode === 200) {
        const latestBill = tableData.output[0].ExistingBill;
        setExistingBill(latestBill);
        setLatestBillId(latestBill?._id);
        setExistingOrder(latestBill?.Orders);
        setCart([]);

        if (tableData.output?.[0]) {
          const { TableInfo, Categories, Menus } = tableData.output[0];
          setTable(TableInfo);
          setCategories(Categories);
          setMenus(Menus);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
      setLoading(false);
    }
  }, [params.tableId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      <div className="flex-1 overflow-y-auto pr-[400px]">
        <div className="p-6">
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

      <div className="w-[400px] bg-white shadow-lg fixed right-0 h-screen flex flex-col">
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
              onClick={() => { 
                if (existingBill?._id) {
                  handleKotUpdatePrint();
                } else {
                  handleKotPrint();
                }
              }}
              disabled={cart.length === 0 && !existingBill}
              className={`col-span-1 py-2 rounded-lg transition-colors ${
                cart.length === 0 && !existingBill
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {existingBill?._id ? 'Update Kot' : 'Print Kot'}
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${showCustomerForm ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-all duration-300 ease-out ${showCustomerForm ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col">
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

      {showPaymentForm && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPaymentForm(false)} />

          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

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

      {/* Kot Print Component */}
      <div style={{ display: 'none' }}>
        <div ref={printComponentRef} style={{ width: '80mm', padding: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
          <div style={{ textAlign: 'center', marginBottom: '0px' }}>
            <h2 style={{ margin: '0', fontSize: '16px' }}>** KOT **</h2>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>KOT #: {kotNumber}</div>
            <div>Type: Dine-In</div>
            <div>Time: {new Date().toLocaleString('en-IN', {
              // day: '2-digit',
              // month: '2-digit',
              // year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}</div>
            <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />
          </div>

          <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
            {table?.TableName || ''}
            <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>Item</span>
            <span style={{ fontWeight: 'bold' }}>Qty</span>
          </div>
          <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />

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

      {/* Bill Print Component */}
      <div style={{ display: 'none' }}>
        <div ref={billPrintRef} style={{ width: '80mm', padding: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h2 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Appniche</h2>
            <div style={{ fontSize: '12px', margin: '5px 0' }}>GST no: {user[0]?.gstNumber || 'N/A'}</div>
            <div style={{ fontSize: '12px' }}>
              Date: {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>
              {customerDetails.name && `Customer: ${customerDetails.name}`}
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid black' }}>
                <th style={{ textAlign: 'left', padding: '5px 0' }}>Item</th>
                <th style={{ textAlign: 'center', padding: '5px 0' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '5px 0' }}>Price</th>
                <th style={{ textAlign: 'right', padding: '5px 0' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {existingOrder?.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px dotted #ccc' }}>
                  <td style={{ textAlign: 'left', padding: '5px 0' }}>
                    {item?.MenuId?.DishId?.DishName?.substring(0, 20)}
                  </td>
                  <td style={{ textAlign: 'center', padding: '5px 0' }}>
                    {item?.Quantity}
                  </td>
                  <td style={{ textAlign: 'right', padding: '5px 0' }}>
                    {(item?.TotalAmount / item?.Quantity).toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'right', padding: '5px 0' }}>
                    {item?.TotalAmount?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Section */}
          <div style={{ borderTop: '1px solid black', paddingTop: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
              <span>Sub-Total</span>
              <span>{existingOrder?.reduce((sum, item) => sum + (item.TotalAmount || 0), 0).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
              <span>Quantity</span>
              <span>{existingOrder?.reduce((sum, item) => sum + (item.Quantity || 0), 0)}</span>
            </div>
            {paymentDetails.discountPercentage > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                <span>Discount ({paymentDetails.discountPercentage}%)</span>
                <span>-{((existingOrder?.reduce((sum, item) => sum + (item.TotalAmount || 0), 0) * paymentDetails.discountPercentage / 100).toFixed(2))}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
              <span>CGST (9%)</span>
              <span>{(existingOrder?.reduce((sum, item) => sum + (item.TotalAmount || 0), 0) * 0.09).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
              <span>SGST (9%)</span>
              <span>{(existingOrder?.reduce((sum, item) => sum + (item.TotalAmount || 0), 0) * 0.09).toFixed(2)}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              margin: '5px 0',
              borderTop: '1px solid black',
              paddingTop: '5px',
              fontWeight: 'bold'
            }}>
              <span>Grand Total</span>
              <span>{(
                existingOrder?.reduce((sum, item) => sum + (item.TotalAmount || 0), 0) * 1.18 -
                (existingOrder?.reduce((sum, item) => sum + (item.TotalAmount || 0), 0) * paymentDetails.discountPercentage / 100
              ).toFixed(2))}</span>
            </div>
          </div>

          {/* Footer */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '20px',
            borderTop: '1px dashed black',
            paddingTop: '10px',
            fontSize: '10px' 
          }}>
            !!! Thank You visit us again !!!
          </div>
        </div>
      </div>
    </div>
  );
}
