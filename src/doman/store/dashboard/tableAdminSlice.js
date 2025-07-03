import { createSlice } from '@reduxjs/toolkit';

export const typeLoading = {
   TIME: 'time',
   TABLES: 'tables',
   SELECTEDTABLES: 'selectedTables',
   RESERVE: 'reserve'
}

export const tableAdminSlice = createSlice({
   name: 'tableAdmin',
   initialState: {
      messageError: null,
      restaurants: [],
      hours: [],
      tables: [],

      currentValue: {
         hour: '',
         date: new Date().toISOString().split('T')[0],
         restaurant: {}
      },

      loading: {
         time: false,
         tables: false
      },

      currentSelectedTable: {},
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
         state.loading.tables = false
         state.tables = payload;
      },

      setCurrentValuesAction: (state, { payload }) => {
         if (payload.name === 'restaurant') {
            const data = state.restaurants.find((r) => r.name === payload.value);
            state.currentValue.restaurant = data || {};
            return;
         }

         if (payload.name === 'hour') {
            const data = state.hours.find((h) => h.hour === payload.value);
            state.currentValue.hour = data || {};
            return;
         }

         if (payload.name === 'date') {
            state.currentValue.date = payload.value;
            return;
         }
      },

      setCurrentSelectedTableAction: (state, { payload }) => {
         state.currentSelectedTable = payload;
      },

      deleteTableAction: (state, { payload }) => {
         state.tables = state.tables.filter((t) => t.id !== payload);
      },

      loaddingAction: (state, { payload }) => {
         state.loading[payload] = true
      },

      messageErrorAction: (state, { payload }) => {
         state.messageError = payload
         state.loading.tables = false
         state.loading.time = false
      }
   },
});


export const {
   loaddingAction,
   messageErrorAction,
   setCurrentSelectedTableAction,
   setCurrentRestaurantAction,
   setCurrentValuesAction,
   setRestaurantsAction,
   setHoursAction,
   setTablesAction,
   deleteTableAction,
} = tableAdminSlice.actions