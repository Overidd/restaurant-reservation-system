import { useDispatch, useSelector } from 'react-redux';

import {
   setChangeFilterAction
} from '@/doman/store/dashboard';
import { useRef } from 'react';

export const useStateFilterRestaurant = () => {
   const state = useSelector((state) => state.stateFilterRestaurantReducer)
   const dispatch = useDispatch();
   const changeFilterRef = useRef(false)

   const changeValueFilter = (data) => {
      if (!data?.name || !data?.value) return;
      dispatch(setChangeFilterAction(data));
   }

   return {
      // State
      isInitialChangeFilter: changeFilterRef.current,
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
