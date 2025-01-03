"use client";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    pdf.save(`Day_Closing_Report_ (${today_default}).pdf`);
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
        router.push("/hotels/day_closing")
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
      const hotel_id = localStorage.getItem('hotel_id');
      const response = await fetch(`/api/hotel/inventory/stock_report/management/closing_stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotel_id, date }),
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

    const hotel_id = localStorage.getItem("hotel_id");

    try {
      const response = await fetch(`/api/hotel/cash_drawer/closing_balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotel_id,
          closing_balance: parseInt(ClosingBalance) || 0,
          dropped_cash: parseInt(DroppedCash) || 0,
          cash_withdrawn: parseInt(CashWithdrawn) || 0,
          refunds: parseInt(Refunds) || 0
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        router.push("/hotels/home")
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendance_id: selectedStaff.id,
          type: status,
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
    <>
      <OpeningBalance />
      <div className="bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="w-full flex justify-between items-center">

            <div className="flex gap-4 items-center">
              <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
                router.back()
              }} />

              <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">
                Day Closing
              </h1>
            </div>

            <div className='flex justify-center items-center'>
              <div className="flex items-center space-x-4">
                <div className='flex flex-col justify-center text-sm font-semibold text-zinc-700 items-center'>
                  <label htmlFor="to" className='text-'>
                    Date
                  </label>
                  <input
                    type="date"
                    id='date'
                    value={displayDate}
                    onChange={(e) => {
                      e.preventDefault();
                      setdisplayDate(e.target.value)
                      const temp_date = e.target.value;
                      const request_date = DateFormatter(temp_date);
                      setDate(request_date);
                    }}
                  />
                </div>
                <div className='flex items-end pr-4 pt-6'>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded-lg'
                    onClick={
                      () => {
                        fetchData();
                      }
                    }
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='justify-end w-full flex pt-4'>
            <div></div>
          </div>

          <div id="Report">
            <div className="flex flex-col w-full gap-4 mt-6 mb-4">
              <h1 className="text-red-500 font-bold text-lg p-2">Day Closing report of {date}.</h1>
              <div className="w-full flex flex-row gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-1/5">
                  <div className='flex justify-between'>
                    <h2 className="text-zinc-500 text-sm">Opening Balance</h2>
                    <MdOutlineBalance size={20} />
                  </div>
                  <p className="text-lg font-bold">Rs. {Opening_Balance | 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-1/5">
                  <div className='flex justify-between'>
                    <h2 className="text-zinc-500 text-sm">Cash in Drawer</h2>
                    <MdOutlineAccountBalanceWallet size={20} />
                  </div>
                  <p className="text-lg font-bold">Rs. {ClosingBalance | 0}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-1/5">
                  <div className='flex justify-between'>
                    <h2 className="text-zinc-500 text-sm">Sales</h2>
                    <GiReceiveMoney size={20} />
                  </div>
                  <p className="text-lg font-bold">Rs. {SalesAmount | 0}</p>
                  <p className="text-zinc-500 text-sm">{TotalSales} Order(s)</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-1/5">
                  <div className='flex justify-between'>
                    <h2 className="text-zinc-500 text-sm">Expenses</h2>
                    <GiPayMoney size={20} />
                  </div>
                  <p className="text-lg font-bold">Rs. {ExpensesAmount | 0}</p>
                  <p className="text-zinc-500 text-sm">{TotalExpenses} Invoice(s)</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-1/5">
                  <div className='flex justify-between'>
                    <h2 className="text-zinc-500 text-sm">Cash Withdrawn</h2>
                    <PiHandWithdrawLight size={20} />
                  </div>
                  <p className="text-lg font-bold">Rs. {CashWithdrawn | 0}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
                <div className="w-full flex items-center justify-center">
                  <div className="flex gap-8 items-center">
                    <label htmlFor="CashWithdrawn" className="text-zinc-500 font-bold"> Cash Withdrawn Today </label>
                    <div className='border-2 border-zinc-500 rounded-lg flex px-2 items-center w-96'>
                      <div className='border-r-2 border-zinc-500 py-1'>
                        <BiRupee size={25} />
                      </div>
                      <input
                        type="text"
                        placeholder="Please enter amount of Cash Withdrawn"
                        value={CashWithdrawn}
                        className="w-full focus:outline-none outline-none border-none"
                        onChange={(e) => {
                          setCashWithdrawn(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-card-foreground text-zinc-500">Employees Attendance</h2>
                <div className="flex flex-wrap gap-4 pt-4">
                  {
                    StaffList.length > 0 ?
                      StaffList
                        .filter((staff) => {
                          return staff.Role != "Owner"
                        })
                        .map((staff, index) => {
                          return (
                            <div
                              key={index}
                              onContextMenu={(event) => handleRightClick(event, staff)}
                              className={`w-40 h-20 border flex justify-center items-center 
                            ${staff.Type === "Present" ? "border-green-700 text-green-700" :
                                  staff.Type === "Absent" ? "border-red-700 text-red-700" :
                                    "border-yellow-700 text-yellow-700"}`}
                            >
                              <div className="flex flex-col gap-2 items-center">
                                <h1 className="text-sm font-bold">
                                  {staff.Staff.FirstName} {staff.Staff.LastName}
                                </h1>
                                <h2 className="text-xs">
                                  {staff.Type}
                                </h2>
                              </div>

                            </div>

                          )
                        }) : (<></>)
                  }
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
                <div className="flex justify-start items-center">
                  <div>
                    <h1 className="text-zinc-500 text-lg font-bold"> Sales Data </h1>
                  </div>
                </div>
                <div className="p-4">
                  <table className="text-sm min-w-full text-black border-collapse">
                    <thead>
                      <tr className="bg-gray-500 text-white font-bold">
                        <th className="border px-4 py-2">SR#</th>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Waiter</th>
                        <th className="border px-4 py-2">Customer Name</th>
                        <th className="border px-4 py-2">Customer Contact</th>
                        <th className="border px-4 py-2">Total Amount</th>
                        <th className="border px-4 py-2">Balance Amount</th>
                        <th className="border px-4 py-2">Payment Mode</th>
                        <th className="border px-4 py-2">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Sales.length > 0 ? (
                        Sales.map((row, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-zinc-100 text-black font-light text-center text-sm"
                                : "text-center text-black font-light text-sm"
                            }
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{row.Type}</td>
                            <td className="border px-4 py-2">
                              {row.Waiter ? `${row.Waiter.FirstName} ${row.Waiter.LastName}` : 'N/A'}
                            </td>
                            <td className="border px-4 py-2">
                              {row.Customer?.CustomerName || "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                              {row.Customer?.Contact || "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                              {row.TotalAmount}
                            </td>
                            <td className="border px-4 py-2">
                              {row.BalanceAmount}
                            </td>
                            <td className="border px-4 py-2">
                              {row.PaymentMode}
                            </td>
                            <td className="border px-4 py-2">
                              <span
                                className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-lg ${row.PaymentStatus.toLowerCase() === "paid"
                                  ? "bg-green-200 text-green-800"
                                  : row.PaymentStatus.toLowerCase() === "unpaid"
                                    ? "bg-red-200 text-red-800"
                                    : row.PaymentStatus.toLowerCase() === "part-paid"
                                      ? "bg-yellow-200 text-yellow-800"
                                      : "bg-gray-200 text-gray-800"
                                  }`}
                              >
                                {row.PaymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            className="border px-4 py-2 text-center"
                            colSpan="8"
                          >
                            No Orders Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-zinc-500 text-lg font-bold"> Expenses Data </h1>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 bg-red-200 text-red-500 border border-red-500 rounded-xl font-bold"
                      onClick={() => {
                        router.push('/hotels/expence_tracking')
                      }}
                    >
                      Add +
                    </button>
                  </div>

                </div>
                <div className=" flex justify-center items-center">
                  <table className="min-w-full text-sm text-black border-collapse">
                    <thead>
                      <tr className="bg-gray-500 text-white font-bold">
                        <th className="border px-4 py-2">SR#</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Bearer</th>
                        <th className="border px-4 py-2">Balance Amount</th>
                        <th className="border px-4 py-2">Paid Amount</th>
                        <th className="border px-4 py-2">Payment Mode</th>
                        <th className="border px-4 py-2">Payment Status</th>
                        <th className="border px-4 py-2">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Expenses.map((row, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-zinc-100 text-black font-light"
                              : "text-black font-light"
                          }
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">
                            {row.ExpenseName}
                          </td>
                          <td className="border px-4 py-2">{row.PayableTo}</td>
                          <td className="border px-4 py-2">
                            {row.AmountPayable}
                          </td>
                          <td className="border px-4 py-2">{row.AmountPaid}</td>
                          <td className="border px-4 py-2">
                            {row.PaymentMode}
                          </td>
                          <td className="border px-4 py-2">
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
                          <td className="border px-4 py-2">
                            {row.Note || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-zinc-500 text-lg font-bold"> Purchases Data </h1>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 bg-red-200 text-red-500 border border-red-500 rounded-xl font-bold"
                      onClick={() => {
                        router.push('/hotels/purchase_management')
                      }}
                    >
                      Add +
                    </button>
                  </div>
                </div>

                <div className=" flex justify-center items-center">
                  <table className="table-fixed w-full p-2 text-sm">
                    <thead className="bg-gray-500 text-white">
                      <tr className="font-bold text-left">
                        <th className="border px-4 py-2">SR#</th>
                        <th className="border px-4 py-2">Invoice No</th>
                        <th className="border px-4 py-2">From</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Balance(amt)</th>
                        <th className="border px-4 py-2">Payment mode</th>
                        <th className="border px-4 py-2">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="bg-zinc-100">
                      {PurchaseTable.map((items, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-zinc-100 text-black font-light"
                              : "text-black font-light"
                          }
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{items.InvoiceNo}</td>
                          <td className="border px-4 py-2">
                            {items.Suppliers.SupplierName}
                          </td>
                          <td className="border px-4 py-2">
                            {items.TotalAmount}
                          </td>
                          <td className="border px-4 py-2">
                            {items.BalanceAmount}
                          </td>
                          <td className="border px-4 py-2">
                            {items.PaymentMode}
                          </td>
                          <td className="border px-4 py-2 inline-flex justify-center items-center">
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-zinc-500 text-lg font-bold"> Available Stock </h1>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 bg-red-200 text-red-500 border border-red-500 rounded-xl font-bold"
                      onClick={() => {
                        router.push('/hotels/available_stock')
                      }}
                    >
                      Add +
                    </button>
                  </div>
                </div>

                <div className=" flex justify-center items-center">
                  <table className="table-fixed w-full p-2 text-sm">
                    <thead className="bg-gray-500 text-white">
                      <tr className="font-bold text-left">
                        <th className="border px-4 py-2">SR#</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Stock</th>
                        <th className="border px-4 py-2">Quantity</th>
                        <th className="border px-4 py-2">Unit</th>
                        <th className="border px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-zinc-100">
                      {Stock.length === 0 ? (<></>) : Stock.map((items, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-zinc-100 text-black font-light"
                              : "text-black font-light"
                          }
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="p-4">{items?.ItemId?.CategoryId?.CategoryName}</td>
                          <td className="p-4">{items?.ItemId?.ItemName}</td>
                          <td className="p-4">{items?.Quantity}</td>
                          <td className="p-4">{items?.ItemId?.Unit}</td>
                          <td className="p-4">
                            <div className="flex justify-center items-center">
                              <h3
                                className={`text-center px-2 py-1 rounded-lg font-semibold
                            ${(items.Status === "Available" && Number(items.Quantity) > 20) ? 'bg-green-200 text-green-500' :
                                    (Number(items.Quantity) === 0) ? 'bg-red-200 text-red-500' :
                                      (Number(items.Quantity) < 20) ? 'bg-yellow-200 text-yellow-500' :
                                        'border-gray-500'
                                  }`}
                              >
                                {items.Status}
                              </h3>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-red-500 text-white font-bold rounded-lg px-4 py-2"
              onClick={handleSubmit}
            >
              Done
            </button>

            <div>
              <a onClick={() => { handlePdfGeneration() }} className="flex gap-2 cursor-pointer items-center bg-red-500 text-white px-4 py-2 font-semibold rounded-lg">
                Download PDF <FaRegFilePdf />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Custom Context Menu */}
      {contextMenu && (
        <ul
          className="fixed bg-white shadow-lg rounded-lg border border-gray-300 p-2"
          style={{ top: contextMenu.yPos, left: contextMenu.xPos }}
          onMouseLeave={() => setContextMenu(null)}
        >
          <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionClick("Present")}>
            Present
          </li>
          <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionClick("Absent")}>
            Absent
          </li>
          <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionClick("Half Day")}>
            Half Day
          </li>
        </ul>
      )}
    </>
  )
}
