import { configureStore } from '@reduxjs/toolkit';
import { reserveSlice } from './reserve';
import { reserveTimeSlice } from './reserve/reserveTimeSlice';
import { UISlice } from './UISlice';

export const store = configureStore({
   reducer: {
      reserveReducer: reserveSlice.reducer,
      reserveTimeReducer: reserveTimeSlice.reducer,
      UIReducer: UISlice.reducer
   },
})