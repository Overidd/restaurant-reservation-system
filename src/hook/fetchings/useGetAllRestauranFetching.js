import { dasboardServiceProvider } from '@/doman/services';
import { useState } from 'react';

let cachedRestaurants = null;

export const useGetAllRestauranFetching = () => {
   const [state, setState] = useState({
      restaurants: [],
      isLoading: false,
      errorMessage: null
   })

   const loadRestaurants = async () => {
      if (cachedRestaurants) {
         setState(prev => ({
            ...prev,
            restaurants: cachedRestaurants,
            isLoading: false,
            errorMessage: null,
         }));
         return;
      }

      setState({
         restaurants: [],
         isLoading: true,
         errorMessage: null
      })

      const { ok, errorMessage, restaurants } = await dasboardServiceProvider.getRestaurantsActive();

      if (!ok) {
         setState({
            restaurants: [],
            isLoading: false,
            errorMessage: errorMessage
         })
         return;
      }

      setState({
         restaurants: restaurants || [],
         isLoading: false,
         errorMessage: null
      })

      cachedRestaurants = restaurants;
   }

   const getIdRestaurantByName = (name) => {
      const restaurant = state.restaurants.find(restaurant => restaurant.name === name);
      return restaurant ? restaurant.id : null;
   }

   const getRestaurantById = (id) => {
      if (!id) return null;
      const restaurant = state.restaurants.find(restaurant => restaurant.id === id);
      return restaurant ? restaurant : null;
   }

   const isLoadRestaurants = state.restaurants.length > 0;

   return {
      // Valores
      restaurants: state.restaurants,
      errorMessage: state.errorMessage,
      isLoadRestaurants,

      // Funciones
      getIdRestaurantByName,
      getRestaurantById,
      loadRestaurants,
      isLoading: state.isLoading,
   }
}
