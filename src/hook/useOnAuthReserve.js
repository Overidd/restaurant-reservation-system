import { startReserveTable, typeStatus } from '@/doman/store/reserve';
import { useDispatch, useSelector } from 'react-redux';

export const useOnAuthReserve = () => {
   const dispatch = useDispatch();
   const stateReserve = useSelector((state) => state.reserveReducer.stateReserve);

   const reserveConfirm = () => {
      if (stateReserve !== typeStatus.PENDING) return;
      dispatch(startReserveTable());
      // reserveToggleTable(table);
   }

   return {
      reserveConfirm,
      stateReserve
   }
}