'use client';

import PicInfo from "../../components/booking/PicInfo";
import TravelerInfo from "../../components/booking/TravelerInfo";
import { useState } from 'react';
import PackageTourList from "../../components/package-tours/PackageTourList";

// app/booking/page.tsx
export default function Booking() {

  const [adultQty, setAdultQty] = useState(0);
  const [childQty, setChildQty] = useState(0);
  const [infQty, setInfQty] = useState(0);
  const [totalForm, setTotalForm] = useState(0);
  const [travelers, setTravelers] = useState(
    Array.from({ length: totalForm }, () => ({
      travelerName: '',
      passportNo: '',
      email: '',
      dateOfBirth: '',
    }))
  )

  const [formData, setFormData] = useState({
    travelerName:  '',
    passportNo: '',
    email: '',
    dateOfBirth: new Date(),
  })

  // handle traveller change
  const handleTravelerChange = (index: number, field: string, value: any) => {
    setTravelers((prev) => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  // Generic decrement function
  const handleDecrement = (
      qty: number,
      setQty: React.Dispatch<React.SetStateAction<number>>
  ) => {
      if (qty > 0) {
          setQty(qty - 1);
      }
  };

  // Generic increment function
  const handleIncrement = (
      qty: number,
      setQty: React.Dispatch<React.SetStateAction<number>>
  ) => {
      if (qty < 99999) {
          setQty(qty + 1);
      }
  };

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      setQty: React.Dispatch<React.SetStateAction<number>>
  ) => {
      const value = e.target.value;
      if (/^\d{0,5}$/.test(value)) {
          setQty(Number(value));
      }
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        {/* Package Tour Card */}
        <PackageTourList />

      
    </main>
  )
}