'use client';

import React from 'react'
import { useEffect } from "react";
import HotelSideNav from "@/components/SideNavHotel";

export default function OrderDisplay() {

  async function LoadUserSettings() {
    try {

      const hotelId = localStorage.getItem('hotel_id');
      console.log(hotelId)

    } catch (e) {
      throw console.error(e)
    }
  }

  useEffect(() => {
    LoadUserSettings();
  }, [])

  return (
    <>
      <HotelSideNav />
      <div>OrderDisplay</div>
    </>
  )
}

