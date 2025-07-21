import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
   loadDataFiltersThunks,
} from '@/doman/store/dashboard';

export const useLoadFilterRestaurant = () => {
   const state = useSelector((state) => state.stateFilterRestaurantReducer)

   const dispatch = useDispatch();

   useEffect(() => {
      if (
         state.lastParams?.restaurantId &&
         state.lastParams?.dateStr &&
         state.lastParams?.hour
      ) {
         return;
      };
      dispatch(loadDataFiltersThunks());
   }, []);


   return {
   }
}
