'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { 
  setAdultQty,
  setChildQty,
  setInfQty,
  setPicName,
  updateTraveler,
  validateAndSetRate,
  setSubmitting,
  incrementAdult,
  decrementAdult,
  incrementChild,
  decrementChild,
  incrementInf,
  decrementInf,
  BookingNowTraveler,
} from '../../../store/features/booking-now/bookingNowSlice';
import PrimaryButton from '@/components/generals/btns/primary-button';
import BasicNumberInput from '@/components/generals/basic-number-input';
import ProductBookedReview from '@/components/booking-now/ProductBookedReview';

export default function BookNowPage() {
  const dispatch = useDispatch();
  
  // Redux state
  const { 
    picName,
    adultQty, 
    childQty, 
    infQty, 
    totalPax,
    travelers,
    validationError,
    applicableRate,
    totalPrice,
    isSubmitting
  } = useSelector((state: RootState) => state.bookingNow);
  
  const { selectedPackage } = useSelector((state: RootState) => state.product);

  // Handle quantity changes with validation
  const handleDecrement = (type: 'adult' | 'child' | 'inf') => {
    switch (type) {
      case 'adult':
        if (adultQty > 0) {
          dispatch(decrementAdult());
        }
        break;
      case 'child':
        if (childQty > 0) {
          dispatch(decrementChild());
        }
        break;
      case 'inf':
        if (infQty > 0) {
          dispatch(decrementInf());
        }
        break;
    }
  };

  const handleIncrement = (type: 'adult' | 'child' | 'inf') => {
    // Check if increment would exceed any max pax limit
    const newTotal = totalPax + 1;
    let canIncrement = true;
    
    if (selectedPackage && selectedPackage.rate) {
      const maxAllowedPax = Math.max(...selectedPackage.rate.map(rate => parseInt(rate.maxPax)));
      if (newTotal > maxAllowedPax) {
        canIncrement = false;
      }
    }
    
    if (canIncrement) {
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
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'adult' | 'child' | 'inf') => {
    const value = parseInt(e.target.value) || 0;
    
    // Calculate what the new total would be
    let newTotal = totalPax;
    switch (type) {
      case 'adult':
        newTotal = value + childQty + infQty;
        break;
      case 'child':
        newTotal = adultQty + value + infQty;
        break;
      case 'inf':
        newTotal = adultQty + childQty + value;
        break;
    }
    
    // Check if the new total would exceed max limits
    let canUpdate = true;
    if (selectedPackage && selectedPackage.rate) {
      const maxAllowedPax = Math.max(...selectedPackage.rate.map(rate => parseInt(rate.maxPax)));
      if (newTotal > maxAllowedPax) {
        canUpdate = false;
      }
    }
    
    if (canUpdate) {
      switch (type) {
        case 'adult':
          dispatch(setAdultQty(value));
          break;
        case 'child':
          dispatch(setChildQty(value));
          break;
        case 'inf':
          dispatch(setInfQty(value));
          break;
      }
    }
  };

  const handleTravelerChange = (index: number, field: keyof BookingNowTraveler, value: string) => {
    dispatch(updateTraveler({ index, field, value }));
  };

  const handlePicNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPicName(e.target.value));
  };

  const handleSubmit = () => {
    dispatch(setSubmitting(true));
    
    // Handle form submission logic here
    console.log({
      picName,
      totalPax,
      adultQty,
      childQty,
      infQty,
      travelers,
      applicableRate,
      totalPrice
    });
    
    // Simulate API call
    setTimeout(() => {
      dispatch(setSubmitting(false));
      alert('Booking submitted successfully!');
    }, 2000);
  };

  // Validate and update rate when totalPax or selectedPackage changes
  React.useEffect(() => {
    dispatch(validateAndSetRate({ 
      packageRates: selectedPackage?.rate || null 
    }));
  }, [totalPax, selectedPackage, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Now</h1>
          <p className="text-gray-600">
            {selectedPackage ? selectedPackage.title : 'Package Tour'}
          </p>
          
          {/* Package Pax Information */}
          {selectedPackage && selectedPackage.rate && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Package Information</h3>
              <div className="space-y-1 text-blue-800">
                <p className="font-medium">Available Passenger Ranges:</p>
                {selectedPackage.rate.map((rate, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{rate.minPax} - {rate.maxPax} passengers</span>
                    <span className="font-medium">IDR {parseInt(rate.pricePerPax).toLocaleString()} per pax</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 mb-6">
          <ProductBookedReview

          />
        </div>

        <div className="space-y-6">
          {/* PIC Info Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-row items-center mb-4">
              <div className="w-28">
                <p className="text-md font-medium">PIC Info</p>
              </div>
              <div className="w-full h-1 bg-black" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="picName" className="block text-sm font-medium text-gray-700 mb-1">
                PIC Name
              </label>
              <input
                type="text"
                id="picName"
                value={picName}
                onChange={handlePicNameChange}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter PIC name"
                required
              />
            </div>
          </div>

          {/* Total Pax Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-row items-center mb-4">
              <div className="w-28">
                <p className="text-md font-medium">Total Pax</p>
              </div>
              <div className="w-full h-1 bg-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Adult */}
              <div>
                <label htmlFor="adultQty" className="block text-sm font-medium text-gray-900 mb-2">
                  Adult
                </label>
                <div className="flex items-center max-w-[8rem]">
                  <BasicNumberInput 
                    handleDecrement={() => handleDecrement('adult')}
                    quantity={adultQty}
                    handleInputChange={(e) => handleInputChange(e, 'adult')}
                    handleIncrement={() => handleIncrement('adult')}
                  />
                </div>
              </div>

              {/* Child */}
              <div>
                <label htmlFor="childQty" className="block text-sm font-medium text-gray-900 mb-2">
                  Child
                </label>
                <div className="flex items-center max-w-[8rem]">
                  <BasicNumberInput 
                    handleDecrement={() => handleDecrement('child')}
                    quantity={childQty}
                    handleInputChange={(e) => handleInputChange(e, 'child')}
                    handleIncrement={() => handleIncrement('child')}
                  />
                </div>
              </div>

              {/* Infant */}
              <div>
                <label htmlFor="infQty" className="block text-sm font-medium text-gray-900 mb-2">
                  Infant
                </label>
                <div className="flex items-center max-w-[8rem]">
                  <BasicNumberInput 
                    handleDecrement={() => handleDecrement('inf')}
                    quantity={infQty}
                    handleInputChange={(e) => handleInputChange(e, 'inf')}
                    handleIncrement={() => handleIncrement('inf')}
                  />
                </div>
              </div>
            </div>

            <div className="text-lg font-semibold text-gray-900">
              Total Passengers: {totalPax}
            </div>
            
            {/* Validation Error */}
            {validationError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">{validationError}</p>
              </div>
            )}
            
            {/* Current Price Display */}
            {totalPax > 0 && !validationError && applicableRate && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-sm font-medium">
                  Price: IDR {parseInt(applicableRate.pricePerPax).toLocaleString()} per person
                </p>
                <p className="text-green-700 text-sm">
                  Total: IDR {totalPrice.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Traveler Details Section */}
          {totalPax > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-row items-center mb-4">
                <div className="w-32">
                  <p className="text-md font-medium">Traveler Details</p>
                </div>
                <div className="w-full h-1 bg-black" />
              </div>

              <div className="space-y-6">
                {travelers.map((traveler, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Passenger {index + 1} {`for ${traveler.type}`}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Traveler Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={traveler.travelerName}
                          onChange={(e) => handleTravelerChange(index, 'travelerName', e.target.value)}
                          className="w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                          placeholder="Enter full name"
                          required
                        />
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={traveler.dateOfBirth}
                          onChange={(e) => handleTravelerChange(index, 'dateOfBirth', e.target.value)}
                          className="w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                          required
                        />
                      </div>

                      {/* Citizen */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Citizenship
                        </label>
                        <select
                          value={traveler.citizen}
                          onChange={(e) => handleTravelerChange(index, 'citizen', e.target.value)}
                          className="w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                          required
                        >
                          <option value="">Select citizenship</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Vietnam">Vietnam</option>
                          <option value="Australia">Australia</option>
                          <option value="Japan">Japan</option>
                          <option value="South Korea">South Korea</option>
                          <option value="China">China</option>
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Passport No */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          value={traveler.passportNo}
                          onChange={(e) => handleTravelerChange(index, 'passportNo', e.target.value)}
                          className="w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                          placeholder="Enter passport number"
                          required
                        />
                      </div>

                      {/* KTP No (only for Indonesian citizens) */}
                      {traveler.citizen === 'Indonesia' && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            KTP Number
                          </label>
                          <input
                            type="text"
                            value={traveler.ktpNo}
                            onChange={(e) => handleTravelerChange(index, 'ktpNo', e.target.value)}
                            className="w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            placeholder="Enter KTP number"
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <PrimaryButton
              ButtonDesc={isSubmitting ? "Submitting..." : "Review Booking"}
              onClick={handleSubmit}
              disable={totalPax === 0 || !picName || !!validationError || isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}