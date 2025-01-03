'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Sales_Report = () => {

	const router = useRouter();

	// For A Week before
	const today = new Date();
	const from_default = today.toISOString().split('T')[0];
	const to_default = today.toISOString().split('T')[0];
	const [selectedRange, setselectedRange] = useState('Today');

	//Request Params
	const [from, setFrom] = useState(from_default);
	const [to, setTo] = useState(to_default);

	// Full Data
	const [FullTable, setFullTable] = useState({
		Dine_In: [],
		Takeaway: [],
		Delivery: [],
		Swiggy: [],
		Zomato: []
	});
	const [FullSales, setFullSales] = useState({
		Dine_In: 0,
		Takeaway: 0,
		Delivery: 0,
		Swiggy: 0,
		Zomato: 0
	});

	// Filtered Table Data
	const [Table, setTable] = useState([]);
	const [TotalSales, setTotalSales] = useState(0);

	// Payment Status Tables
	const [PaidTable, setPaidTable] = useState([]);
	const [UnpaidTable, setUnpaidTable] = useState([]);
	const [PartPaidTable, setPartPaidTable] = useState([]);

	// Search 
	const [searchQuery, setSearchQuery] = useState('');

	// Add pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [totalPages, setTotalPages] = useState(1);

	// Memoized filtered data
	const filteredTable = useMemo(() => {
		return Table.filter((bill) =>
			bill.Table?.TableName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			bill.WaiterId?.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			bill.WaiterId?.LastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			bill.Customer?.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			bill.PaymentStatus?.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [Table, searchQuery]);

	// Calculate pagination
	useEffect(() => {
		setTotalPages(Math.ceil(filteredTable.length / rowsPerPage));
		setCurrentPage(1); // Reset to first page when filter changes
	}, [filteredTable, rowsPerPage]);

	// Get current page data
	const getCurrentPageData = useCallback(() => {
		const startIndex = (currentPage - 1) * rowsPerPage;
		return filteredTable.slice(startIndex, startIndex + rowsPerPage);
	}, [currentPage, rowsPerPage, filteredTable]);

	// PDF Generation function
	const handlePdfGeneration = async () => {
		const loadingToast = toast.info('Generating PDF...');

		try {
			const inputData = document.getElementById("Report");  // Replace with your specific element if needed

			// Take a screenshot of the whole page
			const canvas = await html2canvas(inputData, { scale: 2 });

			// Get the image dimensions
			const imgData = canvas.toDataURL('image/png');
			const imgWidth = 270;  // Updated width of the Image for landscape mode in mm
			const pageWidth = 297;  // Updated width of the PDF page (in mm) for landscape mode
			const pageHeight = 210; // Updated height of the PDF page in mm for landscape mode
			const imgHeight = ((canvas.height * imgWidth) / canvas.width) - 20;
			const heightLeft = imgHeight;

			// Calculate margins to center the image on the page
			const xOffset = (pageWidth - imgWidth) / 2;  // Horizontal centering

			// Create a new PDF document in landscape mode ('l' stands for landscape)
			const pdf = new jsPDF('l', 'mm', 'a4');
			let position = 10;

			// Add the image to the first page
			pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
			let remainingHeight = heightLeft - pageHeight + 15;

			// Loop through the rest of the image, adding new pages as needed
			while (remainingHeight > 0) {
				position = remainingHeight - imgHeight;
				pdf.addPage();
				pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
				remainingHeight -= pageHeight;
			}

			// Save the PDF
			pdf.save(`${selectedRange}'s_Sales_Report_ (${to_default}).pdf`);
			toast.success('PDF generated successfully!', { id: loadingToast });
		} catch (error) {
			console.error('PDF generation failed:', error);
			toast.error('Failed to generate PDF', { id: loadingToast });
		}
	};

	const fetchAllOrders = async () => {
		if (from === "" || to === "") {
			alert("Please Select Filter");
			return;
		}
		try {
			const response = await fetch(`/api/hotel/dashboard`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'from': from,
					'to': to
				}),
			});

			const data = await response.json();

			if (data.returncode === 200) {
				// Full Table and Sales Data
				setFullTable(data.output.Table);
				setFullSales(data.output.Amount);

				// Set initial table and sales data to Dine_In
				setTable(data.output.Table.Dine_In);
				setTotalSales(data.output.Amount.Dine_In);

				// Separate tables by payment status
				setPaidTable([
					...data.output.Table?.All,
				].filter(bill => bill.PaymentStatus.toLowerCase() === 'paid'));

				setUnpaidTable([
					...data.output.Table?.All,
				].filter(bill => bill.PaymentStatus.toLowerCase() === 'unpaid'));

				setPartPaidTable([
					...data.output.Table?.All,
				].filter(bill => bill.PaymentStatus.toLowerCase() === 'part-paid'));

			} else {
				alert("Failed to fetch");
			}
		} catch (e) {
			console.error(e);
		}
	};

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
		fetchAllOrders();
	}, []);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Add these components after your imports
	const OrdersPieChart = ({ data }) => {
		const chartData = {
			labels: ['Dine-in', 'Takeaway', 'Delivery', 'Swiggy', 'Zomato'],
			datasets: [
				{
					data: [
						data.Dine_In.length,
						data.Takeaway.length,
						data.Delivery.length,
						data.Swiggy.length,
						data.Zomato.length
					],
					borderColor: [
						'#FF6384',
						'#36A2EB',
						'#FFCE56',
						'#FF9F40',
						'#4BC0C0'
					],
					backgroundColor: [
						'rgba(255, 99, 132, 0.4)',
						'rgba(54, 162, 235, 0.4)',
						'rgba(255, 206, 86, 0.4)',
						'rgba(255, 159, 64, 0.4)',
						'rgba(75, 192, 192, 0.4)'
					],
					borderWidth: 1
				}
			]
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
				},
				tooltip: {
					callbacks: {
						label: (context) => {
							const label = context.label || '';
							const value = context.parsed || 0;
							const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
							const percentage = ((value * 100) / total).toFixed(1);
							return `${label}: ${value} (${percentage}%)`;
						}
					}
				}
			}
		};

		return (
			<div className="w-full h-[300px]">
				<Pie data={chartData} options={options} />
			</div>
		);
	};

	const SalesLineChart = () => {
		// Process data to get daily sales
		const getDailySales = () => {
			// Combine all orders into a single array
			const allOrders = [
				...Table
			];

			// Group orders by date and calculate total sales
			const dailySales = allOrders.reduce((acc, order) => {
				const date = new Date(order.createdAt).toLocaleDateString();
				acc[date] = (acc[date] || 0) + Number(order.TotalAmount);
				return acc;
			}, {});

			// Sort dates
			const sortedDates = Object.keys(dailySales).sort((a, b) => new Date(a) - new Date(b));

			return {
				dates: sortedDates,
				sales: sortedDates.map(date => dailySales[date])
			};
		};

		const { dates, sales } = getDailySales();

		const chartData = {
			labels: dates,
			datasets: [
				{
					label: 'Daily Sales',
					data: sales,
					borderColor: '#FF6384',
					backgroundColor: 'rgba(255, 99, 132, 0.1)',
					tension: 0.4,
					pointRadius: 4,
					pointBackgroundColor: '#FF6384',
					borderWidth: 2,
					fill: true,
					// Add these properties for proper fill
					fillOpacity: 0.2,
					segment: {
						borderColor: '#FF6384',
						backgroundColor: 'rgba(255, 99, 132, 0.1)',
					}
				}
			]
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
				},
				filler: {
					propagate: true
				}
			},
			scales: {
				x: {
					grid: {
						display: false
					},
					ticks: {
						maxTicksLimit: 7
					}
				},
				y: {
					grid: {
						display: false
					},
					beginAtZero: true,
					ticks: {
						callback: (value) => `₹${value.toLocaleString()}`
					}
				}
			},
			interaction: {
				intersect: false,
				mode: 'index'
			},
			elements: {
				line: {
					fill: true
				}
			}
		};

		return (
			<div className="w-full h-[300px]">
				<Line data={chartData} options={options} />
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<ToastContainer position='top-right' />
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
							Sales Reports
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<select
							value={selectedRange}
							onChange={(e) => handleRangeChange(e.target.value)}
							className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
						>
							<option value="Today">Today</option>
							<option value="Week">This Week</option>
							<option value="Month">This Month</option>
							<option value="Year">This Year</option>
							<option value="custom">Custom Range</option>
						</select>

						<button
							onClick={fetchAllOrders}
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

				{/* Stats Overview Section */}
				<div id="Report" className="space-y-8">
					{/* Order Stats */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="p-4 border-b border-gray-100">
							<h2 className="text-lg font-semibold text-gray-800">Order Statistics</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-6 divide-x divide-gray-100">
							{[
								{
									title: "Dine-in Orders",
									value: FullTable.Dine_In.length,
									data: FullTable.Dine_In,
									sales: FullSales.Dine_In,
									icon: "🍽️"
								},
								{
									title: "Takeaway Orders",
									value: FullTable.Takeaway.length,
									data: FullTable.Takeaway,
									sales: FullSales.Takeaway,
									icon: "🥡"
								},
								{
									title: "Delivery Orders",
									value: FullTable.Delivery.length,
									data: FullTable.Delivery,
									sales: FullSales.Delivery,
									icon: "🛵"
								},
								{
									title: "Swiggy Orders",
									value: FullTable.Swiggy.length,
									data: FullTable.Swiggy,
									sales: FullSales.Swiggy,
									icon: "🔸"
								},
								{
									title: "Zomato Orders",
									value: FullTable.Zomato.length,
									data: FullTable.Zomato,
									sales: FullSales.Zomato,
									icon: "🔴"
								},
								{
									title: "Total Sales",
									value: `₹ ${TotalSales || 0}`,
									isTotal: true,
									icon: "💰"
								}
							].map((stat, index) => (
								<div
									key={index}
									onClick={() => {
										if (!stat.isTotal) {
											setTable(stat.data);
											setTotalSales(stat.sales);
										}
									}}
									className={`p-6 ${!stat.isTotal ? 'cursor-pointer hover:bg-gray-50' : 'bg-gradient-to-br from-green-500/10 to-cyan-500/10'} transition-colors`}
								>
									<div className="flex items-center gap-3 mb-2">
										<h3 className={`text-sm font-medium ${stat.isTotal ? 'text-green-500' : 'text-gray-800'}`}>
											{stat.title}
										</h3>
									</div>
									<p className={`text-2xl font-bold ${stat.isTotal ? 'text-green-500' : 'text-gray-800'}`}>
										{stat.value}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Payment Status Section */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="p-4 border-b border-gray-100">
							<h2 className="text-lg font-semibold text-gray-800">Payment Status</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-gray-100">
							{[
								{
									title: "Paid Bills",
									value: PaidTable.length,
									data: PaidTable,
									color: "green",
									icon: "✅"
								},
								{
									title: "Unpaid Bills",
									value: UnpaidTable.length,
									data: UnpaidTable,
									color: "red",
									icon: "❌"
								},
								{
									title: "Part-Paid Bills",
									value: PartPaidTable.length,
									data: PartPaidTable,
									color: "yellow",
									icon: "❌"
								}
							].map((status, index) => (
								<div
									key={index}
									onClick={() => {
										setTable(status.data);
										const totalAmount = status.data.reduce((sum, bill) => sum + (Number(bill.TotalAmount) || 0), 0);
										setTotalSales(totalAmount);
									}}
									className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors`}
								>
									<div className="flex items-center gap-3 mb-2">
										<h3 className={`text-sm font-medium text-${status.color}-500`}>
											{status.title}
										</h3>
									</div>
									<p className={`text-2xl font-bold text-${status.color}-500`}>
										{status.value}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Charts Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						{/* Orders Distribution Chart */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Orders Distribution</h2>
							<div className="h-[300px] flex items-center justify-center">
								<OrdersPieChart data={FullTable} id="ordersChart" />
							</div>
						</div>

						{/* Sales Distribution Chart */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Sales Trend</h2>
							<div className="h-[300px] flex items-center justify-center">
								<SalesLineChart data={FullSales} id="salesChart" />
							</div>
						</div>
					</div>

					{/* Search Input */}
					<div className="mb-6">
						<input
							type="text"
							placeholder="Search by table, waiter, or customer..."
							value={searchQuery}
							onChange={handleSearchChange}
							className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
						/>
					</div>

					{/* Table Section */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="p-6 border-b border-gray-100 flex justify-between items-center">
							<h2 className="text-lg font-semibold text-gray-800">Sales Data</h2>

							{/* Rows per page selector */}
							<div className="flex items-center gap-4">
								<span className="text-sm text-gray-500">Rows per page:</span>
								<select
									value={rowsPerPage}
									onChange={(e) => setRowsPerPage(Number(e.target.value))}
									className="px-2 py-1 border border-gray-200 rounded"
								>
									<option value={50}>50</option>
									<option value={100}>100</option>
									<option value={200}>200</option>
								</select>
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="bg-gray-50">
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SR#</th>
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Waiter</th>
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Contact</th>
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Amount</th>
										<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									{getCurrentPageData().map((row, index) => (
										<tr
											key={index}
											className={index % 2 === 0 ? "bg-zinc-100" : ""}
										>
											<td className="border px-4 py-2">{index + 1}</td>
											<td className="border px-4 py-2">{row.Date}</td>
											<td className="border px-4 py-2">{row.Type}</td>
											<td className="border px-4 py-2">{row.Waiter?.FirstName} {row.Waiter?.LastName}</td>
											<td className="border px-4 py-2">{row.Customer?.CustomerName || "N/A"}</td>
											<td className="border px-4 py-2">{row.Customer?.Contact || "N/A"}</td>
											<td className="border px-4 py-2">{row.TotalAmount}</td>
											<td className="border px-4 py-2">{row.BalanceAmount}</td>
											<td className="border px-4 py-2">
												<span
													className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${row.PaymentStatus.toLowerCase() === 'paid' ? 'bg-green-100 text-green-800' :
														row.PaymentStatus.toLowerCase() === 'unpaid' ? 'bg-red-100 text-red-800' :
															row.PaymentStatus.toLowerCase() === 'part-paid' ? 'bg-yellow-100 text-yellow-800' :
																'bg-gray-100 text-gray-800'
														}`}
												>
													{row.PaymentStatus}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Pagination Controls */}
						<div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
							<div className="text-sm text-gray-500">
								Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredTable.length)} of {filteredTable.length} entries
							</div>

							<div className="flex gap-2">
								<button
									onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
									disabled={currentPage === 1}
									className="px-3 py-1 border border-gray-200 rounded disabled:opacity-50"
								>
									Previous
								</button>

								{/* Page numbers */}
								<div className="flex gap-1">
									{[...Array(Math.min(5, totalPages))].map((_, i) => {
										const pageNum = currentPage + i - 2;
										if (pageNum > 0 && pageNum <= totalPages) {
											return (
												<button
													key={i}
													onClick={() => setCurrentPage(pageNum)}
													className={`px-3 py-1 border rounded ${currentPage === pageNum
														? 'bg-red-500 text-white'
														: 'border-gray-200'
														}`}
												>
													{pageNum}
												</button>
											);
										}
										return null;
									})}
								</div>

								<button
									onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
									className="px-3 py-1 border border-gray-200 rounded disabled:opacity-50"
								>
									Next
								</button>
							</div>
						</div>
					</div>

				</div>
			</div>

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
};

export default Sales_Report;
