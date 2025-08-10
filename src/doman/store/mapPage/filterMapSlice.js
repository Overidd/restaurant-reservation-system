import { createSlice } from '@reduxjs/toolkit';

/**
 * Maneja datos estaticos para el filtro
 * Datos del filtro
 */

export const filterMapSlice = createSlice({
   name: 'filterMap',
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
         state.filter.hour = state.filter.restaurant.hours[0].name || {};
         state.hours = state.filter.restaurant.hours;
         state.messageError = null;
      },

      setHoursAction: (state, { payload }) => {
         state.hours = payload;
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
            state.filter.hour = state.filter.restaurant.hours[0].name || {};
            state.hours = state.filter.restaurant.hours;
            return;
         }

         if (payload.name === 'hour') {
            state.hours.forEach((hour) => {
               if (hour.name === payload.value) {
                  state.filter.hour = payload.value || '';
                  return;
               }
            });
         }

         if (payload.name === 'dateStr') {
            state.filter.dateStr = payload.value;
            return;
         }
      }
   },
});

export const {
   messageErrorAction: messageErrorActionFilter,
   setRestaurantsAction,
   updateDimensionRestaurantAction,
   setHoursAction,
   setChangeFilterAction,
   setLastParams
} = filterMapSlice.actions;