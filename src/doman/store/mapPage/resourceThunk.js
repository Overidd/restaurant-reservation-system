import { dasboardServiceProvider } from '@/doman/services';
import { validateObject } from '@/ultils';
import {
   loaddingAction,
   messageErrorAction,
   setTablesAndObjectsAction
} from './mapResourceSlice';

/**
 * @param {{ idRestaurant: string, dateStr: string, hour: string }} data 
 * @returns 
 */
export const loadTablesAndObjectsThunks = (data) => {
   return async (dispatch) => {
      if (!data || !validateObject(data)) return;
      dispatch(loaddingAction());

      const [resTables, resObjects] = await Promise.all([
         dasboardServiceProvider.getTables(data),
         dasboardServiceProvider.getObjects(data)
      ]);

      if (!resTables?.ok) {
         dispatch(messageErrorAction(resTables?.errorMessage));
         return;
      };

      if (!resObjects?.ok) {
         dispatch(messageErrorAction(resTables?.errorMessage));
         return;
      };

      dispatch(setTablesAndObjectsAction({
         tables: resTables.tables,
         objects: resObjects.objects
      }));
   }
}

// export const deleteTableThunks = ({ idTable, idRestaurant }) => {
//    return async (dispatch) => {
//       if (!idTable || !idRestaurant) {
//          throw new Error('Error al eliminar la mesa');
//       };

//       const res = await dasboardServiceProvider?.deleteTable({ idTable, idRestaurant });
//       if (!res.ok) {
//          dispatch(messageErrorAction(res.errorMessage));
//          throw res.errorMessage
//       }

//       dispatch(deleteTableAction(idTable));
//    }
// }

// export const createObjectThunks = (data) => {
//    return async (dispatch) => {
//       if (!data || !validateObject(data)) {
//          throw new Error('Error al crear el objeto');
//       };

//       const res = await dasboardServiceProvider.createObject(data);
//       if (!res.ok) {
//          dispatch(messageErrorAction(res.errorMessage));
//          throw res.errorMessage
//       }

//       dispatch(setObjectsAction(res.object));
//    }
// }

// export const createTableThunks = (data) => {
//    return async (dispatch) => {
//       if (!data || !validateObject(data)) {
//          throw new Error('Error al crear la mesa');
//       };

//       const res = await dasboardServiceProvider.createTable(data);
//       if (!res.ok) {
//          dispatch(messageErrorAction(res.errorMessage));
//          throw res.errorMessage
//       }

//       dispatch(setTablesAction(res.table));
//    }
// }

let unsubscribeTablesListener = null;
export const listenModifyTablesThunks = (data) => {
   return async (dispatch) => {
      // if (unsubscribeTablesListener) {
      //    unsubscribeTablesListener();
      // }

      // unsubscribeTablesListener = dasboardServiceProvider.listenReservationsAddedAndModified({
      //    ...data,
      //    onAdd: (reservation) => {
      //       console.log('se agrego', reservation);
      //       dispatch(listenTableNofityAction(reservation));
      //    },

      //    onModify: (reservation) => {
      //       console.log('se modifico', reservation);
      //       // dispatch(loadTablesThunks(reservation));
      //    },
      // });
   };
};