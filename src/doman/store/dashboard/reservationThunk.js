import { dasboardServiceProvider } from '@/doman/services';
import { typeStatusTable } from '@/ultils';
import { addReservationAction, updateReservationAction } from './calendarSlice';
import { changeStatusTableAction, clearTablesRelationAction, messageErrorAction } from './restaurantResourceSlice';


/**
 * 
 * @param {{ idReservation: string, tables: string[], isNoShow: boolean }} data 
 * @returns 
 */
export const cancelFullReservationThunks = (data) => {
   return async (dispatch) => {

      if (data.isNoShow) {
         const { ok, errorMessage } = await dasboardServiceProvider.registerClientnoShow(data);

         if (!ok) {
            dispatch(messageErrorAction(errorMessage));
            throw errorMessage
         }
      }

      const res = await dasboardServiceProvider.cancelFullReservation(data);


      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTables: data.tables.map((t) => t.id),
         status: typeStatusTable.AVAILABLE
      }));
   }
}

/**
 * 
 * @param {{idReservation, tables: string[], tablesNoSelect: string[]}} data 
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
         idTablesNoSelect: data.tablesNoSelect.map((t) => t.id),
         idTables: data.tables.map((t) => t.id)
      }));

      dispatch(changeStatusTableAction({
         idTables: data.tables.map((t) => t.id),
         status: typeStatusTable.AVAILABLE
      }));
   }
}
// Cannot read properties of undefined (reading 'map')
// Cannot read properties of undefined (reading 'filter')


/**
 * @param {{ idReservation: string, table: object,tablesReservation: [] }} param0 
 * @returns 
 */
export const confirmReservationThunks = ({ idReservation, tablesReservation }) => {
   return async (dispatch) => {

      const res = await dasboardServiceProvider.confirmReservation({ idReservation });

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTables: tablesReservation.map((t) => t.id),
         status: typeStatusTable.CONFIRMED
      }));
   }
}

export const releasedReservationThunks = ({ idReservation, tablesReservation }) => {
   return async (dispatch) => {

      const res = await dasboardServiceProvider.releaseReservation({ idReservation });

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTables: tablesReservation.map((t) => t.id),
         status: typeStatusTable.AVAILABLE
      }));
   }
}

/**
 * 
 * @param {{ tables: Array<string>, idRestaurant: string, dateStr: string, hour: string, email: string, idUser: string, phone: string, name: string,diners: number}} data
 */
export const reserveTableThunks = (data) => {
   return async (dispatch, getState) => {
      const { hour, dateStr, restaurant } = getState().stateFilterRestaurantReducer.filter;

      const res = await dasboardServiceProvider.reserveTable(data);

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }
      if (
         hour !== res.hour ||
         dateStr !== res.dateStr ||
         restaurant.id !== res.idRestaurant
      ) {
         dispatch(changeStatusTableAction({
            idTables: data.tables.map((t) => t.id),
            status: typeStatusTable.PENDING,
            reservation: res
         }));
      }

      dispatch(addReservationAction(res.reservationData))

      return res
   }
}
/**
 * 
 * @param {{ tables: Array<string>, idRestaurant: string, dateStr: string, hour: string, email: string, idUser: string, phone: string, name: string,diners: number}} data
 */
export const updateReservationThunks = (data) => {
   return async (dispatch, getState) => {
      if (!data?.idReservation) {
         throw new Error('No se proporciono el id de la reserva');
      }

      const { hour, dateStr, restaurant } = getState().stateFilterRestaurantReducer.filter;

      const res = await dasboardServiceProvider.updateReservation(data);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }
      if (
         hour !== res.hour ||
         dateStr !== res.dateStr ||
         restaurant.id !== res.idRestaurant
      ) {
         dispatch(changeStatusTableAction({
            idTables: data.tables.map((t) => t.id),
            status: typeStatusTable.PENDING,
            reservation: res
         }));
      }

      dispatch(updateReservationAction(res.reservationData))
      return res
   }
}

/**
 * 
 * @param {{ idTable: string, idRestaurant: string, hour:string, dateStr:string, status: string}} data 
 * @returns 
 */
export const blockTempTableThunks = (data) => {
   return async (dispatch) => {
      if ([typeStatusTable.CONFIRMED, typeStatusTable.PENDING].includes(data.status)) {
         throw new Error('La mesa debe estar disponible para bloquearla');
      }

      const res = await dasboardServiceProvider.blockTempTable(data);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTables: [data.idTable ?? data.id],
         status: typeStatusTable.BLOCKED,
      }));
   }
}

/**
 * 
 * @param {{ idTable: string, idRestaurant: string, hour:string, dateStr:string}} data 
 * @returns 
 */
export const unblockTempTableThunks = (data) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.unblockTempTable(data);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(changeStatusTableAction({
         idTables: [data.idTable ?? data.id],
         status: typeStatusTable.AVAILABLE,
      }));
   }
}

