import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
   loadDataFiltersThunks,
} from '@/doman/store/dashboard';

export const useLoadFilterRestaurant = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loadDataFiltersThunks());
   }, []);


   return {
   }
}
