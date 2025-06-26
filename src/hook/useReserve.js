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
   // const status = useSelector(state => state.reserveReducer.status);

   const {
      currentSelectedTable,
      selectedTables,
      errorMessage,
      isLoading,
      timeLimit,
      date,
   } = useSelector(
      (state) => state.reserveReducer
   );

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
      // return Object.keys(currentSelectedTable).length === 0;
   }

   return {

      // Estado
      errorMessage,
      selectedTables,
      currentSelectedTable,
      isLoading,
      timeLimit,
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