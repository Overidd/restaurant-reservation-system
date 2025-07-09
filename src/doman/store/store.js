import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { tableAdminSlice } from './dashboard';
import { reserveSlice } from './reserve';
import { reserveTimeSlice } from './reserve/reserveTimeSlice';
import { UISlice } from './UISlice';

export const store = configureStore({
   reducer: {
      authReducer: authSlice.reducer,
      reserveReducer: reserveSlice.reducer,
      reserveTimeReducer: reserveTimeSlice.reducer,
      UIReducer: UISlice.reducer,
      tableAdminReducer: tableAdminSlice.reducer
   },
})