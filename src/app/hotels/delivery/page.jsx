'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useRef, useState } from "react";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { FaCreditCard, FaMinus, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCashRegister, FaGooglePay } from "react-icons/fa";


export default function Menu() {

	const [isGstSet, setisGstSet] = useState(false);
	const [isVatSet, setisVatSet] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [Search, setSearch] = useState('');
	const [isDishDisplayFullWidth, setDishDisplayFullWidth] = useState(false);
	const [showBillInvoice, setShowBillInvoice] = useState(true);
	const [ClickedCategory, setClickedCategory] = useState(null);
	const [ShowAllDishes, setShowAllDishes] = useState(true);
	const [HotelId, setHotelId] = useState('');
	const [WaiterId, setWaiterId] = useState('');
	const [isSettleBill, setisSettleBill] = useState(false);
	const [disAmt, setdisAmt] = useState('');
	const [Delivery, setDelivery] = useState(0);
	const [Vat, setVat] = useState('');
	const [Cgst, setCgst] = useState('');
	const [Sgst, setSgst] = useState('');
	const [BalanceAmt, setBalanceAmt] = useState(0);
	const [PaymentMode, setPaymentMode] = useState('Cash');
	const [PaymentStatus, setPaymentStatus] = useState('Paid');
	const [IsOrderSaved, setIsOrderSaved] = useState(false);
	const [IsOrderFailed, setIsOrderFailed] = useState(false);
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
	const [HotelName, setHotelName] = useState("");
	const [EatocoinsOpen, setEatocoinsOpen] = useState(false);
	const [Eatocoins, setEatocoins] = useState('');
	const [ExistingEatocoins, setExistingEatocoins] = useState(0);
	const [total_qty, settotal_qty] = useState(0);
	const [Loading, setLoading] = useState(false);
	const [isEbillOn, setisEbillOn] = useState(false);

	// Bill Management
	const [billId, setBillId] = useState("");
	const [Cart, setCart] = useState([]);
	const [Message, setMessage] = useState('');


	// Customer Relationship Management
	const [CustomerName, setCustomerName] = useState('');
	const [CustomerContact, setCustomerContact] = useState('');
	const [CustomerEmail, setCustomerEmail] = useState('');
	const [CustomerOccassion, setCustomerOccassion] = useState('');
	const [CustomerDate, setCustomerDate] = useState('' || Date.now());
	const [StreetAddress, setStreetAddress] = useState('');
	const [LandMark, setLandMark] = useState('');
	const [Apartment, setApartment] = useState('');
	const [State, setState] = useState('');
	const [City, setCity] = useState('');
	const [ZipCode, setZipCode] = useState('');
	const [Customer_list, setCustomer_list] = useState([]);


	// Fetch Display Data
	const [Menus, setMenus] = useState([]);
	const [Categories, setCategories] = useState([]);
	const [activeIndex, setactiveIndex] = useState(null);

	// Search Dishes
	const handleSearch = (element) => {
		setShowAllDishes(false);
		setSearch(element.target.value);
	}

	// On Category click display related dishes
	const handleCategoryClick = (category_id) => {
		setShowAllDishes(false);
		setClickedCategory(category_id);
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
		console.log("Id");
		setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
		setshowBillUpdate(false);
	}

	const handleDecrement = (id) => {
		console.log(id);
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
		if (typeof window !== "undefined") {
			const section_id = sessionStorage.getItem('section_id');

			try {

				setLoading(true);
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
					console.log("Next", response_data);
					setMenus(response_data.Menus);
					setCategories(response_data.Categories);
					return
				} else {
					console.log("Failed to fetch Dishes");
					return
				}
			} catch (e) {
				console.error(e);
				return
			} finally {
				setLoading(false);
			}
		}
	}

	const handleSettleBillForEBill = async () => {
		setPaymentMode("UPI")
		try {
			await fetch(
				`${ApiHost}/api/hotel/bills/management/update/payment`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						bill_id: billId,
						eatocoins: parseInt(Eatocoins),
						menu_total: parseFloat(menutotal),
						balance_amount: parseFloat(BalanceAmt),
						discount_rate: disAmt,
						payment_mode: PaymentMode,
						payment_status: PaymentStatus,
					}),
				}
			);

			return;

		} catch (e) {
			throw console.error(e);
		}
	};

	const handle_E_Bill = async () => {
		setLoading(true);
		await handleSettleBillForEBill();
		try {
			const response = await fetch(`${ApiHost}/api/hotel/e-bill/email`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ bill_id: billId }),
			});

			const data = await response.json();
			if (data.returncode === 200) {
				setLoading(false);
				setMessage("E-bill sent")
				location.href = "/hotels/home"
			} else {
				setLoading(false);
				setMessage("Customer Email may have not been found or the server is not responding now.");
				setTimeout(() => {
					location.href = "/hotels/home"
				}, 3000)
				return;
			}
		} catch (e) {
			console.error(e);
			return;
		}
	}

	const fetchCustomerList = async () => {
		try {
			const response = await fetch(`${ApiHost}/api/hotel/customers/management/fetch`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ 'hotel_id': HotelId }),
			});

			const result = await response.json();
			if (response.ok) {
				if (result.returncode === 200) {
					// Map the output objects to Staff interface
					const mappedCustomerList = result.output.map((item) => ({
						id: item.id,
						customer_name: item.CustomerName,
						contact: item.Contact,
						email: item.Email,
						occassion: item.CustomerOccassion[0]?.Occassion || "N/A",
						date: item.CustomerOccassion[0]?.Date || "N/A",
						wallet: item?.EatocoinsWallet | 0 || "0",
						street_address: item?.StreetAddress || "",
						apartment: item?.Apartment || "",
						city: item?.City || "",
						state: item?.State || "",
						landMark: item?.Landmark || "",
						zip_code: item?.ZipCode || ""

					}));
					setCustomer_list(mappedCustomerList);
				} else {
					console.error("Unexpected response format:", result);
				}
			} else {
				console.error("Failed to fetch customer list");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSaveMenu = async () => {
		try {

			const OrderData = Cart.map(item => ({
				quantity: `${item.quantity}`,
				menu_id: item.id,
				hotel_id: item.Section.HotelId
			}));

			let response;
			if (Type == "Dine-In") {

				response = await fetch(`${ApiHost}/api/hotel/orders/management/add`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'type': Type,
						'hotel_id': HotelId,
						'waiter_id': WaiterId,
						'menu_data': OrderData,
						'customer_name': CustomerName,
						'contact': CustomerContact,
						'email': CustomerEmail,
						'apartment': Apartment,
						'street_address': StreetAddress,
						'landmark': LandMark,
						'state': State,
						'city': City,
						'zip_code': ZipCode,
						'occassion': CustomerOccassion,
						'date': CustomerDate
					}),
				});
			}
			else {
				response = await fetch(`${ApiHost}/api/hotel/orders/management/add`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'type': Type,
						'hotel_id': HotelId,
						'waiter_id': WaiterId,
						'menu_data': OrderData,
						'customer_name': CustomerName,
						'contact': CustomerContact,
						'email': CustomerEmail,
						'apartment': Apartment,
						'street_address': StreetAddress,
						'landmark': LandMark,
						'state': State,
						'city': City,
						'zip_code': ZipCode,
						'occassion': CustomerOccassion,
						'date': CustomerDate
					}),
				});
			}

			if (response.status === 200) {
				const data = await response.json();
				setBillId(data.output[0].Bill.id);
				setIsOrderSaved(true);
				setTimeout(() => {
					setIsOrderSaved(false);
				}, 2000);
			} else {
				console.log("Failed to Save menu");
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

		const parseItemValue = (value) => {
			const parsedValue = parseInt(value);
			return isNaN(parsedValue) ? 0 : parsedValue;
		};

		const amount = (Cart.reduce((total, item) => total + (parseItemValue(item.Price) * parseItemValue(item.quantity)), 0));
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
		setLoading(true);
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

			const resEbill = await fetch(`${ApiHost}/api/hotel/settings/e-bill/email/read`, {
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

			if (resEbill.ok) {
				const data = await resEbill.json();
				setisEbillOn(data?.output[0]?.Visibility || false);
			}

		} catch (e) {
			throw console.error(e);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
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
					'menu_total': parseFloat(menutotal),
					'balance_amount': parseFloat(BalanceAmt),
					'discount_rate': disAmt,
					'delivery_rate': Delivery,
					'payment_mode': PaymentMode,
					'payment_status': PaymentStatus
				}),
			});

			if (response.status === 200) {
				const data = await response.json();
				console.log("data", data);
				setMessage('Payment Successful');
				setTimeout(() => {
					route.push('/hotels/home');
				}, 2000);
			} else {
				console.log("Failed to update bill");
				setMessage('Payment Failed');
			}

		} catch (e) {
			throw console.error(e);
		}
	}

	function handleSearchAutoComplete(event) {
		setCustomerName(event.target.value);
		try {
			if (event) {
				const name = event.target.value;
				const customer = Customer_list?.find((cust) => cust.customer_name === name);
				if (customer) {
					setCustomerName(customer?.customer_name)
					setCustomerContact(customer?.contact);
					setCustomerEmail(customer?.email);
					setCustomerOccassion(customer?.occassion);
					setCustomerDate(customer?.date);
					setExistingEatocoins(customer?.wallet);
					setStreetAddress(customer?.street_address);
					setApartment(customer?.apartment);
					setCity(customer?.city);
					setState(customer?.state);
					setLandMark(customer?.landMark);
					setZipCode(customer?.zip_code);
				}
			} else {
				alert('Auto Complete is Failed please try again');
			}
		} catch (e) {
			throw console.error(e);
		}
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			setType(sessionStorage.getItem('type'));
			setHotelId(localStorage.getItem('hotel_id'));
			setWaiterId(sessionStorage.getItem('waiter_id'));
			setHotelName(sessionStorage.getItem('HotelName'));
		}

		if (HotelId) {
			LoadSettings()
			document.getElementById("SearchBar").focus();
			fetch_bill();
			fetchCustomerList();
		}
	}, [HotelId, Type]);


	return (
		<>
			{/* HotelSide Navbar */}
			<HotelSideNav />

			{/* Loading Screen */}
			{
				Loading ? (
					<div className="w-full h-dvh flex justify-center items-center">
						<div
							className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							role="status">
							<span
								className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
							>Loading...</span>
						</div>
					</div>) : (

					<div className="ml-[70px] flex px-0 overflow-hidden bg-white">
						<div id="Dish_Display" className={`h-auto transition-width duration-500 ${isDishDisplayFullWidth ? 'w-[60dvw]' : 'w-full'}`}>
							<div className="w-full inline-flex justify-between items-center p-4">
								<div className="flex gap-4 justify-center items-center">
									<Link
										href="/hotels/home"
									>
										<IoIosArrowBack
											className="text-red-500"
											size={45}
										/>
									</Link>
									<h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">Delivery</h1>
								</div>
								<div className="flex gap-3">
									<input
										type="text"
										className="rounded-lg text-sm bg-black text-white p-2 focus:outline-none focus:ring-red-400"
										placeholder="Search by name or code"
										value={Search}
										id="SearchBar"
										onChange={handleSearch}
									/>
									<button
										onClick={toggleMenu}
										className={`text-4xl text-black ${isDishDisplayFullWidth ? 'hidden' : 'block'}`}
									>
										<CiSquareChevLeft />
									</button>
								</div>
							</div>
							<div id="Categories" className="p-4 flex justify-between w-full border-b border-black">
								{
									<div className="flex flex-wrap gap-4">
										<button
											onClick={() => {
												setShowAllDishes(true)
												setactiveIndex(null)
											}}
											className={`${activeIndex === null ? 'bg-red-500 text-white' : 'text-black border-black border'} font-semibold px-4 py-1 rounded-lg`}
										>
											All
										</button>

										{
											Categories.map((category, index) => (
												<button
													key={index + 1}
													onClick={
														() => {
															handleCategoryClick(category.id)
															setactiveIndex(index)
														}
													}
													className={`${activeIndex === index ? 'bg-red-500 text-white' : 'text-black border-black border'} font-semibold cursor-pointer px-4 py-1 rounded-lg`}
												>
													{category.CategoryName}
												</button>
											))
										}
									</div>
								}
							</div>

							<div className="w-full flex flex-col gap-4 h-screen">
								<div className="flex justify-between p-2 px-4 items-center">
									<div>
										<p className="text-xl font-bold">Choose Dishes</p>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 px-6">
									{ShowAllDishes
										? Menus.filter((menu) => menu.Dish.DishName.toLowerCase().includes(Search.toLowerCase()) || menu.Dish.Code.toLowerCase().includes(Search.toLowerCase())).map((menu, index) => (
											<div
												key={index}
												onClick={() => {
													handleAddToCart(menu);
												}}
												id="menu"
												className={`border-2 p-6 w-auto h-auto text-center rounded-lg flex flex-col justify-center items-center ${menu.Dish.Type === "Veg"
													? "border-green-500 text-green-700"
													: menu.Dish.Type === "Non-Veg"
														? "border-red-500 text-red-700"
														: menu.Dish.Type === "Beverage"
															? "border-blue-500 text-blue-700"
															: menu.Dish.Type === "Egg"
																? "border-yellow-500 text-yellow-600"
																: "border-black"
													}`}
											>
												<p className="flex flex-wrap text-lg font-semibold">
													{menu.Dish.DishName}
												</p>
												<p className="flex justify-center items-center">
													&#35;{menu.Dish.Code}
												</p>
												<p className="flex justify-center items-center">
													{menu.Dish.Category.CategoryName}
												</p>
											</div>
										))
										: Menus.filter((menu) => {
											// Check if the category matches or if no category is selected (show all)
											const categoryMatch =
												ClickedCategory === null ||
												menu.Dish.Category.id === ClickedCategory;
											// Check if the dish name or code includes the search text
											const searchMatch =
												menu.Dish.DishName.toLowerCase().includes(
													Search.toLowerCase()
												) ||
												menu.Dish.Code.toLowerCase().includes(
													Search.toLowerCase()
												);
											// Return true if both conditions are met
											return categoryMatch && searchMatch;
										}).map((menu, index) => (
											<div
												key={index}
												onClick={() => {
													handleAddToCart(menu);
												}}
												id="menu"
												className={`border-2 p-6 w-auto h-auto text-center rounded-lg flex flex-col justify-center items-center ${menu.Dish.Type === "Veg"
													? "border-green-500 text-green-700"
													: menu.Dish.Type === "Non-Veg"
														? "border-red-500 text-red-700"
														: menu.Dish.Type === "Beverage"
															? "border-blue-500 text-blue-700"
															: menu.Dish.Type === "Egg"
																? "border-yellow-500 text-yellow-600"
																: "border-black"
													}`}
											>
												<p className="flex flex-wrap text-lg font-semibold">
													{menu.Dish.DishName}
												</p>
												<p className="flex justify-center items-center">
													&#35;{menu.Dish.Code}
												</p>
												<p className="flex justify-center items-center">
													{menu.Dish.Category.CategoryName}
												</p>
											</div>
										))}
								</div>

							</div>

						</div>

						<div
							className={`bg-black text-white h-screen transition-transform duration-500 max-h-dvh ${isMenuOpen
								? "fixed w-[35dvw] top-0 right-0"
								: "fixed top-0 right-[-100%]"
								}`}
						>

							{IsOrderSaved ? (
								<div className="w-1/4 h-[60px] fixed top-10 right-10 bg-green-200 z-50 border-[4px] border-green-500 inline-grid place-items-center">
									<h1 className="text-green-400">Order Saved</h1>
								</div>
							) : IsOrderFailed ? (
								<div className="w-1/4 h-[60px] fixed top-10 right-10 bg-red-200 border-t-[4px] border-red-500 inline-grid place-items-center">
									<h1 className="text-red-400">Failed to save order</h1>
								</div>
							) : (
								[]
							)}

							<div className="flex flex-col gap-4 justify-center align-center h-auto overflow-y-scroll py-2">
								<div className="flex px-4">
									<div className=" flex justify-start">
										<button
											onClick={toggleMenu}
											className="text-4xl ">
											<CiSquareChevRight />
										</button>
									</div>

									<div className="flex-1 inline-flex justify-start items-center gap-4 font-bold text-xl p-4">
										{showBillInvoice ? (
											<div className="flex flex-col gap-2">
												<label> Delivery </label>
											</div>
										) : isSettleBill ? (
											<div className="flex justify-between w-full">
												<label>Payment</label>
											</div>
										) : (
											<label>Customer Details</label>
										)}

									</div>

									<div className="w-1/3 flex items-center justify-end">
										{
											billId.length === 0 ?
												<button
													id="crm_display"
													className="h-10 p-1 px-2 w-auto bg-red-900 border border-white rounded"
													onClick={toggleDisplay}
												>
													{showBillInvoice ? (
														<label>Add Customer</label>
													) : (
														<label>Back</label>
													)}
												</button> :
												[]
										}
									</div>
								</div>

								{
									showBillInvoice ? (
										<div id="Dish Screen" className="h-full relative">
											<div className="flex flex-col">
												<div id="table" className="px-6">
													<div id="head" className="flex justify-between items-center p-2 px-3 border-y-2 border-zinc-500">
														<div className="flex-1">ITEMS</div>
														<div className="w-[30%] text-center">QTY</div>
														<div className="w-[20%] text-center uppercase">Price</div>
													</div>
													<div id="body" className="flex flex-col max-h-[80dvh] overflow-y-scroll overflow-x-hidden">
														{
															Cart.map((items, index) => {
																return (
																	<div key={index} className="flex p-2">
																		<div className="flex-1 inline-flex justify-start items-center gap-3">
																			<div onClick={() => handleCartItemDelete(items.id)} className="w-[30px] h-[30px] bg-red-400 inline-grid place-items-center rounded-md"><FaTrash size={20} className="text-black" /></div>
																			<div>{items.Dish.DishName}</div>
																		</div>
																		<div className="w-[30%] inline-flex justify-center items-center gap-4">
																			<FaMinus size={20} onClick={() => handleDecrement(items.id)} />
																			<div className="w-[30px] h-[30px] bg-red-400 font-bold text-black inline-grid place-items-center rounded-md">{items.quantity}</div>
																			<FaPlus size={20} onClick={() => handleIncrement(items.id)} />
																		</div>
																		<div className="w-[20%] inline-flex flex-col justify-center items-center">
																			<div className="text-base">₹ {items.Price * items.quantity}</div>
																			<div className="text-xs">Per. {items.Price}</div>
																		</div>
																	</div>
																)
															})
														}
													</div>
												</div>
											</div>
										</div>
									)
										:
										isSettleBill ? (
											<div className="w-full h-auto max-h-[75dvh] overflow-y-scroll overflow-x-hidden bg-black px-4 mb-10 flex flex-col gap-4">
												<p
													className={`w-[300px] py-6 fixed top-10 right-10 border-l-3 text-center rounded-lg ${Message === "Payment Successful"
														? "bg-green-200 border-green-500 text-green-500 p-2 text-lg"
														: ""
														} ${Message === "Payment Failed"
															? "bg-red-200 border-red-500 text-red-500 p-2"
															: ""
														}`}
												>
													{Message}
												</p>
												<div className="font-bold mt-2 text-xl">
													Payment mode
												</div>
												<div className="flex justify-between items-center gap-2">
													<div className={`p-3 rounded-md w-full gap-2 inline-grid place-items-center ${PaymentMode === 'Credit-card' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentModeClick('Credit-card') }}>
														<FaCreditCard size={25} />
														<span className="text-sm">Credit-card</span>
													</div>
													<div className={`p-3 rounded-md w-full inline-grid gap-2 place-items-center ${PaymentMode === 'Cash' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentModeClick('Cash') }}>
														<FaCashRegister size={25} />
														<span className="text-sm">Cash</span>
													</div>
													<div className={`p-3 rounded-md w-full gap-2 inline-grid place-items-center ${PaymentMode === 'UPI' ? 'bg-[#252836] border-2 font-semibold border-white text-white' : 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'}`} onClick={() => { handlePaymentModeClick('UPI') }}>
														<FaGooglePay size={25} />
														<span className="text-sm">UPI</span>
													</div>
												</div>

												<div className="font-bold mt-2 text-xl">
													Payment Details
												</div>
												<div className="w-full p-2 flex flex-col gap-2 text-lg">
													{
														isGstSet && (
															<>
																<div className="w-full inline-flex justify-between items-center ">
																	<label className="w-1/2">CGST ({Cgst}%)</label>
																	<div className="w-1/2 text-right">
																		{(cgstAmt || 0).toFixed(2)}
																	</div>
																</div>
																<div className="w-full inline-flex justify-between items-center">
																	<label className="w-1/2">SGST ({Sgst}%)</label>
																	<div className="w-1/2 text-right">
																		{(sgstAmt || 0).toFixed(2)}
																	</div>
																</div>
																<div className="w-full inline-flex justify-between items-center">
																	<label className="w-1/2">GST ({Cgst + Sgst}%)</label>
																	<div className="w-1/2 text-right">
																		{(cgstAmt + sgstAmt || 0).toFixed(2)}
																	</div>
																</div>
															</>
														)
													}
													{
														isVatSet && (
															<div className="w-full inline-flex justify-between items-center mb-2">
																<label className="w-1/2">VAT ({Vat}%)</label>
																<div className="w-1/2 text-right">
																	{VatAmt}
																</div>
															</div>
														)
													}
													<div className="w-full inline-flex justify-between items-center mb-2">
														<label className="w-1/2">Enter Discount</label>
														<input type="text" value={disAmt} onChange={(e) => { setdisAmt(e.target.value) }} className="w-1/2 p-1 bg-[#252836] text-base text-white" placeholder="Discount in %" />
													</div>
													<div className="w-full inline-flex justify-between items-center mb-2">
														<label className="w-1/2">Enter Delivery Rate</label>
														<input type="text" value={Delivery} onChange={(e) => { setDelivery(e.target.value) }} className="w-1/2 p-1 bg-[#252836] text-base text-white" placeholder="Delivery Rate in %" />
													</div>
													<div className="w-full inline-flex justify-end items-center mb-2 ">
														<label className="w-1/2">Enter Balance Amount</label>
														<input
															type="text"
															value={BalanceAmt}
															onChange={(e) => {
																if (e.target.value != 0) {
																	setPaymentStatus("Part-paid")
																}
																else {
																	setPaymentStatus("Paid")
																}
																setBalanceAmt(e.target.value);
															}}
															className="w-1/2 p-1 bg-[#252836] text-base text-white"
															placeholder="Balance amount"
														/>
													</div>
													<div className="w-full inline-flex justify-between items-center border-t border-zinc-500">
														<h1 className="text-right my-2 text-xl ">Total:- </h1>
														<p className="font-semibold text-xl">
															Rs.{totalAmt ? (totalAmt) : (CalculateSubTotal())}
														</p>
													</div>

													<div className="text-white font-bold">
														Payment status
													</div>
													<div className="flex justify-start items-center gap-4 my-3 text-sm">
														<div className={`p-3 rounded-md ${PaymentStatus === 'Paid'
															? 'bg-[#252836] border-2 font-semibold border-white text-white'
															: 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'
															}`}
															onClick={() => { handlePaymentStatusClick('Paid') }}>
															Paid
														</div>
														<div className={`p-3 rounded-md ${PaymentStatus === 'Part-paid'
															? 'bg-[#252836] border-2 font-semibold border-white text-white'
															: 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'
															}`}
															onClick={() => { handlePaymentStatusClick('Part-paid') }}>
															Part-paid
														</div>
														<div className={`p-3 rounded-md ${PaymentStatus === 'Unpaid'
															? 'bg-[#252836] border-2 font-semibold border-white text-white'
															: 'bg-[#252836] hover:font-semibold hover:text-white text-gray-300'
															}`}
															onClick={() => { handlePaymentStatusClick('Unpaid') }}>
															Unpaid
														</div>
														<div
															className={`p-3 rounded-md ${PaymentStatus === "Unpaid"
																? "bg-[#252836] border-2 font-semibold border-white text-white"
																: "bg-[#252836] hover:font-semibold hover:text-white text-gray-300"
																}`}
															onClick={() => {
																setEatocoinsOpen(!EatocoinsOpen);
															}}
														>
															Redeem Eatocoins
														</div>
													</div>
													<div className="w-full inline-flex justify-center items-center gap-4 font-semibold">
														<button className="w-full bg-red-500 text-white p-2 rounded-md" onClick={() => { handleSettleBill() }}>
															Payment
														</button>
														{
															isEbillOn && (
																<button
																	id="send_e-bill"
																	onClick={handle_E_Bill}
																	className="w-full bg-red-500 text-white p-2 rounded-md"
																>
																	Pay & E-bill
																</button>
															)
														}
													</div>
												</div>
											</div>
										) : (
											<div id="CRM_Form" className="h-auto max-h-[80dvh] overflow-y-scroll">
												<div className="max-h-[180dvh] px-6 flex flex-col gap-4 justify-center items-center">
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerName"
															className="text-lg"
														>
															Customer Name <span className="text-red-500">*</span>
														</label>
														<input
															className="w-full bg-zinc-900 text-white rounded-md"
															type="text"
															value={CustomerName}
															onChange={handleSearchAutoComplete}
															placeholder="Enter Customer Name"
															list="customer_name"
															required
														/>
														<datalist id="customer_name">
															{Customer_list.map((item, index) => (
																<option
																	key={index}
																	value={item.customer_name}
																></option>
															))}
														</datalist>
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
															htmlFor="CustomerAddress"
															className="text-lg"
														>
															Apartment
														</label>
														<textarea
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={Apartment}
															onChange={
																(e) => {
																	setApartment(e.target.value)
																}}
															placeholder='eg; 305, Ryuk Apartments, 2nd Floor'
															rows={3}
														></textarea>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerAddress"
															className="text-lg"
														>
															Street Address
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={StreetAddress}
															onChange={
																(e) => {
																	setStreetAddress(e.target.value)
																}}
															placeholder='eg; Chaar rasta, Phadke Road'
															rows={3}
														/>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="LandMark"
															className="text-lg"
														>
															Land Mark
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={LandMark}
															onChange={
																(e) => {
																	setLandMark(e.target.value)
																}}
															placeholder='eg; Fish market, star street'
														/>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerAddress"
															className="text-lg"
														>
															City
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={City}
															onChange={
																(e) => {
																	setCity(e.target.value)
																}}
															placeholder='eg; Dombivli'
															rows={3}
														/>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerAddress"
															className="text-lg"
														>
															State
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={State}
															onChange={
																(e) => {
																	setState(e.target.value)
																}}
															placeholder='eg; Maharashtra'
															rows={3}
														/>
													</div>
													<div className="w-full flex flex-col gap-3">
														<label
															htmlFor="CustomerAddress"
															className="text-lg"
														>
															Zip Code
														</label>
														<input
															className='w-full bg-zinc-900 text-white rounded-md'
															type="text"
															value={ZipCode}
															onChange={
																(e) => {
																	setZipCode(e.target.value)
																}}
															placeholder='eg; 344342'
															rows={3}
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
													<button onClick={toggleDisplay} className="w-full bg-red-500 p-2 text-white rounded-md">Save</button>
													<button type="reset" onClick={toggleDisplay} className="w-full border border-red-500 p-2 text-white rounded-md">Cancel</button>
												</div>
											</div>
										)
								}

								<div className="fixed bottom-0 w-[35dvw] bg-black flex justify-between items-center gap-3 p-4">
									<div
										onClick={() => { handleBillPrint(); QuantityCalculator(); }}
										className="w-full p-1.5 bg-red-500 font-semibold text-center rounded-md cursor-pointer"
									>Print</div>
									{
										isSettleBill ? (
											<div
												onClick={() => { setisSettleBill(false); toggleDisplay() }}
												className="w-full p-1.5 bg-red-500 font-semibold text-white text-center rounded-md cursor-pointer"
											>Back</div>
										) : (
											<div
												onClick={() => { setisSettleBill(true); toggleDisplay() }}
												className="w-full p-1.5 bg-red-500 font-semibold text-white text-center rounded-md cursor-pointer"
											>Pay</div>
										)
									}
									<div
										onClick={() => { handleKotPrint(); handleSaveMenu(); }}
										className="w-full p-1.5 bg-red-500 font-semibold text-white text-center rounded-md cursor-pointer"
									>Kot & Print</div>
								</div>
							</div>
						</div >

						<div
							ref={billkot}
							className="print:w-[60mm] print:text-[14px] print:overflow-hidden mx-auto px-1 bg-white text-black fixed left-0 top-0 z-[-500]"
						>
							<div className="flex flex-col justify-between mb-2 w-full">
								<span className="print:w-full flex justify-center items-center">** KOT **</span>
								{
									typeof window !== "undefined" && (
										<span className="text-center">Type: {sessionStorage.getItem("type")}</span>
									)
								}
								<span className="text-center">Date: {formattedDate}</span>
								<hr className="print:w-full print:border print:border-black " />
							</div>
							<hr className="print:w-full print:border print:border-black " />
							<table className="w-full text-left mb-2 border-b ">
								<thead>
									<tr className="border-b">
										<th className="py-1">Item</th>
										<th className="py-1 text-right">Qty</th>
									</tr>
								</thead>
								<tbody>
									{Cart.map((items, index) => {
										return (
											<tr key={index} className="border-b">
												<td className="py-1">{items.Dish.DishName}</td>
												<td className="py-1 text-right">{items.quantity}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<hr className="print:w-full print:border print:border-black " />
						</div>

						<div
							ref={bill}
							className="print:w-[60mm] print:text-[14px] print:overflow-hidden px-1 mx-auto bg-white text-black fixed top-0 left-0 z-[-150]"
						>
							<div className="flex flex-col justify-between mb-2 w-full">
								<span className="text-center print:text-4xl w-full">
									<strong>
										{HotelName}
									</strong>
								</span>
								<span className="text-center">Bill No: {billId.slice(0, 12)}</span>
								<span className="text-center">GST no: AFGRGB646511356</span>
								<span className="text-center">Date: {formattedDate}</span>
								<hr className="print:w-full print:border print:border-black " />
							</div>
							<hr className="print:w-full print:border print:border-black " />
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
												Qty&nbsp;
											</strong>
										</th>
										<th className="py-1 text-center">
											<strong>
												Price&nbsp;
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
									{Cart
										.map((items, index) => {
											return (
												<tr key={index} className="border-b">
													<td className="py-1">{items.Dish.DishName}</td>
													<td className="py-1 text-center">{items.quantity}</td>
													<td className="py-1 text-center">{items.Price}</td>
													<td className="py-1 text-right">{items.Price * items.quantity | 0}</td>
												</tr>
											);
										})}
								</tbody>
							</table>
							<hr className="print:w-full print:border print:border-black " />
							<div className="w-full p-1 flex-col justify-between items-center">
								<div className="flex justify-between items-center w-full">
									<div>Sub-Total</div>
									<div>{menutotal}</div>
								</div>
								{

									<div className="flex justify-between items-center">
										<div>Quantity</div>

										<div>{total_qty}</div>
									</div>
								}
							</div>
							<hr className="print:w-full print:border print:border-black " />
							{
								isGstSet && (
									<>

										<div className="w-full p-1 inline-flex justify-between items-center">
											<div>CGST ({Cgst}%)</div>
											<div>{cgstAmt}</div>
										</div>
										<div className="w-full p-1 inline-flex justify-between items-center">
											<div>SGST ({Sgst}%)</div>
											<div>{sgstAmt}</div>
										</div>
									</>
								)

							}
							{
								isVatSet && (
									<>
										<div className="w-full p-1 inline-flex justify-between items-center">
											<div>VAT ({Vat}%)</div>
											<div>{VatAmt}</div>
										</div>
									</>
								)
							}
							{
								disAmt && (
									<div className="w-full p-1 inline-flex justify-between items-center">
										<div>Discount ({disAmt}%)</div>
										<div>( - {discount})</div>
									</div>
								)
							}
							{
								BalanceAmt > 0 ? (

									<div className="w-full p-1 inline-flex justify-between items-center">
										<div>Balance Amount</div>
										<div>{BalanceAmt}</div>
									</div>
								) : ""
							}
							{
								Delivery > 0 && (
									<div className="w-full p-1 inline-flex justify-between items-center">
										<div>Delivery Rate({Delivery}%)</div>
										<div>{((menutotal * Delivery) / 100) | 0 || 0}</div>
									</div>
								)
							}
							<div className="w-full p-1 inline-flex justify-between items-center">
								<div><strong> Grand Total </strong></div>
								<div><strong> {totalAmt} </strong></div>
							</div>
							<hr className="print:w-full print:border print:border-black " />
							<div className="text-center mt-4">
								<span>!!! Thank You visit us again !!!</span>
							</div>
						</div>

					</div >
				)
			}
			{
				EatocoinsOpen && (
					<div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-30">
						<div className="bg-white w-[500px] h-[300px] shadow-black shadow-md rounded-md">

							<div className="p-4 my-2 text-lg">
								<p className="my-2">{CustomerName}</p>
								<p className="my-2">Existing Eatocoins :- {ExistingEatocoins}</p>
								<label>
									<input
										defaultValue={Eatocoins}
										onChange={(e) => { setEatocoins(e.target.value) }}
										className="w-full rounded-md p-2"
										placeholder="Enter Eatocoins" />
								</label>
							</div>

							<div className="w-full p-4">
								<button className="w-full bg-red-400 active:bg-red-500 px-4 py-2 text-white my-2 rounded-md" onClick={() => { setEatocoinsOpen(!EatocoinsOpen) }}>Close</button>
							</div>
						</div>
					</div>
				)

			}
		</>
	)
}

