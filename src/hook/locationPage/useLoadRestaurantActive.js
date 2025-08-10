import { dasboardServiceProvider } from '@/doman/services';
import { useEffect, useState } from 'react';

let cachedRestaurants = []

export const useLoadRestaurantActive = () => {
   const [state, setState] = useState({
      restaurants: [],
      isLoading: false
   })

   useEffect(() => {
      loadRestaurants()
   }, [])

   const loadRestaurants = async () => {

      if (cachedRestaurants.length > 0) {
         setState(prev => ({
            ...prev,
            restaurants: cachedRestaurants,
            isLoading: false
         }))
         return;
      }

      setState({
         restaurants: [],
         isLoading: true
      })

      const { ok, restaurants } = await dasboardServiceProvider.getRestaurantsActive();

      if (!ok) {
         setState({
            restaurants: [],
            isLoading: false
         })
         return;
      }

      cachedRestaurants = restaurants;
      setState({
         restaurants: restaurants || [],
         isLoading: false
      })
   }


   return {
      restaurants: state.restaurants,
      isLoading: state.isLoading,
   }
}
