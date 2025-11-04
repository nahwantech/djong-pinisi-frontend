import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define traveler type for booking now
export interface BookingNowTraveler {
  travelerName: string;
  dateOfBirth: string;
  citizen: string;
  passportNo: string;
  ktpNo: string;
  type: string;
}

// Define booking now state
interface BookingNowState {
  // PIC Information
  picName: string;
  
  // Passenger quantities
  adultQty: number;
  childQty: number;
  infQty: number;
  totalPax: number;
  
  // Traveler details
  travelers: BookingNowTraveler[];
  
  // Validation
  validationError: string;
  
  // Form status
  isSubmitting: boolean;
  
  // Price calculation
  applicableRate: {
    pricePerPax: string;
    minPax: string;
    maxPax: string;
  } | null;
  totalPrice: number;
}

// Initial state
const initialState: BookingNowState = {
  picName: '',
  adultQty: 0,
  childQty: 0,
  infQty: 0,
  totalPax: 0,
  travelers: [],
  validationError: '',
  isSubmitting: false,
  applicableRate: null,
  totalPrice: 0,
};

// Helper function to update travelers array based on totalPax
const updateTravelersArray = (state: BookingNowState, type: string) => {
  const currentLength = state.travelers.length;
  const targetLength = state.totalPax;

  if (targetLength > currentLength) {
    // Add new travelers
    const newTravelers = Array.from({ length: targetLength - currentLength }, () => ({
      travelerName: '',
      dateOfBirth: '',
      citizen: '',
      passportNo: '',
      ktpNo: '',
      type: type,
    }));
    state.travelers = [...state.travelers, ...newTravelers];
  } else if (targetLength < currentLength) {
    // Remove travelers
    state.travelers = state.travelers.slice(0, targetLength);
  }
};

// Helper function to calculate total pax
const calculateTotalPax = (adultQty: number, childQty: number, infQty: number) => {
  return adultQty + childQty + infQty;
};

const bookingNowSlice = createSlice({
  name: 'booking-now',
  initialState,
  reducers: {
    // PIC Information actions
    setPicName: (state, action: PayloadAction<string>) => {
      state.picName = action.payload;
    },

    // Passenger quantity management actions
    setAdultQty: (state, action: PayloadAction<number>) => {
      const value = Math.max(0, action.payload);
      state.adultQty = value;
      state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
      updateTravelersArray(state, 'Adult');
    },

    setChildQty: (state, action: PayloadAction<number>) => {
      const value = Math.max(0, action.payload);
      state.childQty = value;
      state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
      updateTravelersArray(state, 'Child');
    },

    setInfQty: (state, action: PayloadAction<number>) => {
      const value = Math.max(0, action.payload);
      state.infQty = value;
      state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
      updateTravelersArray(state, 'Infant');
    },

    incrementAdult: (state) => {
      state.adultQty += 1;
      state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
      updateTravelersArray(state, 'Adult');
    },

    decrementAdult: (state) => {
      if (state.adultQty > 0) {
        state.adultQty -= 1;
        state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
        updateTravelersArray(state, 'Adult');
      }
    },

    incrementChild: (state) => {
      state.childQty += 1;
      state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
      updateTravelersArray(state, 'Child');
    },

    decrementChild: (state) => {
      if (state.childQty > 0) {
        state.childQty -= 1;
        state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
        updateTravelersArray(state, 'Child');
      }
    },

    incrementInf: (state) => {
      state.infQty += 1;
      state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
      updateTravelersArray(state, 'Infant');
    },

    decrementInf: (state) => {
      if (state.infQty > 0) {
        state.infQty -= 1;
        state.totalPax = calculateTotalPax(state.adultQty, state.childQty, state.infQty);
        updateTravelersArray(state, 'Infant');
      }
    },

    // Traveler management actions
    updateTraveler: (state, action: PayloadAction<{ index: number; field: keyof BookingNowTraveler; value: string }>) => {
      const { index, field, value } = action.payload;
      if (index >= 0 && index < state.travelers.length) {
        state.travelers[index][field] = value;
      }
    },

    // Validation and rate calculation actions
    validateAndSetRate: (state, action: PayloadAction<{ 
      packageRates: Array<{ minPax: string; maxPax: string; pricePerPax: string }> | null 
    }>) => {
      const { packageRates } = action.payload;
      
      if (!packageRates) {
        state.validationError = '';
        state.applicableRate = null;
        state.totalPrice = 0;
        return;
      }

      const applicableRate = packageRates.find(rate => {
        const minPax = parseInt(rate.minPax);
        const maxPax = parseInt(rate.maxPax);
        return state.totalPax >= minPax && state.totalPax <= maxPax;
      });

      if (!applicableRate && state.totalPax > 0) {
        const rates = packageRates.map(rate => `${rate.minPax}-${rate.maxPax}`).join(', ');
        state.validationError = `Total passengers must be within the allowed ranges: ${rates} pax`;
        state.applicableRate = null;
        state.totalPrice = 0;
      } else {
        state.validationError = '';
        state.applicableRate = applicableRate;
        state.totalPrice = applicableRate ? parseInt(applicableRate.pricePerPax) * state.totalPax : 0;
      }
    },

    setValidationError: (state, action: PayloadAction<string>) => {
      state.validationError = action.payload;
    },

    clearValidationError: (state) => {
      state.validationError = '';
    },

    // Price calculation actions
    setApplicableRate: (state, action: PayloadAction<{ pricePerPax: string; minPax: string; maxPax: string } | null>) => {
      state.applicableRate = action.payload;
      if (action.payload) {
        state.totalPrice = parseInt(action.payload.pricePerPax) * state.totalPax;
      } else {
        state.totalPrice = 0;
      }
    },

    updateTotalPrice: (state) => {
      if (state.applicableRate) {
        state.totalPrice = parseInt(state.applicableRate.pricePerPax) * state.totalPax;
      } else {
        state.totalPrice = 0;
      }
    },

    // Form submission actions
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },

    // Reset actions
    resetBookingNow: (state) => {
      state.picName = '';
      state.adultQty = 0;
      state.childQty = 0;
      state.infQty = 0;
      state.totalPax = 0;
      state.travelers = [];
      state.validationError = '';
      state.isSubmitting = false;
      state.applicableRate = null;
      state.totalPrice = 0;
    },

    resetTravelers: (state) => {
      state.travelers = [];
      updateTravelersArray(state, '');
    },

    resetQuantities: (state) => {
      state.adultQty = 0;
      state.childQty = 0;
      state.infQty = 0;
      state.totalPax = 0;
      state.travelers = [];
      state.applicableRate = null;
      state.totalPrice = 0;
      state.validationError = '';
    },
  },
});

export const {
  // PIC actions
  setPicName,
  
  // Quantity actions
  setAdultQty,
  setChildQty,
  setInfQty,
  incrementAdult,
  decrementAdult,
  incrementChild,
  decrementChild,
  incrementInf,
  decrementInf,
  
  // Traveler actions
  updateTraveler,
  
  // Validation actions
  validateAndSetRate,
  setValidationError,
  clearValidationError,
  
  // Price actions
  setApplicableRate,
  updateTotalPrice,
  
  // Form actions
  setSubmitting,
  
  // Reset actions
  resetBookingNow,
  resetTravelers,
  resetQuantities,
} = bookingNowSlice.actions;

export default bookingNowSlice.reducer;