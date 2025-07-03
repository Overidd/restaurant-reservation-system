import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteTableThunks,
   loadHoursThunks,
   loadRestaurantsThunks,
   loadTablesThunks,
   setCurrentValuesAction,
   setCurrentSelectedTableAction,
   toggleIsTempTableChangeAction,
} from '@/doman/store/dashboard';

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
      dispatch(setCurrentValuesAction({ ...data }));
   }

   const setCurrentSelectedTable = (tableId) => {
      dispatch(setCurrentSelectedTableAction(tableId));
   }

   const toggleIsTempTable = (is) => {
      dispatch(toggleIsTempTableChangeAction(is));
   };

   const deleteTable = (idTable) => {
      dispatch(deleteTableThunks(idTable));
   };

   const changeCurrentTable = ({ name, value }) => {
      if (!value || !name) return;
      console.log({ name, value });

      dispatch(setCurrentSelectedTableAction({
         ...state.currentSelectedTable,
         [name]: value
      }));
   }

   const tables = useMemo(() => {
      if (state.isTempTableChange) {
         const tablesTemp = state.tables.filter((table) => table.id !== state.currentSelectedTable.id);

         tablesTemp.push(state.currentSelectedTable);
         return tablesTemp;
      };

      return state.tables
   }, [state.tables, state.currentSelectedTable, state.isTempTableChange]);


   return {
      state,
      tables: tables,
      loading: state.loading,
      hours: state.hours,
      restaurants: state.restaurants,
      currentRestaurant: state.currentValue.restaurant,
      currentHour: state.currentValue.hour,
      currentDate: state.currentValue.date,
      currentSelectedTable: state.currentSelectedTable,
      changeCurrentTable,

      // Funcion actions
      loadTables,
      setCurrentValue,
      deleteTable,
      setCurrentSelectedTable,
      toggleIsTempTable
   }
}
