'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Doughnut, Line } from 'react-chartjs-2';
import { FaRegFilePdf, FaWallet, FaRegCircleCheck, FaClock, FaChartLine } from 'react-icons/fa6';

const Expenses_Report = () => {

  const router = useRouter();

  // For A Week before
  const today = new Date();
  const to_default = today.toISOString().split('T')[0];
  const from_default = to_default;
  const [selectedRange, setselectedRange] = useState('Today');

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

  // Expense-Wise
  const [Count, setCount] = useState([]);
  const [Category, setCategory] = useState([]);
  const [TotalAmount, setTotal] = useState(0);

  // Table
  const [Table, setTable] = useState([]);

  // Search 
  const [searchQuery, setSearchQuery] = useState('');

  // Trend Data
  const [trendData, setTrendData] = useState({
    dates: [],
    amounts: []
  });


  // PDF Generation function
  const handlePdfGeneration = async () => {
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
    pdf.save(`${selectedRange}'s_Expenses_Report_ (${to_default}).pdf`);
  };

  // Fetch Expenses
  const fetchExpenses = async () => {
    if (from == "" || to == "") {
      alert("Please Select Filter");
    }
    try {

      const response = await fetch(`/api/hotel/reports/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'from': from,
          'to': to
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setCount(data.output.ExpenseWise.Count);
        setCategory(data.output.ExpenseWise.Labels);
        setTable(data.output.FullData);
        setTotal(data.output.TotalAmount);

        // Process trend data
        const dateMap = new Map();
        data.output.FullData.forEach(expense => {
          const date = expense.Date;
          dateMap.set(date, (dateMap.get(date) || 0) + Number(expense.AmountPaid || 0));
        });

        // Sort dates and create trend data arrays
        const sortedDates = Array.from(dateMap.keys()).sort();
        setTrendData({
          dates: sortedDates,
          amounts: sortedDates.map(date => dateMap.get(date))
        });
      } else {
        alert("Failed to fetch");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  const handleRangeChange = (selectedOption) => {
    setselectedRange(selectedOption);
    const today = new Date();
    let from_input, to_input

    switch (selectedOption) {
      case 'Today':
        from_input = from_default; // Assuming this is the correct default for today
        to_input = to_default;
        setFrom(from_input);
        setTo(to_input);
        break;

      case 'Week':
        from_input = new Date().toISOString().split('T')[0]; // Today's date
        to_input = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0]; // 7 days ago
        setFrom(to_input);
        setTo(from_input);
        break;

      case 'Month':
        from_input = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]; // First day of the current month
        to_input = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]; // Last day of the current month
        setFrom(from_input);
        setTo(to_input);
        break;

      case 'Year':
        from_input = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0]; // January 1st of the current year
        to_input = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0]; // December 31st of the current year
        setFrom(from_input);
        setTo(to_input);
        break;

      case 'custom':
        setselectedRange('custom'); // You will probably handle custom logic elsewhere
        break;

      default:
        from_input = from_default;
        to_input = to_default;
        setFrom(from_input);
        setTo(to_input);
        break;
    }
  };


  useEffect(() => {
    fetchExpenses();
  }, [])

  const dataPie = {
    labels: Category,
    datasets: [
      {
        data: Count,
        backgroundColor: ['#FECACA', '#FEF08A', '#FED7AA'],
        borderColor: ['#EF4444', '#F59E0B', '#F97316'],
        hoverBackgroundColor: ['#EF4444', '#F59E0B', '#F97316'],
      },
    ],
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredExpenses = Table.filter((row) =>
    row.PayableTo.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    row.PaymentStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trend Chart Data
  const trendChartData = {
    labels: trendData.dates,
    datasets: [
      {
        fill: true,
        label: 'Daily Expenses',
        data: trendData.amounts,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      }
    ]
  };

  // Trend Chart Options
  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          callback: (value) => `₹${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            {/* Left side - Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoIosArrowBack size={28} className="text-red-500" />
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Expenses Report
              </h1>
            </div>

            {/* Right side - Filters */}
            <div className="flex items-center gap-4">
              <div className="w-[200px]">
                <select
                  value={selectedRange}
                  onChange={(e) => handleRangeChange(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm hover:border-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Today">Today</option>
                  <option value="Week">This Week</option>
                  <option value="Month">This Month</option>
                  <option value="Year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <button
                onClick={fetchExpenses}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        {/* Search and PDF Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search bearer or payment status..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            onClick={handlePdfGeneration}
            className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-500 border border-red-500 rounded-lg hover:shadow-md transition-all"
          >
            Export PDF <FaRegFilePdf />
          </button>
        </div>

        <div id="Report" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            {/* Total Expenses Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <FaWallet className="text-red-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-900">₹{TotalAmount}</p>
                </div>
              </div>
            </div>

            {/* Paid Expenses Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaRegCircleCheck className="text-green-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Paid Expenses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredExpenses.filter(exp => exp.PaymentStatus === 'Paid').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Pending Expenses Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <FaClock className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Expenses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredExpenses.filter(exp => exp.PaymentStatus !== 'Paid').length}
                  </p>
                </div>
              </div>
            </div>

          </div>


          {/* Trend Chart Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-8">Day-wise Expense Trend</h2>
            <div className="w-full h-[400px]">
              <Line
                data={trendChartData}
                options={trendChartOptions}
              />
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Daily Expense Amount</span>
              </div>
              <div>
                <span className="font-medium">
                  Average: ₹{trendData.amounts.length > 0
                    ? Math.round(trendData.amounts.reduce((a, b) => a + b, 0) / trendData.amounts.length).toLocaleString()
                    : 0}
                </span>
              </div>
            </div>
          </div>

          {/* Table Section with improved styling */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6 mb-10">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-700">Expenses Data</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR#</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bearer</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Amount</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExpenses.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.Date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.ExpenseName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.PayableTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{(row.AmountPayable || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{(row.AmountPaid || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.Note}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${row.PaymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {row.PaymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredExpenses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No expenses found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Date Range Modal with better spacing */}
      {selectedRange === 'custom' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">Select Date Range</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  setselectedRange('');
                  fetchExpenses();
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Expenses_Report;
