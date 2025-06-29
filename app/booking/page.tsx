'use client';

import PicInfo from "../../components/booking/PicInfo";
import TravelerInfo from "../../components/booking/TravelerInfo";
import { useState } from 'react';

// app/booking/page.tsx
export default function Booking() {

  const [adultQty, setAdultQty] = useState(0);
  const [childQty, setChildQty] = useState(0);
  const [infQty, setInfQty] = useState(0);
  const [totalForm, setTotalForm] = useState(0);

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
      {/* Add some dummy content to make the page scrollable */}
      <PicInfo />

      {/* Traveller Info */}
      <TravelerInfo 
        adultQty={adultQty}
        childQty={childQty}
        infQty={infQty}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        handleInputChange={handleInputChange}
        setAdultQty={setAdultQty}
        setChildQty={setChildQty}
        setInfQty={setInfQty}
        totalForm={totalForm} 
        setTotalForm={setTotalForm}
      />
    </main>
  )
}