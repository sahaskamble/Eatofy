'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';
import { FaUsers, FaUserPlus, FaWallet } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Customer_Report = () => {

  const router = useRouter();

  // PDF Generation function
  const handlePdfGeneration = async () => {
    const today = new Date();
    const to_default = today.toISOString().split("T")[0];

    const inputData = document.getElementById("Customer_Report");  // Replace with your specific element if needed

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
    pdf.save(`Customer_Report (${to_default}).pdf`);
  };

  // Table
  const [Table, setTable] = useState([]);

  // Search 
  const [searchQuery, setSearchQuery] = useState('');

  const [stats, setStats] = useState({
    totalCustomers: 0,
    newCustomersThisMonth: 0,
    totalWalletPoints: 0,
    averageWalletPoints: 0
  });

  // New function to process customer data for the chart
  const processChartData = (customers) => {
    // Create a map to store customer counts by month
    const monthlyData = new Map();

    // Initialize all months with 0
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
      monthlyData.set(monthKey, 0);
    }

    // Count customers by month
    customers.forEach(customer => {
      // Assuming there's a createdAt field in your customer data
      // If you don't have this field, you'll need to add it to your database
      const createdAt = new Date(customer.createdAt);
      const monthKey = createdAt.toLocaleString('default', { month: 'short' }) + ' ' + createdAt.getFullYear();

      if (monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, monthlyData.get(monthKey) + 1);
      }
    });

    // Convert map to array for the chart
    return Array.from(monthlyData.entries()).map(([month, count]) => ({
      month,
      customers: count
    }));
  };

  // Modify fetchAllCustomers to include chart data processing
  const fetchAllCustomers = async () => {
    try {
      const response = await fetch(`/api/hotel/customers/fetch`);
      const data = await response.json();

      if (data.returncode === 200) {
        setTable(data.output);

        // Calculate statistics
        const total = data.output.length;
        const totalPoints = data.output.reduce((sum, customer) => sum + (customer.EatocoinsWallet || 0), 0);

        setStats({
          totalCustomers: total,
          newCustomersThisMonth: data.output.filter(customer => {
            const createdAt = new Date(customer.createdAt);
            const currentDate = new Date();
            return createdAt.getMonth() === currentDate.getMonth() &&
              createdAt.getFullYear() === currentDate.getFullYear();
          }).length,
          totalWalletPoints: totalPoints,
          averageWalletPoints: Math.round(totalPoints / total)
        });

        // Process data for chart
        setChartData(processChartData(data.output));
      } else {
        alert("Failed to fetch / No Customers to display");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add chart data state
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTable = Table.filter((bill) =>
    bill?.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill?.Contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-white/50 transition-all duration-300"
            >
              <IoIosArrowBack size={32} className="text-red-500" />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Customer Report
              </h1>
              <p className="text-gray-500 mt-1">Overview of customer statistics and growth</p>
            </div>
          </div>
          <button
            onClick={handlePdfGeneration}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group"
          >
            Download Report 
            <FaRegFilePdf className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 group hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-4 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-blue-500 text-3xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalCustomers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 group hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-4 bg-green-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FaUserPlus className="text-green-500 text-3xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-3xl font-bold text-green-600">{stats.newCustomersThisMonth}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500 group hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-4 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FaWallet className="text-purple-500 text-3xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalWalletPoints}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500 group hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-4 bg-orange-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FaWallet className="text-orange-500 text-3xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg. Points/Customer</p>
                <p className="text-3xl font-bold text-orange-600">{stats.averageWalletPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-sm mb-8 overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Customer Growth</h2>
            <p className="text-gray-500 text-sm mt-1">Monthly registration trends</p>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="month"
                    textAnchor="end"
                    height={60}
                    interval={0}
                    stroke="#374151"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#374151"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} customers`, 'New Registrations']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #ef4444',
                      borderRadius: '8px',
                      padding: '12px'
                    }}
                  />
                  <Bar
                    dataKey="customers"
                    fill="rgba(239, 68, 68, 0.1)"
                    stroke="#ef4444"
                    strokeWidth={2}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Search and Table Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Customer Data</h2>
                <p className="text-gray-500 text-sm mt-1">Detailed information about all customers</p>
              </div>
              <div className="w-1/3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search customers..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 pl-10"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birthday</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anniversary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTable.map((row, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{row.CustomerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Contact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Email || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Birthday || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Anniversary || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {row.EatocoinsWallet | 0} points
                        </span>
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

export default Customer_Report;
