import { dasboardServiceProvider } from '@/doman/services';
import { typeStatusTable } from '@/ultils';
import { changeStatusTableAction, clearTablesRelationAction, messageErrorAction } from './restaurantResourceSlice';


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

