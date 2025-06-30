'use client';

import BasicNumberInput from '../generals/basic-number-input';
import PrimaryButton from '../generals/btns/primary-button';

export default function TotalPax({
    handleDecrement,
    handleInputChange,
    handleIncrement,
    adultQty,
    childQty,
    infQty,
    setAdultQty,
    setChildQty,
    setInfQty,
    onClickSetForm,
}:{
    handleDecrement: any,
    handleInputChange: any,
    handleIncrement: any,
    adultQty: Number,
    childQty: Number,
    infQty: Number,
    setAdultQty: any,
    setChildQty: any,
    setInfQty: any,
    onClickSetForm: any,
}) {
  

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
              handleDecrement={() => handleDecrement(infQty, setInfQty)}
              quantity={infQty}
              handleInputChange={(e) => handleInputChange(e, setInfQty)}
              handleIncrement={() => handleIncrement(infQty, setInfQty)}
            />
          </div>
        </div>

        <div className="mb-2 mt-2">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </div>

        <div className='ml-2 mr-2 mt-5'>
          <div className='relative flex items-end max-w-[10rem]'>
            <PrimaryButton 
              ButtonDesc='Inquiry Package'
              onClick={onClickSetForm}
            />
          </div>
        </div>
        
      </div>
      

      
    </div>
  );
}
