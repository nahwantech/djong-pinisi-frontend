'use client';

import BasicNumberInput from '../generals/basic-number-input';
import PrimaryButton from '../generals/btns/primary-button';
import Select from 'react-select';
import { useState } from 'react';

const options = [
  { value: 'bali', label: 'Bali' },
  { value: 'lombok', label: 'Lombok' },
  { value: 'java', label: 'Java' },
  { value: 'labuan-bajo', label: 'Labuan Bajo' },
];

export default function TotalPax({
    handleDecrement,
    handleInputChange,
    handleIncrement,
    adultQty,
    childQty,
    infQty,
}:{
    handleDecrement: (type: 'adult' | 'child' | 'inf') => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'adult' | 'child' | 'inf') => void,
    handleIncrement: (type: 'adult' | 'child' | 'inf') => void,
    adultQty: number,
    childQty: number,
    infQty: number,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected: any) => {
    setSelectedOptions(selected || []);
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
              handleDecrement={() => handleDecrement('adult')}
              quantity={adultQty}
              handleInputChange={(e) => handleInputChange(e, 'adult')}
              handleIncrement={() => handleIncrement('adult')}
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
              handleDecrement={() => handleDecrement('child')}
              quantity={childQty}
              handleInputChange={(e) => handleInputChange(e, 'child')}
              handleIncrement={() => handleIncrement('child')}
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
              handleDecrement={() => handleDecrement('inf')}
              quantity={infQty}
              handleInputChange={(e) => handleInputChange(e, 'inf')}
              handleIncrement={() => handleIncrement('inf')}
            />
          </div>
        </div>

        <div className='ml-2 mr-2 '>
          <div className='max-w-[20rem]'>
            <label className="block text-sm font-medium text-gray-700">Select Destination</label>
            <Select
              options={options}
              isMulti
              isSearchable
              value={selectedOptions}
              onChange={handleChange}
              className="text-sm font-medium w-full"
            />
          </div>
        </div>

        <div className='ml-2 mr-2 mt-5'>
          <div className='relative flex items-end max-w-[10rem]'>
            <PrimaryButton 
              ButtonDesc='Inquiry Package'
              onClick={() => {
                // This button doesn't need to do anything since totalForm is auto-calculated in Redux
                console.log('Inquiry Package clicked');
              }}
            />
          </div>
        </div>
        
      </div>
      

      
    </div>
  );
}
