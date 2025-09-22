import { configureStore } from '@reduxjs/toolkit';
import salesPipelineReducer from './features/sales-pipeline/salesPipelineSlice';
import productReducer from './features/product/productSlice';

export const store = configureStore({
  reducer: {
    salesPipeline: salesPipelineReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;