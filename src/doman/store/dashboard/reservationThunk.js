import { dasboardServiceProvider, userSettingProvider } from '@/doman/services';
import { typeStatusTable } from '@/ultils';
import { addReservationCalendar, changeStatusReservationCalendar, removeReservationCalendar, updateReservationCalendar } from './calendarSlice';
import { changeStatusTableAction, clearTablesRelationAction, messageErrorAction } from './restaurantResourceSlice';
import { addReservationUserDetail, changeStatusReservationUserDetail, updateReservationUserDetail, updateUserDetailAction } from './usersSlice';


const ifChangeStatusTable = ({
   filter,
   data,
   callback,
}) => {
   if (
      filter.hour === data?.hour &&
      filter.dateStr === data?.dateStr &&
      filter.restaurant.id === data?.idRestaurant
   ) {
      callback()
   }
}


/**
 * @param {{ idReservation: string, tables: string[], isNoShow: boolean,hour, dateStr, idRestaurant: string,idUser: string }} data 
 * @returns 
 */
export const cancelFullReservationThunks = (data) => {
   return async (dispatch, getState) => {
      const filter = getState().stateFilterRestaurantReducer.filter;

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

      ifChangeStatusTable({
         data,
         filter,
         callback: () => {
            dispatch(changeStatusTableAction({
               idTables: data.tables.map((t) => t.id),
               status: typeStatusTable.AVAILABLE
            }));
         }
      })

      dispatch(removeReservationCalendar(
         data.idReservation
      ));

      dispatch(changeStatusReservationUserDetail({
         id: data.idReservation,
         status: typeStatusTable.CANCELED,
         idUser: data.idUser
      }))
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
 * @param {{ idReservation: string, table: object,tablesReservation: [], hour, dateStr, idRestaurant: string, idUser: string }} data 
 * @returns 
 */
export const confirmReservationThunks = (data) => {
   return async (dispatch, getState) => {
      const filter = getState().stateFilterRestaurantReducer.filter;

      const res = await dasboardServiceProvider.confirmReservation(data);

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      ifChangeStatusTable({
         data,
         filter,
         callback: () => {
            dispatch(changeStatusTableAction({
               idTables: data.tablesReservation.map((t) => t.id),
               status: typeStatusTable.CONFIRMED
            }));
         }
      })

      dispatch(changeStatusReservationCalendar({
         id: data.idReservation,
         status: typeStatusTable.CONFIRMED
      }))

      dispatch(changeStatusReservationUserDetail({
         id: data.idReservation,
         status: typeStatusTable.CONFIRMED,
         idUser: data.idUser
      }))
   }
}

/**
 * 
 * @param {{ idReservation: string, tablesReservation: [], hour, dateStr, idRestaurant: string, idUser: string }} data 
 * @returns 
 */
export const releasedReservationThunks = (data) => {
   return async (dispatch, getState) => {
      const filter = getState().stateFilterRestaurantReducer.filter;

      const res = await dasboardServiceProvider.releaseReservation(data);

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      ifChangeStatusTable({
         data,
         filter,
         callback: () => {
            dispatch(changeStatusTableAction({
               idTables: data.tablesReservation.map((t) => t.id),
               status: typeStatusTable.AVAILABLE
            }));
         }
      })

      dispatch(changeStatusReservationCalendar({
         id: data.idReservation,
         status: typeStatusTable.RELEASED
      }))

      dispatch(changeStatusReservationUserDetail({
         id: data.idReservation,
         status: typeStatusTable.RELEASED,
         idUser: data.idUser
      }))
   }
}

/**
 * 
 * @param {{ tables: Array<string>, idRestaurant: string, dateStr: string, hour: string, email: string, idUser: string, phone: string, name: string,diners: number}} data
 */
export const reserveTableThunks = (data) => {
   return async (dispatch, getState) => {

      const filter = getState().stateFilterRestaurantReducer.filter;

      const res = await dasboardServiceProvider.reserveTable(data);

      const updatePhone = await userSettingProvider.updatePhone({
         phone: data.phone,
         idUser: data.idUser
      });

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      ifChangeStatusTable({
         data,
         filter,
         callback: () => {
            dispatch(changeStatusTableAction({
               status: typeStatusTable.PENDING,
               reservation: res.reservationData,
               idTables: data.tables.map((t) => t.id)
            }));
         }
      })

      dispatch(addReservationCalendar(
         res.reservationData
      ))

      dispatch(addReservationUserDetail({
         reservation: res.reservationData,
         idUser: data.idUser
      }))

      dispatch(updateUserDetailAction(updatePhone.user))

      return res.reservation;
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

      const filter = getState().stateFilterRestaurantReducer.filter;

      const res = await dasboardServiceProvider.updateReservation(data);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         throw res.errorMessage
      }

      ifChangeStatusTable({
         filter,
         data,
         callback: () => {
            dispatch(changeStatusTableAction({
               status: typeStatusTable.PENDING,
               reservation: res.reservationData,
               idTables: data.tables.map((t) => t.id)
            }));
         }
      })

      dispatch(updateReservationCalendar(
         res.reservationData
      ))

      dispatch(updateReservationUserDetail({
         reservation: res.reservationData,
         idUser: data.idUser
      }))

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
