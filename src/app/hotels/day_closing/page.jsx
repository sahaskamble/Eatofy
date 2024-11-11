"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useEffect, useState } from 'react';
import { DateFormatter } from "@/utils/dateFormatter"
import { MdOutlineAccountBalanceWallet, MdOutlineBalance } from "react-icons/md";
import { PiHandWithdrawLight } from "react-icons/pi";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import OpeningBalance from '@/components/OpeningBalance';
import { BiRupee } from "react-icons/bi";

export default function GallaReports() {
  const router = useRouter();

  // For A Week before
  const today = new Date();
  const today_default = DateFormatter(today);


  // Request Params
  const [date, setDate] = useState(today_default);
  const [hotel_id, sethotel_id] = useState('');

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
  const [StaffAttendance, setStaffAttendance] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

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
        const opening_bal = ((drawer_data?.OpeningBalance | 0) || 0);
        const sales_amt = ((drawer_data?.SalesAmount | 0) || 0);
        const expenses_amt = ((drawer_data?.ExpensesAmount | 0) || 0);
        const dropped_cash = ((drawer_data?.DroppedCash | 0) || 0);
        const cash_withdrawn = ((drawer_data?.CashWithdrawn | 0) || 0);
        const refunds = ((drawer_data?.Refunds | 0) || 0);
        const closing_bal = (opening_bal + sales_amt) - (expenses_amt + dropped_cash + cash_withdrawn + refunds);

        setOpening_Balance((drawer_data?.OpeningBalance | 0) || 0);
        // setClosingBalance((drawer_data?.ClosingBalance | 0) || 0);
        setTotalSales((drawer_data?.TotalSales | 0) || 0);
        setSalesAmount((drawer_data?.SalesAmount | 0) || 0);
        setTotalExpenses((drawer_data?.TotalExpenses | 0) || 0);
        setExpensesAmount((drawer_data?.ExpensesAmount | 0) || 0);
        setDroppedCash((drawer_data?.DroppedCash | 0) || 0);
        setCashWithdrawn((drawer_data?.CashWithdrawn | 0) || 0);
        setRefunds((drawer_data?.Refunds | 0) || 0);
        setClosingBalance(closing_bal);
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

      const response = await fetch(`${ApiHost}/api/hotel/staff/attendance/fetch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'hotel_id': hotel_id, "date": date_ }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.returncode === 200 && Array.isArray(result.output)) {
          console.log()
          setStaffList(result.output);
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

  const handleSubmit = async (e) => {
    await e.preventDefault();
    handleClosingBalance();

    const hotel_id = localStorage.getItem("hotel_id");

    try {
      const response = await fetch(`${ApiHost}/api/hotel/cash_drawer/closing_balance`, {
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
    sethotel_id(localStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchData();
      fetchStaffAttendance();
      handleClosingBalance();
    }
  }, [hotel_id]);

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
      const response = await fetch(`${ApiHost}/api/hotel/staff/attendance/update`, {
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
      <HotelSideNav />
      <OpeningBalance />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-between items-center mb-4 pb-6">
              <div className="flex gap-4 items-center">
                <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
                  router.back()
                }} />

                <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">
                  Day Closing
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 mt-6 mb-4">
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
                          <h1 className="text-sm font-bold">
                            {staff.Staff.FirstName} {staff.Staff.LastName}
                          </h1>
                        </div>

                      )
                    })
                }
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white font-bold rounded-lg px-4 py-2"
                onClick={handleSubmit}
              >
                Done
              </button>
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
