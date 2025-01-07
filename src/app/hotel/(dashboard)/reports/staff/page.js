"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch, FiUsers } from "react-icons/fi";
import React, { useState, useEffect } from "react";

const StaffReports = () => {

    const router = useRouter();
    // Fetch Params
    const [staffList, setStaffList] = useState([]);

    // Search Params
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch
    const fetchStaffList = async () => {

        try {
            const response = await fetch(`/api/hotel/staff/fetch`);

            if (response.ok) {
                const result = await response.json();
                if (result.returncode === 200 && Array.isArray(result.output)) {
                    // Map the output objects to Staff interface
                    const mappedStaffList = result.output.map((item) => ({
                        id: item._id,
                        first_name: item.FirstName,
                        last_name: item.LastName,
                        contact: item.Contact,
                        email: item.Email,
                        address: item.Address,
                        department_name: item.DepartmentName,
                        designation: item.Designation,
                        role: item.Role,
                        salary: item.Salary,
                        incentives: item.Incentive,
                    }));
                    setStaffList(mappedStaffList);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } else {
                console.error("Failed to fetch staff list");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchStaffList();
    }, []);


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const filteredStaffs = staffList.filter((staff) =>
        staff.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || staff.last_name.toLowerCase().includes(searchQuery.toLowerCase()) || staff.contact.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const createSlug = (firstName, lastName) => {
        // Create a slug from the staff's name
        return `${firstName}-${lastName}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/50 p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white/90 rounded-full transition-all duration-200 hover:shadow-md"
                    >
                        <IoIosArrowBack size={28} className="text-gray-700" />
                    </button>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                        Staff Reports
                    </h1>
                </div>
                <p className="text-gray-500 ml-14">Manage and view detailed staff information</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <FiUsers className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Staff</p>
                        <p className="text-2xl font-semibold text-gray-800">{staffList.length}</p>
                    </div>
                </div>
                {/* Add more stat cards as needed */}
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by name or contact..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        />
                    </div>
                    {/* Add more filters here if needed */}
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Staff Details
                        </h2>
                        <span className="text-sm text-gray-500">
                            {filteredStaffs.length} members
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">SR#</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Designation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredStaffs.map((staff, index) => (
                                <tr
                                    key={index}
                                    onClick={() => {
                                        const slug = createSlug(staff.first_name, staff.last_name);
                                        router.push(`/hotel/reports/staff/${staff.id}/${slug}`);
                                    }}
                                    className="hover:bg-blue-50/50 cursor-pointer transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {staff.first_name[0]}{staff.last_name[0]}
                                                </span>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {staff.first_name} {staff.last_name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{staff.contact}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{staff.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                            {staff.department_name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{staff.designation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffReports;
