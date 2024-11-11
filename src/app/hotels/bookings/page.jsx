'use client';

import { ApiHost } from "@/constants/url_consts";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaCreditCard, FaMinus, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { useRouter, useSearchParams } from "next/navigation";

export default function Menu() {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotel');
  const tableId = searchParams.get('table');
  const sectionId = searchParams.get('section');
  const waiterId = searchParams.get('waiter');
  const hotelname = searchParams.get('name');
  const [isLoading, setLoading] = useState(false);
  const [noSearchParams, setnoSearchParams] = useState(false);
  const [isGstSet, setisGstSet] = useState(false);
  const [isVatSet, setisVatSet] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [Search, setSearch] = useState('');
  const [isDishDisplayFullWidth, setDishDisplayFullWidth] = useState(false);
  const [showBillInvoice, setShowBillInvoice] = useState(true);
  const [ClickedCategory, setClickedCategory] = useState(null);
  const [ShowAllDishes, setShowAllDishes] = useState(true);
  const [HotelId, setHotelId] = useState('');
  const [TableId, setTableId] = useState('');
  const [WaiterId, setWaiterId] = useState('');
  const [SectionId, setSectionId] = useState('');
  const [isSettleBill, setisSettleBill] = useState(false);
  const [ShowError, setShowError] = useState(false);
  const [disAmt, setdisAmt] = useState('');
  const [vatAmt, setvatAmt] = useState('');
  const [Vat, setVat] = useState('');
  const [Cgst, setCgst] = useState('');
  const [Sgst, setSgst] = useState('');
  const [BalanceAmt, setBalanceAmt] = useState(0);
  const [PaymentMode, setPaymentMode] = useState('Cash');
  const [PaymentStatus, setPaymentStatus] = useState('Paid');
  const [IsOrderSaved, setIsOrderSaved] = useState(false);
  const [IsOrderFailed, setIsOrderFailed] = useState(false);
  const [TableName, setTableName] = useState('');
  const route = useRouter();
  const [Type, setType] = useState('');
  const billkot = useRef();
  const bill = useRef();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Bill Management
  const [doesBillExists, setdoesBillExists] = useState(false);
  const [billId, setBillId] = useState("");
  const [OldCart, setOldCart] = useState([]);
  const [Cart, setCart] = useState([]);
  const [Message, setMessage] = useState('');
  const [HotelName, setHotelName] = useState("");
  const [total_qty, settotal_qty] = useState(0);


  // Customer Relationship Management
  const [CustomerName, setCustomerName] = useState('');
  const [CustomerContact, setCustomerContact] = useState('');
  const [CustomerEmail, setCustomerEmail] = useState('');
  const [CustomerOccassion, setCustomerOccassion] = useState('');
  const [CustomerDate, setCustomerDate] = useState('' || Date.now());
  // const [CustomerId, setCustomerId] = useState('');
  const [isCrmFilled, setisCrmFilled] = useState(false);

  // Cart Add
  const [activeIndex, setactiveIndex] = useState(null);
  const [isOrderMenuopen, setisOrderMenuopen] = useState(false);

  // Fetch Display Data
  const [ExistingBill, setExistingBill] = useState([]);
  const [Menus, setMenus] = useState([]);
  const [Categories, setCategories] = useState([]);

  // Search Dishes
  const handleSearch = (element) => {
    setShowAllDishes(false);
    setSearch(element.target.value);
  }

  // On Category click display related dishes
  const handleCategoryClick = (category_id) => {
    setShowAllDishes(false);
    setClickedCategory(category_id);
    console.log('it runs')
  }

  // Display Cart
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setDishDisplayFullWidth(!isDishDisplayFullWidth);
  }

  const handleKotPrint = useReactToPrint({
    content: () => billkot.current,
  });

  const handleBillPrint = useReactToPrint({
    content: () => bill.current,
  });

  const QuantityCalculator = () => {
    let qty = 0;

    OldCart.forEach((item) => {
      qty = qty + parseInt(item?.Quantity);
    });

    Cart.forEach((item) => {
      qty = qty + parseInt(item.quantity);
    });

    settotal_qty(qty);
    return qty;
  }


  const handleAddToCart = (dish) => {
    const existingDish = Cart.find(item => item.id === dish.id);
    if (existingDish) {
      setCart(Cart.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...Cart, { ...dish, quantity: 1 }]);
    }
    setMenuOpen(true);
    setDishDisplayFullWidth(true);
  }

  const handleIncrement = async (id) => {
    setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  }

  const handleDecrement = (id) => {
    setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
  }

  const handleCartItemDelete = (id) => {
    setCart(Cart.filter(item => item.id !== id));
    // setshowBillUpdate(false);
  }

  const toggleDisplay = () => {
    setShowBillInvoice(!showBillInvoice);
  }

  const handlePaymentModeClick = (mode) => {
    setPaymentMode(mode);
  };

  const handlePaymentStatusClick = (status) => {
    setPaymentStatus(status);
    statusChangeHandler(status);
  };

  const fetch_bill = async () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      const section_id = SectionId;

      try {
        const response = await fetch(`${ApiHost}/api/hotel/takeaway_bill`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'section_id': section_id }),
        });

        const data = await response.json();
        if (data.returncode === 200) {
          const response_data = await data.output[0];
          setMenus(response_data.Menus);
          setCategories(response_data.Categories);
          return
        } else {
          console.log("Failed to fetch Dishes");
          return
        }
      } catch (e) {
        console.error(e);
        // setnoSearchParams(true);
        return
      } finally {
        setLoading(false);
      }
    }
  }

  const handleSaveMenu = async () => {
    try {

      const OrderData = Cart.map(item => ({
        quantity: `${item.quantity}`,
        menu_id: item.id,
        hotel_id: item.Section.HotelId
      }));

      let response;
      response = await fetch(`${ApiHost}/api/hotel/orders/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'type': Type,
          'table_id': TableId,
          'hotel_id': HotelId,
          'waiter_id': WaiterId,
          'menu_data': OrderData,
          'customer_name': CustomerName,
          'contact': CustomerContact,
          'email': CustomerEmail,
          'occassion': CustomerOccassion,
          'date': CustomerDate
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        alert("Order is saved")
        setBillId(data.output[0].Bill.id);
        setIsOrderSaved(true);
        setTimeout(() => {
          setIsOrderSaved(false);
        }, 2000);
      } else {
        alert("Order is failed")
        setIsOrderFailed(true);
        fetch_bill();
        setTimeout(() => {
          setIsOrderFailed(false);
        }, 2000);
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  const CalculateSubTotal = () => {
    let oldcartTotal;
    let newCart;

    const parseItemValue = (value) => {
      const parsedValue = parseInt(value);
      return isNaN(parsedValue) ? 0 : parsedValue;
    };

    oldcartTotal = (OldCart.reduce((total, item) => total + (item.Menu.Price * parseInt(item.Quantity)), 0));
    newCart = (Cart.reduce((total, item) => total + (parseItemValue(item.Price) * parseItemValue(item.quantity)), 0));
    const amount = oldcartTotal + newCart;
    return amount.toString();
  }


  const statusChangeHandler = (status) => {
    const selectedStatus = status;

    if (selectedStatus === "Paid") {
      setBalanceAmt(0);
    } else if (selectedStatus === "Partpaid") {
      if (BalanceAmt === 0) {
        alert("Balance cannot be zero");
      }
    } else if (selectedStatus === "Unpaid") {
      setBalanceAmt(totalAmt);
    }
  };

  const menutotal = CalculateSubTotal();

  async function LoadSettings() {
    try {
      const res = await fetch(`${ApiHost}/api/hotel/settings/gst/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'hotel_id': HotelId })
      });

      const resVat = await fetch(`${ApiHost}/api/hotel/settings/vat/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'hotel_id': HotelId })
      });

      if (res.ok) {
        const data = await res.json();
        setisGstSet(data?.output[0]?.Visibility || false);
        const Gst = data?.output[0]?.GSTPercent;
        const half = Gst / 2;
        setCgst(half);
        setSgst(half);
      }

      if (resVat.ok) {
        const data = await resVat.json();
        setisVatSet(data?.output[0]?.Visibility || false);
        const Vat = data?.output[0]?.VATPercent;
        setVat(Vat);
      }

      setisCrmFilled(true);
    } catch (e) {
      throw console.error(e);
    }
  }


  let cgstAmt = 0; let sgstAmt = 0; let cgstRateNum = 0; let sgstRateNum = 0;
  if (isGstSet) {

    cgstRateNum = Cgst;
    sgstRateNum = Sgst;
    cgstAmt = (cgstRateNum / 100) * parseFloat(menutotal);
    sgstAmt = (sgstRateNum / 100) * parseFloat(menutotal);
  }

  let VatAmt = 0;
  if (isVatSet) {
    VatAmt = Vat === "" ? 0 : (Vat / 100) * parseFloat(menutotal);
  }

  const grosstotal = parseFloat(menutotal) + cgstAmt + sgstAmt + VatAmt;
  const discount = disAmt === "" ? 0 : (parseFloat(disAmt.replace("%", "")) / 100) * grosstotal;
  const totalAmt = discount === 0 ? grosstotal : grosstotal - discount;
  const handleSettleBill = async () => {

    try {

      const response = await fetch(`${ApiHost}/api/hotel/bills/management/update/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'bill_id': billId,
          'table_id': TableId,
          'menu_total': parseFloat(menutotal),
          'balance_amount': parseFloat(BalanceAmt),
          'discount_rate': disAmt,
          'payment_mode': PaymentMode,
          'payment_status': PaymentStatus
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setMessage('Payment Successful');
        setTimeout(() => {
          route.push('/hotels/home');
        }, 2000);
      } else {
        setMessage('Payment Failed');
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  function handleIsCrmFilled() {
    try {

      if (CustomerName === '' || CustomerContact === '' || CustomerEmail === '' || CustomerOccassion === '' || CustomerDate === '') {
        alert('Please Fill the info below');
      } else {
        setisCrmFilled(false);
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    if (HotelId) {
      fetch_bill()
      LoadSettings()
    }
  }, [HotelId]);

  useEffect(() => {
    if (searchParams.size !== 0) {
      setType('QRBooking');
      setHotelId(hotelId);
      setTableId(tableId);
      setWaiterId(waiterId);
      setSectionId(sectionId);
      setHotelName(hotelname);
    } else {
      setnoSearchParams(true);
    }
  }, [searchParams])


  if (isLoading) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <div className={`${isLoading ? 'hidden' : ''}`}>
      {
        noSearchParams ?
          <div className="w-full h-dvh flex justify-center items-center px-10">
            <div className="w-full md:w-1/3 h-auto px-10 py-10 shadow-gray-400 shadow-md rounded-lg border border-gray-200 flex justify-center items-center gap-4 flex-col">
              <h1 className="text-2xl font-bold">404</h1>
              <p className="text-base">Please Scan the QR to Place Order</p>
            </div>
          </div>
          :
          <div className="flex flex-col px-0 overflow-hidden bg-white">
            <div id="Dish_Display" className={`h-auto transition-width duration-500 w-full`}>
              <div className="w-full flex flex-col md:flex-row justify-between items-center p-4">
                <div className="flex gap-4 justify-center items-center">
                  <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">QR Booking</h1>
                </div>
                <div className="w-full flex gap-3 mt-3">
                  <input
                    type="text"
                    className="w-full rounded-lg text-sm bg-black text-white placeholder-white px-3 py-3 focus:outline-none focus:ring-red-400"
                    placeholder="Search by name or code"
                    value={Search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div id="Categories" className="px-4 py-2 flex justify-center w-full h-auto">
                <select
                  onChange={(e) => {
                    const catid = e.target.value;
                    if (catid === 'All') {
                      setShowAllDishes(true);
                    } else {
                      handleCategoryClick(catid);
                    }
                  }}
                  className="w-full rounded-lg"
                >
                  <option id="Test" value={'All'}>All</option>
                  {
                    Categories.map((category, index) => (
                      <option
                        key={category.id}
                        value={category.id}
                        className={`${activeIndex === index ? 'bg-red-500 text-white' : 'text-black border-black border'} w-auto h-auto font-semibold cursor-pointer px-4 py-1 rounded-lg`}
                      >
                        {category.CategoryName}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="w-full flex flex-col gap-4 h-auto">
                <div className="flex justify-between p-2 px-4 items-center">
                  <div>
                    <p className="text-xl font-bold">Choose Dishes</p>
                  </div>
                </div>

                <div className="w-full h-auto grid grid-cols-1 gap-6 px-6 items-center">
                  {
                    ShowAllDishes
                      ?
                      Menus.filter((menu) => {
                        const searchMatch = menu.Dish.DishName.toLowerCase().includes(Search.toLowerCase()) || menu.Dish.Code.toLowerCase().includes(Search.toLowerCase());
                        return searchMatch;
                      }).map((menu, index) => (
                        <div
                          key={index}
                          onClick={() => { handleAddToCart(menu) }}
                          id="menu"
                          className={`border-2 border-gray-300 p-6 w-auto h-auto-center rounded-lg flex flex-col justify-center items-center shadow-md shadow-gray-400`}
                        >
                          <p className="flex flex-wrap text-lg font-semibold">
                            {menu.Dish.DishName}
                          </p>
                          <div className="w-full flex justify-between items-center pt-3">
                            <div>
                              {
                                menu.Dish.Type === 'Veg' ? (
                                  <div className="veg-badge-container">
                                    <span className="circle"></span>
                                  </div>
                                ) : menu.Dish.Type === 'Non-Veg' ? (
                                  <div className="non-veg-badge-container">
                                    <span className="triangle"></span>
                                  </div>
                                ) : menu.Dish.Type === 'Egg' && (
                                  <div className="egg-badge-container">
                                    <span className="egg-circle"></span>
                                  </div>
                                )
                              }
                            </div>
                            <div className="flex justify-center items-center">
                              <button
                                className="px-2 py-1 border border-gray-300 bg-green-600 text-white text-sm font-bold rounded-lg active:bg-green-400"
                                onClick={() => { handleAddToCart(menu) }}
                              >
                                add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                      :
                      Menus.filter((menu) => {
                        // Check if the category matches or if no category is selected (show all)
                        const categoryMatch = ClickedCategory === null || menu.Dish.Category.id === ClickedCategory;
                        console.log(ClickedCategory)
                        // Check if the dish name or code includes the search text
                        const searchMatch = menu.Dish.DishName.toLowerCase().includes(Search.toLowerCase()) || menu.Dish.Code.toLowerCase().includes(Search.toLowerCase());
                        // Return true if both conditions are met
                        return categoryMatch && searchMatch;

                      }).map((menu, index) => (
                        <div
                          key={index}
                          onClick={() => { handleAddToCart(menu) }}
                          id="menu"
                          className={`border-2 border-gray-300 p-6 w-auto h-auto-center rounded-lg flex flex-col justify-center items-center shadow-md shadow-gray-400`}
                        >
                          <p className="flex flex-wrap text-lg font-semibold">
                            {menu.Dish.DishName}
                          </p>
                          <div className="w-full flex justify-between items-center pt-3">
                            <div>
                              {
                                menu.Dish.Type === 'Veg' ? (
                                  <div className="veg-badge-container">
                                    <span className="circle"></span>
                                  </div>
                                ) : menu.Dish.Type === 'Non-Veg' ? (
                                  <div className="non-veg-badge-container">
                                    <span className="triangle"></span>
                                  </div>
                                ) : menu.Dish.Type === 'Egg' && (
                                  <div className="egg-badge-container">
                                    <span className="egg-circle"></span>
                                  </div>
                                )
                              }
                            </div>
                            <div className="flex justify-center items-center">
                              <button
                                className="px-2 py-1 border border-gray-300 bg-green-600 text-white text-sm font-bold rounded-lg active:bg-green-400"
                                onClick={() => { handleAddToCart(menu) }}
                              >
                                add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))

                  }
                </div>
                <div className="fixed bottom-0 left-0 w-full h-auto bg-white">
                  {
                    Cart.length !== 0 &&
                    <div>
                      {
                        isOrderMenuopen &&
                        <div className="w-full overflow-scroll ">
                          {Cart.map((items, index) => {
                            return (
                              <div key={index} className="flex items-center p-2">
                                <div className="flex-1 inline-flex justify-start items-center gap-3">
                                  <div
                                    onClick={() => handleCartItemDelete(items.id)}
                                    className="w-auto h-auto p-2 bg-green-400 inline-grid place-items-center rounded-md"
                                  >
                                    <FaTrash size={20} className="text-white" />
                                  </div>
                                  <div className="text-xs pr-3">{items.Dish.DishName}</div>
                                </div>
                                <div className="w-[30%] h-[40px] py-2 inline-flex justify-center items-center gap-4">
                                  <FaMinus
                                    size={20}
                                    onClick={() => handleDecrement(items.id)}
                                  />
                                  <div className="w-[30px] h-[30px] bg-green-400 text-white font-bold inline-grid place-items-center rounded-md">
                                    {items.quantity}
                                  </div>
                                  <FaPlus
                                    size={20}
                                    onClick={() => handleIncrement(items.id)}
                                  />
                                </div>
                                <div className="w-[20%] inline-flex flex-col justify-center items-center">
                                  <div className="text-sm">
                                    ₹ {items.Price * items.quantity}
                                  </div>
                                  <div className="text-[10px]">
                                    Per. {items.Price}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      }
                      <div className="w-full flex justify-between items-center p-4">
                        <span>Menu Total :- {menutotal}</span>
                        <button
                          className="px-3 py-2 border border-gray-300 bg-green-500 text-white text-sm font-bold rounded-lg active:bg-green-400"
                          onClick={() => { setisOrderMenuopen(!isOrderMenuopen) }}
                        >
                          View order
                        </button>
                      </div>
                      <button
                        className="w-full bg-green-500 p-3 text-white font-bold"
                        onClick={() => { handleSaveMenu() }}
                      >
                        Place Order
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
            {
              isCrmFilled &&
              <div className="w-full fixed top-0 left-0 bg-white flex flex-col gap-4 justify-center align-center h-auto overflow-y-scroll px-4 py-2">
                <div className="flex px-4 bg-black text-white">
                  <div className=" flex justify-start">
                    <button
                      onClick={() => { handleIsCrmFilled() }}
                      className="text-4xl ">
                      <FaXmark size={25} />
                    </button>
                  </div>

                  <div className="flex-1 inline-flex justify-start items-center gap-4 font-bold text-xl p-4">
                    <div className="flex flex-col gap-2">
                      <label>Customer Info</label>
                    </div>
                  </div>
                </div>
                <div id="CRM_Form" className="h-auto">
                  <div className="bg-gray-500 h-[0.2dvh] w-full"></div>
                  <div className="h-full p-6 flex flex-col gap-4 justify-center items-center">
                    <div className="w-full flex flex-col gap-3">
                      <label
                        htmlFor="CustomerName"
                        className="text-lg"
                      >
                        Customer Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        className='w-full bg-zinc-900 text-white rounded-md'
                        type="text"
                        value={CustomerName}
                        onChange={
                          (e) => {
                            setCustomerName(e.target.value)
                          }}
                        placeholder='Enter Customer Name'
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      <label
                        htmlFor="CustomerContact"
                        className="text-lg"
                      >
                        Contact <span className="text-red-500">*</span>
                      </label>
                      <input
                        className='w-full bg-zinc-900 text-white rounded-md'
                        type="text"
                        value={CustomerContact}
                        onChange={
                          (e) => {
                            setCustomerContact(e.target.value)
                          }}
                        placeholder='Enter Contact'
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      <label
                        htmlFor="CustomerEmail"
                        className="text-lg"
                      >
                        Email
                      </label>
                      <input
                        className='w-full bg-zinc-900 text-white rounded-md'
                        type="text"
                        value={CustomerEmail}
                        onChange={
                          (e) => {
                            setCustomerEmail(e.target.value)
                          }}
                        placeholder='Enter Customer Email'
                      />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      <label
                        htmlFor="CustomerOccassion"
                        className="text-lg"
                      >
                        Occassion
                      </label>
                      <input
                        className='w-full bg-zinc-900 text-white rounded-md'
                        type="text"
                        value={CustomerOccassion}
                        onChange={
                          (e) => {
                            setCustomerOccassion(e.target.value)
                          }}
                        placeholder='Enter Occassion'
                      />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      <label
                        htmlFor="CustomerDate"
                        className="text-lg"
                      >
                        Date
                      </label>
                      <input
                        className='w-full bg-zinc-900 text-white rounded-md'
                        type="date"
                        value={CustomerDate}
                        onChange={
                          (e) => {
                            setCustomerDate(e.target.value)
                          }}
                      />
                    </div>
                  </div>
                  <div className="w-full pb-20 inline-flex justify-between items-center gap-4 p-6">
                    <button onClick={() => { handleIsCrmFilled() }} className="w-full bg-red-500 p-2 text-white rounded-md">Save</button>
                    <button type="reset" className="w-full border border-red-500 p-2 rounded-md">Cancel</button>
                  </div>
                </div>
              </div>
            }
          </div >
      }
    </div >
  )
}

