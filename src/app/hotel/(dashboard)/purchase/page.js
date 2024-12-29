'use client';

import { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import AddPurchaseModal from './components/AddPurchaseModal';
import PurchaseList from './components/PurchaseList';
import { toast } from 'react-toastify';
import { fetchPurchases } from '../inventory/api';

export default function PurchasePage() {
    const router = useRouter();
    const [invoices, setInvoices] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadPurchases = async () => {
        setIsLoading(true);
        try {
            const data = await fetchPurchases();
            if (data.returncode === 200) {
                setInvoices(data.output);
            } else {
                toast.error(data.message || 'Failed to load purchases');
            }
        } catch (error) {
            toast.error(error.message || 'Error loading purchases');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
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
        </div>
    );
} 