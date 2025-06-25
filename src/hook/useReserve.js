import { useDispatch, useSelector } from 'react-redux';
import {
   reserveSetErrorAction,
   reserveSetDataAction,
   reserveToggleTableAction,
   reserveSelectTableAction,
   reserveResetAction
} from '@/doman/store/reserve';

export const useReserve = () => {
   const dispatch = useDispatch();
   // const status = useSelector(state => state.reserveReducer.status);

   const {
      errorMessage,
      isLoading,
      timeLimit,
      date,
      currentSelectedTable,
      selectedTables
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
      // console.log('table', table);
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
      getCurrentSelectedTable
   };
};