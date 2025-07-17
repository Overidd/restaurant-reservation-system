import { useDispatch, useSelector } from 'react-redux';

import {
   setChangeFilterAction
} from '@/doman/store/dashboard';

export const useStateFilterRestaurant = () => {
   const state = useSelector((state) => state.stateFilterRestaurantReducer)
   const dispatch = useDispatch();

   const changeValueFilter = (data) => {
      if (!data?.name || !data?.value) return;
      dispatch(setChangeFilterAction(data));
   }

   return {
      // State
      restaurants: state.restaurants,
      hours: state.hours,
      filter: {
         hour: state.filter.hour,
         dateStr: state.filter.dateStr,
         restaurant: state.filter.restaurant
      },

      // Funcion Actions
      changeValueFilter
   }
}
