import { useDispatch, useSelector } from 'react-redux';

import {
   reserveToggleTableAction,
   reserveSelectTableAction,
   reserveResetAction,
   reserveSetInfoAction,
   reserveSetDateAction,
   reserveSetHourAction,
   startGetAvailableHours,
   startGetTables,
   reserveChangeStateAction,
   typeStatus,
   startReserveTable,
   reserveResetStateTablesAction,
} from '@/doman/store/reserve';

export const useReserve = () => {
   const dispatch = useDispatch();

   const {
      currentSelectedTable,
      selectedTables,
      errorMessage,
      isLoading,
      from,
      tables,
      restaurant,
      availableHours,
   } = useSelector((state) => state.reserveReducer);

   // Metodos de consulta api
   const serviceGetAvailableHours = (date) => {
      dispatch(startGetAvailableHours(date));
   };

   const serviceGetTables = () => {
      dispatch(startGetTables());
   };

   // Metodos de acciones del usuario
   const reserveSetInfo = (data) => {
      dispatch(reserveSetInfoAction(data));
   }

   /**
    * 
    * @param {Date} date 
    */
   const reserveSetDate = (date) => {
      if (date instanceof Date) date = date.toISOString().split('T')[0];
      dispatch(reserveSetDateAction(date));
      serviceGetAvailableHours(date);
   }

   const reserveSetHour = (data) => {
      dispatch(reserveSetHourAction(data));
      serviceGetTables();
   }

   const reserveToggleTable = (table) => {
      dispatch(reserveToggleTableAction(table));
   };

   const reserveSelectTable = (table) => {
      dispatch(reserveSelectTableAction(table));
      dispatch(reserveToggleTableAction(table));
   };

   const reserveReset = () => {
      dispatch(reserveResetAction());
   };

   const reserveResetStateTables = () => {
      dispatch(reserveResetStateTablesAction());
   }

   const reservePending = () => {
      dispatch(reserveChangeStateAction(typeStatus.PENDING));
   }

   const reserveConfirm = () => {
      dispatch(startReserveTable());
   }

   const getCurrentSelectedTable = () => {
      return currentSelectedTable ?? {}
   }

   const existSelectedTable = () => {
      return selectedTables.length > 0;
   }


   return {
      // Estado
      selectedTables,
      currentSelectedTable,
      errorMessage,
      isLoading,
      from,
      tables,
      restaurant,
      availableHours,

      // Metodos de consulta api
      serviceGetAvailableHours,
      serviceGetTables,

      // Acciones
      reserveSetInfo,
      reserveSetDate,
      reserveSetHour,
      reserveToggleTable,
      reserveSelectTable,
      reserveReset,
      getCurrentSelectedTable,
      existSelectedTable,
      reserveConfirm,
      reservePending,
      reserveResetStateTables,
   };
};