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

        <div className='ml-2 mr-2'>
          <div className='relative flex items-end max-w-[8rem]'>
            <PrimaryButton 
              ButtonDesc='Set Form'
              onClick={onClickSetForm}
            />
          </div>
        </div>
        
      </div>
      

      
    </div>
  );
}
