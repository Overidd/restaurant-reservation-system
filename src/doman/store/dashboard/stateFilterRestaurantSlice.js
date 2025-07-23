import { createSlice } from '@reduxjs/toolkit';

/**
 * Maneja datos estaticos para el filtro
 * Datos del filtro
 */

export const stateFilterRestaurantSlice = createSlice({
   name: 'stateFilterRestaurant',
   initialState: {
      messageError: null,

      restaurants: [],

      hours: [],

      filter: {
         hour: '',
         dateStr: new Date().toISOString().split('T')[0],
         restaurant: {}
      },

      lastParams: {
         restaurantId: '',
         dateStr: '',
         hour: '',
      }
   },

   reducers: {
      setLastParams: (state, action) => {
         state.lastParams = action.payload;
      },

      messageErrorAction: (state, { payload }) => {
         state.messageError = payload
      },

      setRestaurantsAction: (state, { payload }) => {
         state.restaurants = payload;
         state.filter.restaurant = payload[0] || {};
         state.messageError = null;
      },

      setHoursAction: (state, { payload }) => {
         state.hours = payload;
         state.filter.hour = payload[0].hour || {};
         state.messageError = null;
      },

      updateDimensionRestaurantAction: (state, { payload }) => {
         if (!payload) return;
         state.filter.restaurant = {
            ...state.filter.restaurant,
            ...payload
         };
      },

      setChangeFilterAction: (state, { payload }) => {
         if (payload.name === 'restaurant') {
            const data = state.restaurants.find((r) => r.name === payload.value);
            state.filter.restaurant = data || {};
            return;
         }

         if (payload.name === 'hour') {
            const data = state.hours.find((h) => h.hour === payload.value);
            state.filter.hour = data.hour || {};
            return;
         }

         if (payload.name === 'dateStr') {
            state.filter.dateStr = payload.value;
            return;
         }
      },
   },
});

export const {
   messageErrorAction: messageErrorActionFilter,
   setRestaurantsAction,
   updateDimensionRestaurantAction,
   setHoursAction,
   setChangeFilterAction,
   setLastParams
} = stateFilterRestaurantSlice.actions;