"use client";

import Head from 'next/head';
import { useState } from 'react';
import ServiceCard from '@/components/ServiceCard';
import Footer from '@/components/Footer';

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Eatofy</title>
        <meta name="description" content="Mastering Restaurant Management" />
      </Head>

      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <img src="/logo.png" width={200} height={200} alt="Illustration 2" />
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-red-600 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-800 hover:text-red-600">Home</a>
            <a href="#" className="text-gray-800 hover:text-red-600">About Us</a>
            <a href="#" className="text-gray-800 hover:text-red-600">Services</a>
            <a href="#" className="text-gray-800 hover:text-red-600">Contact Us</a>
          </nav>
        </div>
        <div
          onClick={()=>{}}
        >
          <nav className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Home</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">About Us</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Services</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Contact Us</a>
            </div>
          </nav>
        </div>
      </header>

      <div className='xl:m-[100px] sm:m-2 gap-2 flex-grow'>
        <div className="flex m-[100px]n flex-col md:flex-row items-center md:items-start justify-center md:justify-between mb-[100px] p-6 bg-gray-50">
          <div className="md:w-1/2 p-4 mt-6 text-center md:text-left">
            <h2 className="text-lg text-red-500 mt-4">Welcome to Eatofy</h2>
            <h1 className="text-4xl font-bold text-gray-800">Mastering Restaurant Management</h1>
            <p className="text-lg text-gray-500 mt-4">
              Are you ready to revolutionize the way you run your restaurant?
            </p>
            <p className="text-lg text-gray-500 mt-2">
              The ultimate restaurant management software designed to streamline and optimize your establishment's operations.
            </p>
            <button className='bg-red-500 rounded-[50px] p-3 mt-5'>Get Started</button>
          </div>
          <div className="md:w-1/2 p-4">
            <img src="/banner.png" alt="Restaurant Management" className="w-full h-auto" />
          </div>
        </div>


        <div className="flex flex-col m-[100px]n md:m-[20px] md:flex-row items-center md:items-start justify-center md:justify-between p-6 bg-gray-50">
          <div className="md:w-1/2 p-4">
            <img src="/easy.png" alt="Restaurant Management" className="w-full rounded-lg h-auto" />
          </div>
          <div className="md:w-1/2  p-4 text-center md:text-right">
            <h1 className="text-4xl font-bold text-gray-800">Easy Menu Customization</h1>
            <p className="text-lg text-gray-500 mt-4">
              Easily update and customize your menu with prices, images, and descriptions.
            </p>
            <button className='bg-red-500 rounded-[50px] p-3 mt-5'>View Details</button>
          </div>
        </div>


        <div className="flex flex-col md:flex-row m-[100px]n md:m-[20px] items-center md:items-start justify-center md:justify-between p-6 bg-gray-50">
          <div className="md:w-1/2  p-4 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">Order Tracking</h1>
            <p className="text-lg text-gray-500 mt-4">
              Monitor the status of orders in real-time, from the moment they are placed to when they are prepared and delivered.
            </p>
            <p className="text-1xl m-2 font-bold text-gray-800">
              Takeaway Ordering
            </p>
            <p className="text-lg text-gray-500 mt-2">
              Allow customers to place orders directly from their tables, view menus, and make secure payments.
            </p>
            <button className='bg-red-500 rounded-[50px] p-3 mt-5'>View Details</button>
          </div>
          <div className="md:w-1/2 p-4">
            <img src="/tracking.png" alt="Restaurant Management" className="w-full rounded-lg h-auto" />
          </div>
        </div>



        <div className="flex flex-col md:flex-row items-center m-[100px]n md:m-[20px] md:items-start justify-center md:justify-between p-6 bg-gray-50">
          <div className="md:w-1/2 p-4">
            <img src="/staff.png" alt="Restaurant Management" className="w-full rounded-lg h-auto" />
          </div>
          <div className="md:w-1/2  p-4 text-center md:text-right">
            <h1 className="text-4xl font-bold text-gray-800">Staff Management</h1>
            <h3 className="text-2xl mt-5 text-gray-800">Payroll Management</h3>
            <hr ></hr>
            <p className="text-lg text-gray-500 mt-4">
              Streamline the payroll process, including tracking working hours, calculating salaries, and managing employee payments. </p>
            <button className='bg-red-500 rounded-[50px] p-3 mt-5'>View Details</button>
          </div>
        </div>


        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-black text-center mb-8">Our Services</h1>
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            <div className="p-4 ">
              <ServiceCard
                title="Order Management"
                description="Manage orders efficiently and effectively."
                features={["Table Ordering", "Takeaway Ordering", "Delivery Ordering", "Order Tracking"]}
                imageSrc="/s2.png"
              />
            </div>
            <div className="p-4 ">
              <ServiceCard
                title="Inventory Management"
                description="Keep track of inventory in real-time."
                features={["Real-time Inventory Updates", "Supplier Integration", "Waste and Cost Control", "Menu Analysis"]}
                imageSrc="/s1.png"
              />
            </div>
            <div className="p-4 ">
              <ServiceCard
                title="Video Marketing"
                description="Manage orders efficiently and effectively."
                features={["Video Content Integration", "Social Media Integration"]}
                imageSrc="/s3.png"
              />
            </div>
            <div className="p-4 ">
              <ServiceCard
                title="Kitchen Order Ticket"
                description=""
                features={["KOT Generation", "Customizable KOTs", "Order Synchronization"]}
                imageSrc="/s4.png"
              />
            </div>
            <div className="p-4 ">
              <ServiceCard
                title="Staff Salary Management"
                description=""
                features={["Payroll Management", "Attendance Tracking"]}
                imageSrc="/s5.png"
              />
            </div>
            <div className="p-4 ">
              <ServiceCard
                title="Marketing"
                description=""
                features={["Customer Relationship Management (CRM)", "Promotions and Loyalty Programs", "Email and SMS Marketing", "Analytics and Reporting"]}
                imageSrc="/s6.png"
              />
            </div>
            <div className="p-4 ">
              <ServiceCard
                title="Other Relevant Features"
                description=""
                features={["Reservation Management", "Billing and Invoicing", "Feedback and Reviews", "Multi-location Support"]}
                imageSrc="/s7.png"
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;


// enter="transition ease-out duration-500"
// enterFrom="opacity-0 transform -translate-y-2"
// enterTo="opacity-100 transform translate-y-0"
// leave="transition ease-in duration-500"
// leaveFrom="opacity-100 transform translate-y-0"
// leaveTo="opacity-0 transform -translate-y-2"
