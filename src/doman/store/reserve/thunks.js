import { serviceProvider } from '@/doman/services';
import {
   reserveLoadingAction,
   reserveMessageErrorAction,
   reserveSetAvailableHoursAction,
   reserveSetRestaurantAction,
   reserveSetTablesAction,
   typeLoading
} from './reserveSlice';


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
      const { info: { locationId }, date } = getState().reserveReducer.from;

      try {
         dispatch(reserveLoadingAction(typeLoading.TABLES));
         const tables = await serviceProvider.getTables({ date, restaurantId: locationId });
         const restaurant = await serviceProvider.getRestaurant({ restaurantId: locationId });
         dispatch(reserveSetTablesAction(tables));
         dispatch(reserveSetRestaurantAction(restaurant));

      } catch (error) {
         dispatch(reserveMessageErrorAction(error.message));
      }
   }
}


// export const startTempLockTable = ({
//    tableId,
//    restaurantId,
//    date,
//    hour
// }) => {

//    return async (dispatch, states) => {
//       try {
//          console.log(dispatch, states)
//       } catch (error) {
//          console.log(error);
//       }
//    }
// }

// export const startTempUnlockTable = ({
//    tableId
// }) => {
//    return async (dispatch, states) => {
//       try {
//          console.log(dispatch, states)
//       } catch (error) {
//          console.log(error);
//       }
//    }
// }