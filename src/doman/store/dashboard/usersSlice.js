import { createSlice } from '@reduxjs/toolkit';

export const TYPE_LOADING_USER = {
   USERS: 'users',
   RESERVATIONS: 'reservations'
};

const updateReservationList = (reservations, id, changes) =>
   reservations.map(r => r.id === id ? { ...r, ...changes } : r);

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
         state.reservations = [...state.reservations, ...payload];
         state.loadings.reservations = false;
         state.messageError = null;
      },

      setSelectedUser: (state, { payload: { idUser, reservations } }) => {
         const user = state.users.find(u => u.id === idUser);
         if (!user) return;
         state.selectedUser = { ...user, reservations };
      },

      setMessageErrorUserDetail: (state, { payload }) => {
         state.messageError = payload;
      },

      loadingUserDetailAction: (state, { payload }) => {
         if (payload && Object.prototype.hasOwnProperty.call(state.loadings, payload)) {
            state.loadings[payload] = true;
         }
      },

      updateUserDetailAction: (state, { payload }) => {
         if (!payload) return;

         state.users = state.users.map(u =>
            u.id === payload.id ? { ...u, ...payload } : u
         );

         if (state.selectedUser?.id === payload.id) {
            state.selectedUser = { ...state.selectedUser, ...payload };
         }
      },

      setSelectedUserAction: (state, { payload }) => {
         if (payload) {
            state.selectedUser = payload;
         }
      },

      changeStatusReservationUserDetail: (state, { payload }) => {
         if (!payload) return;
         const { idUser, id, status } = payload;

         const user = state.users.find(u => u.id === idUser);
         if (user) {
            user.reservations = updateReservationList(user.reservations, id, { status });
         }

         if (state.selectedUser?.id === idUser) {
            state.selectedUser.reservations = updateReservationList(
               state.selectedUser.reservations,
               id,
               { status }
            );
         }
      },

      addReservationUserDetail: (state, { payload }) => {
         if (!payload) return;
         const { idUser, reservation } = payload;

         const user = state.users.find(u => u.id === idUser);
         if (user) {
            if (Array.isArray(user.reservations)) {
               user.reservations = [...user.reservations, reservation];
            } else {
               user.reservations = [reservation];
            }
         }
      },

      updateReservationUserDetail: (state, { payload }) => {
         if (!payload) return;
         const { idUser, reservation } = payload;

         const user = state.users.find(u => u.id === idUser);
         if (user) {
            user.reservations = updateReservationList(user.reservations, reservation.id, reservation);
         }

         if (state.selectedUser?.id === idUser) {
            state.selectedUser.reservations = updateReservationList(
               state.selectedUser.reservations,
               reservation.id,
               reservation
            );
         }
      }
   }
});

export const {
   setUsers,
   setReservations,
   setSelectedUser,
   setMessageErrorUserDetail,
   loadingUserDetailAction,
   updateUserDetailAction,
   setSelectedUserAction,
   changeStatusReservationUserDetail,
   addReservationUserDetail,
   updateReservationUserDetail
} = usersSlice.actions;
