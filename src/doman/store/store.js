import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { calendarSlice, restaurantResourceSlice, restaurantUiSlice, stateFilterRestaurantSlice } from './dashboard';
import { reserveSlice } from './reserve';
import { reserveTimeSlice } from './reserve/reserveTimeSlice';
import { UISlice } from './UISlice';

export const store = configureStore({
   reducer: {
      authReducer: authSlice.reducer,
      reserveReducer: reserveSlice.reducer,
      reserveTimeReducer: reserveTimeSlice.reducer,
      UIReducer: UISlice.reducer,
      restaurantUiReducer: restaurantUiSlice.reducer,
      stateFilterRestaurantReducer: stateFilterRestaurantSlice.reducer,
      restaurantResourceReducer: restaurantResourceSlice.reducer,
      calendarReducer: calendarSlice.reducer,
      // tableAdminReducer: tableAdminSlice.reducer
   },
})