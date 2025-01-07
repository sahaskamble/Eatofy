"use client";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FaEye, FaRegFilePdf, FaXmark } from "react-icons/fa6";

export default function Financial_Report() {

  const router = useRouter();

  // For A Week before
  const today = new Date();
  const to_default = today.toISOString().split("T")[0];
  const from_default = today.toISOString().split("T")[0];
  const [selectedRange, setselectedRange] = useState('Today');

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

  // Expense-Wise
  const [Amount, setAmount] = useState([]);
  const [Dates_Filter, setDates_Filter] = useState([]);

  // Payment Status Tables
  const [Incomes, setIncomes] = useState([]);
  const [Expenses, setExpenses] = useState([]);
  const [Purchases, setPurchases] = useState([]);

  // Ui Elements
  const [displayStock, setDisplayStock] = useState(false);
  const [displaySales, setdisplaySales] = useState(true);
  const [displayPurchase, setdisplayPurchase] = useState(false);
  const [displayExpenses, setdisplayExpenses] = useState(false);
  const [PurchaseTable, setPurchaseTable] = useState([]);
  const [SalesTable, setSalesTable] = useState([]);
  const [ExpensesTable, setExpensesTable] = useState([]);
  const [hotel_id, sethotel_id] = useState("");
  const [invoice, setInvoice] = useState({});
  const [Stock, setStock] = useState([]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [ProfitLoss, setProfitLoss] = useState("");
  const [ProfitLossAmt, setProfitLossAmt] = useState(0);

  // Fetch Values
  const fetchFinanceData = async () => {
    if (from == "" || to == "") {
      alert("Please Select Filter");
    }

    try {
      const response = await fetch(`/api/hotel/reports/financial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotel_id: hotel_id, from: from, to: to }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setSalesTable(data.output?.Sales?.Data);
        setAmount(data.output?.Sales?.Chart?.Amount);
        setDates_Filter(data.output?.Sales?.Chart?.Labels);

        // Separate tables by payment status
        setIncomes(data.output?.Sales);
        setExpenses(data.output?.Expenses);
        setPurchases(data.output?.Purchase);

        // Setting Profit or Loss
        const income = data.output?.Sales?.Amount || 0;
        const expense = data.output?.Expenses?.Amount || 0;
        const expenditure = expense;
        if ((income > expenditure) || (income > 0 && expenditure === 0)) {
          setProfitLoss("Profit");
          const amount = income - expenditure;
          setProfitLossAmt(amount);
        } else if ((income === expenditure) || (income === 0 && expenditure === 0)) {
          setProfitLoss("Balanced");
          const amount = 0;
          setProfitLossAmt(amount);
        } else if ((income < expenditure) || (income === 0 && expenditure > 0)) {
          setProfitLoss("Loss");
          const amount = expenditure - income;
          setProfitLossAmt(amount);
        }
        else {
          setProfitLoss("Income or Expense Missing");
          setProfitLossAmt(0);
        }

      } else {
        alert("Failed to fetch supplier");
      }
    } catch (e) {
      throw console.error(e);
    }
  };

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
    pdf.save(`${selectedRange}'s_Finacial_Report_ (${to_default}).pdf`);
  };


  // Display purchase info
  const displayPurchasedStock = async (invoice_info) => {
    try {
      setStock(invoice_info.Stock);
    } catch (e) {
      throw console.error(e);
    }

    setDisplayStock(true);
    setInvoice(invoice_info);
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
    sethotel_id(localStorage.getItem("hotel_id"));
    if (hotel_id) {
      fetchFinanceData();
    }
  }, [hotel_id]);

  const dataLine = {
    labels: Dates_Filter,
    datasets: [
      {
        label: "Line",
        data: Amount,
        borderColor: "#FFA500",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#FFA500",
        pointHoverBackgroundColor: "#FFA500",
        pointBorderColor: "#FFF",
        pointHoverBorderColor: "#FFF",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
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
            family: "Poppins", // Use Poppins font
            weight: "bold", // Make the x-axis text bold
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Remove the grid lines
        },
        ticks: {
          font: {
            family: "Poppins", // Use Poppins font
            weight: "bold", // Make the y-axis text bold
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Poppins", // Use Poppins font
            weight: "bold", // Make the legend text bold
          },
        },
      },
    },
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <IoIosArrowBack size={24} className="text-red-500" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Financial Reports
              </h1>
              <p className="text-sm text-gray-500">
                Track your business performance and financial health
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white rounded-lg shadow-sm p-1">
              <select
                value={selectedRange}
                onChange={(e) => handleRangeChange(e.target.value)}
                className="px-4 py-2 text-sm text-gray-700 border-0 focus:ring-0"
              >
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
                <option value="Month">This Month</option>
                <option value="Year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <button
                onClick={fetchFinanceData}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Apply
              </button>
            </div>

            <button
              onClick={handlePdfGeneration}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <FaRegFilePdf className="text-red-500" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {selectedRange === 'custom' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date Range</h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="from" className="text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    id="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="to" className="text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setselectedRange('')}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setselectedRange('');
                      fetchFinanceData();
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div id="Report" className="space-y-6">
          <div className="grid grid-cols-4 gap-6">
            <div
              className={`bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer
                ${displaySales ? 'ring-2 ring-green-500' : ''}`}
              onClick={() => {
                const filteredTable = Incomes.Data.filter(
                  (bill) =>
                    bill.Table?.TableName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    bill.WaiterId?.FirstName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    bill.WaiterId?.LastName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    bill.Customer?.CustomerName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    bill.Status.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    )
                );

                setSalesTable(filteredTable);
                setAmount(Incomes?.Chart?.Amount);
                setDates_Filter(Incomes?.Chart?.Category);
                setdisplaySales(true);
                setdisplayPurchase(false);
                setdisplayExpenses(false);
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Income</p>
                  <h3 className="text-2xl font-bold mt-1">Rs. {(Incomes.Amount | 0) || 0}</h3>
                  <p className="text-xs text-gray-500 mt-1">{Incomes.Count || 0} Orders</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className={`bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer
                ${displayExpenses ? 'ring-2 ring-red-500' : ''}`}
              onClick={() => {
                const filteredExpenses = Expenses.Data.filter(
                  (row) =>
                    row.PayableTo.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    row.PaymentStatus.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    )
                );
                setExpensesTable(filteredExpenses);
                setAmount(Expenses?.Chart?.Amount);
                setDates_Filter(Expenses?.Chart?.Labels);
                setdisplaySales(false);
                setdisplayPurchase(false);
                setdisplayExpenses(true);
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                  <h3 className="text-2xl font-bold mt-1">Rs. {(Expenses.Amount | 0) || 0}</h3>
                  <p className="text-xs text-gray-500 mt-1">{Expenses.Count || 0} Total</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className={`bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer
                ${displayPurchase ? 'ring-2 ring-yellow-500' : ''}`}
              onClick={() => {
                setPurchaseTable(Purchases.Data);
                setAmount(Purchases?.Chart?.Amount);
                setDates_Filter(Purchases?.Chart?.Labels);
                setdisplaySales(false);
                setdisplayPurchase(true);
                setdisplayExpenses(false);
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Purchases</p>
                  <h3 className="text-2xl font-bold mt-1">Rs. {(Purchases.Amount | 0) || 0}</h3>
                  <p className="text-xs text-gray-500 mt-1">{Purchases.Count || 0} Invoices</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className={`bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer
                ${ProfitLoss.toLowerCase() === "profit"
                  ? "ring-2 ring-green-500"
                  : ProfitLoss.toLowerCase() === "loss"
                    ? "ring-2 ring-red-500"
                    : ProfitLoss.toLowerCase() === "balanced"
                      ? "ring-2 ring-yellow-500"
                      : "ring-2 ring-gray-500"
                }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">{ProfitLoss}</p>
                  <h3 className="text-2xl font-bold mt-1">Rs. {ProfitLossAmt | 0}</h3>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Financial Overview</h3>
            </div>
            <div className="h-[60vh]">
              <Line data={dataLine} options={options} />
            </div>
          </div>

          {displayPurchase ? (
            <div className="mt-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-700">Purchases Data</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SR#
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          From
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Balance(amt)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment mode
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {PurchaseTable.map((items, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {items.Date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {items.SupplierId.SupplierName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {items.AmountPaid}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {items.BalanceAmount || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {items.PaymentMode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {items.PaymentStatus}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-lg ${items.PaymentStatus.toLowerCase() === "paid"
                                ? "bg-green-200 text-green-800"
                                : items.PaymentStatus.toLowerCase() ===
                                  "unpaid"
                                  ? "bg-red-200 text-red-800"
                                  : items.PaymentStatus.toLowerCase() ===
                                    "part-paid"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                            >
                              {items.PaymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                displayPurchasedStock(items);
                              }}
                            >
                              <FaEye size={25} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
          {displaySales ? (
            <div className="mt-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-700">Sales Data</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SR#
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Waiter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Balance Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Mode
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {SalesTable.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.Date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.Type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.WaiterId?.FirstName} {row.WaiterId?.LastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.Customer?.CustomerName || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.Customer?.Contact || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.TotalAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.BalanceAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.PaymentMode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-lg ${row.Status.toLowerCase() === "paid"
                                ? "bg-green-200 text-green-800"
                                : row.Status.toLowerCase() === "unpaid"
                                  ? "bg-red-200 text-red-800"
                                  : row.Status.toLowerCase() === "partpaid"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                            >
                              {row.Status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
          {displayExpenses ? (
            <div className="mt-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-700">Expenses Data</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SR#
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bearer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Balance Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Paid Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Mode
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {ExpensesTable.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.Date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.ExpenseName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.PayableTo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.AmountPayable || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.AmountPaid}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.PaymentMode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-lg ${row.PaymentStatus.toLowerCase() === "paid"
                                ? "bg-green-200 text-green-800"
                                : row.PaymentStatus.toLowerCase() === "unpaid"
                                  ? "bg-red-200 text-red-800"
                                  : row.PaymentStatus.toLowerCase() ===
                                    "part-paid"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                            >
                              {row.PaymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.Note || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div>
        {displayStock && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-[70dvw] max-h-[85vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gray-50 px-8 py-6 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Purchase Invoice</h3>
                  <p className="text-sm text-gray-500 mt-1">Invoice details and purchased items</p>
                </div>
                <button
                  onClick={() => setDisplayStock(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <FaXmark size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[calc(85vh-140px)]">
                {/* Supplier Info Card */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8 border border-orange-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Supplier</p>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {invoice.SupplierId.SupplierName}
                      </h4>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Invoice No</p>
                      <p className="text-lg font-semibold text-gray-800">#{invoice.InvoiceNo}</p>
                    </div>
                  </div>
                </div>

                {/* Invoice Details Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-5 shadow-sm border">
                    <p className="text-sm font-medium text-gray-500 mb-1">Invoice Date</p>
                    <p className="text-lg font-semibold text-gray-800">{invoice.Date}</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border">
                    <p className="text-sm font-medium text-gray-500 mb-1">Payment Status</p>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium inline-block
                      ${invoice.PaymentStatus?.toLowerCase() === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.PaymentStatus?.toLowerCase() === "unpaid"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoice.PaymentStatus}
                    </span>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border">
                    <p className="text-sm font-medium text-gray-500 mb-1">Payment Mode</p>
                    <p className="text-lg font-semibold text-gray-800">{invoice.PaymentMode}</p>
                  </div>
                </div>

                {/* Purchased Items Table */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h4 className="text-lg font-semibold text-gray-800">Purchased Items</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Stock.map((stock, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                  <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {stock.ItemId.ItemName}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {stock.Quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {stock.ItemId.Unit}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <p className="text-sm font-medium text-gray-900">Rs. {stock.TotalPrice}</p>
                                <p className="text-xs text-gray-500">Rs. {stock.UnitPrice} per unit</p>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Total Section */}
                <div className="mt-8 flex justify-end">
                  <div className="bg-gray-50 rounded-xl p-6 w-72">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Amount Paid</span>
                      <span className="text-sm font-medium text-gray-900">Rs. {invoice.AmountPaid}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-sm text-gray-500">Balance Amount</span>
                      <span className="text-sm font-medium text-gray-900">Rs. {invoice.BalanceAmount || 0}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t">
                      <span className="text-base font-medium text-gray-900">Total Amount</span>
                      <span className="text-base font-bold text-gray-900">
                        Rs. {(Number(invoice.AmountPaid) + Number(invoice.BalanceAmount || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
