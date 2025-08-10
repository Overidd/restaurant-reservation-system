
import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
      messageError: null,
      reservations: [], // Reservas pendientes
      isRequest: false,
      isLoading: false,
      selectedReservation: null
   },
   reducers: {
      setReservationsAction: (state, { payload }) => {
         state.reservations = payload;
         state.isRequest = true;
         state.isLoading = false;
         state.messageError = null
      },

      setSelectedReservationAction: (state, { payload }) => {
         state.selectedReservation = payload
      },

      addReservationCalendar: (state, { payload }) => {
         if (!payload || !payload?.status) return;
         state.reservations.push(payload);
      },

      updateReservationCalendar: (state, { payload }) => {
         if (!payload || !payload?.id) return;
         state.reservations = state.reservations.map(r => {
            if (r.id === payload.id) {
               return { ...r, ...payload, tables: payload?.tables }
            }
            return r
         });

         if (state.selectedReservation?.id === payload.id) {
            state.selectedReservation = { ...state.selectedReservation, ...payload, tables: payload?.tables }
         }
      },

      removeReservationCalendar: (state, { payload }) => {
         if (!payload) return;
         state.reservations = state.reservations.filter(r => r.id !== payload);
      },

      changeStatusReservationCalendar: (state, { payload }) => {
         if (!payload) return;
         state.reservations = state.reservations.map(r => {
            if (r.id === payload.id) {
               return { ...r, status: payload?.status }
            }
            return r
         });

         if (state.selectedReservation?.id === payload.id) {
            state.selectedReservation = { ...state.selectedReservation, status: payload?.status }
         }
      },

      loadingActionCalendar: (state) => {
         state.isLoading = true;
      },

      messageErrorActionCalendar: (state, { payload }) => {
         state.messageError = payload
      }
   },
});

export const {
   setSelectedReservationAction,
   setReservationsAction,
   addReservationCalendar,
   updateReservationCalendar,
   loadingActionCalendar,
   messageErrorActionCalendar,
   removeReservationCalendar,
   changeStatusReservationCalendar,
} = calendarSlice.actions;

