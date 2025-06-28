import { useDispatch, useSelector } from 'react-redux';

import {
   reserveSetErrorAction,
   reserveSetDataAction,
   reserveToggleTableAction,
   reserveSelectTableAction,
   reserveResetAction,
} from '@/doman/store/reserve';

export const useReserve = () => {
   const dispatch = useDispatch();

   const {
      currentSelectedTable,
      selectedTables,
      errorMessage,
      date,
   } = useSelector((state) => state.reserveReducer);

   const reserveSetData = (data) => {
      dispatch(reserveSetDataAction(data));
   };

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

   const reserveSetError = (message) => {
      dispatch(reserveSetErrorAction(message));
   };

   const getCurrentSelectedTable = () => {
      return currentSelectedTable ?? {}
   }

   const existSelectedTable = () => {
      return selectedTables.length > 0;
   }

   return {
      // Estado
      errorMessage,
      selectedTables,
      currentSelectedTable,
      date,

      // Acciones
      reserveSetData,
      reserveToggleTable,
      reserveSelectTable,
      reserveReset,
      reserveSetError,
      getCurrentSelectedTable,
      existSelectedTable,
   };
};