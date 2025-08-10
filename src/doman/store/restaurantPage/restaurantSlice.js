import { createSlice } from '@reduxjs/toolkit';

export const restaurantSlice = createSlice({
   name: 'restaurant',
   initialState: {
      isRequest: false,
      messageError: null,
      isLoading: false,
      restaurants: [],
      selectedRestaurant: {},
   },

   reducers: {
      loaddingRestaurants: (state) => {
         state.isLoading = true;
         state.isRequest = false;
         state.messageError = null;
      },

      messageErrorRestauranAction: (state, { payload }) => {
         state.messageError = payload;
         state.isLoading = false;
         state.isRequest = false;
      },

      setLoadRestaurantsAction: (state, { payload }) => {
         state.restaurants = payload;
         state.isLoading = false;
         state.isRequest = true;
         state.messageError = null;
      },

      setSelectedRestaurantAction: (state, { payload }) => {
         if (!payload || !payload.id) return;
         state.selectedRestaurant = state.restaurants.find((r) => r.id === payload.id) || {};
      },

      updateRestaurantAction: (state, { payload }) => {
         if (!payload || !payload?.id) return;
         state.restaurants = state.restaurants.map(r => {
            if (r.id === payload.id) {
               return { ...r, ...payload }
            }
            return r
         });
      },

      removeRestaurantAction: (state, { payload }) => {
         if (!payload) return;
         state.restaurants = state.restaurants.filter(r => r.id !== payload);
      },

      addRestaurantAction: (state, { payload }) => {
         if (!payload) return;
         state.restaurants.push(payload);
      },
   },
});

export const {
   loaddingRestaurants,
   messageErrorRestauranAction,
   setLoadRestaurantsAction,
   setSelectedRestaurantAction,
   updateRestaurantAction,
   removeRestaurantAction,
   addRestaurantAction,
} = restaurantSlice.actions;