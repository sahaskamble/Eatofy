'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import { FaEye, FaRegFilePdf, FaXmark } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Purchase_Report() {

	const router = useRouter();

	// For A Week before
	const today = new Date();
	const from_default = today.toISOString().split('T')[0];
	const to_default = today.toISOString().split('T')[0]; const [selectedRange, setselectedRange] = useState('Today');

	//Request Params
	const [from, setFrom] = useState(from_default);
	const [to, setTo] = useState(to_default);

	// Expense-Wise
	const [Amount, setAmount] = useState([]);
	const [Dates_Filter, setDates_Filter] = useState([]);
	const [TotalAmount, setTotal] = useState(0);

	// Payment Status Tables
	const [PaidTable, setPaidTable] = useState([]);
	const [UnpaidTable, setUnpaidTable] = useState([]);
	const [PartPaidTable, setPartPaidTable] = useState([]);

	// Ui Elements
	const [displayStock, setDisplayStock] = useState(false);
	const [fetchedpurchase, setfetchedpurchase] = useState([]);
	const [hotel_id, sethotel_id] = useState('');
	const [invoice, setInvoice] = useState({});
	const [Stock, setStock] = useState([]);

	// Search 
	const [searchQuery, setSearchQuery] = useState('');


	// PDF Generation function with loading toast
	const handlePdfGeneration = async () => {
		const loadingToast = toast.info('Generating PDF...');

		try {
			const inputData = document.getElementById("Report");

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
			pdf.save(`${selectedRange}'s_Purchase_Report_ (${to_default}).pdf`);
			toast.success('PDF generated successfully!', { id: loadingToast });
		} catch (error) {
			console.error('PDF generation failed:', error);
			toast.error('Failed to generate PDF', { id: loadingToast });
		}
	};

	// Fetch Values 
	const fetchPurchaseData = async () => {
		if (from == "" || to == "") {
			alert("Please Select Filter");
		}

		try {
			const response = await fetch(`/api/hotel/reports/purchases`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 'hotel_id': hotel_id, 'from': from, 'to': to }),
			});

			const data = await response.json();
			if (data.returncode === 200) {
				setfetchedpurchase(data.output.Invoices);
				setAmount(data.output.DateWise.Amount);
				setDates_Filter(data.output.DateWise.Dates);
				setTotal(data.output.TotalAmount);
				// Separate tables by payment status
				setPaidTable([
					...data.output?.Invoices,
				].filter(bill => bill.PaymentStatus.toLowerCase() === 'paid'));

				setUnpaidTable([
					...data.output?.Invoices,
				].filter(bill => bill.PaymentStatus.toLowerCase() === 'unpaid'));

				setPartPaidTable([
					...data.output?.Invoices,
				].filter(bill => bill.PaymentStatus.toLowerCase() === 'part-paid'));


			} else {
				alert("Failed to fetch supplier");
			}

		} catch (e) {
			throw console.error(e);
		}
	}


	// Display purchase info
	const displayPurchasedStock = async (invoice_info) => {

		try {
			setStock(invoice_info.Stock);
		} catch (e) {
			throw console.error(e);
		}

		setDisplayStock(true);
		setInvoice(invoice_info);
	}

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

	useEffect(() => {
		sethotel_id(localStorage.getItem('hotel_id'));
		if (hotel_id) {
			fetchPurchaseData();
		}
	}, [hotel_id])

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredPurchases = fetchedpurchase.filter((item) =>
		item.Suppliers?.SupplierName.toLowerCase().includes(searchQuery.toLowerCase())
		||
		item.PaymentStatus?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Add Charts Components
	const PurchasesPieChart = () => {
		const chartData = {
			labels: ['Paid', 'Unpaid', 'Part-Paid'],
			datasets: [{
				data: [PaidTable.length, UnpaidTable.length, PartPaidTable.length],
				backgroundColor: [
					'rgba(34, 197, 94, 0.2)',
					'rgba(239, 68, 68, 0.2)',
					'rgba(234, 179, 8, 0.2)'
				],
				borderColor: [
					'rgb(34, 197, 94)',
					'rgb(239, 68, 68)',
					'rgb(234, 179, 8)'
				],
				borderWidth: 1
			}]
		};

		const options = {
			responsive: true,
			plugins: {
				legend: {
					position: 'right',
					labels: {
						usePointStyle: true,
						pointStyle: 'circle',
						padding: 20
					}
				}
			}
		};

		return <Pie data={chartData} options={options} />;
	};

	const PurchaseTrendChart = () => {
		const dataLine = {
			labels: Dates_Filter,
			datasets: [
				{
					label: 'Daily Purchases',
					data: Amount,
					borderColor: '#FF6384',
					backgroundColor: 'rgba(255, 99, 132, 0.1)',
					tension: 0.4,
					fill: true,
					pointRadius: 4,
					pointBackgroundColor: '#FF6384',
					borderWidth: 2,
				}
			],
		};

		const options = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					callbacks: {
						label: (context) => `₹${context.parsed.y.toLocaleString()}`
					}
				}
			},
			scales: {
				x: {
					grid: {
						display: false
					},
					ticks: {
						maxTicksLimit: 7,
						font: {
							size: 11
						}
					}
				},
				y: {
					grid: {
						display: false
					},
					beginAtZero: true,
					ticks: {
						callback: (value) => `₹${value.toLocaleString()}`,
						font: {
							size: 11
						}
					}
				}
			},
			interaction: {
				intersect: false,
				mode: 'index'
			}
		};

		return <Line data={dataLine} options={options} />;
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<ToastContainer position="top-right" />
			<div className="max-w-[1800px] mx-auto p-6">
				{/* Header Section */}
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center gap-4">
						<button
							onClick={() => router.back()}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<IoIosArrowBack size={28} className="text-red-500" />
						</button>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
							Purchase Reports
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<select
							value={selectedRange}
							onChange={(e) => handleRangeChange(e.target.value)}
							className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
						>
							<option value="Today">Today</option>
							<option value="Week">This Week</option>
							<option value="Month">This Month</option>
							<option value="Year">This Year</option>
							<option value="custom">Custom Range</option>
						</select>

						<button
							onClick={fetchPurchaseData}
							className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
						>
							Filter
						</button>

						<button
							onClick={handlePdfGeneration}
							className="flex items-center gap-2 px-6 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
						>
							<FaRegFilePdf />
							<span>Export PDF</span>
						</button>
					</div>
				</div>

				<div id="Report" className="space-y-8">
					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						{[
							{
								title: "Paid Bills",
								value: PaidTable.length,
								total: `₹${PaidTable.reduce((sum, bill) => sum + (bill.TotalAmount || 0), 0)}`,
								color: "green"
							},
							{
								title: "Unpaid Bills",
								value: UnpaidTable.length,
								total: `₹${UnpaidTable.reduce((sum, bill) => sum + (bill.TotalAmount || 0), 0)}`,
								color: "red"
							},
							{
								title: "Part-Paid Bills",
								value: PartPaidTable.length,
								total: `₹${PartPaidTable.reduce((sum, bill) => sum + (bill.TotalAmount || 0), 0)}`,
								color: "yellow"
							},
							{
								title: "Total Purchases",
								value: `₹${TotalAmount}`,
								isTotal: true
							}
						].map((stat, index) => (
							<div
								key={index}
								onClick={() => {
									if (!stat.isTotal) {
										setfetchedpurchase(
											stat.title === "Paid Bills" ? PaidTable :
												stat.title === "Unpaid Bills" ? UnpaidTable : PartPaidTable
										);
									}
								}}
								className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 
									${!stat.isTotal ? 'cursor-pointer hover:bg-gray-50' : 'bg-gradient-to-br from-green-500/10 to-cyan-500/10'} 
									transition-colors`}
							>
								<h3 className={`text-sm font-medium ${stat.isTotal ? 'text-green-600' : `text-${stat.color}-600`}`}>
									{stat.title}
								</h3>
								<p className={`text-2xl font-bold mt-2 ${stat.isTotal ? 'text-green-600' : `text-${stat.color}-600`}`}>
									{stat.value}
								</p>
								{!stat.isTotal && (
									<p className="text-sm text-gray-500 mt-1">
										Total: {stat.total}
									</p>
								)}
							</div>
						))}
					</div>

					{/* Charts Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Purchase Distribution</h2>
							<div className="h-[300px]">
								<PurchasesPieChart />
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Purchase Trends</h2>
							<div className="h-[300px] z-10">
								<PurchaseTrendChart />
							</div>
						</div>
					</div>

					{/* Search and Table Section */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="p-6 border-b border-gray-100">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-semibold text-gray-800">Purchase Data</h2>
								<input
									type="text"
									value={searchQuery}
									onChange={handleSearchChange}
									placeholder="Search supplier or payment status..."
									className="px-4 py-2 border border-gray-200 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500"
								/>
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="bg-gray-50">
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Mode</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									{filteredPurchases.map((item, index) => (
										<tr key={index} className="hover:bg-gray-50">
											<td className="px-6 py-4">{item.SupplierId?.SupplierName}</td>
											<td className="px-6 py-4">₹{item.AmountPaid || 0}</td>
											<td className="px-6 py-4">₹{item.BalanceAmount || 0}</td>
											<td className="px-6 py-4">{item.PaymentMode}</td>
											<td className="px-6 py-4">
												<span className={`px-2 py-1 text-sm rounded-full ${item.PaymentStatus.toLowerCase() === 'paid' ? 'bg-green-100 text-green-800' :
													item.PaymentStatus.toLowerCase() === 'unpaid' ? 'bg-red-100 text-red-800' :
														'bg-yellow-100 text-yellow-800'
													}`}>
													{item.PaymentStatus}
												</span>
											</td>
											<td className="px-6 py-4">{item.Date}</td>
											<td className="px-6 py-4">
												<button
													onClick={() => displayPurchasedStock(item)}
													className="text-blue-600 hover:text-blue-800"
												>
													<FaEye size={20} />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{/* Stock Details Modal */}
			{displayStock && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-2xl font-bold text-red-500">Purchase Invoice Details</h3>
							<button
								onClick={() => setDisplayStock(false)}
								className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
							>
								<FaXmark size={24} />
							</button>
						</div>

						{/* Invoice Header */}
						<div className="bg-gray-50 rounded-lg p-6 mb-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 className="text-lg font-semibold text-gray-700 mb-4">Supplier Information</h4>
									<p className="text-gray-600">
										<span className="font-bold">Name:</span> {invoice.SupplierId?.SupplierName}
									</p>
									<p className="text-gray-600 mt-2">
										<span className="font-bold">Invoice No:</span> #{invoice.InvoiceNo}
									</p>
									<p className="text-gray-600 mt-2">
										<span className="font-bold">Date:</span> {invoice.Date}
									</p>
								</div>
								<div>
									<h4 className="text-lg font-semibold text-gray-700 mb-4">Payment Details</h4>
									<div className="mt-4 flex justify-between">
										<div>
											<p className="text-gray-600">
												<span className="font-bold">Amount Paid:</span>
											</p>
											<p className="text-xl font-semibold text-green-600">
												₹{invoice.AmountPaid || 0}
											</p>
										</div>
										<div>
											<p className="text-gray-600">
												<span className="font-bold">Balance:</span>
											</p>
											<p className="text-xl font-semibold text-red-600">
												₹{invoice.BalanceAmount || 0}
											</p>
										</div>
									</div>
									<div className="mt-4 flex justify-between">
										<div>
											<p className="text-gray-600 font-bold">Payment Mode</p>
											<p className="text-gray-800">{invoice.PaymentMode}</p>
										</div>
										<div>
											<p className="text-gray-600 font-bold">Payment Status</p>
											<span className={`px-3 py-1 text-sm text-center font-semibold rounded-xl inline-block w-full mt-1 
												${invoice.PaymentStatus?.toLowerCase() === 'paid'
													? 'bg-green-100 text-green-800'
													: invoice.PaymentStatus?.toLowerCase() === 'unpaid'
														? 'bg-red-100 text-red-800'
														: 'bg-yellow-100 text-yellow-800'
												}`}
											>
												{invoice.PaymentStatus}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Purchased Items Table */}
						<div>
							<h4 className="text-lg font-semibold text-gray-700 mb-4">Purchased Items</h4>
							<div className="overflow-x-auto rounded-lg border border-gray-200">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Item
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Quantity
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Unit
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Unit Price
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Total Price
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{Stock.map((item, index) => (
											<tr key={index} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap">
													{item.ItemId?.ItemName}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													{item.Quantity}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													{item.ItemId?.Unit}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													₹{item.UnitPrice}
												</td>
												<td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
													₹{item.TotalPrice}
												</td>
											</tr>
										))}
									</tbody>
									<tfoot className="bg-gray-50">
										<tr>
											<td colSpan="4" className="px-6 py-4 text-right font-medium text-gray-500">
												Total Amount:
											</td>
											<td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
												₹{Stock.reduce((sum, item) => sum + (item.TotalPrice || 0), 0)}
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Custom Date Range Modal */}
			{selectedRange === 'custom' && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white rounded-xl p-8 shadow-lg max-w-md w-full mx-4 relative">
						{/* Close Button */}
						<button
							onClick={() => setselectedRange('Today')}
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>

						{/* Modal Title */}
						<h3 className="text-xl font-semibold text-gray-800 mb-6">
							Select Date Range
						</h3>

						{/* Date Inputs */}
						<div className="space-y-6">
							<div className="flex flex-col space-y-2">
								<label htmlFor="from" className="text-sm font-medium text-gray-600">
									From Date
								</label>
								<input
									type="date"
									id="from"
									value={from}
									onChange={(e) => setFrom(e.target.value)}
									className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
								/>
							</div>

							<div className="flex flex-col space-y-2">
								<label htmlFor="to" className="text-sm font-medium text-gray-600">
									To Date
								</label>
								<input
									type="date"
									id="to"
									value={to}
									onChange={(e) => setTo(e.target.value)}
									className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
								/>
							</div>

							{/* Error Message */}
							{from > to && (
								<p className="text-red-500 text-sm">
									From date cannot be later than To date
								</p>
							)}

							{/* Action Buttons */}
							<div className="flex gap-4 pt-4">
								<button
									onClick={() => setselectedRange('Today')}
									className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										if (from > to) {
											return; // Prevent filtering if dates are invalid
										}
										setselectedRange('');
										fetchAllOrders();
									}}
									disabled={from > to}
									className={`flex-1 px-4 py-2 bg-red-500 text-white rounded-lg 
										${from > to
											? 'opacity-50 cursor-not-allowed'
											: 'hover:bg-red-600 transition-colors'
										}`}
								>
									Apply Filter
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
