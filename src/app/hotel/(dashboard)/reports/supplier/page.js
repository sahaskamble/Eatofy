'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';
import { FaUsers, FaBoxes } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Supplier_Report = () => {

  const router = useRouter();

  // Table
  const [Table, setTable] = useState([]);

  // Search 
  const [searchQuery, setSearchQuery] = useState('');

  // New state for statistics
  const [stats, setStats] = useState({
    totalSuppliers: 0,
    paidAmount: 0,
    balanceAmount: 0,
    supplierTypes: {}
  });

  // Add new state for purchase data
  const [purchaseData, setPurchaseData] = useState([]);

  // Add fetch function for purchase data
  const fetchPurchaseData = async () => {
    try {
      const response = await fetch(`/api/hotel/inventory/purchase/fetch`);
      const data = await response.json();
      if (data.returncode === 200) {
        setPurchaseData(data.output);
      }
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    }
  };

  // PDF Generation function
  const handlePdfGeneration = async () => {

    const today = new Date();
    const to_default = today.toISOString().split("T")[0];

    const inputData = document.getElementById("Report");  // Replace with your specific element if needed

    // Take a screenshot of the whole page
    const canvas = await html2canvas(inputData, { scale: 2 });

    // Get the image dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 270;  // Updated width of the Image for landscape mode in mm
    const pageWidth = 297;  // Updated width of the PDF page (in mm) for landscape mode
    const pageHeight = 210; // Updated height of the PDF page in mm for landscape mode
    const imgHeight = ((canvas.height * imgWidth) / canvas.width);
    const heightLeft = imgHeight;

    // Calculate margins to center the image on the page
    const xOffset = (pageWidth - imgWidth) / 2;  // Horizontal centering

    // Create a new PDF document in landscape mode ('l' stands for landscape)
    const pdf = new jsPDF('l', 'mm', 'a4');
    let position = 10;

    // Add the image to the first page
    pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
    let remainingHeight = heightLeft - pageHeight + 20;

    // Loop through the rest of the image, adding new pages as needed
    while (remainingHeight > 0) {
      position = remainingHeight - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
    }

    // Save the PDF
    pdf.save(`Supplier_Report (${to_default}).pdf`);
  };

  const fetchAllCustomers = async () => {
    try {

      const response = await fetch(`/api/hotel/inventory/suppliers/fetch`);

      const data = await response.json();

      if (data.returncode === 200) {

        // Employee
        setTable(data.output);

      } else {
        alert("Failed to fetch");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    fetchAllCustomers();
    fetchPurchaseData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTable = Table.filter((supplier) =>
    supplier.SupplierName.toLowerCase().includes(searchQuery.toLowerCase()) || supplier.Contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate statistics when Table data changes
  useEffect(() => {
    if (Table.length > 0) {
      // Calculate total paid and balance amounts
      const paidAmount = purchaseData.reduce((total, purchase) =>
        total + (purchase.AmountPaid || 0), 0);

      const balanceAmount = purchaseData.reduce((total, purchase) =>
        total + (purchase.BalanceAmount || 0), 0);

      // Count supplier types
      const supplierTypes = Table.reduce((acc, supplier) => {
        const type = supplier.SupplierType || 'Unspecified';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalSuppliers: Table.length,
        paidAmount,
        balanceAmount,
        supplierTypes
      });
    }
  }, [Table, purchaseData]);

  // Create data for supplier types chart
  const supplierTypeData = Object.entries(stats.supplierTypes).map(([name, count]) => ({
    name,
    count
  }));

  // Add payment mode distribution data
  const paymentModeData = [
    {
      name: 'Cash',
      amount: purchaseData.reduce((total, p) => total + (p.Cash || 0), 0)
    },
    {
      name: 'UPI',
      amount: purchaseData.reduce((total, p) => total + (p.UPI || 0), 0)
    },
    {
      name: 'Credit Card',
      amount: purchaseData.reduce((total, p) => total + (p.CreditCard || 0), 0)
    }
  ];

  // Add this function before the return statement to calculate supplier totals
  const calculateSupplierTotals = (supplierId) => {
    const supplierPurchases = purchaseData.filter(p => p.SupplierId._id === supplierId);

    const totalPaid = supplierPurchases.reduce((total, purchase) =>
      total + (purchase.AmountPaid || 0), 0);

    const totalBalance = supplierPurchases.reduce((total, purchase) =>
      total + (purchase.BalanceAmount || 0), 0);

    return { totalPaid, totalBalance };
  };

  return (
    <div id="Report" className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8">
        {/* Header */}
        <div className='flex justify-between'>
          <div className="flex gap-6 items-center mb-8">
            <div className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer">
              <IoIosArrowBack
                size={32}
                className="text-red-500 hover:text-red-600"
                onClick={() => router.back()}
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Supplier Reports
              </h1>
              <p className="text-gray-500 mt-1">Overview of your supplier statistics and transactions</p>
            </div>
          </div>
          <div>
            <button
              onClick={handlePdfGeneration}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              Export PDF <FaRegFilePdf />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border-b-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <FaUsers className="text-blue-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Suppliers</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-800">{stats.totalSuppliers}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border-b-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-50 p-3 rounded-xl">
                <MdAttachMoney className="text-green-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">Paid Amount</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-800">₹{stats.paidAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border-b-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-50 p-3 rounded-xl">
                <MdAttachMoney className="text-orange-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">Balance Amount</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-800">₹{stats.balanceAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border-b-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-3 rounded-xl">
                <FaBoxes className="text-purple-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">Supplier Types</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-800">{Object.keys(stats.supplierTypes).length}</p>
            </div>
          </div>
        </div>

        {/* Supplier Type Distribution Chart */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Supplier Type Distribution</h2>
              <p className="text-sm text-gray-500">Distribution of suppliers by type</p>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierTypeData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="url(#colorCount)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Mode Distribution Chart */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Payment Distribution</h2>
              <p className="text-sm text-gray-500">Overview of payment methods used</p>
            </div>
            <select className="px-4 py-2 rounded-lg bg-gray-50 border-none text-sm text-gray-600 focus:ring-2 focus:ring-red-500">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentModeData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="amount" fill="url(#colorAmount)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Search and PDF Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Supplier Name or Contact..."
              className="w-full px-4 py-3 pl-12 rounded-xl bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Supplier Data</h2>
                <p className="text-sm text-gray-500">Complete list of all suppliers</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GSTIN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Payment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTable.map((row, index) => {
                    const { totalPaid, totalBalance } = calculateSupplierTotals(row._id);
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.SupplierName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.SupplierType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.GSTIN}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Address}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="text-green-600 font-medium">₹{totalPaid.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="text-red-600 font-medium">₹{totalBalance.toLocaleString()}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supplier_Report;
