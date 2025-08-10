import { loadTablesAndObjectsThunks, setLastParams } from '@/doman/store/mapPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadMapResource = ({
   lastParams,
   restaurant,
   dateStr,
   hour
}) => {
   const state = useSelector((state) => state.mapResource)
   const dispatch = useDispatch();

   useEffect(() => {
      const idRestaurant = restaurant?.id;
      if (!idRestaurant || !dateStr || !hour) return;

      const alreadyLoaded =
         lastParams?.restaurantId === idRestaurant &&
         lastParams?.dateStr === dateStr &&
         lastParams?.hour === hour;

      if (alreadyLoaded) return;

      dispatch(loadTablesAndObjectsThunks({
         idRestaurant: idRestaurant,
         dateStr: dateStr,
         hour: hour
      }));

      dispatch(setLastParams({
         restaurantId: idRestaurant,
         dateStr,
         hour
      }));

      // dispatch(listenModifyTablesThunks({
      //    idRestaurant: idRestaurant,
      //    dateStr: dateStr,
      //    hour: hour
      // }));
   }, [restaurant.id, hour, dateStr]);

   return {
      isLoading: state.loading,
      tables: state.tables,
      objects: state.objects
   }
}
