import { dasboardServiceProvider } from '@/doman/services';
import {
   deleteTableAction,
   listenTableNofityAction,
   loaddingAction,
   messageErrorAction,
   setTablesAndObjectsAction
} from './restaurantResourceSlice';

/**
 * @param {{ idRestaurant: string, dateStr: string, hour: string }} data 
 * @returns 
 */
export const loadTablesAndObjectsThunks = (data) => {
   return async (dispatch) => {
      if (!data) return;
      dispatch(loaddingAction());

      const resTables = await dasboardServiceProvider.getTables(data);

      if (!resTables.ok) {
         dispatch(messageErrorAction(resTables.errorMessage));
         return;
      };

      const resObjects = await dasboardServiceProvider.getObjects(data);

      if (!resObjects.ok) {
         dispatch(messageErrorAction(resTables.errorMessage));
         return;
      };

      dispatch(setTablesAndObjectsAction({
         tables: resTables.tables,
         objects: resObjects.objects
      }));
   }
}

export const deleteTableThunks = (idTable) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider?.deleteTable(idTable);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      }

      dispatch(deleteTableAction(idTable));
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
            dispatch(listenTableNofityAction(reservation));
         },

         onModify: (reservation) => {
            console.log('se modifico', reservation);
            // dispatch(loadTablesThunks(reservation));
         },
      });
   };
};