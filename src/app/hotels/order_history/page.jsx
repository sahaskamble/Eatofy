"use client";

import { useReactToPrint } from "react-to-print";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { TiPrinter } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { MdOutlineModeEditOutline, MdOutlineRemoveRedEye } from "react-icons/md";

const BillTable = () => {
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

  // Handle Bill Print
  const handleBillPrint = useReactToPrint({
    content: () => billPrint.current,
  });

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
        if (result.returncode === 200 && Array.isArray(result.output)) {
          setBillList(result.output);
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

  // Edit Bill Info
  const fetchBill = async (bill_id) => {
    try {
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
          const bill_info = result.output[0].BillInfo[0];
          setBillInfo(bill_info);
          setbillId(bill_info?.id);
          setTableId(bill_info?.TableId);
          settotalAmt(bill_info?.TotalAmount);
          setBalanceAmt(bill_info?.BalanceAmount || 0);
          setmenutotal(bill_info?.MenuTotal || 0);
          setvatRate(bill_info?.VatRate || 0);
          setdiscountRate(bill_info?.DiscountRate || 0);
          setPaymentMode(bill_info?.PaymentMode);
          setPaymentStatus(bill_info?.Status);
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

  const statusChangeHandler = (e) => {
    e.preventDefault();
    const selectedStatus = e.target.value;
    let newBalanceAmount = BalanceAmt;

    if (selectedStatus === 'Paid') {
      newBalanceAmount = 0;
    }
    else if (selectedStatus === 'Part-paid') {
      if (BalanceAmt === 0) {
        alert('Balance cannot be zero');
        setisFormValid(false);
        return;
      }
    }
    else if (selectedStatus === 'Unpaid') {
      newBalanceAmount = totalAmt;
      setPaymentMode('None');
    }

    setPaymentStatus(selectedStatus);
    setBalanceAmt(newBalanceAmount)
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
          setOrdersInfo(orders_info);
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

  // View Bill Info
  const fetchBillInfo = async (bill_id) => {
    setDisplayBillInfo(true);
    try {
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
          const bill_info = result.output[0]?.BillInfo[0];
          const orders_info = result.output[0]?.Orders;
          let quantity = 0;
          await orders_info.map((order) => {
            const qty = parseInt(order?.Quantity);
            quantity = quantity + qty;
          });
          setTotalQty(quantity);
          setBillInfo(bill_info);
          setOrdersInfo(orders_info);
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

  // Bill Payment
  const handleSettleBill = async () => {
    if (isFormValid) {
      try {

        const response = await fetch(`${ApiHost}/api/hotel/bills/management/update/payment`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'bill_id': billId,
            'table_id': TableId,
            'menu_total': menutotal,
            'eatocoins': 0,
            'balance_amount': BalanceAmt || 0,
            'payment_mode': PaymentMode,
            'payment_status': PaymentStatus
          }),
        });

        if (response.status === 200) {
          setEditBillInfo(false);
          fetchBillList();
        } else {
          setMessage('Payment Failed');
        }

      } catch (e) {
        throw console.error(e);
      }
    }
    else {
      alert("Please Follow Instructions Properly")
    }
  }

  // Bill Delete
  const handleBillDelete = async (bill_id) => {
    try {
      const response = await fetch(`${ApiHost}/api/hotel/bills/management/update/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'bill_id': bill_id }),
      });

      if (response.ok) {
        fetchBillList();
      } else {
        alert("Failed to fetch bill list");
      }
    } catch (error) {
      alert(`Error: ${error}`);
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
      LoadSettings();
    }
  }, [hotel_id]);

  // Search Bar
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  async function LoadSettings() {
    try {
      const res = await fetch(`${ApiHost}/api/hotel/settings/gst/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'hotel_id': hotel_id })
      });

      const resVat = await fetch(`${ApiHost}/api/hotel/settings/vat/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'hotel_id': hotel_id })
      });

      if (res.ok) {
        const data = await res.json();
        setisGstSet(data?.output[0]?.Visibility || false);
      }

      if (resVat.ok) {
        const data = await resVat.json();
        setisVatSet(data?.output[0]?.Visibility || false);
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] flex-1 h-screen p-4 bg-white">
        <div className="flex justify-start items-center gap-4 mb-4">
          <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
            router.back()
          }} />
          <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">Order History</h2>
        </div>
        <div className="">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Table, Waiter, Payment Status or Customer..."
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
                  filteredOrders?.map((bill, index) => (
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
                          <button onClick={() => { fetchBillInfo(bill?.id) }}>
                            <MdOutlineRemoveRedEye size={20} />
                          </button>
                          <button onClick={() => { fetchBill(bill?.id); setEditBillInfo(true); }}>
                            <MdOutlineModeEditOutline size={20} />
                          </button>
                          <button onClick={() => handleBillDelete(bill?.id)}>
                            <FaRegTrashAlt size={20} />
                          </button>
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
                                      <span className="text-center">Bill No: {billInfo?.id?.slice(0, 6)}</span>
                                      <span className="text-center">Date: {formattedDate}</span>
                                      <span>-----------------------------------------------------------------------------</span>
                                    </div>
                                    <div className="mb-2">
                                      <span>
                                        {
                                          billInfo.Type === "Dine-In" ? (
                                            <strong>{billInfo?.Table?.TableName}</strong>
                                          ) : (
                                            <strong>{billInfo?.Type}</strong>
                                          )
                                        }
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
                                          <th className="py-1 text-center">
                                            <strong>
                                              Price
                                            </strong>
                                          </th>
                                          <th className="py-1 text-right">
                                            <strong>
                                              Amount
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
                                                <td className="py-1 text-center">{items?.Menu?.Price / items.Quantity | 0}</td>
                                                <td className="py-1 text-right">{items?.Menu?.Price}</td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </table>
                                    <span>-----------------------------------------------------------------------------</span>
                                    <div className="w-full p-1 flex-col justify-between items-center">
                                      <div className="flex justify-between items-center w-full">
                                        <div>Sub-Total</div>
                                        <div>{billInfo?.MenuTotal}</div>
                                      </div>
                                      {/*

                                        <div className="flex justify-between items-center">
                                          <div>Quantity</div>

                                          <div>{TotalQty || 0}</div>
                                        </div>
                                      */}
                                    </div>
                                    <span>-----------------------------------------------------------------------------</span>
                                    {
                                      isGstSet &&
                                      (
                                        <>

                                          <div className="w-full p-1 inline-flex justify-between items-center">
                                            <div>CGST ({billInfo?.CGSTRate})</div>
                                            <div>{billInfo?.CGSTAmount}</div>
                                          </div>
                                          <div className="w-full p-1 inline-flex justify-between items-center">
                                            <div>SGST ({billInfo?.SGSTRate})</div>
                                            <div>{billInfo?.SGSTAmount}</div>
                                          </div>
                                        </>
                                      )
                                    }
                                    {
                                      isVatSet &&
                                      (
                                        <>
                                          <div className="w-full p-1 inline-flex justify-between items-center">
                                            <div>VAT ({billInfo?.VatRate})</div>
                                            <div>{billInfo?.VatAmount}</div>
                                          </div>
                                        </>
                                      )
                                    }
                                    {
                                      (billInfo?.DiscountPrice) &&
                                      (
                                        <div className="w-full p-1 inline-flex justify-between items-center">
                                          <div>Discount ({billInfo?.DiscountRate})</div>
                                          <div>( - {billInfo?.DiscountPrice})</div>
                                        </div>
                                      )
                                    }
                                    <span>-----------------------------------------------------------------------------</span>
                                    {
                                      (billInfo?.BalanceAmount > 0) ?
                                        (

                                          <div className="w-full p-1 inline-flex justify-between items-center">
                                            <div>Balance Amount</div>
                                            <div>{billInfo?.BalanceAmount | 0}</div>
                                          </div>
                                        ) : ""
                                    }
                                    <div className="w-full p-1 inline-flex justify-between items-center">
                                      <div><strong> Grand Total </strong></div>
                                      <div><strong> {billInfo?.Amount | 0} </strong></div>
                                    </div>
                                    <span>-----------------------------------------------------------------------------</span>

                                    <div className="text-center m-6">
                                      <span>!!! Thank You !!!</span>
                                    </div>
                                  </div>
                                  <div className="flex gap-10 justify-center items-center mt-4">
                                    <button
                                      onClick={() => { handleBillPrint(); }}
                                      className="bg-red-500 font-bold rounded-lg text-white px-4 py-2">
                                      Print
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

      {
        // Popup Screen
        editBillInfo &&
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[70dvw]  relative">
            <div className="flex justify-between w-full">
              <h1 className="text-2xl font-semibold">Invoice Payment</h1>
              <button onClick={() => setEditBillInfo(false)}>
                <IoClose size={35} />
              </button>
            </div>

            {/* Bill Info */}
            <h3 className="text-red-500 pt-2"> *Current values are vulnerable after updating please do check the bill first  before payment</h3>

            <div className="w-full mt-6">
              <div className="bg-gray-200 w-full h-1 rounded-2xl"></div>
              <div className="w-full flex flex-col justify-center items-center p-4 gap-6">
                <div className="text-lg flex w-full gap-2">
                  <h1 className="font-bold">Previous Bill Amount:</h1>
                  <label htmlFor="TotalAmt" className=""> Rs. {totalAmt | 0} </label>
                </div>
                <div className="w-full flex justify-between">
                  <div id="balance" className="flex flex-col gap-2">
                    <label htmlFor="balance" className="font-bold"> Balance Amount </label>
                    <input
                      type="text"
                      value={BalanceAmt}
                      className="rounded-lg"
                      onChange={(e) => { setBalanceAmt(parseFloat(e.target.value)) }}
                      required
                    />
                  </div>
                  <div id="payment_mode" className="flex flex-col gap-2">
                    <label htmlFor="payment_mode" className="font-bold"> Payment Mode </label>
                    <select
                      name="payment_mode"
                      className="rounded-lg"
                      value={PaymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="None">None</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Credit-card">Credit-card</option>
                    </select>
                  </div>
                  <div id="payment_status" className="flex flex-col gap-2">
                    <label htmlFor="payment_status" className="font-bold">Payment Status</label>
                    <select
                      name="payment_status"
                      className="rounded-lg"
                      value={PaymentStatus}
                      onChange={statusChangeHandler}
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="Booked">Booked</option>
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                      <option value="Part-paid">Part-paid</option>
                    </select>
                  </div>
                </div>
                <div className="flex w-full pt-6 gap-6">
                  <button
                    onClick={handleSettleBill}
                    className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditBillInfo(false)}
                    className="bg-gray-500 text-white font-bold px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {
        // Popup Screen
        displayBillInfo &&
        <div onClick={() => setDisplayBillInfo(false)} className="fixed z-10 inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center overflow-scroll">
          <div className="bg-white p-6 rounded-lg w-[70dvw] relative h-auto">
            <div className="flex justify-between w-full mt-5">
              <h1 className="text-2xl font-semibold">Invoice</h1>
              <button onClick={() => setDisplayBillInfo(false)}>
                <IoClose size={35} />
              </button>
            </div>
            {/* Bill Info */}

            <div className="w-full mt-6">
              <h3 className="bg-zinc-200 text-black font-bold p-2 text-center w-full"> Bill Details </h3>
              {billInfo && (
                <div className="w-full flex flex-col justify-center items-center p-4 gap-6">

                  <div className="flex justify-center items-center">
                    <p className="text-xl font-medium">{billInfo?.Type}</p>
                  </div>

                  <div className="p-4 flex justify-between w-full text-sm">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Invoice Date: </h1>
                      <p>{billInfo?.Date}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Payment: </h1>
                      <div>
                        <p className={`p-1.5 text-sm font-bold uppercase tracking-wider rounded-lg bg-opacity-80 text-center ${billInfo?.Status === "Paid" ? "bg-green-300 text-green-800" :
                          billInfo?.Status === "Active" ? "bg-yellow-300 text-yellow-800" :
                            billInfo?.Status === "Unpaid" ? "bg-red-300 text-red-800" :
                              "bg-gray-300 text-gray-800"
                          }`}>
                          {billInfo?.Status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between w-full text-sm">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Customer Name: </h1>
                      <p>{billInfo?.Customer?.CustomerName || 'N/A'}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Customer Contact: </h1>
                      <p>{billInfo?.Customer?.Contact || 'N/A'}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Eatocoins Used: </h1>
                      <p>{billInfo?.Customer?.EatocoinsWallet | 0 || '0'} </p>
                    </div>
                  </div>

                  <div className="p-4 flex  justify-between w-full text-sm">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Gst: ({billInfo?.GSTRate})</h1>
                      <p> Rs. {billInfo?.GST || '0'}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold flex gap-1">
                        <label>VAT </label>
                        <label>({billInfo?.VatRate}) :-</label>
                      </h1>
                      <p>Rs. {billInfo?.VatAmount}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Discount: ({billInfo?.DiscountRate})</h1>
                      <p> Rs. {billInfo?.DiscountPrice || '0'}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold"> Total: </h1>
                      <p>Rs. {billInfo?.TotalAmount | 0}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold"> Balance: </h1>
                      <p>Rs. {billInfo?.BalanceAmount}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between w-full">
                    <h3 className="bg-zinc-200 text-black font-bold p-2 border-2 border-white text-center w-full rounded-lg" > Order Details </h3>
                    <table className="min-w-full bg-white text-center">
                      <thead>
                        <tr className="bg-gray-500 text-white rounded-lg">
                          <th className="py-2 border-2 border-white">Item</th>
                          <th className="py-2 border-2 border-white">Quantity</th>
                          <th className="py-2 border-2 border-white">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          ordersInfo
                            .filter((orders) => {
                              return orders.Status != "Cancelled"
                            })
                            .map((order, index) => (
                              <tr key={index} className="bg-gray-200 text-black rounded-lg">
                                <td className="py-2 border-2 border-white">{order?.Menu?.Dish?.DishName}</td>
                                <td className="py-2 border-2 border-white">{order?.Quantity}</td>
                                <td className="py-2 border-2 border-white">
                                  <h1 className="">Rs. {order.TotalAmount | 0}</h1>
                                  <p className="text-xs font-extralight">{order?.Menu?.Price} per</p>
                                </td>
                              </tr>
                            ))
                        }
                      </tbody>
                    </table>
                  </div>


                </div>
              )}
            </div>

            {/* Orders Info */}

          </div >
        </div >
      }
    </>
  );
};

export default BillTable;
