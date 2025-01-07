'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FaRegFilePdf } from 'react-icons/fa6';
import { MdInventory } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function Inventory_Report() {

  const router = useRouter();

  // For A Week before
  const today = new Date();
  const from_default = today.toISOString().split('T')[0];
  const to_default = today.toISOString().split('T')[0];
  const [selectedRange, setselectedRange] = useState('Today');

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

  // Updated state variables to match API structure
  const [inventoryData, setInventoryData] = useState({
    Data: [],
    Metrics: {
      TotalStock: 0,
      TotalItems: 0,
      ItemsCount: {},
      StockValue: 0
    },
    Chart: {
      Labels: [],
      Values: [],
      Dates: []
    }
  });


  // Search 
  const [searchQuery, setSearchQuery] = useState('');


  // Fetch Values 
  const fetchInventoryData = async () => {
    if (from == "" || to == "") {
      alert("Please Select Filter");
      return;
    }

    try {
      const response = await fetch(`/api/hotel/reports/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'from': from, 'to': to }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setInventoryData(data.output);
      } else {
        alert("Failed to fetch inventory data");
      }
    } catch (e) {
      console.error(e);
    }
  }

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
    pdf.save(`${selectedRange}'s_Inventory_Report_ (${to_default}).pdf`);
  };

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
    fetchInventoryData();
  }, [])

  const dataLine = {
    labels: inventoryData.Chart.Dates,
    datasets: inventoryData.Chart.Labels.map((label, index) => ({
      label: label,
      data: inventoryData.Chart.Values[index],
      borderColor: '#FFA500',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#FFA500',
      pointHoverBackgroundColor: '#FFA500',
      pointBorderColor: '#FFF',
      pointHoverBorderColor: '#FFF',
      pointRadius: 5,
      pointHoverRadius: 7,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Remove the grid lines
        },
        ticks: {
          font: {
            family: 'Poppins', // Use Poppins font
            weight: 'bold', // Make the x-axis text bold
          }
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Remove the grid lines
        },
        ticks: {
          font: {
            family: 'Poppins', // Use Poppins font
            weight: 'bold', // Make the y-axis text bold
          }
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Poppins', // Use Poppins font
            weight: 'bold', // Make the legend text bold
          }
        }
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  // Add new function to calculate status counts
  const calculateStatusCounts = () => {
    const counts = {
      available: 0,
      unavailable: 0,
      lowStock: 0
    };

    inventoryData.Data.forEach(item => {
      switch (item.Status.toLowerCase()) {
        case 'available':
          counts.available++;
          break;
        case 'unavailable':
          counts.unavailable++;
          break;
        case 'low stock':
          counts.lowStock++;
          break;
      }
    });

    return counts;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="ml-[70px] p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <IoIosArrowBack size={28} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Inventory Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Monitor and analyze your inventory metrics
              </p>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search inventory items..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className='flex gap-6'>
              <select
                value={selectedRange}
                onChange={(e) => handleRangeChange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
                <option value="Month">This Month</option>
                <option value="Year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <button
                onClick={() => {
                  fetchInventoryData();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg font-bold"
              >
                Apply
              </button>
            </div>
          </div>
          <button
            onClick={handlePdfGeneration}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:shadow-md rounded-lg transition-all border border-red-500"
          >
            <FaRegFilePdf />
            Export PDF
          </button>
        </div>

        <div id="Report" className="space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Available Items</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {calculateStatusCounts().available}
                  </h3>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <FaBoxes className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Unavailable Items</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {calculateStatusCounts().unavailable}
                  </h3>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <MdInventory className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {calculateStatusCounts().lowStock}
                  </h3>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <RiMoneyDollarCircleLine className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <IoStatsChart className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Inventory Trends
              </h2>
            </div>
            <div className="h-[400px]">
              <Line data={dataLine} options={options} />
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Inventory Details
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {inventoryData.Data.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ItemId.ItemName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ItemId.Unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${item.Status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}>
                          {item.Status}
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

      {/* Custom Date Range Modal */}
      {selectedRange === 'custom' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">From</label>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">To</label>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setselectedRange('')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setselectedRange('');
                    fetchInventoryData();
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
