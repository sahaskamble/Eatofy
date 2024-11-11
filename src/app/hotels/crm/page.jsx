"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

const CustomerTable = () => {

  const [hotel_id, sethotel_id] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    contact: "",
    email: "",
    occassion: "",
    date: "",
    hotel_id: '',
    apartment: "",
    street_address: "",
    landmark: "",
    city: "",
    state: "Maharashtra",
    zip_code: ""
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [AddressOn, setAddressOn] = useState(false);
  const router = useRouter();

  const handleAddressSlider = () => {
    setAddressOn(!AddressOn)
  }

  const fetchCustomerList = async () => {
    try {
      const response = await fetch(`${ApiHost}/api/hotel/customers/management/fetch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.returncode === 200 && Array.isArray(result.output)) {
          // Map the output objects to Staff interface
          const mappedCustomerList = result.output.map((item) => ({
            id: item.id,
            customer_name: item.CustomerName,
            contact: item.Contact,
            email: item.Email,
            occassion: item.CustomerOccassion[0]?.Occassion || "-",
            date: item.CustomerOccassion[0]?.Date || "-",
            wallet: item?.EatocoinsWallet | 0 || "0",
            city: item?.City || "-"
          }));
          setCustomerList(mappedCustomerList);
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

  useEffect(() => {
    const hotelId = localStorage.getItem('hotel_id');
    sethotel_id(hotelId);
    if (hotel_id) {
      fetchCustomerList();
    }
  }, [hotel_id]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      hotel_id: hotel_id
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCustomer = {
      ...formData,
    };

    try {
      const response = await fetch(`${ApiHost}/api/hotel/customers/management/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer)
      });

      if (response.ok) {
        const result = await response.json();
        setCustomerList([...customerList, result]);
        setFormData({
          customer_name: "",
          contact: "",
          email: "",
          occassion: "",
          date: "",
          hotel_id,
          apartment: "",
          street_address: "",
          landmark: "",
          city: "",
          zip_code: ""
        });
        setFormVisible(false);
      } else {
        console.error("Failed to add staff");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customerList?.filter((customer) =>
    customer?.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) || customer?.contact?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className={`ml-[70px] flex-1 h-screen p-4 bg-white ${isFormVisible ? "" : ""}`}>
        <div className="flex justify-start items-center gap-4 mb-4">
          <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
            router.back()
          }} />
          <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">Customer Relationship Management</h2>
        </div>

        <div className="flex justify-between space-x-4 mb-4">
          <div className="">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Name or Contact..."
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>
          <button className="bg-zinc-800 text-white px-4 py-2 rounded" onClick={toggleFormVisibility}>
            Add +
          </button>
        </div>

        <div className="flex">
          <div className="flex-1">
            <table className="min-w-full text-black border-collapse">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="border px-4 py-2">SR#</th>
                  <th className="border px-4 py-2">Customer Name</th>
                  <th className="border px-4 py-2">Contact</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">City</th>
                  <th className="border px-4 py-2">Occassion</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Wallet</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredCustomers.map((customer, index) => (
                    <tr key={customer.id} className={index % 2 === 0 ? "bg-zinc-200" : ""}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{customer.customer_name}</td>
                      <td className="border px-4 py-2">{customer.contact}</td>
                      <td className="border px-4 py-2">{customer.email}</td>
                      <td className="border px-4 py-2">{customer.city}</td>
                      <td className="border px-4 py-2">{customer.occassion}</td>
                      <td className="border px-4 py-2">{customer.date}</td>
                      <td className="border px-4 py-2">Rs. {customer.wallet}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {isFormVisible && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-60">
              <div className={`bg-white p-8 rounded shadow-lg z-10 ${AddressOn ? "w-[80%]" : "w-[40%]"}`}>
                <h3 className="text-lg font-bold mb-4 text-red-500 text-center">Add New Customer</h3>
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex gap-6 justify-center w-full">
                    <div className="flex flex-row gap-6 w-full">
                      <div className="flex flex-col w-full">
                        <div className="mb-4">
                          <label className="block mb-2 text-black">Customer Name<span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleInputChange}
                            placeholder="eg; John Doe"
                            className="border rounded px-4 py-2 text-black border-red-500 w-full"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-black">Contact<span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            placeholder="eg; 1234567890"
                            minLength={10}
                            maxLength={10}
                            className="border rounded px-4 py-2 text-black border-red-500 w-full"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-black">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="eg; johndoe@gmail.com"
                            className="border rounded px-4 py-2 text-black border-red-500 w-full"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-black">Occassion</label>
                          <input
                            type="text"
                            name="occassion"
                            value={formData.occassion}
                            onChange={handleInputChange}
                            placeholder="eg; Birthday"
                            className="border rounded px-4 py-2 text-black border-red-500 w-full"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-black">Date</label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="border rounded px-4 py-2 text-black border-red-500 w-full"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <button
                            className={`rounded-lg text-white px-4 py-2 font-bold ${AddressOn ? "bg-gray-500" : "bg-red-500"}`}
                            onClick={handleAddressSlider}
                          >
                            {
                              AddressOn ? "Hide Address" : "Add Address"
                            }
                          </button>
                        </div>

                      </div>

                      {
                        AddressOn ? (

                          <div className="flex flex-col w-full">

                            <div className="mb-4">
                              <label className="block mb-2 text-black">Apartment</label>
                              <input
                                type="text"
                                name="apartment"
                                value={formData.apartment}
                                onChange={handleInputChange}
                                placeholder="eg; 305, Ryuk Apartments, 3rd Floor"
                                className="border rounded px-4 py-2 text-black border-red-500 w-full"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-black">Street Address</label>
                              <input
                                type="text"
                                name="street_address"
                                value={formData.street_address}
                                onChange={handleInputChange}
                                placeholder="eg; Chaar rasta, Phadke Road"
                                className="border rounded px-4 py-2 text-black border-red-500 w-full"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-black">Landmark</label>
                              <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                placeholder="eg; Near Tilak School"
                                className="border rounded px-4 py-2 text-black border-red-500 w-full"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-black">City</label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="eg; Dombivli"
                                className="border rounded px-4 py-2 text-black border-red-500 w-full"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-black">State</label>
                              <select
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="border rounded px-4 py-2 text-black border-red-500 w-full"
                              >
                                <option value="">-- Select State --</option>
                                <option value="Maharashtra">Maharashtra</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-black">Zip Code</label>
                              <input
                                type="text"
                                name="zip_code"
                                value={formData.zip_code}
                                onChange={handleInputChange}
                                placeholder="eg; 432201"
                                minLength={6}
                                maxLength={6}
                                className="border rounded px-4 py-2 text-black border-red-500 w-full"
                              />
                            </div>


                          </div>
                        ) : ""
                      }
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center gap-6 mt-4">
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded w-full">
                      Add Customer
                    </button>
                    <button
                      type="button"
                      onClick={toggleFormVisibility}
                      className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div >
      </div >
    </>
  );
};

export default CustomerTable;
