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
} from '@/doman/store/reserve';

export const useReserve = () => {
   const dispatch = useDispatch();

   const {
      currentSelectedTable,
      selectedTables,
      errorMessage,
      isLoading,
      from,
   } = useSelector((state) => state.reserveReducer);

   // Metodos de consulta api
   /**
    * 
    * @param {{ date: string, restaurantId: string }} data 
    * @returns 
    */
   const serviceGetAvailableHours = (data) => {
      dispatch(startGetAvailableHours(data));
   };

   /**
    * 
    * @param {{ date: string, restaurantId: string }} data 
    * @returns 
    */
   const serviceGetTables = (data) => {
      dispatch(startGetTables(data));
   };

   // Metodos de acciones del usuario
   const reserveSetInfo = (data) => {
      dispatch(reserveSetInfoAction(data));
   }

   const reserveSetDate = (data) => {
      dispatch(reserveSetDateAction(data));
   }

   const reserveSetHour = (data) => {
      dispatch(reserveSetHourAction(data));
   }

   const reserveToggleTable = (table) => {
      dispatch(reserveToggleTableAction(table));
   };

   const reserveSelectTable = (table) => {
      reserveToggleTable(table);
      dispatch(reserveSelectTableAction(table));
   };

   const reserveReset = () => {
      dispatch(reserveResetAction());
   };

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
   };
};