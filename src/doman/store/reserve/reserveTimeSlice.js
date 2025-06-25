import { createSlice } from '@reduxjs/toolkit';

export const reserveTimeSlice = createSlice({
   name: 'reserveTime',
   initialState: {
      minutes: 5,
      seconds: 0,
   },
   reducers: {
      reserveDecrementTimeAction: (state) => {
         if (state.seconds > 0) {
            state.seconds -= 1;
         } else if (state.minutes > 0) {
            state.minutes -= 1;
            state.seconds = 59;
         }
      },
      reserveResetTimeAction: (state) => {
         state.minutes = 5;
         state.seconds = 0;
      },
   },
});

export const {
   reserveDecrementTimeAction,
   reserveResetTimeAction
} = reserveTimeSlice.actions;