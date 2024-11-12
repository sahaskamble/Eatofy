'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { TiPrinter } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { MdOutlineModeEditOutline, MdOutlineRemoveRedEye } from "react-icons/md";

export default function QrOrders() {

  const [billList, setBillList] = useState([]);
  const [isGstSet, setisGstSet] = useState(false);
  const [isVatSet, setisVatSet] = useState(false);
  const [displayBillInfo, setDisplayBillInfo] = useState(false);
  const [billPrintPopup, setbillPrintPopup] = useState(false);
  const [editBillInfo, setEditBillInfo] = useState(false);
  const [billInfo, setBillInfo] = useState({});
  const [TotalQty, setTotalQty] = useState(0);
  const [ordersInfo, setOrdersInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hotel_id, sethotel_id] = useState('');
  const router = useRouter();
  const billPrint = useRef();
  const [isPaid, setisPaid] = useState('Booked');

  // Settle Bill
  const [billId, setbillId] = useState('');
  const [TableId, setTableId] = useState('');
  const [totalAmt, settotalAmt] = useState(0);
  const [BalanceAmt, setBalanceAmt] = useState(0);
  const [menutotal, setmenutotal] = useState(0);
  const [vatRate, setvatRate] = useState(0);
  const [discountRate, setdiscountRate] = useState(0);
  const [PaymentMode, setPaymentMode] = useState('');
  const [PaymentStatus, setPaymentStatus] = useState('');
  const [isFormValid, setisFormValid] = useState(true);
  const [formattedDate, setformattedDate] = useState('');

  // Search Bar
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // View Bills
  const fetchBillList = async () => {
    try {
      const response = await fetch(`${ApiHost}/api/hotel/bills/management/fetch/hotel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.returncode === 200) {
          const bills = result?.output;
          //
          setBillList(
            bills.filter((bill) => {
              return bill.Type === "QR-Booking"
            })
          );
        } else {
          console.error("Unexpected response format:", result);
        }
      } else {
        console.error("Failed to fetch bill list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // View Bill Print Info
  const fetchBillPrintInfo = async (bill_id) => {
    setbillPrintPopup(true);
    try {

      const formatDate = await billInfo?.createdAt?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setformattedDate(formatDate);

      const response = await fetch(`${ApiHost}/api/hotel/bills/management/fetch/single`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'bill_id': bill_id }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.returncode === 200 && Array.isArray(result.output)) {
          let bill_info = result.output[0].BillInfo[0];
          const orders_info = result.output[0].Orders;
          bill_info.createdAt = new Date(bill_info?.createdAt)
          setBillInfo(bill_info);
          console.log(bill_info)
          setOrdersInfo(orders_info);
          console.log(orders_info)
        } else {
          console.error("Unexpected response format:", result);
        }
      } else {
        console.error("Failed to fetch bill list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredOrders = billList.filter((bill) =>
    bill.Table?.TableName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Waiter.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Waiter.LastName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Customer?.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    sethotel_id(localStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchBillList();
    }
  }, [hotel_id])

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] flex-1 h-screen p-4 bg-white">
        <div className="flex justify-start items-center gap-4 mb-4">
          <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
            router.back()
          }} />
          <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">Qr Orders</h2>
        </div>
        <div className='my-4 flex justify-start items-center flex-wrap-reverse gap-4'>
          <p className='text-xl font-bold'>Select Paid or Booked order</p>
          <button className="bg-red-500 text-white px-3 py-2 rounded-lg" onClick={() => { setisPaid('Paid') }}>Paid</button>
          <button className="bg-red-500 text-white px-3 py-2 rounded-lg" onClick={() => { setisPaid('Booked') }}>Booked</button>
        </div>
        <div className="">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Customer name..."
            className="px-4 py-2 border rounded-lg w-full mb-4"
          />
        </div>

        <div className="flex">
          <div className="flex-1">
            <table className="min-w-full text-black border-collapse">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="border px-4 py-2">SR#</th>
                  <th className="border px-4 py-2">Table</th>
                  <th className="border px-4 py-2">Waiter</th>
                  <th className="border px-4 py-2">Customer</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Balance</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Payment Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredOrders?.filter((bills) => bills.Status === isPaid).map((bill, index) => (
                    <tr key={bill?.id} className={index % 2 === 0 ? "bg-zinc-200 text-center" : "text-center"}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        {bill?.Table ? bill?.Table?.TableName : 'N/A'}
                      </td>
                      <td className="border px-4 py-2">
                        {bill?.Waiter ? `${bill?.Waiter?.FirstName} ${bill?.Waiter?.LastName}` : 'N/A'}
                      </td>
                      <td className="border px-4 py-2">
                        {bill?.Customer ? bill?.Customer?.CustomerName : 'N/A'}
                      </td>
                      <td className="border px-4 py-2">{bill?.Type}</td>
                      <td className="border px-4 py-2">Rs. {bill?.BalanceAmount | 0}</td>
                      <td className="border px-4 py-2">Rs. {bill?.TotalAmount | 0}</td>
                      <td className="border px-4 py-2">Rs. {bill?.Amount | 0}</td>
                      <td className="border px-4 py-2">
                        {
                          bill?.Status === "Paid" ? (
                            <span className="p-1.5 text-xs font-bold uppercase tracking-wider bg-green-300 text-green-800 rounded-lg bg-opacity-80">
                              {bill?.Status}
                            </span>
                          ) : bill?.Status === "Active" ? (
                            <span className="p-1.5 text-xs font-bold uppercase tracking-wider bg-yellow-300 text-yellow-800 rounded-lg bg-opacity-80">
                              {bill?.Status}
                            </span>
                          ) : bill?.Status === "Unpaid" ? (
                            <span className="p-1.5 px-2 text-xs font-bold uppercase tracking-wider bg-red-300 text-red-800 rounded-lg bg-opacity-80">
                              {bill?.Status}
                            </span>
                          ) : (
                            <span className="p-1.5 text-xs font-bold uppercase tracking-wider bg-gray-300 text-gray-800 rounded-lg bg-opacity-80">
                              {bill?.Status}
                            </span>
                          )
                        }
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center items-center gap-4">
                          <button onClick={() => { fetchBillPrintInfo(bill?.id); }}>
                            <TiPrinter size={20} />
                          </button>
                          {
                            billPrintPopup &&
                            (
                              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center overflow-scroll">
                                <div className="bg-white p-6 rounded-lg w-[70dvw]  relative">
                                  <div className="flex justify-between w-full">
                                    <h1 className="text-2xl font-semibold">Invoice Printing</h1>
                                    <button onClick={() => setbillPrintPopup(false)}>
                                      <IoClose size={35} />
                                    </button>
                                  </div>
                                  <div
                                    ref={billPrint}
                                    className="max-w-md mx-auto p-4 border border-zinc-300 rounded-md bg-white text-black left-0 z-[-150] overflow-scroll"
                                  >
                                    <div className="flex flex-col justify-between mb-2 w-full">
                                      <span className="text-center text-4xl w-full">
                                        <strong>
                                          {billInfo?.Hotels?.HotelName}
                                        </strong>
                                      </span>
                                      <span>----------------------------------------------------------------------------</span>
                                    </div>
                                    <div className="mb-2">
                                      <span>
                                        <strong>{billInfo?.Table?.TableName}</strong>
                                        <strong>{billInfo?.Type}</strong>
                                      </span>
                                    </div>
                                    <span>-----------------------------------------------------------------------------</span>
                                    <table className="w-full text-left border-collapse mb-2">
                                      <thead>
                                        <tr className="border-b">
                                          <th className="py-1">
                                            <strong>
                                              Item
                                            </strong>
                                          </th>
                                          <th className="py-1 text-center">
                                            <strong>
                                              Qty
                                            </strong>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {ordersInfo
                                          .filter((orders) => {
                                            return orders.Status != "Cancelled"
                                          })
                                          .map((items, index) => {
                                            return (
                                              <tr key={index} className="border-b">
                                                <td className="py-1">{items?.Menu?.Dish?.DishName}</td>
                                                <td className="py-1 text-center">{items?.Quantity}</td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="flex gap-10 justify-center items-center mt-4">
                                    <button
                                      onClick={() => { handleBillPrint(); }}
                                      className="bg-red-500 font-bold rounded-lg text-white px-4 py-2">
                                      PrintKot
                                    </button>
                                    <button
                                      onClick={() => setbillPrintPopup(false)}
                                      className="bg-gray-500 font-bold rounded-lg text-white px-4 py-2"
                                    >
                                      Close
                                    </button>
                                  </div>

                                </div>
                              </div>
                            )
                          }

                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

