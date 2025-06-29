'use client';

import { useState } from 'react';
import BasicNumberInput from '../generals/basic-number-input';
import PrimaryButton from '../generals/btns/primary-button';

export default function TotalPax({ info }: { info: string }) {
  const [adultQty, setAdultQty] = useState(0);
  const [childQty, setChildQty] = useState(0);
  const [inftQty, setInfQty] = useState(0);

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
    <div className="block w-full p-6 bg-gray-200 border border-gray-200 rounded-lg shadow-sm">
      
      <div className='flex flex-row justify-center mb-2'>

        <div className='ml-2 mr-2'>
          {/* ADULT */}
          <label htmlFor="adultQty-input" className="block text-sm font-medium text-gray-900 dark:text-white">
            Adult
          </label>
          <div id="adultQty-input" className="relative flex items-center max-w-[8rem]">
            <BasicNumberInput 
              handleDecrement={() => handleDecrement(adultQty, setAdultQty)}
              quantity={adultQty}
              handleInputChange={(e) => handleInputChange(e, setAdultQty)}
              handleIncrement={() => handleIncrement(adultQty, setAdultQty)}
            />
          </div>
        </div>
        
        <div className='ml-2 mr-2'>
          {/* CHILD */}
          <label htmlFor="childQty-input" className="block text-sm font-medium text-gray-900 dark:text-white">
            Child
          </label>
          <div id="childQty-input" className="relative flex items-center max-w-[8rem]">
            
            <BasicNumberInput 
              handleDecrement={() => handleDecrement(childQty, setChildQty)}
              quantity={childQty}
              handleInputChange={(e) => handleInputChange(e, setChildQty)}
              handleIncrement={() => handleIncrement(childQty, setChildQty)}
            />
          </div>
        </div>
        
        <div className='ml-2 mr-2'>
          {/* INFANT */}
          <label htmlFor="infantQty-input" className="block text-sm font-medium text-gray-900 dark:text-white">
            Infant
          </label>
          <div id="infantQty-input"  className="relative flex items-center max-w-[8rem]">
            <BasicNumberInput 
              handleDecrement={() => handleDecrement(inftQty, setInfQty)}
              quantity={inftQty}
              handleInputChange={(e) => handleInputChange(e, setInfQty)}
              handleIncrement={() => handleIncrement(inftQty, setInfQty)}
            />
          </div>
        </div>

        <div className='ml-2 mr-2'>
          <div className='relative flex items-end max-w-[8rem]'>
            <PrimaryButton 
              ButtonDesc='Set Form'
            />
          </div>
        </div>
        
      </div>
      

      
    </div>
  );
}
