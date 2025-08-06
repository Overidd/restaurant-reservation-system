import { serviceProvider } from '@/doman/services';

import {
   reserveChangeStateAction,
   reserveLoadingAction,
   reserveMessageErrorAction,
   reserveResetAction,
   reserveResetSelectedTablesAction,
   reserveSetAvailableHoursAction,
   reserveSetObjectAction,
   reserveSetRestaurantAction,
   reserveSetTablesAction,
   typeLoading,
   typeStatus
} from './reserveSlice';

export const startGetAvailableHours = (date) => {
   return async (dispatch, getState) => {
      const { info: { restaurantId, diners } } = getState().reserveReducer.from;

      if (!restaurantId) throw new Error('No se ha seleccionado una localidad');

      dispatch(reserveLoadingAction(typeLoading.HOUR));

      const { ok, availableHours, messageError } = await serviceProvider.getAvailableHours({
         dateStr: date,
         idRestaurant: restaurantId,
         diners
      });
      if (!ok) {
         dispatch(reserveMessageErrorAction(messageError));
         return;
      };

      dispatch(reserveSetAvailableHoursAction(availableHours));
   }
}

export const startGetTables = () => {
   return async (dispatch, getState) => {
      const { info: { restaurantId, diners }, date, hour: { name } } = getState().reserveReducer.from;

      try {
         dispatch(reserveLoadingAction(typeLoading.TABLES));

         const tables = await serviceProvider.getTables({
            dateStr: date,
            idRestaurant: restaurantId,
            diners: diners,
            hour: name,
         });


         const object = await serviceProvider.getObject({
            idRestaurant: restaurantId,
         });

         const restaurant = await serviceProvider.getRestaurant({
            idRestaurant: restaurantId
         });

         dispatch(reserveSetTablesAction(tables));
         dispatch(reserveSetObjectAction(object));
         dispatch(reserveSetRestaurantAction(restaurant));
      } catch (error) {
         console.log(error);
         dispatch(reserveMessageErrorAction(error.message));
      }
   }
}

export const startReserveTable = () => {
   return async (dispatch, getState) => {
      dispatch(reserveLoadingAction(typeLoading.RESERVE));

      const { from, selectedTables, restaurant } = getState().reserveReducer;

      const res = await serviceProvider.reserveTable({
         ...from.info,
         dateStr: from.date,
         hour: from.hour.name,
         tables: selectedTables?.map(table => ({ id: table.id, name: table.name, chairs: table.chairs })) || [],
         idRestaurant: restaurant.id
      });

      if (!res.ok) {
         dispatch(reserveChangeStateAction(typeStatus.ACTIVE));
         dispatch(reserveMessageErrorAction(res.errorMessage));
         dispatch(reserveResetSelectedTablesAction());
         throw res.errorMessage;
      }

      dispatch(reserveChangeStateAction(typeStatus.COMPLETED));

      dispatch(reserveResetAction());
      return res
   }
}