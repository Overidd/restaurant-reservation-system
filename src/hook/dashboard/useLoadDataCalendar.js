import { loadByStateReservationsThunks } from '@/doman/store/dashboard';
import { typeStatusTable } from '@/ultils';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadDataCalendar = () => {
   const state = useSelector((state) => state.calendarReducer)

   const dispatch = useDispatch();

   useEffect(() => {
      if (state.isRequest) return;
      dispatch(loadByStateReservationsThunks([typeStatusTable.PENDING]));
   }, [state.isRequest]);


   const reservations = useMemo(() => {
      return state.reservations.map((reservation) => ({
         ...reservation,
         title: `${reservation.name} - ${reservation.tables.map((t) => t.name).join(', ')}`,
         start: new Date(reservation.start),
         end: new Date(reservation.end),
      }))
   }, [state.reservations]);

   return {
      reservations: reservations,
      isLoading: state.isLoading
   }
}
