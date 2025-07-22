import { createSlice } from '@reduxjs/toolkit';

export const TYPE_LOADING_USER = {
   USERS: 'users',
   RESERVATIONS: 'reservations'
}

export const usersSlice = createSlice({
   name: 'users',
   initialState: {
      isRequest: false,
      messageError: null,
      users: [],
      reservations: [],
      selectedUser: null,
      loadings: {
         users: false,
         reservations: false
      }
   },
   reducers: {
      setUsers: (state, { payload }) => {
         state.users = payload;
         state.loadings.users = false;
         state.isRequest = true;
         state.messageError = null;
      },

      setReservations: (state, { payload }) => {
         state.reservations.push(payload);
         state.messageError = null;
         state.loadings.reservations = false;
      },

      setSelectedUser: (state, { payload: { idUser, reservations } }) => {
         state.selectedUser = {
            ...state.users.find(u => u.id === idUser),
            reservations: reservations
         }
      },

      setMessageErrorUserDetail: (state, { payload }) => {
         state.messageError = payload;
      },

      loadingUserDetailAction: (state, { payload }) => {
         if (!payload) return;
         state.loadings[payload] = true;
      }
   },
});

export const {
   setUsers,
   setReservations,
   setSelectedUser,
   setMessageErrorUserDetail,
   loadingUserDetailAction
} = usersSlice.actions;