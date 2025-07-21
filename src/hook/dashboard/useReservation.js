import { cancelATablesReservationThunks, cancelFullReservationThunks, confirmReservationThunks, releasedReservationThunks, reserveTableThunks, updateReservationThunks } from '@/doman/store/dashboard';
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

   const updateReservation = async (data) => {
      if (!data) return;
      return dispatch(updateReservationThunks(data));
   }

   return {
      cancelFullReservation,
      cancelATablesReservation,
      confirmReservation,
      releasedReservation,
      updateReservation,
      reserveTable
   }
}
