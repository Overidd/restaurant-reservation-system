import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
   loadHoursThunks,
   loadRestaurantsThunks,
} from '@/doman/store/dashboard';

export const useLoadFilterRestaurant = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loadRestaurantsThunks());
      dispatch(loadHoursThunks());
   }, []);

   return {
   }
}
