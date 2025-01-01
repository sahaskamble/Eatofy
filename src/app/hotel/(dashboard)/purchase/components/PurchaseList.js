'use client';
import { useEffect, useState } from 'react';
import EditPurchaseModal from './EditPurchaseModal';
import { toast } from 'react-toastify';
import { fetchSuppliers } from '../../supplier_management/api';

export default function PurchaseList({ invoices, isLoading, onRefresh }) {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [suppliers, setSuppliers] = useState(null);

    useEffect(() => {
        loadSuppliers();
    }, [])

    const loadSuppliers = async () => {
        try {
            const data = await fetchSuppliers();
            if (data.returncode === 200) {
                setSuppliers(data.output);
            } else {
                toast.error(data.message || 'Failed to load suppliers');
            }
        } catch (error) {
            toast.error('Error loading suppliers');
            console.error('Error:', error);
        }
    };

    const handleDelete = async (invoiceId) => {
        if (!confirm('Are you sure you want to delete this invoice?')) return;

        try {
            const response = await fetch('/api/hotel/inventory/purchase/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ invoice_id: invoiceId }),
            });

            const data = await response.json();
            if (data.returncode === 200) {
                toast.success('Invoice deleted successfully');
                onRefresh();
            } else {
                toast.error(data.message || 'Failed to delete invoice');
            }
        } catch (error) {
            console.error('Error deleting invoice:', error);
            toast.error('Failed to delete invoice. Please try again.');
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'Paid': 'bg-green-100 text-green-800',
            'Partial': 'bg-yellow-100 text-yellow-800',
            'Pending': 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

    console.log(suppliers)

    if (isLoading) {
        return <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>;
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoices.map((invoice) => (
                                <tr key={invoice._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.InvoiceNo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(invoice.Date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{suppliers.map((s)=>( s._id === invoice.SupplierId ? s.SupplierName : 'N/A'))}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{invoice.AmountPaid}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(invoice.PaymentStatus)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedInvoice(invoice);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(invoice._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isEditModalOpen && (
                <EditPurchaseModal
                    invoice={selectedInvoice}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedInvoice(null);
                    }}
                    onSuccess={() => {
                        onRefresh();
                        setIsEditModalOpen(false);
                        setSelectedInvoice(null);
                    }}
                />
            )}
        </>
    );
} 