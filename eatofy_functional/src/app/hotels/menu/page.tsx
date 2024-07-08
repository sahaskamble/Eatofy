"use client"

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import { throws } from 'assert';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

export default function Menu() {

  const [isLoading, setLoading]: any = useState(false);
  const [fetchCategorys, setfetchCategorys] = useState([]);
  const [fetchDishes, setfetchDishes]: any = useState([]);
  const [isClicked, setisClicked]: any = useState(null);
  const [ShowAll, setShowAll] = useState(true);
  const [Search, setSearch] = useState('');
  const [ShowCart, setShowCart] = useState(false);
  const [Cart, setCart] = useState<any[]>([]); // Initialize as an array
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState('');
  const [occasion, setoccasion] = useState('');
  const hotel_id = sessionStorage.getItem('hotel_id');
  const [message, setMessage] = useState('');
  const [Orderadd, setOrderadd] = useState(false);

  const fetchAllCategorys = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/dish/category/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("Category", data);
        setfetchCategorys(data.output);
      } else {
        console.log("Failed to fetch category");
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const fetchAllDishes = async () => {
    const section_id = sessionStorage.getItem('section_id');
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/menu/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'section_id': section_id }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("Dishes", data);
        setfetchDishes(data.output);
      } else {
        console.log("Failed to fetch Dishes");
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const getColorByType = (type: any) => {
    const non_veg = 'border-red-500';
    const veg = 'border-green-500';
    const eggetarian = 'border-yellow-500';

    const types = type.toLowerCase();

    if (types === 'non-veg') {
      return non_veg;
    } else if (types === 'veg') {
      return veg;
    } else {
      return eggetarian;
    }
  }

  const getColorByTypeText = (type: any) => {
    const non_veg = 'text-red-500';
    const veg = 'text-green-500';
    const eggetarian = 'text-yellow-500';

    const types = type.toLowerCase();

    if (types === 'non-veg') {
      return non_veg;
    } else if (types === 'veg') {
      return veg;
    } else {
      return eggetarian;
    }
  }

  const handleSearch = (e: any) => {
    setShowAll(false);
    setSearch(e.target.value);
  }

  const handleAddToCart = (dish: any) => {
    const existingDish = Cart.find(item => item.id === dish.id);
    if (existingDish) {
      setCart(Cart.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...Cart, { ...dish, quantity: 1 }]);
    }
    setShowCart(true);
  }

  const handleIncrement = (id: any) => {
    setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  }

  const handleDecrement = (id: any) => {
    setCart(Cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
  }

  const handleDelete = (id: any) => {
    setCart(Cart.filter(item => item.id !== id));
  }

  const handleSaveOrPrintBill = () => {
    // Implement the logic to save or print the bill
    console.log('Bill saved or printed', Cart);
    window.print();
  }

  const handleOrderCRM = async (e: any) => {
    e.preventDefault();

    const type = sessionStorage.getItem('select');
    const table_id = sessionStorage.getItem('table_id');
    const waiter_id = sessionStorage.getItem('waiter_id');

    try {

      const response = await fetch(`${ApiHost}/api/hotel/orders/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'customer_name': name,
          'contact': contact,
          'email': email,
          'type': type,
          'table_id': table_id,
          'waiter_id': waiter_id,
          'hotel_id': hotel_id
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log('added CRM', data);
        sessionStorage.setItem('order_id', data.output.id);
      } else {
        console.log('Failed to add CRM');
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleOrder = async (e: any) => {
    e.preventDefault();

    try {

      if (Cart.length === 1) {
        const item = Cart[0];
        const response = await fetch(`${ApiHost}/api/hotel/orders/menus/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'quantity': item.quantity,
            'menu_id': item.id,
            'order_id': sessionStorage.getItem('order_id')
          }),
        });
        const data = await response.json();
        if (data.returncode === 200) {
          console.log('Order Added');
          setShowCart(false);
          setOrderadd(true);
          setMessage(data.message);
          setTimeout(() => {
            setOrderadd(false);
          }, 2500);
        } else {
          console.log('Failed to add order');
        }
      }
      else if (Cart.length > 1) {

        const orderData = {
          data: Cart.map((item: any) => ({
            quantity: item.quantity.toString(),
            menu_id: item.id,
            order_id: sessionStorage.getItem('order_id')
          }))
        }

        const response = await fetch(`${ApiHost}/api/hotel/orders/menus/add/multiple`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();
        if (data.returncode === 200) {
          console.log("Order add", data);
          setShowCart(false);
          setOrderadd(true);
          setMessage(data.message);
          setTimeout(() => {
            setOrderadd(false);
          }, 2500);
        }
      } else {
        console.log("Failed to add order");
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    fetchAllCategorys();
    fetchAllDishes();
  }, []);


  console.log(Cart)

  return (
    <>
      <HotelSideNav />
      {
        isLoading
          ?
          <div aria-label="Loading..." role="status" className="flex justify-center items-center w-full h-screen">
            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">Loading...</span>
          </div>
          :
          <div className="ml-[70px] h-screen flex">
            <div className="p-4 w-full">
              <div className="flex justify-between items-center px-2">
                <h1 className="text-red-500 font-bold text-3xl text-center">Restaurant</h1>
                <div className="w-full inline-flex justify-end items-center p-2">
                  <input
                    type="text"
                    className="rounded-lg"
                    placeholder="Search by name or by code"
                    value={Search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="p-2 ">
                <div className="flex items-center gap-6 p-2">
                  <div
                    onClick={() => { setShowAll(!ShowAll); setisClicked(null) }}
                    className={`text-red-500 cursor-pointer`}
                  >
                    All
                  </div>
                  {
                    fetchCategorys.map((category: any, index) => (
                      <div
                        key={index}
                        onClick={() => { setisClicked(category.id); setShowAll(false) }}
                        className={`${isClicked === category.id ? 'text-red-500' : ''} cursor-pointer`}
                      >
                        {category.CategoryName}
                      </div>
                    ))
                  }
                </div>
                <hr className="border border-zinc-400" />
                <div className="p-4">
                  <div className='flex justify-between items-center p-2'>
                    <h3 className="my-4 text-xl">Choose Dishes</h3>
                    <Link href="/hotels/takeaway" className='p-2 border border-red-500 rounded-lg'>Take away</Link>
                  </div>
                  <div className="">
                    {
                      ShowAll
                        ?
                        <div className="flex flex-wrap items-center gap-8">
                          {
                            fetchDishes.map((dish: any) => (
                              <div
                                key={dish.id}
                                onClick={() => handleAddToCart(dish)}
                                className={`w-[200px] p-2 py-4 text-xl border flex flex-col justify-center items-center gap-4 rounded-lg ${getColorByType(dish.Dish.Type)}`}
                              >
                                <img src="https://i.pinimg.com/736x/04/66/e7/0466e72a2a85f4cc0d56a4937a89748b.jpg" className="w-[100px] h-[100px] rounded-full" alt="Food" />
                                <div>{dish.Dish.DishName}</div>
                                <div className={`${getColorByTypeText(dish.Dish.Type)}`}>{dish.Dish.Type}</div>
                              </div>
                            ))
                          }
                        </div>
                        :
                        <div className="flex flex-wrap gap-8">
                          {
                            fetchDishes.filter((dishes: any) => dishes.CategoryId === isClicked
                              || dishes.Dish.DishName.toLowerCase().includes(Search.toLowerCase())
                              || dishes.Code.toLowerCase().includes(Search.toLowerCase()))
                              .map((dish: any) => (
                                <div
                                  key={dish.id}
                                  onClick={() => { sessionStorage.setItem('menu_id', dish.id); handleAddToCart(dish); }}
                                  className={`w-[200px] p-2 py-4 text-xl border flex flex-col justify-center items-center gap-4 rounded-lg ${getColorByType(dish.Dish.Type)}`}
                                >
                                  <img src="https://i.pinimg.com/736x/04/66/e7/0466e72a2a85f4cc0d56a4937a89748b.jpg" className="w-[100px] h-[100px] rounded-full" alt="Food" />
                                  <div>{dish.Dish.DishName}</div>
                                  <div className={`text-center ${getColorByTypeText(dish.Dish.Type)}`}>{dish.Dish.Type}</div>
                                </div>
                              ))
                          }
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            {
              ShowCart
                ?
                <div className="w-full h-full bg-black text-white">
                  <div>
                    <FaArrowLeft size={25} color='#fff' className="m-3 cursor-pointer" onClick={() => setShowCart(false)} />
                  </div>
                  <div className="flex items-center h-[90%] p-2">
                    <div className='p-4 w-1/2 h-full flex flex-col justify-between border-r border-zinc-400'>
                      <div className="">
                        <div className='flex items-center gap-8'>
                          <span className='flex-1'>Item</span>
                          <span>QTY</span>
                          <span>Price</span>
                          <span>Action</span>
                        </div>
                        <div className='w-full'>
                          {
                            Cart.map((item: any) => (
                              <div key={item.id} className='flex items-center gap-8 my-2'>
                                <span className='flex-1'>{item.Dish.DishName}</span>
                                <div className='w-[60px] h-[40px] inline-flex justify-center items-center gap-1'>
                                  <button onClick={() => handleDecrement(item.id)} className='inline-flex justify-center items-center'>
                                    <FaMinus size={20} />
                                  </button>
                                  <span className='p-1 px-2 bg-red-400 rounded-lg inline-flex justify-center items-center text-xl'>
                                    {item.quantity}
                                  </span>
                                  <button onClick={() => handleIncrement(item.id)} className='inline-flex justify-center items-center'>
                                    <FaPlus size={20} />
                                  </button>
                                </div>
                                <span>₹{item.Price * item.quantity}</span>
                                <button onClick={() => handleDelete(item.id)} className='inline-flex justify-center items-center'>
                                  <FaTrash size={20} />
                                </button>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <div className='w-full flex gap-4'>
                        <button onClick={handleOrder} className='w-1/2 bg-red-500 text-white p-2 rounded-lg'>Save</button>
                        <button onClick={handleSaveOrPrintBill} className='w-1/2 border-red-500 border text-white p-2 rounded-lg'>Print Bill</button>
                      </div>
                    </div>
                    <div className="w-1/2 p-4 h-full">
                      <form onSubmit={handleOrderCRM} className="flex flex-col justify-between h-[98%]">
                        <div className="my-4 text-center">
                          <label htmlFor="title" className="text-white my-4 text-center">Customer Details</label>
                          <hr />
                        </div>
                        <div className='flex-1 flex flex-col gap-6'>
                          <div>
                            <label htmlFor="customer">Customer name</label>
                            <input
                              type="text"
                              placeholder="Name"
                              className="bg-zinc-900 w-full text-white rounded-lg focus:outline-none focus:ring-black"
                              onChange={
                                (e) => {
                                  setname(e.target.value);
                                }
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="customer">Customer contact</label>
                            <input
                              type="text"
                              placeholder="Contact"
                              className="bg-zinc-900 w-full text-white rounded-lg focus:outline-none focus:ring-black"
                              onChange={
                                (e) => {
                                  setcontact(e.target.value);
                                }
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="customer">Customer email</label>
                            <input
                              type="text"
                              placeholder="Email"
                              className="bg-zinc-900 w-full text-white rounded-lg focus:outline-none focus:ring-black"
                              onChange={
                                (e) => {
                                  setemail(e.target.value);
                                }
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="customer">Type</label>
                            <select className="bg-zinc-900 w-full text-white rounded-lg" onChange={(e) => { sessionStorage.setItem('select', e.target.value) }}>
                              <option value=""></option>
                              <option defaultValue="Dine-In" value="Dine-In">Dine-In</option>
                              <option value="Takeaway">Takeaway</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="customer">Occasion</label>
                            <input
                              type="text"
                              placeholder="Occasion"
                              value={occasion}
                              className="bg-zinc-900 w-full text-white rounded-lg focus:outline-none focus:ring-black"
                              onChange={
                                (e) => {
                                  setoccasion(e.target.value);
                                }
                              }
                            />
                          </div>
                        </div>
                        <div className="inline-flex gap-4 items-center">
                          <button className="border border-red-500 text-white w-full p-2 rounded-lg">Cancel</button>
                          <button className="bg-red-500 p-2 rounded-lg w-full">Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                :
                null
            }
          </div>
      }
      {
        Orderadd
          ?
          <div className={`w-[300px] h-[80px] fixed inline-flex justify-center items-center top-5 right-10 border-t-[8px] border-green-500 bg-green-200 rounded-lg`}>
            <div className="text-green-500 text-xl font-bold">{message}</div>
          </div>
          :
          []
      }
    </>
  )
}

