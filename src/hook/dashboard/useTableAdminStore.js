import { useEffect, useMemo, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
   cancelATablesReservationThunks,
   cancelFullReservationThunks,
   confirmReservationThunks,
   deleteTableThunks,
   listenModifyTablesThunks,
   loadHoursThunks,
   loadRestaurantsThunks,
   loadTablesThunks,
   releasedReservationThunks,
   reserveTableThunks,
   setCurrentSelectedTableAction,
   setCurrentValuesAction,
   setSelectedCreateObjAction,
   toggleIsTempTableChangeAction,
   updateCurrentSelectedTableAction,
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

   const setCurrentSelectCreateObj = (data) => {
      dispatch(setSelectedCreateObjAction(data));
   }

   const toggleIsTempTable = (is) => {
      dispatch(toggleIsTempTableChangeAction(is));
   };

   const deleteTable = (idTable) => {
      dispatch(deleteTableThunks(idTable));
   };

   const cancelFullReservation = async (data) => {
      return dispatch(cancelFullReservationThunks(data));
   }

   const cancelATablesReservation = async (data) => {
      return dispatch(cancelATablesReservationThunks(data));
   }

   const confirmReservation = async (data) => {
      return dispatch(confirmReservationThunks(data));
   }
   const releasedReservation = async (data) => {
      return dispatch(releasedReservationThunks(data));
   }

   const changeCurrentTable = ({ name, value }) => {
      if (!value || !name) return;
      dispatch(updateCurrentSelectedTableAction({ name, value }));
   };

   const reserveTable = async (data) => {
      return dispatch(reserveTableThunks(data));
   }


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
      currentSelectedCreateObj: state.currentSelectedCreateObj,
      changeCurrentTable,

      // Funcion actions
      loadTables,
      setCurrentValue,
      deleteTable,
      cancelFullReservation,
      cancelATablesReservation,
      setCurrentSelectedTable,
      setCurrentSelectCreateObj,
      toggleIsTempTable,
      confirmReservation,
      releasedReservation,
      reserveTable,
   }
}
