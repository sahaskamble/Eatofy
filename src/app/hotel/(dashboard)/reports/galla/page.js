"use client";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import { DateFormatter } from '@/lib/utils';
import { MdOutlineAccountBalanceWallet, MdOutlineBalance } from "react-icons/md";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { PiHandWithdrawLight } from "react-icons/pi";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiStockFill } from "react-icons/ri";
import { FaRegFilePdf } from 'react-icons/fa';

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
		pdf.save(`Galla_Report_ (${today_default}).pdf`);
	};

	// Fetch Values 
	const fetchData = async () => {
		if (date == "") {
			alert("Please Select Filter");
		}

		try {
			const response = await fetch(`/api/hotel/reports/galla`, {
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
		<div className="min-h-screen bg-gray-100">
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
									Galla Report
								</h1>
								<p className="text-gray-500 mt-1">View your daily business report</p>
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
									Daily Report
								</h2>
								<p className="text-red-500 font-medium mt-1">{date}</p>
							</div>
							<button
								onClick={handlePdfGeneration}
								className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:shadow-md active:scale-95 border border-gray-200 flex items-center gap-2"
							>
								<FaRegFilePdf className="text-red-500" size={18} />
								<span>Export PDF</span>
							</button>
						</div>
					</div>

					{/* Stats Grid */}
					<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
						<h3 className="text-xl font-bold text-gray-800 mb-6">Overview</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
							{[
								{
									title: "Profit/Loss Status",
									value: ProfitOrLossAmount,
									status: ProfitOrLoss,
									icon: <RiStockFill size={24} />,
									gradient: `from-${ProfitOrLoss.toLowerCase() === "profit" ? "green" : ProfitOrLoss.toLowerCase() === "loss" ? "red" : "yellow"}-500`
								},
								{
									title: "Opening Balance",
									value: OpeningBalance,
									icon: <MdOutlineBalance size={24} />,
									gradient: "from-red-500"
								},
								{
									title: "Closing Balance",
									value: ClosingBalance,
									icon: <MdOutlineAccountBalanceWallet size={24} />,
									gradient: "from-orange-500"
								},
								{
									title: "Cash Withdrawn",
									value: CashWithdrawn,
									icon: <PiHandWithdrawLight size={24} />,
									gradient: "from-orange-500"
								},
								{
									title: "Sales",
									value: SalesAmount,
									subtitle: `${TotalSales} Orders`,
									icon: <GiReceiveMoney size={24} />,
									gradient: "from-orange-500"
								},
								{
									title: "Expenses",
									value: ExpensesAmount,
									subtitle: `${TotalExpenses} Invoices`,
									icon: <GiPayMoney size={24} />,
									gradient: "from-orange-500"
								}
							].map((stat, index) => (
								<div
									key={index}
									className="relative bg-white rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300"
								>
									{/* Gradient Border */}
									<div className="absolute inset-0">
										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} via-orange-500 to-yellow-500 opacity-75 group-hover:opacity-100 transition-all duration-700`} />
										<div className="absolute inset-[3px] bg-white rounded-2xl" />
									</div>

									{/* Content */}
									<div className="relative p-6">
										<div className="flex justify-between items-center mb-4">
											<p
												className={`text-sm font-semibold text-gray-600`}
											>
												{stat.title}
											</p>
											<div className="p-3 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
												{React.cloneElement(stat.icon, { className: "text-red-500" })}
											</div>
										</div>
										<div className="space-y-1">
											<h3
												className={`text-2xl font-bold ${stat.title === "Expenses"
													? "text-red-600"
													: stat.title === "Sales"
														? "text-green-600"
														: stat.title === "Profit/Loss Status"
															? stat.status === "Profit"
																? "text-green-600"
																: stat.status === "Loss"
																	? "text-red-600"
																	: "text-gray-900"
															: "text-gray-900"
													}`}
											>
												₹ {stat.value || 0}
											</h3>
											{stat.subtitle && (
												<p className="text-sm text-gray-500">{stat.subtitle}</p>
											)}
											{stat.status && (
												<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stat.status.toLowerCase() === "profit" ? "bg-green-100 text-green-800 text-center font-semibold" :
													stat.status.toLowerCase() === "loss" ? "bg-red-100 text-red-800 text-center font-semibold" :
														"bg-yellow-100 text-yellow-800 text-center font-semibold"
													}`}>
													{stat.status}
												</span>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>


					{/* Data Tables Section */}
					<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-xl font-bold text-gray-800">Transaction Details</h3>
							<div className="flex gap-2">
								<button
									className={`px-4 py-2 rounded-lg transition-colors ${SalesClick ?
										"bg-red-500 text-white" :
										"bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									onClick={() => {
										setSalesClick(true);
										setExpensesClick(false);
									}}
								>
									Sales
								</button>
								<button
									className={`px-4 py-2 rounded-lg transition-colors ${Expenses_Click ?
										"bg-red-500 text-white" :
										"bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									onClick={() => {
										setSalesClick(false);
										setExpensesClick(true);
									}}
								>
									Expenses
								</button>
							</div>
						</div>

						<div className="overflow-x-auto rounded-xl border border-gray-100">
							{SalesClick && (
								<table className="min-w-full divide-y divide-gray-200">
									<thead>
										<tr className="bg-gray-50">
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR#</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
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
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Date}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Type}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{row.WaiterId?.FirstName} {row.WaiterId?.LastName}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{row.Customer?.CustomerName || "N/A"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{row.Customer?.Contact || "N/A"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.TotalAmount || 0}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.BalanceAmount || 0}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.PaymentMode}</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${row.PaymentStatus.toLowerCase() === "paid" ? "bg-green-100 text-green-800" :
														row.PaymentStatus.toLowerCase() === "unpaid" ? "bg-red-100 text-red-800" :
															"bg-yellow-100 text-yellow-800"
														}`}>
														{row.PaymentStatus}
													</span>
												</td>
											</tr>
										)) : (
											<tr>
												<td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
													No sales data found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							)}

							{Expenses_Click && (
								<table className="min-w-full divide-y divide-gray-200">
									<thead>
										<tr className="bg-gray-50">
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR#</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bearer</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Amount</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{Expenses.length > 0 ? Expenses.map((row, index) => (
											<tr key={index} className="hover:bg-gray-50 transition-colors">
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Date}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.ExpenseName}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.PayableTo}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.AmountPayable || 0}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.AmountPaid || 0}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.PaymentMode}</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${row.PaymentStatus.toLowerCase() === "paid" ? "bg-green-100 text-green-800" :
														row.PaymentStatus.toLowerCase() === "unpaid" ? "bg-red-100 text-red-800" :
															"bg-yellow-100 text-yellow-800"
														}`}>
														{row.PaymentStatus}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{row.Note || "N/A"}
												</td>
											</tr>
										)) : (
											<tr>
												<td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
													No expenses data found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
