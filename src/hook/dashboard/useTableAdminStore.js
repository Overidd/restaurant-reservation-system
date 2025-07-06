import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteTableThunks,
   loadHoursThunks,
   loadRestaurantsThunks,
   loadTablesThunks,
   setCurrentValuesAction,
   setCurrentSelectedTableAction,
   toggleIsTempTableChangeAction,
   updateCurrentSelectedTableAction,
   listenModifyTablesThunks,
   cancelReserveTableThunks,
   cancelReservationTablesThunks,
} from '@/doman/store/dashboard';

export const useTableAdminStore = () => {
   const state = useSelector((state) => state.tableAdminReducer)
   const dispatch = useDispatch();
   const isLoadTablesFirst = useRef(false);

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
         const dateStr = state.currentValue.dateStr;
         const hour = state.currentValue.hour.hour;

         if (isLoadTablesFirst.current) return;
         if (idRestaurant && dateStr && hour) {

            isLoadTablesFirst.current = true;
            console.log('Solo debe llamarse una ')
            dispatch(loadTablesThunks({
               idRestaurant,
               dateStr,
               hour
            }));
            dispatch(listenModifyTablesThunks({
               idRestaurant: idRestaurant,
               dateStr: dateStr,
               hour: hour,
            }));
         }
      }
   }, [state.restaurants, state.hours]);

   /**
    * @param {{ idRestaurant: string, dateStr: string, hour: string }} data 
    */
   const loadTables = (data) => {
      if (!data.value) return;
      const dataObj = { [data.name]: data.value };

      const idRestaurant = state.restaurants.find((r) => r.name === dataObj.value)?.id;

      dispatch(loadTablesThunks({
         idRestaurant: idRestaurant || state.currentValue.restaurant.id,
         dateStr: dataObj?.dateStr || state.currentValue.dateStr,
         hour: dataObj?.hour || state.currentValue.hour.hour
      }));
      dispatch(listenModifyTablesThunks({
         idRestaurant: idRestaurant || state.currentValue.restaurant.id,
         dateStr: dataObj?.dateStr || state.currentValue.dateStr,
         hour: dataObj?.hour || state.currentValue.hour.hour
      }));
   };

   const setCurrentValue = (data) => {
      dispatch(setCurrentValuesAction({ ...data }));
   }

   const setCurrentSelectedTable = (table) => {
      dispatch(setCurrentSelectedTableAction(table));
   }

   const toggleIsTempTable = (is) => {
      dispatch(toggleIsTempTableChangeAction(is));
   };

   const deleteTable = (idTable) => {
      dispatch(deleteTableThunks(idTable));
   };

   const cancelReserveTable = (data) => {
      dispatch(cancelReserveTableThunks(data));
   }

   const cancelReservationTables = (data) => {
      dispatch(cancelReservationTablesThunks(data));
   }

   const changeCurrentTable = ({ name, value }) => {
      if (!value || !name) return;
      dispatch(updateCurrentSelectedTableAction({ name, value }));
   };

   const tables = useMemo(() => {
      if (state.isTempTableChange) {
         return state.tables.map((table) => table.id === state.currentSelectedTable.id ? { ...state.currentSelectedTable } : table);
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
      currentDate: state.currentValue.dateStr,
      currentSelectedTable: state.currentSelectedTable,
      changeCurrentTable,

      // Funcion actions
      loadTables,
      setCurrentValue,
      deleteTable,
      cancelReserveTable,
      cancelReservationTables,
      setCurrentSelectedTable,
      toggleIsTempTable
   }
}
