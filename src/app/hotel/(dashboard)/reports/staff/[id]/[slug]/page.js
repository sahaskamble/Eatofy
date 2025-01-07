"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IoIosArrowBack, IoMdLogOut } from "react-icons/io";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { IoReceiptOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { IoShieldHalf } from "react-icons/io5";
import { FaRegFilePdf } from 'react-icons/fa6';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the component
const StaffAnalysis = () => {
	const params = useParams();
	const staffId = params.id;
	const staffSlug = params.slug;
	const router = useRouter();

	// For A Week before
	const today = new Date();
	const from_default = today.toISOString().split('T')[0];
	const to_default = today.toISOString().split('T')[0];
	const [selectedRange, setselectedRange] = useState('Today');

	//Request Params
	const [from, setFrom] = useState(from_default);
	const [to, setTo] = useState(to_default);

	// Staff Details
	const [StaffName, setStaffName] = useState('');
	const [PerformanceGrade, setPerformanceGrade] = useState('');
	const [Performance, setPerformance] = useState(0);
	const [Salary, setSalary] = useState(0);
	const [SalesAmt, setSalesAmt] = useState(0);
	const [SalesCount, setSalesCount] = useState(0);
	const [PresentPercent, setPresentPercent] = useState(0);
	const [PresentDays, setPresentDays] = useState(0);
	const [AbsentPercent, setAbsentPercent] = useState(0);
	const [AbsentDays, setAbsentDays] = useState(0);
	const [HalfDaysPercent, setHalfDaysPercent] = useState(0);
	const [HalfDays, setHalfDays] = useState(0);
	const [SalesChart, setSalesChart] = useState([]);
	const [SalesChartDays, setSalesChartDays] = useState([]);

	// Table
	const [Table, setTable] = useState([]);

	// Search 
	const [searchQuery, setSearchQuery] = useState('');

	const progress_data = {
		datasets: [
			{
				data: [Performance, 100 - Performance],
				backgroundColor: ['#4caf50', '#e6e6e6'],
				borderWidth: 0,
			},
		],
	};

	const options = {
		cutout: '70%', // This controls the size of the inner hole, adjust as needed
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			tooltip: {
				enabled: true, // Disable tooltips if not needed
			},
		},
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
		pdf.save(`${StaffName}_Report_ (${to_default}).pdf`);
	};

	async function fetchReport() {
		setStaffName(staffSlug);

		try {
			const response = await fetch(`/api/hotel/reports/staff`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ staff_id: staffId, from, to }),
			});

			if (response.ok) {
				const result = await response.json();
				if (result.returncode === 200 && Array.isArray(result.output)) {
					setTable(result?.output[0]?.Sales?.Data);
					setPerformance((result?.output[0]?.Performance?.Percent));
					setPerformanceGrade(result?.output[0]?.Performance?.Grade);
					setSalesAmt(result?.output[0]?.Sales?.Amount);
					setSalesCount(result?.output[0]?.Sales?.Orders);
					setPresentPercent(result?.output[0]?.Attendance?.Present?.Ratio);
					setPresentDays(result?.output[0]?.Attendance?.Present?.Count);
					setAbsentPercent(result?.output[0]?.Attendance?.Absent?.Ratio);
					setAbsentDays(result?.output[0]?.Attendance?.Absent?.Count);
					setHalfDaysPercent(result?.output[0]?.Attendance?.['Half-Days']?.Ratio);
					setHalfDays(result?.output[0]?.Attendance?.['Half-Days']?.Count);
					setSalesChart(result?.output[0]?.Sales?.Chart?.Amount);
					setSalesChartDays(result?.output[0]?.Sales?.Chart?.Category);
					const existing_salary = result?.output[0]?.StaffData.Salary || 0;
					const present_days = result?.output[0]?.Attendance?.Present?.Count || 0;
					const half_days = result?.output?.[0]?.Attendance?.["Half-Days"]?.Count || 0;
					const salary_calculated = (existing_salary * present_days) + (existing_salary * half_days * 0.5);
					setSalary(salary_calculated);

				}
				else {
					console.error("Unexpected response format:", result);
				}
			}
			else {
				console.error("Failed to fetch staff list");
			}
		} catch (error) {
			console.error("Error:", error);
		}

	}

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredTable = Table.filter((bill) =>
		bill.Table?.TableName.toLowerCase().includes(searchQuery.toLowerCase())
		||
		bill.WaiterId.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
		||
		bill.WaiterId.LastName.toLowerCase().includes(searchQuery.toLowerCase())
		||
		bill.Customer?.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
		||
		bill.Status.toLowerCase().includes(searchQuery.toLowerCase())
	);

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
		fetchReport();
	}, [])


	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-[1600px] mx-auto p-6" id="Report">
				{/* Header Section - Updated styling */}
				<div className="flex justify-between items-center bg-white rounded-2xl shadow-md p-5 mb-8">
					<div className="flex items-center gap-4">
						<button
							onClick={() => router.back()}
							className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
						>
							<IoIosArrowBack size={24} className="text-gray-700" />
						</button>
						<div>
							<h1 className="text-2xl font-bold text-gray-800">
								Staff Performance Report
							</h1>
							<p className="text-gray-500 mt-1">{StaffName}</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<select
							value={selectedRange}
							onChange={(e) => handleRangeChange(e.target.value)}
							className="px-4 py-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
						>
							<option value="Today">Today</option>
							<option value="Week">This Week</option>
							<option value="Month">This Month</option>
							<option value="Year">This Year</option>
							<option value="custom">Custom Range</option>
						</select>

						<button
							onClick={fetchReport}
							className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium"
						>
							Apply Filter
						</button>

						<button
							onClick={handlePdfGeneration}
							className="flex items-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium"
						>
							<FaRegFilePdf />
							Export PDF
						</button>
					</div>
				</div>

				{/* Stats Grid - Updated styling */}
				<div className="grid grid-cols-5 gap-6 mb-8">
					{/* Performance Card */}
					<div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
						<div className="flex flex-col gap-4 items-start mb-4">
							<div>
								<h3 className="text-gray-500 font-medium">Salary Calculated</h3>
								<p className="text-3xl font-bold mt-2 text-gray-800">Rs. {Salary}</p>
							</div>
							<span className={`px-3.5 py-1.5 rounded-full text-sm font-medium
								${Performance > 90 ? 'bg-green-100 text-green-800' :
									Performance > 75 ? 'bg-blue-100 text-blue-800' :
										Performance > 50 ? 'bg-yellow-100 text-yellow-800' :
											'bg-red-100 text-red-800'}`}
							>
								{PerformanceGrade}
							</span>
						</div>
					</div>

					{/* Sales Card */}
					<div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
						<h3 className="text-gray-500 font-medium mb-4">Sales Generated</h3>
						<div className="flex justify-between items-center">
							<div>
								<p className="text-3xl font-bold text-gray-800">₹{SalesAmt.toLocaleString()}</p>
								<p className="text-gray-500 mt-1 font-medium">{SalesCount} Orders</p>
							</div>
							<div className="bg-gradient-to-br from-red-500 to-red-600 p-3.5 rounded-2xl shadow-lg">
								<IoReceiptOutline size={32} className="text-white" />
							</div>
						</div>
					</div>

					{/* Present Days Card */}
					<div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
						<h3 className="text-gray-500 font-medium mb-4">Days Present</h3>
						<div className="flex justify-between items-center">
							<div>
								<p className="text-3xl font-bold text-gray-800">{PresentPercent}%</p>
								<p className="text-gray-500 mt-1 font-medium">{PresentDays} Days</p>
							</div>
							<div className="bg-gradient-to-br from-green-500 to-green-600 p-3.5 rounded-2xl shadow-lg">
								<IoMdLogIn size={32} className="text-white" />
							</div>
						</div>
					</div>

					{/* Absent Days Card */}
					<div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
						<h3 className="text-gray-500 font-medium mb-4">Days Absent</h3>
						<div className="flex justify-between items-center">
							<div>
								<p className="text-3xl font-bold text-gray-800">{AbsentPercent}%</p>
								<p className="text-gray-500 mt-1 font-medium">{AbsentDays} Days</p>
							</div>
							<div className="bg-gradient-to-br from-red-500 to-red-600 p-3.5 rounded-2xl shadow-lg">
								<IoMdLogOut size={32} className="text-white" />
							</div>
						</div>
					</div>

					{/* Half Days Card */}
					<div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
						<h3 className="text-gray-500 font-medium mb-4">Half Days Taken</h3>
						<div className="flex justify-between items-center">
							<div>
								<p className="text-3xl font-bold text-gray-800">{HalfDaysPercent}%</p>
								<p className="text-gray-500 mt-1 font-medium">{HalfDays} Days</p>
							</div>
							<div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3.5 rounded-2xl shadow-lg">
								<IoShieldHalf size={32} className="text-white" />
							</div>
						</div>
					</div>
				</div>

				{/* Sales Table - Updated styling */}
				<div className="bg-white rounded-2xl shadow-md">
					<div className="p-6 border-b">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-bold text-gray-800">Sales History</h2>
							<div className="relative">
								<input
									type="text"
									placeholder="Search records..."
									value={searchQuery}
									onChange={handleSearchChange}
									className="pl-4 pr-10 py-2.5 border rounded-xl w-80 focus:ring-2 focus:ring-red-500 focus:outline-none"
								/>
								<svg className="w-5 h-5 text-gray-400 absolute right-3 top-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
									<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
								</svg>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-50">
									<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">SR#</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Waiter</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Balance</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Payment</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{filteredTable.map((row, index) => (
									<tr key={index} className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
										<td className="px-6 py-4 text-sm text-gray-600">{row.Date}</td>
										<td className="px-6 py-4 text-sm text-gray-600">{row.Type}</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{row.WaiterId.FirstName} {row.WaiterId.LastName}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">₹{row.TotalAmount}</td>
										<td className="px-6 py-4 text-sm text-gray-600">₹{row.BalanceAmount}</td>
										<td className="px-6 py-4 text-sm text-gray-600">{row.PaymentMode}</td>
										<td className="px-6 py-4 text-sm">
											<span className={`px-2 py-1 rounded-full text-xs
												${row.PaymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
													row.PaymentStatus === 'Part-Paid' ? 'bg-yellow-100 text-yellow-800' :
														'bg-red-100 text-red-800'}`}
											>
												{row.PaymentStatus}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Date Range Modal */}
				{selectedRange === 'custom' && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-xl p-6 w-[400px]">
							<h3 className="text-xl font-semibold mb-6">Select Date Range</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">From</label>
									<input
										type="date"
										value={from}
										onChange={(e) => setFrom(e.target.value)}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">To</label>
									<input
										type="date"
										value={to}
										onChange={(e) => setTo(e.target.value)}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
									/>
								</div>
							</div>
							<div className="flex justify-end gap-3 mt-6">
								<button
									onClick={() => setselectedRange('')}
									className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										setselectedRange('');
										fetchReport();
									}}
									className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
								>
									Apply
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StaffAnalysis; 
