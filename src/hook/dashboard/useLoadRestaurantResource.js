import { loadTablesAndObjectsThunks } from '@/doman/store/dashboard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadRestaurantResource = ({
   restaurants,
   hours,
   restaurant,
   dateStr,
   hour
}) => {
   const state = useSelector((state) => state.restaurantResourceReducer)
   const dispatch = useDispatch();

   useEffect(() => {
      const idRestaurant = restaurant.id;

      dispatch(loadTablesAndObjectsThunks({
         idRestaurant: idRestaurant,
         dateStr: dateStr,
         hour: hour
      }));

      // dispatch(listenModifyTablesThunks({
      //    idRestaurant: idRestaurant,
      //    dateStr: dateStr,
      //    hour: hour
      // }));

   }, [restaurant.id, hour, dateStr, restaurants, hours]);

   return {
      isLoading: state.loading,
      tables: state.tables,
      objects: state.objects
   }
}
