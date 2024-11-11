"use client";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { IoReceiptOutline } from "react-icons/io5";
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegFilePdf } from 'react-icons/fa6';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);


const StaffReport = () => {

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
    const staff_id = sessionStorage.getItem('Staff_Report_Id');
    const staff_name = sessionStorage.getItem('Staff_Report_Name');
    setStaffName(staff_name);

    try {
      const response = await fetch(`${ApiHost}/api/hotel/reports/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ staff_id, from, to }),
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
    bill.Waiter.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Waiter.LastName.toLowerCase().includes(searchQuery.toLowerCase())
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
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="mb-10 flex justify-between">
            <div className="flex gap-4 items-center pb-6">
              <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
                router.back()
              }} />
              <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold ">
                Staff Reports
              </h1>
            </div>

            <div className="flex gap-4">
              <div className='flex flex-col justify-center text-sm font-semibold text-zinc-700 items-end'>
                <select value={selectedRange} onChange={(e) => { e.preventDefault(); handleRangeChange(e.target.value); }} className='w-[200px] rounded-lg'>
                  <option value='Today'>Today</option>
                  <option value='Week'>Week</option>
                  <option value='Month'>Month</option>
                  <option value='Year'>Year</option>
                  <option value="custom">--Custom--</option>
                </select>
              </div>
              <div className="flex items-center">
                <div className="flex items-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => {
                      fetchReport();
                    }}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {
              selectedRange === 'custom' && (
                <div className='w-full h-dvh fixed top-0 left-0 bg-black bg-opacity-70 flex justify-center items-center'>
                  <div className="flex items-center space-x-4">
                    <div className='flex flex-col text-sm font-semibold text-zinc-700 items-center'>
                      <label htmlFor="from" className='text-white'>
                        From
                      </label>
                      <input
                        type="date"
                        id='from'
                        value={from}
                        onChange={(e) => {
                          setFrom(e.target.value)
                        }}
                      />
                    </div>
                    <div className='flex flex-col text-sm font-semibold text-zinc-700 items-center'>
                      <label htmlFor="to" className='text-white'>
                        To
                      </label>
                      <input
                        type="date"
                        id='to'
                        value={to}
                        onChange={(e) => {
                          setTo(e.target.value)
                        }}
                      />
                    </div>
                    <div className='flex items-end pr-4 pt-6'>
                      <button
                        className='bg-red-500 text-white px-4 py-2 rounded-lg'
                        onClick={
                          () => {
                            setselectedRange('');
                            fetchReport();
                          }
                        }
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              )
            }

            <div className="flex justify-end items-end w-[25%]">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Table, Waiter, Payment Status or Customer..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
          </div>

          <div className='justify-end w-full flex'>
            <div></div>
            <div>
              <a onClick={() => { handlePdfGeneration() }} className="flex gap-2 cursor-pointer items-center bg-red-500 text-white px-4 py-2 font-semibold rounded-lg">
                Download PDF <FaRegFilePdf />
              </a>
            </div>
          </div>

          <div id="Report">


            <div className="w-full flex justify-between">
              <h2 className="text-xl">Performance Status of <span className="font-bold">{StaffName}</span> :</h2>
            </div>

            <div className="w-full flex mt-[5dvh] gap-4 text-zinc-500">
              <div className="bg-white  p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer w-1/5">
                <h1 className="font-bold">Performance</h1>
                <div className="flex justify-between items-center h-auto">
                  <div className="flex flex-col justify-center">
                    <h2 className="font-bold text-black text-2xl"> {Performance}% </h2>
                    <p
                      className={`text-xs border-l-4 mt-3 pl-2
                            ${(Performance > 90) ? 'border-green-500' :
                          (Performance > 75 && Performance < 90) ? 'border-green-300' :
                            (Performance > 50 && Performance < 75) ? 'border-yellow-500' :
                              (Performance < 50) ? 'border-red-500' :
                                'border-gray-500'
                        }`}
                    >
                      {PerformanceGrade}
                    </p>
                  </div>
                  <div className="w-[100px] h-[100px] flex items-center ml-10">
                    <Doughnut data={progress_data} options={options} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col justify-between w-1/5">
                <div className='flex justify-between text-lg'>
                  <h1 className="font-bold">Sales Generated</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-2xl font-bold text-black">Rs. {SalesAmt | 0}</p>
                    <p className="text-zinc-500 text-sm">{SalesCount} Orders</p>
                  </div>
                  <div className="bg-orange-400 p-2 rounded-lg">
                    <IoReceiptOutline size={55} color="white" fontSize={600} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col justify-between w-1/5">
                <div className='flex justify-between text-lg'>
                  <h1 className="font-bold">Days Present</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-2xl font-bold text-black"> {PresentPercent}% </p>
                    <p className="text-zinc-500 text-sm">{PresentDays} Days</p>
                  </div>
                  <div className="bg-orange-400 p-2 rounded-lg">
                    <IoMdLogIn size={55} color="white" fontSize={600} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col justify-between w-1/5">
                <div className='flex justify-between text-lg'>
                  <h1 className="font-bold">Days Absent</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-2xl font-bold text-black">{AbsentPercent}%</p>
                    <p className="text-zinc-500 text-sm">{AbsentDays} Days</p>
                  </div>
                  <div className="bg-orange-400 p-2 rounded-lg">
                    <IoMdLogOut size={55} color="white" fontSize={600} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col justify-between w-1/5">
                <div className='flex justify-between text-lg'>
                  <h1 className="font-bold">Half-Days Taken</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-2xl font-bold text-black">{HalfDaysPercent}%</p>
                    <p className="text-zinc-500 text-sm">{HalfDays} Days</p>
                  </div>
                  <div className="bg-orange-400 p-2 rounded-lg">
                    <FaStarHalfAlt size={55} color="white" fontSize={600} />
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-[5dvh]">
              <div className="bg-white p-4 rounded-lg shadow-md mt-5 border-l-4 border-red-500">
                <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 pb-4">
                  Sales Data
                </h2>
                <div className=" flex justify-center items-center">
                  <table className="min-w-full text-black border-collapse">
                    <thead>
                      <tr className="bg-gray-500 text-white font-bold">
                        <th className="border px-4 py-2">SR#</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Waiter</th>
                        <th className="border px-4 py-2">Total Amount</th>
                        <th className="border px-4 py-2">Balance Amount</th>
                        <th className="border px-4 py-2">Payment Mode</th>
                        <th className="border px-4 py-2">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTable.length != 0 ||
                        filteredTable[0] != null ||
                        filteredTable[0] != undefined ||
                        filteredTable != 0
                        ? filteredTable.map((row, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-zinc-100 text-black font-light"
                                : "text-black font-light"
                            }
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{row.Date}</td>
                            <td className="border px-4 py-2">{row.Type}</td>
                            <td className="border px-4 py-2">
                              {row.Waiter.FirstName} {row.Waiter.LastName}
                            </td>
                            <td className="border px-4 py-2">{row.TotalAmount}</td>
                            <td className="border px-4 py-2">{row.BalanceAmount}</td>
                            <td className="border px-4 py-2">{row.PaymentMode}</td>
                            <td className="border px-4 py-2">{row.Status}</td>
                          </tr>
                        ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
};
export default StaffReport
