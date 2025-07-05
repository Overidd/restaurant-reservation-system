import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalDateStr } from '@/ultils';

import {
   reserveToggleTableAction,
   reserveSelectTableAction,
   reserveResetAction,
   reserveSetInfoAction,
   reserveSetDateAction,
   reserveSetTimeAction,
   startGetAvailableHours,
   startGetTables,
   reserveChangeStateAction,
   typeStatus,
   startReserveTable,
   reserveResetStateTablesAction,
   reserveResetSelectedTablesAction,
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
      availableTime,
      stateReserve,
   } = useSelector((state) => state.reserveReducer);

   const isPending = useMemo(() => stateReserve === typeStatus.PENDING, [stateReserve]);

   const isTableExceeded = useMemo(() => selectedTables.length >= from.time.tablesAvailable, [selectedTables, from.time.tablesAvailable]);

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
      let dateStr = date
      if (date instanceof Date) {
         dateStr = getLocalDateStr(date);
      };
      serviceGetAvailableHours(dateStr);

      dispatch(reserveSetDateAction(dateStr));
   }

   const reserveSetTime = (data) => {
      dispatch(reserveSetTimeAction(data));
      serviceGetTables();
   }

   const reserveToggleTable = (table) => {
      dispatch(reserveToggleTableAction(table));
   };

   const reserveSelectTable = (table) => {
      if (isPending) return;

      const isSelected = selectedTables.some(t => t.id === table.id);
      dispatch(reserveSelectTableAction(table));
      dispatch(reserveToggleTableAction(table));

      return !isSelected;
   };


   const reserveReset = () => {
      dispatch(reserveResetAction());
   };

   const reserveResetStateTables = () => {
      dispatch(reserveResetStateTablesAction());
   }

   const reserveResetSelectTables = () => {
      dispatch(reserveResetSelectedTablesAction());
   }

   const reservePendingAuth = () => {
      dispatch(reserveChangeStateAction(typeStatus.PENDING_AUTH));
   }

   const reservePending = () => {
      dispatch(reserveChangeStateAction(typeStatus.PENDING));
   }

   const reserveConfirm = async () => {
      return dispatch(startReserveTable());
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
      availableTime,
      isPending,
      isTableExceeded,

      // Metodos de consulta api
      serviceGetAvailableHours,
      serviceGetTables,

      // Acciones
      reserveSetInfo,
      reserveSetDate,
      reserveSetTime,
      reserveToggleTable,
      reserveSelectTable,
      reserveReset,
      getCurrentSelectedTable,
      existSelectedTable,
      reserveConfirm,
      reservePendingAuth,
      reservePending,
      reserveResetStateTables,
      reserveResetSelectTables,
   };
};