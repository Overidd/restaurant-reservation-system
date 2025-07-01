import { serviceProvider } from '@/doman/services';

import {
   reserveChangeStateAction,
   reserveLoadingAction,
   reserveMessageErrorAction,
   reserveResetAction,
   reserveSetAvailableTimesAction,
   reserveSetRestaurantAction,
   reserveSetTablesAction,
   typeLoading,
   typeStatus
} from './reserveSlice';

export const startGetAvailableHours = (date) => {
   return async (dispatch, getState) => {

      try {
         const { info: { locationId } } = getState().reserveReducer.from;

         if (!locationId) throw new Error('No se ha seleccionado una localidad');

         dispatch(reserveLoadingAction(typeLoading.TIME));

         const availableTime = await serviceProvider.getAvailableTimes({ dateStr: date, idRestaurant: locationId });

         dispatch(reserveSetAvailableTimesAction(availableTime));
      } catch (error) {
         dispatch(reserveMessageErrorAction(error.message));
      }
   }
}

export const startGetTables = () => {
   return async (dispatch, getState) => {
      const { info: { locationId }, date, time: { hour } } = getState().reserveReducer.from;

      try {
         dispatch(reserveLoadingAction(typeLoading.TABLES));

         const tables = await serviceProvider.getTables({ dateStr: date, idRestaurant: locationId, hour });
         const restaurant = await serviceProvider.getRestaurant({ idRestaurant: locationId });

         dispatch(reserveSetTablesAction(tables));
         dispatch(reserveSetRestaurantAction(restaurant));
      } catch (error) {
         dispatch(reserveMessageErrorAction(error.message));
      }
   }
}

export const startReserveTable = () => {
   return async (dispatch, getState) => {
      dispatch(reserveLoadingAction(typeLoading.RESERVE));
      dispatch(reserveLoadingAction(typeLoading.RESERVE));

      const { from, selectedTables, restaurant, errorMessage } = getState().reserveReducer;

      const res = await serviceProvider.reserveTable({
         ...from.info,
         dateStr: from.date,
         hour: from.time.hour,
         idTables: selectedTables.map(table => table.id),
         idRestaurant: restaurant.id
      });

      if (!res.ok) {
         dispatch(reserveChangeStateAction(typeStatus.ACTIVE));
         dispatch(reserveMessageErrorAction(errorMessage || 'No se pudo realizar la reserva'));
         throw new Error(errorMessage || 'No se pudo realizar la reserva');
      }

      dispatch(reserveResetAction());
      dispatch(reserveChangeStateAction(typeStatus.COMPLETED));
      return res
   }
}