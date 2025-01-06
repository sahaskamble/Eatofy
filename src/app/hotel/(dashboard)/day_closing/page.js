"use client";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import { MdOutlineAccountBalanceWallet, MdOutlineBalance } from "react-icons/md";
import { PiHandWithdrawLight } from "react-icons/pi";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import OpeningBalance from '../../components/OpeningBalance';
import { BiRupee } from "react-icons/bi";
import { FaRegFilePdf } from 'react-icons/fa';

export default function DayClosing() {
  const router = useRouter();

  // For A Week before
  const today = new Date();
  const today_default = DateFormatter(today);
  const [day, month, year] = today_default.split(' ');
  const startOfDay = new Date(Date.UTC(
    parseInt(year),
    new Date(`${month} 1, ${year}`).getMonth(),
    parseInt(day),
    0, // 00:00 UTC
    0
  ));
  const display_today_default = startOfDay.toISOString().split('T')[0];


  // Request Params
  const [date, setDate] = useState(today_default);
  const [displayDate, setdisplayDate] = useState(display_today_default)

  // Display Values 
  const [Opening_Balance, setOpening_Balance] = useState(0);
  const [ClosingBalance, setClosingBalance] = useState(0);
  const [TotalSales, setTotalSales] = useState(0);
  const [SalesAmount, setSalesAmount] = useState(0);
  const [TotalExpenses, setTotalExpenses] = useState(0);
  const [ExpensesAmount, setExpensesAmount] = useState(0);
  const [DroppedCash, setDroppedCash] = useState(0);
  const [CashWithdrawn, setCashWithdrawn] = useState(0);
  const [Refunds, setRefunds] = useState(0);
  const [StaffList, setStaffList] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [Expenses, setExpenses] = useState([]);
  const [Sales, setSales] = useState([]);
  const [PurchaseTable, setPurchaseTable] = useState([]);
  const [Stock, setStock] = useState([]);

  // PDF Generation function
  const handlePdfGeneration = async () => {
    const loadingToast = toast.info('Generating PDF...');

    try {
      const inputData = document.getElementById("Report");  // Replace with your specific element if needed

      // Take a screenshot of the whole page
      const canvas = await html2canvas(inputData, { scale: 2 });

      // Get the image dimensions
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 270;  // Updated width of the Image for landscape mode in mm
      const pageWidth = 297;  // Updated width of the PDF page (in mm) for landscape mode
      const pageHeight = 210; // Updated height of the PDF page in mm for landscape mode
      const imgHeight = ((canvas.height * imgWidth) / canvas.width) - 20;
      const heightLeft = imgHeight;

      // Calculate margins to center the image on the page
      const xOffset = (pageWidth - imgWidth) / 2;  // Horizontal centering

      // Create a new PDF document in landscape mode ('l' stands for landscape)
      const pdf = new jsPDF('l', 'mm', 'a4');
      let position = 10;

      // Add the image to the first page
      pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
      let remainingHeight = heightLeft - pageHeight + 15;

      // Loop through the rest of the image, adding new pages as needed
      while (remainingHeight > 0) {
        position = remainingHeight - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
      }

      // Save the PDF
      pdf.save(`Day_Closing_Report_ (${today_default}).pdf`);
      toast.success('PDF generated successfully!', { id: loadingToast });
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('Failed to generate PDF', { id: loadingToast });
    }
  };

  function DateFormatter(date) {
    const requestDate = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(requestDate);
    return formattedDate;
  }

  // Fetch Values 
  const fetchData = async () => {
    if (date == "") {
      alert("Please Select Filter");
    }

    try {
      const response = await fetch(`/api/hotel/day_closing/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'date': date }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        const drawer_data = data?.output?.DrawerData;
        const opening_bal = ((drawer_data?.OpeningBalance | 0) || 0);
        const sales_amt = ((drawer_data?.SalesAmount | 0) || 0);
        const expenses_amt = ((drawer_data?.ExpensesAmount | 0) || 0);
        const dropped_cash = ((drawer_data?.DroppedCash | 0) || 0);
        const cash_withdrawn = ((drawer_data?.CashWithdrawn | 0) || 0);
        const refunds = ((drawer_data?.Refunds | 0) || 0);
        const closing_bal = (opening_bal + sales_amt) - (expenses_amt + dropped_cash + cash_withdrawn + refunds);

        setOpening_Balance((drawer_data?.OpeningBalance | 0) || 0);
        setTotalSales((drawer_data?.TotalSales | 0) || 0);
        setSalesAmount((drawer_data?.SalesAmount | 0) || 0);
        setTotalExpenses((drawer_data?.TotalExpenses | 0) || 0);
        setExpensesAmount((drawer_data?.ExpensesAmount | 0) || 0);
        setDroppedCash((drawer_data?.DroppedCash | 0) || 0);
        setCashWithdrawn((drawer_data?.CashWithdrawn | 0) || 0);
        setRefunds((drawer_data?.Refunds | 0) || 0);
        setClosingBalance(closing_bal);
        setStaffList(data?.output?.Attendances || []);
        setExpenses(data?.output?.ExpensesData || []);
        setSales(data?.output?.SalesData || []);
        setPurchaseTable(data?.output?.PurchasesData || []);
        setStock(data?.output?.Inventory || []);
      }
      else {
        router.push("/hotel/day_closing")
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  // Fetch Staff
  const fetchStaffAttendance = async () => {
    try {
      const date_ = today.toISOString().split("T")[0];

      const response = await fetch(`/api/hotel/staff/attendance/fetch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "date": date_ }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.returncode === 200 && Array.isArray(result.output)) {
          setStaffList(data?.output?.Attendances);
        } else {
          console.error("Unexpected response format:", result);
        }
      } else {
        console.error("Failed to fetch staff list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const closingStock = async () => {
    try {
      const response = await fetch(`/api/hotel/stock_report/add`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.returncode != 200) {
        alert("Failed to add Inventory Stock")
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    handleClosingBalance();
    await closingStock();

    try {
      const response = await fetch(`/api/hotel/cash_drawer/closing_balance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          closing_balance: parseInt(ClosingBalance) || 0,
          dropped_cash: parseInt(DroppedCash) || 0,
          cash_withdrawn: parseInt(CashWithdrawn) || 0,
          refunds: parseInt(Refunds) || 0
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        router.push("/hotel/punch-order")
      }

    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  }

  useEffect(() => {
    fetchData();
    handleClosingBalance();
  }, []);

  // Function to open the context menu
  const handleRightClick = (event, staff) => {
    event.preventDefault();
    setContextMenu({
      xPos: event.pageX + "px",
      yPos: event.pageY + "px",
    });
    setSelectedStaff(staff);
  };

  // Function to handle attendance update on option click
  const handleOptionClick = async (status) => {
    setContextMenu(null); // Hide the context menu

    try {
      const response = await fetch(`/api/hotel/staff/attendance/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendance_id: selectedStaff._id,
          type: status,
          date: date,
          staff_id: selectedStaff.StaffId._id
        }),
      });

      const result = await response.json();
      if (result.returncode === 200) {
        fetchStaffAttendance(); // Refresh the attendance data
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handleClosingBalance = () => {
    const closing_balance_estimate = (Opening_Balance + SalesAmount) - (ExpensesAmount + CashWithdrawn + DroppedCash + Refunds);
    setClosingBalance(closing_balance_estimate | 0);
  }



  return (
    <div className="min-h-screen bg-gray-100">
      <OpeningBalance />
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.back()}
                className="p-3 hover:bg-red-50 rounded-xl transition-colors group"
              >
                <IoIosArrowBack size={28} className="text-red-500 group-hover:translate-x-[-2px] transition-transform" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Day Closing
                </h1>
                <p className="text-gray-500 mt-1">Manage your daily business closing</p>
              </div>
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">Select Date</label>
                <input
                  type="date"
                  value={displayDate}
                  onChange={(e) => {
                    setdisplayDate(e.target.value);
                    setDate(DateFormatter(e.target.value));
                  }}
                  className="text-sm focus:outline-none bg-transparent"
                />
              </div>
              <button
                onClick={fetchData}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-md active:scale-95"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>

        <div id="Report" className="space-y-6">
          {/* Report Header */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Day Closing Report
                </h2>
                <p className="text-red-500 font-medium mt-1">{date}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all hover:shadow-md active:scale-95 flex items-center gap-2"
                >
                  <span>Close Day</span>
                </button>
                <button
                  onClick={handlePdfGeneration}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:shadow-md active:scale-95 border border-gray-200 flex items-center gap-2"
                >
                  <FaRegFilePdf className="text-red-500" size={18} />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "Opening Balance",
                  value: Opening_Balance,
                  icon: <MdOutlineBalance size={24} />,
                  gradient: "from-red-500 via-orange-500 to-yellow-500"
                },
                {
                  title: "Cash in Drawer",
                  value: ClosingBalance,
                  icon: <MdOutlineAccountBalanceWallet size={24} />,
                  gradient: "from-yellow-500 via-orange-500 to-red-500"
                },
                {
                  title: "Sales",
                  value: SalesAmount,
                  icon: <GiReceiveMoney size={24} />,
                  subtitle: `${TotalSales} Orders`,
                  gradient: "from-orange-500 via-yellow-500 to-red-500"
                },
                {
                  title: "Expenses",
                  value: ExpensesAmount,
                  icon: <GiPayMoney size={24} />,
                  subtitle: `${TotalExpenses} Invoices`,
                  gradient: "from-red-500 via-yellow-500 to-orange-500"
                },
                {
                  title: "Cash Withdrawn",
                  value: CashWithdrawn,
                  icon: <PiHandWithdrawLight size={24} />,
                  gradient: "from-orange-500 via-red-500 to-yellow-500"
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  {/* Gradient Border */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-75 group-hover:opacity-100 group-hover:bg-gradient-to-l transition-all duration-700 bg-[length:200%_200%] group-hover:bg-[position:100%_50%]" />
                    <div className="absolute inset-[3px] bg-white rounded-2xl" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="p-3 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl group-hover:from-orange-100 group-hover:to-red-50 transition-colors">
                        {React.cloneElement(stat.icon, { className: "text-red-500" })}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-gray-900">₹ {stat.value || 0}</h3>
                      {stat.subtitle && (
                        <p className="text-sm text-gray-500">{stat.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cash Withdrawn Input */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Cash Withdrawal Entry</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full max-w-md">
                <label className="text-sm font-medium text-gray-600 mb-2 block">Enter Amount Withdrawn</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BiRupee className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    value={CashWithdrawn}
                    onChange={(e) => setCashWithdrawn(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl ring-2 ring-red-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Employee Attendance */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
              Employee Attendance
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {StaffList.length > 0 ? (
                StaffList
                  .filter((staff) => staff.Role !== "Owner")
                  .map((staff, index) => (
                    <div
                      key={index}
                      onContextMenu={(event) => handleRightClick(event, staff)}
                      className={`relative group p-6 rounded-2xl transition-all hover:shadow-lg cursor-pointer
                        ${staff.Type === "Present"
                          ? "bg-gradient-to-br from-green-50 to-white border border-green-200"
                          : staff.Type === "Absent"
                            ? "bg-gradient-to-br from-red-50 to-white border border-red-200"
                            : "bg-gradient-to-br from-yellow-50 to-white border border-yellow-200"
                        }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-600">
                            {staff.StaffId.FirstName.charAt(0)}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-800 text-center">
                          {staff.StaffId.FirstName} {staff.StaffId.LastName}
                        </h4>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium
                          ${staff.Type === "Present"
                            ? "bg-green-100 text-green-700"
                            : staff.Type === "Absent"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {staff.Type}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-12 px-4">
                  <p className="text-gray-500 text-center">No employees found</p>
                </div>
              )}
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 gap-6">
            {/* Sales Table */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Sales Data</h3>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waiter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Sales.length > 0 ? Sales.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.Waiter ? `${row.Waiter.FirstName} ${row.Waiter.LastName}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Customer?.CustomerName || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Customer?.Contact || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.TotalAmount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.BalanceAmount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.PaymentMode}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${row.PaymentStatus.toLowerCase() === "paid" ? "bg-green-100 text-green-800" :
                              row.PaymentStatus.toLowerCase() === "unpaid" ? "bg-red-100 text-red-800" :
                                "bg-yellow-100 text-yellow-800"}`}>
                            {row.PaymentStatus}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">No sales data found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expenses Table */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Expenses Data</h3>
                <button
                  onClick={() => router.push('/hotel/expence_tracking')}
                  className="inline-flex items-center px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-all"
                >
                  Add New +
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl border-2 border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">SR#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Bearer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Balance Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Paid Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Payment Mode</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Note</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Expenses.length > 0 ? Expenses.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.ExpenseName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.PayableTo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.AmountPayable || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.AmountPaid || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.PaymentMode}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${row.PaymentStatus.toLowerCase() === "paid" ? "bg-green-100 text-green-800" :
                              row.PaymentStatus.toLowerCase() === "unpaid" ? "bg-red-100 text-red-800" :
                                "bg-yellow-100 text-yellow-800"}`}>
                            {row.PaymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Note || 'N/A'}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">No expenses data found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Purchases Table */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Purchases Data</h3>
                <button
                  onClick={() => router.push('/hotel/purchase_management')}
                  className="inline-flex items-center px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-all"
                >
                  Add New +
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl border-2 border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">SR#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Invoice No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Supplier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Payment Mode</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {PurchaseTable.length > 0 ? PurchaseTable.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.InvoiceNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.SupplierId?.SupplierName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.AmountPaid || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.BalanceAmount || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.PaymentMode}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${row.PaymentStatus.toLowerCase() === "paid" ? "bg-green-100 text-green-800" :
                              row.PaymentStatus.toLowerCase() === "unpaid" ? "bg-red-100 text-red-800" :
                                "bg-yellow-100 text-yellow-800"}`}>
                            {row.PaymentStatus}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No purchases data found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stock Table */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Available Stock</h3>
                <button
                  onClick={() => router.push('/hotel/available_stock')}
                  className="inline-flex items-center px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-all"
                >
                  Add New +
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl border-2 border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">SR#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Stock Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Unit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Stock.length > 0 ? Stock.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.ItemId?.CategoryId?.CategoryName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.ItemId?.ItemName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.ItemId?.Unit}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${(row.Status === "Available" && Number(row.Quantity) > 20) ? 'bg-green-100 text-green-800' :
                              (Number(row.Quantity) === 0) ? 'bg-red-100 text-red-800' :
                                (Number(row.Quantity) < 20) ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'}`}>
                            {row.Status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No stock data found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ul
          className="fixed bg-white shadow-xl rounded-xl border border-gray-200 py-2 z-50"
          style={{ top: contextMenu.yPos, left: contextMenu.xPos }}
          onMouseLeave={() => setContextMenu(null)}
        >
          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm" onClick={() => handleOptionClick("Present")}>
            Mark as Present
          </li>
          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm" onClick={() => handleOptionClick("Absent")}>
            Mark as Absent
          </li>
          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm" onClick={() => handleOptionClick("Half Day")}>
            Mark as Half Day
          </li>
        </ul>
      )}

      <ToastContainer position="top-right" />
    </div>
  )
}
