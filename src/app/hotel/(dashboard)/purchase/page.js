'use client';

import { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import AddPurchaseModal from './components/AddPurchaseModal';
import PurchaseList from './components/PurchaseList';
import { toast } from 'react-toastify';
import { fetchPurchases } from '../inventory/api';
import { FaTimes, FaEye } from 'react-icons/fa';

const Modal = ({ item, onClose }) => {
  return (
    <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg transform transition-all overflow-hidden scale-100 hover:scale-105">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Invoice No: {item.InvoiceNo}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-all"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
            {Object.entries({
              'Date': item.Date,
              'Payment Mode': item.PaymentMode,
              'Payment Status': item.PaymentStatus,
              'Amount Paid': item.AmountPaid,
              'Balance Amount': item.BalanceAmount,
              'Supplier Name': item.SupplierName,
              'Supplier Type': item.SupplierType,
              'Supplier Contact': item.Contact,
              'Supplier Address': item.Address,
              'Supplier Email': item.Email,
              'Supplier GSTIN': item.GSTIN
            }).map(([key, value]) => (
              <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="font-semibold text-gray-700">{key}:</p>
                <p className="text-lg text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PurchasePage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPurchases = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPurchases();
      if (data.returncode === 200) {
        console.log(data.output); // Log the fetched invoices data
        setInvoices(data.output);
      } else {
        toast.error(data.message || 'Failed to load purchases');
      }
    } catch (error) {
      toast.error(error.message || 'Error loading purchases');
    } finally {
      setIsLoading(false);
    }
  };

  const viewItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoIosArrowBack size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Purchase Management
          </h1>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Purchase
        </button>
      </div>

      <PurchaseList
        invoices={invoices}
        isLoading={isLoading}
        onRefresh={loadPurchases}
        onViewItem={viewItem}
      />

      {isAddModalOpen && (
        <AddPurchaseModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            loadPurchases();
            setIsAddModalOpen(false);
          }}
        />
      )}
      {isModalOpen && <Modal item={selectedItem} onClose={closeModal} />}
    </div>
  );
} 
