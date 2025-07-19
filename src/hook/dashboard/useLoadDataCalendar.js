import { loadByStateReservationsThunks } from '@/doman/store/dashboard';
import { typeStatusTable } from '@/ultils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadDataCalendar = () => {
   const state = useSelector((state) => state.calendarReducer)

   const dispatch = useDispatch();

   useEffect(() => {
      if (state.isRequest) return;
      dispatch(loadByStateReservationsThunks([typeStatusTable.PENDING]));
   }, [state.isRequest]);

   return {
      reservations: state.reservations,
      isLoading: state.isLoading
   }
}
