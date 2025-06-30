import { serviceProvider } from '@/doman/services';

import {
   reserveLoadingAction,
   reserveMessageErrorAction,
   reserveResetAction,
   reserveSetAvailableHoursAction,
   reserveSetRestaurantAction,
   reserveSetTablesAction,
   typeLoading
} from './reserveSlice';
import { closeModalReserveAction } from '../UISlice';

export const startGetAvailableHours = (date) => {
   return async (dispatch, getState) => {
      try {
         const { info: { locationId } } = getState().reserveReducer.from;

         if (!locationId) throw new Error('No se ha seleccionado una localidad');

         dispatch(reserveLoadingAction(typeLoading.HOUR));

         const availableHours = await serviceProvider.getAvailableHours({ date, restaurantId: locationId });

         dispatch(reserveSetAvailableHoursAction(availableHours));
      } catch (error) {
         dispatch(reserveMessageErrorAction(error.message));
      }
   }
}

export const startGetTables = () => {
   return async (dispatch, getState) => {
      const { info: { locationId }, date, hour } = getState().reserveReducer.from;

      try {
         dispatch(reserveLoadingAction(typeLoading.TABLES));

         const tables = await serviceProvider.getTables({ date, restaurantId: locationId, hour });
         const restaurant = await serviceProvider.getRestaurant({ restaurantId: locationId });

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
      const { from, selectedTables, restaurant, errorMessage } = getState().reserveReducer;

      const res = await serviceProvider.reserveTable({
         ...from.info,
         date: from.date,
         hour: from.hour,
         idTable: selectedTables[0].id,
         idRestaurant: restaurant.id
      });

      if (!res.ok) {
         dispatch(reserveMessageErrorAction(errorMessage || 'No se pudo realizar la reserva'));
         throw new Error(errorMessage || 'No se pudo realizar la reserva');
      }

      // dispatch(reserveStateMessageAction('Reserva realizada con exito'));
      dispatch(reserveResetAction());
      return res
   }
}