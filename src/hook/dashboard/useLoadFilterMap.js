import { loadDataFiltersThunks } from '@/doman/store/mapPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const useLoadFilterMap = () => {
   const state = useSelector((state) => state.filterMapReducer)

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
