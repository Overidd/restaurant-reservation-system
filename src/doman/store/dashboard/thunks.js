import { dasboardServiceProvider } from '@/doman/services';
import { typeStatusTable } from '@/ultils';

import {
   ModifyReservationTableAction,
   changeStatusTableAction,
   clearTablesRelationAction,
   deleteTableAction,
   loaddingAction,
   messageErrorAction,
   setHoursAction,
   setRestaurantsAction,
   setTablesAction,
   typeLoading
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
export const cancelFullReservationThunks = (data) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.cancelFullReservation(data);

      if (data.isNoShow) {
         await dasboardServiceProvider.registerClientnoShow(data);
      }

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTables: data.idTables,
         status: typeStatusTable.AVAILABLE
      }));
   }
}

/**
 * 
 * @param {{idReservation, idTables, idTablesNoSelect: string[]}} data 
 * @returns 
 */
export const cancelATablesReservationThunks = (data) => {
   return async (dispatch) => {
      if (!data) return;

      const res = await dasboardServiceProvider.cancelATablesReservation(data);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(clearTablesRelationAction({
         idTablesNoSelect: data.idTablesNoSelect,
         idTables: data.idTables
      }));

      dispatch(changeStatusTableAction({
         idTables: data.idTables,
         status: typeStatusTable.AVAILABLE
      }));
   }
}

/**
 * @param {{ idReservation: string, idTable: string }} param0 
 * @returns 
 */
export const confirmReservationThunks = ({ idReservation, idTable }) => {
   return async (dispatch) => {

      const res = await dasboardServiceProvider.confirmReservation({ idReservation });

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTable: idTable,
         status: typeStatusTable.CONFIRMED
      }));
   }
}

export const releasedReservationThunks = ({ idReservation, idTable }) => {
   return async (dispatch) => {

      const res = await dasboardServiceProvider.releaseReservation({ idReservation });

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTable: idTable,
         status: typeStatusTable.AVAILABLE
      }));
   }
}

/**
 * 
 * @param {{ idTables: Array<string>, idRestaurant: string, dateStr: string, hour: string, email: string, idUser: string, phone: string, name: string,diners: number}} data
 */
export const reserveTableThunks = (data) => {
   return async (dispatch) => {

      const res = await dasboardServiceProvider.reserveTable(data);

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTables: data.idTables,
         status: typeStatusTable.PENDING,
         reservation: res
      }));

      return res
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