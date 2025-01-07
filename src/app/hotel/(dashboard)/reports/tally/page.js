"use client";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import { FaRegFilePdf, FaSortDown, FaSortUp } from "react-icons/fa6";
import { PiHandWithdrawLight } from "react-icons/pi";
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
	const [CashWithdrawn, setCashWithdrawn] = useState(0);
	const [Counts, setCounts] = useState({
		CashWithdraw: 0,
		DroppedCash: 0,
		Refunds: 0
	});
	const [Data, setData] = useState([]);
	const [dateWiseData, setDateWiseData] = useState({
		sales: [],
		expenses: [],
		labels: []
	});

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
			const response = await fetch(`/api/hotel/reports/tally`, {
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
				setCashWithdrawn((drawer_data?.CashWithdrawn | 0) || 0);
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

				// Process date-wise data for charts
				const processedDateData = processDateWiseData(data?.output?.Data || []);
				setDateWiseData(processedDateData);
			}
			else {
				router.push("/hotels/day_closing")
			}
		} catch (e) {
			throw console.error(e);
		}
	}

	// Add this helper function to process the data for weekly chart
	const processDateWiseData = (data) => {
		return {
			labels: data.map(item => {
				// Format date as DD/MM/YY
				const date = new Date(item.Date);
				return date.toLocaleDateString('en-GB', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit'
				});
			}),
			sales: data.map(item => item.SalesAmount || 0),
			expenses: data.map(item => item.ExpensesAmount || 0)
		};
	};

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
		pdf.save(`${selectedRange}'s_Tally_Report_ (${to_default}).pdf`);
	};


	useEffect(() => {
		sethotel_id(localStorage.getItem('hotel_id'));
		if (hotel_id) {
			fetchData();
		}
	}, [hotel_id]);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-[1800px] mx-auto">
				{/* Header Section */}
				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center gap-4">
						<button
							onClick={() => router.back()}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<IoIosArrowBack size={28} className="text-red-500" />
						</button>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
							Tally Report
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<select
							value={selectedRange}
							onChange={(e) => handleRangeChange(e.target.value)}
							className="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
						>
							<option value="Today">Today</option>
							<option value="Week">This Week</option>
							<option value="Month">This Month</option>
							<option value="Year">This Year</option>
							<option value="custom">Custom Range</option>
						</select>

						<button
							onClick={fetchData}
							className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
						>
							Apply Filter
						</button>

						<button
							onClick={handlePdfGeneration}
							className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 shadow-sm transition-colors"
						>
							<FaRegFilePdf className="text-red-500" />
							<span>Export PDF</span>
						</button>
					</div>
				</div>

				<div id="Report" className="space-y-6">
					{/* Main Stats Card */}
					<div className={`
						p-6 bg-white rounded-xl shadow-sm border-l-4
						${ProfitOrLoss.toLowerCase() === "profit" ? "border-green-500" :
							ProfitOrLoss.toLowerCase() === "loss" ? "border-red-500" : "border-yellow-500"}
					`}>
						<div className="flex justify-between items-center">
							<div>
								<p className="text-gray-500 text-sm mb-1">Total {ProfitOrLoss}</p>
								<div className="flex items-center gap-2">
									<h2 className="text-4xl font-bold">Rs. {ProfitOrLossAmount | 0}</h2>
									{ProfitOrLoss === "Profit" ?
										<FaSortUp className="text-green-500 text-2xl" /> :
										ProfitOrLoss === "Loss" ?
											<FaSortDown className="text-red-500 text-2xl" /> : null
									}
								</div>
							</div>
							<RiStockFill size={40} className="text-gray-400" />
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								title: "Sales",
								amount: SalesAmount,
								count: TotalSales,
								icon: <GiReceiveMoney size={24} className="text-green-500" />,
								countLabel: "Order(s)",
								trendUp: true
							},
							{
								title: "Expenses",
								amount: ExpensesAmount,
								count: TotalExpenses,
								icon: <GiPayMoney size={24} className="text-red-500" />,
								countLabel: "Invoice(s)",
								trendUp: false
							},
							{
								title: "Cash Withdrawn",
								amount: CashWithdrawn,
								count: Counts?.CashWithdraw || 0,
								icon: <PiHandWithdrawLight size={24} className="text-orange-500" />,
								countLabel: "Time(s)",
								trendUp: true
							},
						].map((stat, index) => (
							<div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
								<div className="flex justify-between items-start mb-4">
									<p className="text-gray-500 text-sm">{stat.title}</p>
									{stat.icon}
								</div>
								<h3 className="text-2xl font-bold mb-1">Rs. {stat.amount | 0}</h3>
								<div className="flex justify-between items-center">
									<p className="text-gray-500 text-sm">{stat.count} {stat.countLabel}</p>
								</div>
							</div>
						))}
					</div>

					{/* Additional Charts Section */}
					<div className="">
						<div className="bg-white p-6 rounded-xl shadow-sm">
							<h3 className="text-lg font-semibold text-gray-800 mb-4">Sales vs Expenses</h3>
							<div className="h-[400px] w-full">
								<Bar
									data={{
										labels: dateWiseData.labels,
										datasets: [
											{
												label: 'Sales',
												data: dateWiseData.sales,
												backgroundColor: 'rgba(34, 197, 94, 0.3)',
												borderColor: 'rgb(34, 197, 94)',
												borderWidth: 1,
											},
											{
												label: 'Expenses',
												data: dateWiseData.expenses,
												backgroundColor: 'rgba(239, 68, 68, 0.3)',
												borderColor: 'rgb(239, 68, 68)',
												borderWidth: 1,
											}
										]
									}}
									options={{
										responsive: true,
										maintainAspectRatio: true,
										plugins: {
											legend: {
												position: 'top',
												labels: {
													font: {
														family: "Poppins",
														weight: "bold",
													},
												},
											},
											title: {
												display: true,
												text: `${selectedRange} Sales vs Expenses Comparison`,
												font: {
													size: 16,
													weight: 'bold'
												}
											},
											tooltip: {
												callbacks: {
													label: function(context) {
														return `Rs. ${context.parsed.y}`;
													}
												}
											}
										},
										scales: {
											x: {
												grid: {
													display: false
												},
												ticks: {
													font: {
														family: "Poppins",
														weight: "bold",
													},
												}
											},
											y: {
												beginAtZero: true,
												grid: {
													display: false
												},
												ticks: {
													font: {
														family: "Poppins",
														weight: "bold",
													},
													callback: function(value) {
														return 'Rs. ' + value;
													}
												}
											}
										}
									}}
								/>
							</div>
						</div>
					</div>

					{/* Complete Table Section */}
					<div className="bg-white rounded-xl shadow-sm overflow-hidden">
						<div className="p-6 border-b">
							<h2 className="text-xl font-semibold text-gray-800">Daily Entries</h2>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 border-b">
									<tr>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">SR#</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Opening Balance</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Closing Balance</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Sales</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Expenses</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cash Withdrawn</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									{Data.map((item, index) => (
										<tr key={index} className="hover:bg-gray-50">
											<td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
											<td className="px-6 py-4 text-sm text-gray-600">{item.Date}</td>
											<td className="px-6 py-4 text-sm text-gray-600">Rs. {item.OpeningBalance}</td>
											<td className="px-6 py-4 text-sm text-gray-600">Rs. {item.ClosingBalance}</td>
											<td className="px-6 py-4 text-sm text-gray-600">Rs. {item.SalesAmount}</td>
											<td className="px-6 py-4 text-sm text-gray-600">Rs. {item.ExpensesAmount}</td>
											<td className="px-6 py-4 text-sm text-gray-600">Rs. {item.CashWithdrawn}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
