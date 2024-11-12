'use client';

import React from 'react'
import { useEffect } from "react";
import HotelSideNav from "@/components/SideNavHotel";

export default function OrderDisplay() {

  const [Hotel_id, setHotel_id] = useState('');

  async function LoadKotDisplayOeder() {
    try {

      const hotelId = localStorage.getItem('hotel_id');
      console.log(hotelId)

    } catch (e) {
      throw console.error(e)
    }
  }

  async function fetchHotelOrders() {
  }

  useEffect(() => {
    setHotel_id(localStorage.getItem('hotel_id'));
    if (Hotel_id) {

    }
  }, [Hotel_id])

  return (
    <>
      <HotelSideNav />
      <div>OrderDisplay</div>
    </>
  )
}

