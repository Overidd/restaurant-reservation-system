import { dasboardServiceProvider } from '@/doman/services';
import { loadingActionCalendar, messageErrorActionCalendar, setReservationsAction } from './calendarSlice';

export const loadByStateReservationsThunks = (states = []) => {
   return async (dispatch) => {
      if (!states || states.length === 0) {
         throw new Error('Error al obtener las reservas');
      };
      dispatch(loadingActionCalendar());

      const res = await dasboardServiceProvider.getByStateReservations(states);

      if (!res.ok) {
         dispatch(messageErrorActionCalendar(res.errorMessage));
         return;
      };

      dispatch(setReservationsAction(res.reservations));
   }
}