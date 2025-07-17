import { cancelATablesReservationThunks, cancelFullReservationThunks, confirmReservationThunks, releasedReservationThunks, reserveTableThunks } from '@/doman/store/dashboard';
import { useDispatch } from 'react-redux';

export const useReservation = () => {
   const dispatch = useDispatch();

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

   const reserveTable = async (data) => {
      return dispatch(reserveTableThunks(data));
   }

   return {
      cancelFullReservation,
      cancelATablesReservation,
      confirmReservation,
      releasedReservation,
      reserveTable
   }
}
