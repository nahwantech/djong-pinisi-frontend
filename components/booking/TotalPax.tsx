'use client';

import { useState } from 'react';
import BasicNumberInput from '../generals/basic-number-input';

export default function TotalPax({
    info
}:{
    info: string
}) {
  const [quantity, setQuantity] = useState(0);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 99999) { // Limit to 5-digit number
      setQuantity(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setQuantity(Number(value));
    }
  };

  return (
    <div className="block w-full p-6 bg-gray-200 border border-gray-200 rounded-lg shadow-sm">
      <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {info}
      </label>
      <div className="relative flex items-center max-w-[8rem]">
        <BasicNumberInput 
            handleDecrement={handleDecrement}
            quantity={quantity}
            handleInputChange={handleInputChange}
            handleIncrement={handleIncrement}
        />
      </div>
      {/* <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Please select a 5 digit number from 0 to 99999.
      </p> */}
    </div>
  );
}
