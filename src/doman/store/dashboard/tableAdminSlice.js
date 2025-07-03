import { createSlice } from '@reduxjs/toolkit';

export const tableAdminSlice = createSlice({
   name: 'tableAdmin',
   initialState: {
      messageError: null,
      isLoading: false,
      restaurants: [],
      hours: [],
      tables: [],

      currentValue: {
         hour: '',
         date: new Date().toISOString().split('T')[0],
         restaurant: {}
      }
   },

   reducers: {
      setRestaurantsAction: (state, { payload }) => {
         state.restaurants = payload;
         state.currentValue.restaurant = payload[0] || {};
      },

      setHoursAction: (state, { payload }) => {
         state.hours = payload;
         state.currentValue.hour = payload[0] || {};
      },

      setTablesAction: (state, { payload }) => {
         state.messageError = null
         state.isLoading = false
         state.tables = payload;
      },

      setCurrentValuesAction: (state, { payload }) => {
         if (payload.name === 'restaurant') {
            const data = state.restaurants.find((r) => r.name === payload.value);
            state.currentValue.restaurant = data || {};
            return;
         }
         
         console.log(payload)
         state.currentValue[payload.name] = payload.value;
      },

      loaddingAction: (state) => {
         state.isLoading = true
      },

      messageErrorAction: (state, { payload }) => {
         state.messageError = payload
         state.isLoading = false
      }
   },
});


export const {
   loaddingAction,
   messageErrorAction,
   setCurrentRestaurantAction,
   setRestaurantsAction,
   setCurrentValuesAction,
   setHoursAction,
   setTablesAction,
} = tableAdminSlice.actions