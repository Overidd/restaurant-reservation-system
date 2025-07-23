import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { calendarSlice, dashboardSlice, restaurantResourceSlice, restaurantSlice, restaurantUiSlice, stateFilterRestaurantSlice, usersSlice } from './dashboard';
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
      dashboardReducer: dashboardSlice.reducer,
      usersReducer: usersSlice.reducer,
      restaurantReducer: restaurantSlice.reducer,
      // tableAdminReducer: tableAdminSlice.reducer
   },
})