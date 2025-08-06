import { useState } from 'react';
import {
   blockTempTableThunks,
   cancelATablesReservationThunks,
   cancelFullReservationThunks,
   confirmReservationThunks,
   releasedReservationThunks,
   reserveTableThunks,
   unblockTempTableThunks,
   updateReservationThunks
} from '@/doman/store/dashboard';
import { useDispatch } from 'react-redux';

export const useReservation = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);

   const withLoading = async (fn) => {
      try {
         setIsLoading(true);
         return await fn();
      } catch (error) {
         console.log('');
         throw error;
      }
      finally {
         setIsLoading(false);
      }
   };

   const cancelFullReservation = async (data) =>
      withLoading(() => dispatch(cancelFullReservationThunks(data)));

   const cancelATablesReservation = async (data) =>
      withLoading(() => dispatch(cancelATablesReservationThunks(data)));

   const confirmReservation = async (data) =>
      withLoading(() => dispatch(confirmReservationThunks(data)));

   const releasedReservation = async (data) =>
      withLoading(() => dispatch(releasedReservationThunks(data)));

   const reserveTable = async (data) =>
      withLoading(() => dispatch(reserveTableThunks(data)));

   const updateReservation = async (data) => withLoading(() => dispatch(updateReservationThunks(data)));

   const blockTempTable = (data) => {
      if (!data) return;
      return dispatch(blockTempTableThunks(data));
   };

   const unblockTempTable = (data) => {
      if (!data) return;
      return dispatch(unblockTempTableThunks(data));
   };

   return {
      isLoading,
      cancelFullReservation,
      cancelATablesReservation,
      confirmReservation,
      releasedReservation,
      updateReservation,
      reserveTable,
      blockTempTable,
      unblockTempTable
   };
};
