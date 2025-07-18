import {
   changeValueTempRestaurantAction,
   setTempRestaurantAction
} from '@/doman/store/dashboard';
import { useDispatch, useSelector } from 'react-redux';

export const useTempRestaurant = () => {
   const tempRestaurant = useSelector((state) => state.restaurantUiReducer.tempRestaurant)
   const dispatch = useDispatch();

   const setTempRestaurant = (restaurant) => {
      dispatch(setTempRestaurantAction(restaurant))
   }

   const changeValueTempRestaurant = (data) => {
      if (!data?.name || !data?.value) return;
      dispatch(changeValueTempRestaurantAction(data));
   }

   return {
      tempRestaurant,
      setTempRestaurant,
      changeValueTempRestaurant
   }
}