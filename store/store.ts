import { configureStore } from '@reduxjs/toolkit';
import salesPipelineReducer from './features/sales-pipeline/salesPipelineSlice';
import productReducer from './features/product/productSlice';
import tourPackageReducer from './features/tour-package/tourPackageSlice';
import bookingReducer from './features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    salesPipeline: salesPipelineReducer,
    product: productReducer,
    tourPackage: tourPackageReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;