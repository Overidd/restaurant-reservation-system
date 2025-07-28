import { useDispatch, useSelector } from 'react-redux';

import {
   setChangeFilterAction
} from '@/doman/store/dashboard';
import { useMemo, useRef } from 'react';

export const useStateFilterRestaurant = ({
   tempRestaurant = {},
   isEdit = false,
} = {}) => {

   const state = useSelector((state) => state.stateFilterRestaurantReducer)
   const dispatch = useDispatch();
   const changeFilterRef = useRef(false)

   const changeValueFilter = (data) => {
      if (!data?.name || !data?.value) return;
      dispatch(setChangeFilterAction(data));
   }

   const restaurant = useMemo(() => {
      if (isEdit) return { ...state.filter.restaurant, ...tempRestaurant };
      return state.filter.restaurant;
   }, [state.filter.restaurant, isEdit, tempRestaurant]);

   return {
      // State
      lastParams: state.lastParams,
      isInitialChangeFilter: changeFilterRef.current,
      restaurants: state.restaurants,
      hours: state.hours,
      filter: {
         hour: state.filter.hour,
         dateStr: state.filter.dateStr,
         restaurant: restaurant
      },

      // Funcion Actions
      changeValueFilter
   }
}