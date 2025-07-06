import { dasboardServiceProvider } from '@/doman/services';

import {
   deleteTableAction,
   loaddingAction,
   messageErrorAction,
   setHoursAction,
   setRestaurantsAction,
   setTablesAction,
   typeLoading,
   ModifyReservationTableAction,
   deleteTablesAction
} from '.';


export const loadRestaurantsThunks = () => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.getRestaurants();

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      };

      dispatch(setRestaurantsAction(res.restaurants));
   }
}

export const loadHoursThunks = () => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.getAllHours();

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      };

      dispatch(setHoursAction(res.hours));
   }
}

/**
 * @param {{ idRestaurant: string, dateStr: string, hour: string }} data 
 * @returns 
 */
export const loadTablesThunks = (data) => {
   return async (dispatch) => {
      console.log('loadTablesThunks', data)
      if (!data) return;

      dispatch(loaddingAction(typeLoading.TABLES));
      const res = await dasboardServiceProvider.getTables(data);

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));

         return;
      };

      dispatch(setTablesAction(res.tables));
   }
}


export const deleteTableThunks = (idTable) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.deleteTable(idTable);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      }

      dispatch(deleteTableAction(idTable));
   }
}

/**
 * 
 * @param {{ user: Object, idReservation: string, idTables: string[], isNoShow: boolean }} data 
 * @returns 
 */
export const cancelReserveTableThunks = (data) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.cancelReserveTable(data);

      if (data.isNoShow) {
         await dasboardServiceProvider.registerClientnoShow(data);
      }

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      }

      dispatch(deleteTablesAction(data.idTables));
   }
}

/**
 * 
 * @param {{idReservation, idTables}} data 
 * @returns 
 */
export const cancelReservationTablesThunks = (data) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.cancelReservationTables(data);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      }

      dispatch(deleteTablesAction(data.idTables));
   }
}

let unsubscribeTablesListener = null;

export const listenModifyTablesThunks = (data) => {
   return async (dispatch) => {
      if (unsubscribeTablesListener) {
         unsubscribeTablesListener();
      }

      unsubscribeTablesListener = dasboardServiceProvider.listenReservationsAddedAndModified({
         ...data,
         onAdd: (reservation) => {
            console.log('se agrego', reservation);
            dispatch(ModifyReservationTableAction(reservation));
         },

         onModify: (reservation) => {
            console.log('se modifico', reservation);
            // dispatch(loadTablesThunks(reservation));
         },
      });
   };
};