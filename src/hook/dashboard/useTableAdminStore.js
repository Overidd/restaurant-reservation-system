import { loadHoursThunks, loadRestaurantsThunks, loadTablesThunks, setCurrentValuesAction } from '@/doman/store/dashboard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useTableAdminStore = () => {
   const state = useSelector((state) => state.tableAdminReducer)
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loadRestaurantsThunks());
      dispatch(loadHoursThunks());
   }, [dispatch]);

   useEffect(() => {
      if (
         state.restaurants.length > 0 &&
         state.hours.length > 0
      ) {
         const idRestaurant = state.currentValue.restaurant.id;
         const dateStr = state.currentValue.date;
         const hour = state.currentValue.hour.hour;

         if (idRestaurant && dateStr && hour) {
            dispatch(loadTablesThunks({
               idRestaurant,
               dateStr,
               hour
            }));
         }
      }
   }, [state.restaurants, state.hours]);

   /**
    * @param {{ idRestaurant: string, dateStr: string, hour: string }} data 
    */
   const loadTables = (data) => {
      if (!data.value) return;
      const idRestaurant = state.restaurants.find((r) => r.name === data.value)?.id;

      dispatch(loadTablesThunks({
         idRestaurant: idRestaurant || state.currentValue.restaurant.id,
         dateStr: data?.dateStr || state.currentValue.date,
         hour: data?.hour || state.currentValue.hour.hour
      }));
   };

   const setCurrentValue = (data) => {
      dispatch(setCurrentValuesAction({...data}));
   }

   return {
      loadTables,
      setCurrentValue,
      state,
      tables: state.tables,
      hours: state.hours,
      restaurants: state.restaurants,
      currentRestaurant: state.currentValue.restaurant,
      currentHour: state.currentValue.hour,
      currentDate: state.currentValue.date,
   }
}