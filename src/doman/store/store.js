import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { reservationSlice } from './reservation';
import { UISlice } from './UISlice';
import { calendarSlice } from './calendarPage';
import { dashboardSlice } from './dashboardPage';
import { usersSlice } from './userDetailsPage';
import { restaurantSlice } from './restaurantPage';
import { filterMapSlice, mapResourceSlice, mapUiSlice } from './mapPage';

export const store = configureStore({
   reducer: {
      authReducer: authSlice.reducer,
      reserveReducer: reservationSlice.reducer,
      UIReducer: UISlice.reducer,
      mapUiReducer: mapUiSlice.reducer,
      filterMapReducer: filterMapSlice.reducer,
      mapResource: mapResourceSlice.reducer,
      calendarReducer: calendarSlice.reducer,
      dashboardReducer: dashboardSlice.reducer,
      usersReducer: usersSlice.reducer,
      restaurantReducer: restaurantSlice.reducer,
   },
})