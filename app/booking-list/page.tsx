'use client';

import PicInfo from "../../components/booking/PicInfo";
import TravelerInfo from "../../components/booking/TravelerInfo";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  incrementAdult,
  decrementAdult,
  setAdultQty,
  incrementChild,
  decrementChild,
  setChildQty,
  incrementInf,
  decrementInf,
  setInfQty,
  updateTraveler,
  updateFormData
} from '@/store/features/booking/bookingSlice';

// app/booking/page.tsx
export default function Booking() {
  const dispatch = useDispatch();
  const { 
    adultQty, 
    childQty, 
    infQty, 
    totalForm, 
    travelers, 
    formData 
  } = useSelector((state: RootState) => state.booking);

  // handle traveller change
  const handleTravelerChange = (index: number, field: string, value: any) => {
    dispatch(updateTraveler({ index, field: field as any, value }));
  };

  // Generic decrement function
  const handleDecrement = (type: 'adult' | 'child' | 'inf') => {
    switch (type) {
      case 'adult':
        dispatch(decrementAdult());
        break;
      case 'child':
        dispatch(decrementChild());
        break;
      case 'inf':
        dispatch(decrementInf());
        break;
    }
  };

  // Generic increment function
  const handleIncrement = (type: 'adult' | 'child' | 'inf') => {
    switch (type) {
      case 'adult':
        dispatch(incrementAdult());
        break;
      case 'child':
        dispatch(incrementChild());
        break;
      case 'inf':
        dispatch(incrementInf());
        break;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'adult' | 'child' | 'inf'
  ) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      const numValue = Number(value);
      switch (type) {
        case 'adult':
          dispatch(setAdultQty(numValue));
          break;
        case 'child':
          dispatch(setChildQty(numValue));
          break;
        case 'inf':
          dispatch(setInfQty(numValue));
          break;
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        {/* Traveller Info */}
        <TravelerInfo 
            adultQty={adultQty}
            childQty={childQty}
            infQty={infQty}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleInputChange={handleInputChange}
            totalForm={totalForm} 
            formData={formData}
            travelers={travelers}
            handleTravelerChange={handleTravelerChange}
        />

        {/* Add some dummy content to make the page scrollable */}
        <PicInfo />
    </main>
  );
}