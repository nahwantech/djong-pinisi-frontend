import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define traveler type
export interface Traveler {
  travelerName: string;
  passportNo: string;
  email: string;
  dateOfBirth: string;
  citizen: string;
  ktpNo: string;
}

// Define form data type
export interface FormData {
  travelerName: string;
  passportNo: string;
  email: string;
  dateOfBirth: string;
  citizen: string;
  ktpNo: string;
}

// Define booking state
interface BookingState {
  adultQty: number;
  childQty: number;
  infQty: number;
  totalForm: number;
  travelers: Traveler[];
  formData: FormData;
}

// Initial state
const initialState: BookingState = {
  adultQty: 0,
  childQty: 0,
  infQty: 0,
  totalForm: 0,
  travelers: [],
  formData: {
    travelerName: '',
    passportNo: '',
    email: '',
    dateOfBirth: '',
    citizen: '',
    ktpNo: '',
  },
};

// Helper function to update travelers array based on totalForm
const updateTravelersArray = (state: BookingState) => {
  const currentLength = state.travelers.length;
  const targetLength = state.totalForm;

  if (targetLength > currentLength) {
    // Add new travelers
    const newTravelers = Array.from({ length: targetLength - currentLength }, () => ({
      travelerName: '',
      passportNo: '',
      email: '',
      dateOfBirth: '',
      citizen: '',
      ktpNo: '',
    }));
    state.travelers = [...state.travelers, ...newTravelers];
  } else if (targetLength < currentLength) {
    // Remove travelers
    state.travelers = state.travelers.slice(0, targetLength);
  }
};

const bookingListSlice = createSlice({
  name: 'booking-list',
  initialState,
  reducers: {
    // Quantity management actions
    incrementAdult: (state) => {
      if (state.adultQty < 99999) {
        state.adultQty += 1;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },
    decrementAdult: (state) => {
      if (state.adultQty > 0) {
        state.adultQty -= 1;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },
    setAdultQty: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      if (value >= 0 && value <= 99999) {
        state.adultQty = value;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },

    incrementChild: (state) => {
      if (state.childQty < 99999) {
        state.childQty += 1;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },
    decrementChild: (state) => {
      if (state.childQty > 0) {
        state.childQty -= 1;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },
    setChildQty: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      if (value >= 0 && value <= 99999) {
        state.childQty = value;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },

    incrementInf: (state) => {
      if (state.infQty < 99999) {
        state.infQty += 1;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },
    decrementInf: (state) => {
      if (state.infQty > 0) {
        state.infQty -= 1;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },
    setInfQty: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      if (value >= 0 && value <= 99999) {
        state.infQty = value;
        state.totalForm = state.adultQty + state.childQty + state.infQty;
        updateTravelersArray(state);
      }
    },

    // Traveler management actions
    updateTraveler: (state, action: PayloadAction<{ index: number; field: keyof Traveler; value: any }>) => {
      const { index, field, value } = action.payload;
      if (index >= 0 && index < state.travelers.length) {
        state.travelers[index][field] = value;
      }
    },

    updateTravelerData: (state, action: PayloadAction<{ index: number; field: keyof Traveler; value: any }>) => {
      const { index, field, value } = action.payload;
      if (index >= 0 && index < state.travelers.length) {
        state.travelers[index][field] = value;
      }
    },

    // Form data management
    updateFormData: (state, action: PayloadAction<{ field: keyof FormData; value: any }>) => {
      const { field, value } = action.payload;
      (state.formData as any)[field] = value;
    },

    resetFormData: (state) => {
      state.formData = {
        travelerName: '',
        passportNo: '',
        email: '',
        dateOfBirth: '',
        citizen: '',
        ktpNo: '',
      };
    },

    // Reset all booking data
    resetBooking: (state) => {
      state.adultQty = 0;
      state.childQty = 0;
      state.infQty = 0;
      state.totalForm = 0;
      state.travelers = [];
      state.formData = {
        travelerName: '',
        passportNo: '',
        email: '',
        dateOfBirth: '',
        citizen: '',
        ktpNo: '',
      };
    },
  },
});

export const {
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
  updateTravelerData,
  updateFormData,
  resetFormData,
  resetBooking,
} = bookingListSlice.actions;

export default bookingListSlice.reducer;