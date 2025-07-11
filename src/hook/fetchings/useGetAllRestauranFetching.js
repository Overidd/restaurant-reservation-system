import { dasboardServiceProvider } from '@/doman/services';
import { useEffect, useState } from 'react';

let cachedRestaurants = null;

export const useGetAllRestauranFetching = () => {
   const [state, setState] = useState({
      restaurants: [],
      isLoading: false,
      errorMessage: null
   })

   useEffect(() => {
      const fechReservations = async () => {
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

         const { ok, errorMessage, restaurants } = await dasboardServiceProvider.getRestaurants();

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

      fechReservations();
   }, [])

   const getIdRestaurantByName = (name) => {
      const restaurant = state.restaurants.find(restaurant => restaurant.name === name);
      return restaurant ? restaurant.id : null;
   }
   
   const isLoadRestaurants =  state.restaurants.length > 0;

   return {
      // Valores
      restaurants: state.restaurants,
      errorMessage: state.errorMessage,
      isLoadRestaurants,
      
      // Funciones
      getIdRestaurantByName,
      isLoading: state.isLoading,
   }
}
