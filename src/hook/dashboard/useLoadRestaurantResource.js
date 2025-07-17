import { loadTablesAndObjectsThunks } from '@/doman/store/dashboard';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStateFilterRestaurant } from './useStateFilterRestaurant';

export const useLoadRestaurantResource = () => {
   const state = useSelector((state) => state.restaurantResourceReducer)
   const dispatch = useDispatch();
   const isLoadTablesFirst = useRef(false);

   const {
      hours,
      restaurants,
      filter: { restaurant, hour, dateStr },
   } = useStateFilterRestaurant();

   useEffect(() => {
      if (
         restaurants.length > 0 &&
         hours.length > 0
      ) {
         const idRestaurant = restaurant.id;

         if (isLoadTablesFirst.current) return;
         if (idRestaurant && dateStr && hour) {
            isLoadTablesFirst.current = true;
            console.warn('Solo debe llamarse una VEZ')

            dispatch(loadTablesAndObjectsThunks({
               idRestaurant,
               dateStr,
               hour
            }));

            // dispatch(listenModifyTablesThunks({
            //    idRestaurant: idRestaurant,
            //    dateStr: dateStr,
            //    hour: hour,
            // }));
         }
      }
   }, [restaurants, hours]);

   // Cuando cambia el restaurante, se cargan las mesas y objectos del restaurante
   useEffect(() => {
      if (!isLoadTablesFirst.current) return;

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

   }, [restaurant, hour, dateStr]);

   return {
      isLoading: state.loading,
      tables: state.tables,
      objects: state.objects
   }
}
