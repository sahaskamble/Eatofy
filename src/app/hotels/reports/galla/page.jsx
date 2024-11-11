"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useEffect, useState } from 'react';
import { DateFormatter } from "@/utils/dateFormatter"
import { MdOutlineAccountBalanceWallet, MdOutlineBalance } from "react-icons/md";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { PiHandWithdrawLight } from "react-icons/pi";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiStockFill } from "react-icons/ri";

export default function GallaReports() {
  const router = useRouter();

  // For A Week before
  const today = new Date();
  const today_default = DateFormatter(today);
  const display_today_default = today.toISOString().split('T')[0];


  // Request Params
  const [date, setDate] = useState(today_default);
  const [displayDate, setdisplayDate] = useState(display_today_default)
  const [hotel_id, sethotel_id] = useState('');

  // Display Values 
  const [ProfitOrLoss, setProfitOrLoss] = useState('Balanced');
  const [ProfitOrLossAmount, setProfitOrLossAmount] = useState(0);
  const [OpeningBalance, setOpeningBalance] = useState(0);
  const [ClosingBalance, setClosingBalance] = useState(0);
  const [TotalSales, setTotalSales] = useState(0);
  const [SalesAmount, setSalesAmount] = useState(0);
  const [TotalExpenses, setTotalExpenses] = useState(0);
  const [ExpensesAmount, setExpensesAmount] = useState(0);
  const [DroppedCash, setDroppedCash] = useState(0);
  const [CashWithdrawn, setCashWithdrawn] = useState(0);
  const [Refunds, setRefunds] = useState(0);
  const [Sales, setSales] = useState([]);
  const [Expenses, setExpenses] = useState([]);

  // Button Clicking
  const [SalesClick, setSalesClick] = useState(true);
  const [Expenses_Click, setExpensesClick] = useState(false);

  // Fetch Values 
  const fetchData = async () => {
    if (date == "") {
      alert("Please Select Filter");
    }

    try {
      const response = await fetch(`${ApiHost}/api/hotel/reports/galla`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id, 'date': date }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        const drawer_data = data?.output?.DrawerData;

        setOpeningBalance((drawer_data?.OpeningBalance | 0) || 0);
        setClosingBalance((drawer_data?.ClosingBalance | 0) || 0);
        setTotalSales((drawer_data?.TotalSales | 0) || 0);
        setSalesAmount((drawer_data?.SalesAmount | 0) || 0);
        setTotalExpenses((drawer_data?.TotalExpenses | 0) || 0);
        setExpensesAmount((drawer_data?.ExpensesAmount | 0) || 0);
        setDroppedCash((drawer_data?.DroppedCash | 0) || 0);
        setCashWithdrawn((drawer_data?.CashWithdrawn | 0) || 0);
        setRefunds((drawer_data?.Refunds | 0) || 0);
        const profit_or_loss_amount = ((drawer_data?.SalesAmount | 0) || 0) - (((drawer_data?.ExpensesAmount | 0) || 0) + ((drawer_data?.DroppedCash | 0) || 0) + ((drawer_data?.CashWithdrawn | 0) || 0) + ((drawer_data?.Refunds | 0) || 0));

        let profit_or_loss = ""
        if (profit_or_loss_amount > 0) {
          profit_or_loss = "Profit"
        } else if (profit_or_loss_amount === 0) {
          profit_or_loss = "Balanced"
        } else {
          profit_or_loss = "Loss"
        }

        setProfitOrLoss(profit_or_loss);
        setProfitOrLossAmount(profit_or_loss_amount);
        setSales(data?.output?.SalesData);
        setExpenses(data?.output?.ExpensesData);
      }
      else {
        router.push("/hotels/day_closing")
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    sethotel_id(localStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchData();
    }
  }, [hotel_id]);


  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4 pb-6">
            <div className="flex gap-4 items-center">
              <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
                router.back()
              }} />

              <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">
                Galla Report
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

          <div className="flex flex-col w-full gap-4 mt-6 mb-4">
            <div className="w-full">

              <div
                className={`bg-white p-4 rounded-lg shadow-md border-l-4 cursor-pointer 
            ${ProfitOrLoss.toLowerCase() === "profit"
                    ? "text-green-800 border-green-500"
                    : ProfitOrLoss.toLowerCase() === "loss"
                      ? "text-red-800 border-red-500"
                      : ProfitOrLoss.toLowerCase() === "balanced"
                        ? "text-yellow-800 border-yellow-500"
                        : "text-gray-800 border-gray-500"
                  }
              `}
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{ProfitOrLoss}</h2>
                  <RiStockFill size={20} />
                </div>

                <h1 className="text-3xl font-bold flex gap-2 items-end">
                  <p>
                    Rs. {ProfitOrLossAmount | 0}
                  </p>
                  {
                    ProfitOrLoss === "Profit" ? <FaSortUp /> : (ProfitOrLoss === "Loss" ? <FaSortDown /> : "")
                  }
                </h1>
              </div>
            </div>

            <div className="w-full flex flex-wrap gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[24%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Opening Balance</h2>
                  <MdOutlineBalance size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {OpeningBalance | 0}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[24%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Closing Balance</h2>
                  <MdOutlineAccountBalanceWallet size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {ClosingBalance | 0}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[24%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Sales</h2>
                  <GiReceiveMoney size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {SalesAmount | 0}</p>
                <p className="text-zinc-500 text-sm">{TotalSales} Order(s)</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[24%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Expenses</h2>
                  <GiPayMoney size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {ExpensesAmount | 0}</p>
                <p className="text-zinc-500 text-sm">{TotalExpenses} Invoice(s)</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[33%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Cash Dropped</h2>
                  <GrMoney size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {DroppedCash | 0}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[32%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Cash Withdrawn</h2>
                  <PiHandWithdrawLight size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {CashWithdrawn | 0}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[32%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Cash Refunds</h2>
                  <HiOutlineReceiptRefund size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {Refunds | 0}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  {
                    SalesClick && (
                      <h1 className="text-zinc-500 text-lg font-bold"> Sales Data </h1>
                    )
                  }
                  {
                    Expenses_Click && (
                      <h1 className="text-zinc-500 text-lg font-bold"> Expenses Data </h1>
                    )
                  }
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-xl font-bold"
                    onClick={() => {
                      setSalesClick(true);
                      setExpensesClick(false);
                    }}
                  >
                    Sales
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-xl font-bold"
                    onClick={() => {
                      setSalesClick(false);
                      setExpensesClick(true);
                    }}
                  >
                    Expenses
                  </button>
                </div>

              </div>
              {
                SalesClick && (
                  <div className="p-4">
                    <table className="text-sm min-w-full text-black border-collapse">
                      <thead>
                        <tr className="bg-gray-500 text-white font-bold">
                          <th className="border px-4 py-2">SR#</th>
                          <th className="border px-4 py-2">Date</th>
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
                              <td className="border px-4 py-2">{row.Date}</td>
                              <td className="border px-4 py-2">{row.Type}</td>
                              <td className="border px-4 py-2">
                                {row.Waiter.FirstName} {row.Waiter.LastName}
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

                )
              }
              {
                Expenses_Click && (
                  <div className=" flex justify-center items-center">
                    <table className="min-w-full text-sm text-black border-collapse">
                      <thead>
                        <tr className="bg-gray-500 text-white font-bold">
                          <th className="border px-4 py-2">SR#</th>
                          <th className="border px-4 py-2">Date</th>
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
                            <td className="border px-4 py-2">{row.Date}</td>
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

                )
              }

              <div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

