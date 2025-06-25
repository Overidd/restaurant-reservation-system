import { configureStore } from '@reduxjs/toolkit';
import { reserveSlice } from './reserve';
import { reserveTimeSlice } from './reserve/reserveTimeSlice';

export const store = configureStore({
   reducer: {
      reserveReducer: reserveSlice.reducer,
      reserveTimeReducer: reserveTimeSlice.reducer
   },
})