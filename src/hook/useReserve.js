import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
   reserveChangeStateAction,
   reserveResetAction,
   reserveResetSelectedTablesAction,
   reserveResetStateTablesAction,
   reserveSelectTableAction,
   reserveSetDateAction,
   reserveSetInfoAction,
   reserveSetTimeAction,
   reserveToggleTableAction,
   startGetAvailableHours,
   startGetTables,
   startReserveTable,
   typeStatus,
} from '@/doman/store/reserve';
import { DateParser, typeStatusTable } from '@/ultils';

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

   const isTableExceeded = useMemo(() => {
      return (selectedTables.length >= from.time.tablesAvailable)
   }, [selectedTables, from.time.tablesAvailable]);

   const isTableExceededDiners = useMemo(() => {
      return (selectedTables.reduce((acc, table) => acc + table.chairs, 0) >= from.info.diners)
   }, [selectedTables, from.info.diners]);

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
         dateStr = DateParser.toString(date);
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

      return !isSelected && ![typeStatusTable.BUSY, typeStatusTable.NOTAVAILABLE].includes(table.status);
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
      isTableExceededDiners,

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