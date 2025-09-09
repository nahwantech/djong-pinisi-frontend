import { configureStore } from '@reduxjs/toolkit';
import salesPipelineReducer from './features/salesPipelineSlice';

export const store = configureStore({
  reducer: {
    salesPipeline: salesPipelineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;