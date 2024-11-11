"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useEffect, useState } from 'react';
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { PiHandWithdrawLight } from "react-icons/pi";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiStockFill } from "react-icons/ri";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function GallaReports() {
  const router = useRouter();

  // For A Week before
  const today = new Date();
  const from_default = today.toISOString().split("T")[0];
  const to_default = today.toISOString().split("T")[0];
  const [selectedRange, setselectedRange] = useState('Today');

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);
  const [hotel_id, sethotel_id] = useState('');

  // Display Values 
  const [ProfitOrLoss, setProfitOrLoss] = useState('Balanced');
  const [ProfitOrLossAmount, setProfitOrLossAmount] = useState(0);
  const [TotalSales, setTotalSales] = useState(0);
  const [SalesAmount, setSalesAmount] = useState(0);
  const [TotalExpenses, setTotalExpenses] = useState(0);
  const [ExpensesAmount, setExpensesAmount] = useState(0);
  const [DroppedCash, setDroppedCash] = useState(0);
  const [CashWithdrawn, setCashWithdrawn] = useState(0);
  const [Refunds, setRefunds] = useState(0);
  const [Counts, setCounts] = useState({
    CashWithdraw: 0,
    DroppedCash: 0,
    Refunds: 0
  });
  const [Data, setData] = useState([]);
  const [Dates, setDates] = useState([]);
  const [ProfitLoss, setProfitLoss] = useState([]);

  // Handle Date Change
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


  // Fetch Values 
  const fetchData = async () => {
    if (from === "" || to === "") {
      alert("Please Select Filter");
    }

    try {
      const response = await fetch(`${ApiHost}/api/hotel/reports/tally`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id, 'from': from, 'to': to }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        const drawer_data = data?.output?.Metrics;

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
        setCounts(data?.output?.Count);
        setData(data?.output?.Data);
        setDates(data?.output?.Chart?.Dates);
        setProfitLoss(data?.output?.Chart?.ProfitLoss);
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

  const data = {
    labels: Dates,
    datasets: [
      {
        label: 'Profit & Loss Overtime',
        data: ProfitLoss,
        backgroundColor: context => {
          const value = context.raw;
          return value >= 0 ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
        },
        borderColor: context => {
          const value = context.raw;
          return value >= 0 ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)';
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#FFA500",
        pointHoverBackgroundColor: "#FFA500",
        pointBorderColor: "#FFF",
        pointHoverBorderColor: "#FFF",
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 4
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Poppins", // Use Poppins font
            weight: "bold", // Make the legend text bold
          },
        },
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Profit and Loss',
      },
    },
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
        beginAtZero: true,
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
    }
  };


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
                Tally Report
              </h1>
            </div>

            <div className="flex gap-4">
              <div className='flex flex-col justify-center text-sm font-semibold text-zinc-700 items-end'>
                <select value={selectedRange} onChange={(e) => { e.preventDefault(); handleRangeChange(e.target.value); }} className='w-[200px] rounded-lg'>
                  <option value='Today'>Today</option>
                  <option value='Week'>Week</option>
                  <option value='Month'>Month</option>
                  <option value='Year'>Year</option>
                  <option value="custom">--Custom--</option>
                </select>
              </div>
              <div className="flex items-center">
                <div className="flex items-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => {
                      fetchData();
                    }}
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

            <div className="w-full flex flex-row gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[20%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Sales</h2>
                  <GiReceiveMoney size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {SalesAmount | 0}</p>
                <p className="text-zinc-500 text-sm">{TotalSales} Order(s)</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[20%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Expenses</h2>
                  <GiPayMoney size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {ExpensesAmount | 0}</p>
                <p className="text-zinc-500 text-sm">{TotalExpenses} Invoice(s)</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[20%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Cash Dropped</h2>
                  <GrMoney size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {DroppedCash | 0}</p>
                <p className="text-zinc-500 text-sm">{Counts?.DroppedCash || 0} Time(s)</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[20%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Cash Withdrawn</h2>
                  <PiHandWithdrawLight size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {CashWithdrawn | 0}</p>
                <p className="text-zinc-500 text-sm">{Counts?.CashWithdraw || 0} Time(s)</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2 w-[20%]">
                <div className='flex justify-between'>
                  <h2 className="text-zinc-500 text-sm">Cash Refunds</h2>
                  <HiOutlineReceiptRefund size={20} />
                </div>
                <p className="text-lg font-bold">Rs. {Refunds | 0}</p>
                <p className="text-zinc-500 text-sm">{Counts?.Refunds || 0} Time(s)</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <Bar data={data} options={options} />
            </div>

            <div className="overflow-x-auto">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-4 w-full">
                  <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 w-full">
                    Daily Entries
                  </h2>
                </div>
                <div className=" flex justify-center items-center">
                  <table className="table-fixed w-full p-2 text-sm">
                    <thead className="bg-gray-500 text-white">
                      <tr className="font-bold text-left">
                        <th className="p-4">SR#</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Opening Balance</th>
                        <th className="p-4">Closing Balance</th>
                        <th className="p-4">Sales</th>
                        <th className="p-4">Expenses</th>
                        <th className="p-4">Cash Dropped</th>
                        <th className="p-4">Cash Withdrawn</th>
                        <th className="p-4">Cash Refunds</th>
                      </tr>
                    </thead>
                    <tbody className="bg-zinc-100">
                      {Data.map((items, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-zinc-100 text-black font-light"
                              : "text-black font-light"
                          }
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{items?.Date}</td>
                          <td className="border px-4 py-2">
                            {items?.OpeningBalance}
                          </td>
                          <td className="border px-4 py-2">
                            {items?.ClosingBalance}
                          </td>
                          <td className="border px-4 py-2">
                            Rs. {items?.SalesAmount}
                          </td>
                          <td className="border px-4 py-2">
                            Rs. {items?.ExpensesAmount}
                          </td>
                          <td className="border px-4 py-2">
                            Rs. {items?.DroppedCash}
                          </td>
                          <td className="border px-4 py-2">
                            Rs. {items?.CashWithdrawn}
                          </td>
                          <td className="border px-4 py-2">
                            Rs. {items?.Refunds}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}
