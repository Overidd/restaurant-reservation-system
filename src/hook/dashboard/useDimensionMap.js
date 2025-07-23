import { dasboardServiceProvider } from '@/doman/services';
import {
   changeValueTempRestaurantAction,
   setTempRestaurantAction,
   updateDimensionRestaurantAction
} from '@/doman/store/dashboard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const useDimensionMap = () => {
   const dispatch = useDispatch();
   const [isLodding, setIsLodding] = useState(false)

   const setTempRestaurant = (restaurant) => {
      dispatch(setTempRestaurantAction(restaurant))
   }

   const changeValueDimension = (data) => {
      if (!data?.name || !data?.value) return;
      dispatch(changeValueTempRestaurantAction(data));
   }

   const updateDimension = async (data) => {
      if (!data) return;
      setIsLodding(true)
      const { ok, errorMessage } = await dasboardServiceProvider.updateDimensionMap(data);

      if (!ok) {
         setIsLodding(false)
         throw new errorMessage;
      }

      dispatch(updateDimensionRestaurantAction(data))
      setIsLodding(false)
   }

   return {
      setTempRestaurant,
      changeValueDimension,
      updateDimension,
      isLoddingUpdate: isLodding,
   }
}