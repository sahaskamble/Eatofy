"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosAddCircleOutline, IoIosArrowBack } from "react-icons/io";


const Widget = () => {
  const [showTableForm, setShowTableForm] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [tablePersons, setTablePersons] = useState(0);
  const [sectionId, setSectionId] = useState("");
  const [tablename, setTablename] = useState("");
  const [tableno, setTableno] = useState(0);
  const [autocheck, setAutocheck] = useState(false);
  const [hotelId, sethotelId] = useState('');
  const [tables, setTables] = useState([]);
  const [sections, setSections] = useState([]);
  const [message, setMessage] = useState("");
  const [isExist, setIsExist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    sethotelId(localStorage.getItem("hotel_id"));
    if (hotelId) {
      fetchTables();
      fetchSections();
    }
  }, [hotelId]);

  const fetchTables = async () => {
    try {
      const requestData = { hotel_id: hotelId };

      const response = await fetch(
        `${ApiHost}/api/hotel/tables/management/fetch`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setTables(data.output);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const fetchSections = async () => {
    try {
      const requestData = { hotel_id: hotelId };

      const response = await fetch(
        `${ApiHost}/api/hotel/sections/management/fetch`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setSections(data.output);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const handleShowTableForm = () => {
    setTablePersons(0);
    setTablename("");
    setTableno(0);
    setAutocheck(false);
    setShowTableForm(true);
  };

  const handleCloseTableForm = () => {
    setShowTableForm(false);
  };

  const handleShowSectionForm = () => {
    setSectionName("");
    setShowSectionForm(true);
  };

  const handleCloseSectionForm = () => {
    setShowSectionForm(false);
  };

  function handleClose() {
    setIsExist(false);
  }

  function ifTableExist(tablenaeme, tableexist) {
    tableexist.forEach((exist) => {
      if (tablenaeme === exist.TableName) {
        setIsExist(true);
        setMessage('Table Exist !!!');
      } else if (tablenaeme !== exist.TableName) {
        setIsExist(true);
        setMessage('Table Created !!!');
      }
    });
  }

  const handleTableFormSubmit = async (e) => {
    e.preventDefault();

    setSectionId(sessionStorage.getItem('section_id'))

    const section_id = sessionStorage.getItem('section_id');

    if (autocheck === false) {
      const requestData = {
        'section_id': section_id,
        'hotel_id': hotelId,
        'table_name': tablename,
        'persons_occupiable': tablePersons.toString(),
      };

      try {
        const response = await fetch(
          `${ApiHost}/api/hotel/tables/management/add/single`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              'section_id': requestData.section_id,
              'hotel_id': requestData.hotel_id,
              'table_name': requestData.table_name,
              'persons_occupiable': requestData.persons_occupiable
            }),
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const table = data.output;
        setShowTableForm(false);
        fetchTables();
        ifTableExist(requestData.table_name, table);
      } catch (error) {
        console.error("Error adding table:", error);
      }
    } else {
      const requestData = {
        section_id: section_id,
        hotel_id: hotelId,
        table_no: tableno,
      };

      try {
        const response = await fetch(
          `${ApiHost}/api/hotel/tables/management/add/multiple`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              'section_id': requestData.section_id,
              'hotel_id': requestData.hotel_id,
              'count': requestData.table_no
            }),
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setShowTableForm(false);
        fetchTables();
      } catch (error) {
        console.error("Error adding table:", error);
      }
    }

  };

  const handleSectionFormSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      'hotel_id': hotelId,
      'section_name': sectionName,
    };

    try {
      const response = await fetch(
        `${ApiHost}/api/hotel/sections/management/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setSectionId(data.section_id);
      setShowSectionForm(false);
      // handleShowTableForm();
      fetchSections();
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  const handleDeleteSection = async () => {
    try {

      const status = "Inactive";
      const section_id = sessionStorage.getItem('section_id');

      const response = await fetch(`${ApiHost}/api/hotel/sections/management/update/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'status': status,
          'section_id': section_id
        }),
      })

      const data = await response.json();

      if (data.returncode === 200) {
        alert("Section Deleted");
        fetchSections();
      } else {
        alert("Failed to delete section");
      }

    } catch (e) {
      throw console.error(e);

    }
  }

  const handleDeleteTable = async () => {
    try {

      const status = "Inactive";
      const table_id = sessionStorage.getItem('table_id');

      const response = await fetch(`${ApiHost}/api/hotel/tables/management/update/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'status': status,
          'table_id': table_id
        }),
      })

      const data = await response.json();

      if (data.returncode === 200) {
        alert("Table Deleted");
        fetchTables();
      } else {
        alert("Failed to delete table");
      }

    } catch (e) {
      throw console.error(e);

    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTables = tables.filter((table) =>
    table.TableName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] flex-1 p-4">
        {showTableForm ?
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                onClick={handleCloseTableForm}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-4xl"
              >
                &times;
              </button>
              <h2 className="text-lg mb-4">Add a Table</h2>
              <form onSubmit={handleTableFormSubmit}>
                {
                  autocheck
                    ?
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tablename"
                      >
                        No of Tables
                      </label>
                      <input
                        type="text"
                        id="tablename"
                        value={tableno}
                        onChange={(e) => setTableno(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    :
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tablename"
                      >
                        Table name
                      </label>
                      <input
                        type="text"
                        id="tablename"
                        value={tablename}
                        onChange={(e) => setTablename(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        required
                      />

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="tablePersons"
                        >
                          Persons Occupiable
                        </label>
                        <input
                          type="text"
                          id="tablePersons"
                          value={tablePersons}
                          onChange={(e) => setTablePersons(Number(e.target.value))}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                    </div>
                }
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tablePersons"
                  >
                    Auto table add
                  </label>
                  <input
                    type="checkbox"
                    id="autotableadd"
                    onChange={(e) => setAutocheck(e.currentTarget.checked)}
                    className="form-checkbox rounded p3 text-gray-700 focus:outline-none focus:outline-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Table
                </button>
              </form>
            </div>
          </div>
          :
          <div className="hidden"></div>
        }

        {showSectionForm && (
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                onClick={handleCloseSectionForm}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-lg mb-4">Add Section</h2>
              <form onSubmit={handleSectionFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sectionName"
                  >
                    Section Name
                  </label>
                  <input
                    type="text"
                    id="sectionName"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Section
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="flex justify-start items-center gap-4 mb-4">
          <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
            router.back()
          }} />
          <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">Table Management</h2>
        </div>
        <div className="flex gap-4 mt-10 justify-between flex-wrap">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tables..."
              className="px-4 py-2 border rounded-lg w-full mb-4"
            />
          </div>
          <button
            onClick={handleShowSectionForm}
            className="bg-red-500 font-bold text-white px-4 rounded-full flex items-center"
          >
            <span>Add Section</span>
          </button>

        </div>

        {sections.map((section) => (
          <div key={section.id} className="mt-8">
            <h3 className="bg-zinc-200 p-2 rounded-lg text-red-500 font-bold mb-4 inline-flex justify-between items-center w-full">
              <span className="text-black">{section.SectionName}</span>

              <div className="flex gap-4">

                <button
                  key={section.id}
                  onClick={() => { sessionStorage.setItem('section_id', section.id); handleShowTableForm() }}

                >
                  <span>
                    <IoIosAddCircleOutline size={25} />
                  </span>
                </button>

                <FaTrash
                  size={20}
                  onClick={
                    () => {
                      sessionStorage.setItem('section_id', section.id);
                      handleDeleteSection();
                    }
                  }
                />
              </div>

            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-black">
              {
                filteredTables.filter((table) => table.SectionId === section.id)
                  .map((table) => (
                    <div
                      key={table.id}
                      className="border-2 border-gray-500 p-4 rounded-lg flex flex-col items-center justify-center h-32 relative"
                    >
                      <div className="text-lg font-bold">{table.TableName}</div>
                      <div>Persons: {table.PersonsOccupiable}</div>
                      <FaTrash
                        size={20}
                        onClick={
                          () => {
                            sessionStorage.setItem('table_id', table.id);
                            handleDeleteTable();
                          }
                        }
                      />
                    </div>
                  ))}
            </div>
          </div>
        ))}
        {
          isExist
            ?
            <div className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
              <div className="w-[450px] h-auto p-4 rounded-lg bg-red-200 relative">
                <div onClick={handleClose} className="cursor-pointer absolute top-0 right-0 text-red-500 w-[40px] h-[40px] p-2">X</div>
                <h1 className="text-2xl font-bold text-red-500 text-center p-4">
                  {message}
                </h1>
              </div>
            </div>
            :
            <div className="hidden"></div>
        }
      </div>
    </>
  );
};

export default Widget;
