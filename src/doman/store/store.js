import { configureStore } from '@reduxjs/toolkit';
import { reserveSlice } from './reserve';
import { reserveTimeSlice } from './reserve/reserveTimeSlice';
import { UISlice } from './UISlice';
import { authSlice } from './auth';

export const store = configureStore({
   reducer: {
      authReducer: authSlice.reducer,
      reserveReducer: reserveSlice.reducer,
      reserveTimeReducer: reserveTimeSlice.reducer,
      UIReducer: UISlice.reducer
   },
})