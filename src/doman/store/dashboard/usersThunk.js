import { dasboardServiceProvider } from '@/doman/services';
import { loadingUserDetailAction, setMessageErrorUserDetail, setReservations, setSelectedUser, setUsers, TYPE_LOADING_USER } from './usersSlice';

export const getAllUsersThunk = () => {
   return async (dispatch) => {
      dispatch(loadingUserDetailAction(TYPE_LOADING_USER.USERS))
      const res = await dasboardServiceProvider.getAllUsers();
      if (!res.ok) {
         dispatch(setMessageErrorUserDetail(res.errorMessage));
         return;
         // throw res.errorMessage
      }
      dispatch(setUsers(res.users));
   }
}

export const getByIdUserReservationThunk = ({ idUser }) => {
   return async (dispatch) => {
      dispatch(loadingUserDetailAction(TYPE_LOADING_USER.RESERVATIONS))

      const res = await dasboardServiceProvider.getByIdUserReservations({ idUser });

      if (!res.ok) {
         dispatch(setMessageErrorUserDetail(res.errorMessage));
         return;
         // throw res.errorMessage
      }
      dispatch(setReservations({
         idUser,
         reservations: res.reservations
      }));

      dispatch(setSelectedUser({
         idUser,
         reservations: res.reservations
      }))
   }
}


