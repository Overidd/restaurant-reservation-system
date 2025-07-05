import { createSlice } from '@reduxjs/toolkit';

export const typeLoading = {
   TIME: 'time',
   TABLES: 'tables',
   SELECTEDTABLES: 'selectedTables',
   RESERVE: 'reserve'
}

export const tableAdminSlice = createSlice({
   name: 'tableAdmin',
   initialState: {
      messageError: null,
      restaurants: [],
      hours: [],
      tables: [],

      currentValue: {
         hour: '',
         dateStr: new Date().toISOString().split('T')[0],
         restaurant: {}
      },

      loading: {
         time: false,
         tables: false
      },

      currentSelectedTable: {},
      isTempTableChange: false
   },

   reducers: {
      setRestaurantsAction: (state, { payload }) => {
         state.restaurants = payload;
         state.currentValue.restaurant = payload[0] || {};
      },

      setHoursAction: (state, { payload }) => {
         state.hours = payload;
         state.currentValue.hour = payload[0] || {};
      },

      setTablesAction: (state, { payload }) => {
         state.messageError = null
         state.loading.tables = false
         state.tables = payload;
      },

      ModifyReservationTableAction: (state, { payload }) => {
         state.tables = state.tables.map(table => {
            if (payload.idTables.includes(table.id)) {
               return {
                  ...table,
                  status: payload.status,
                  hasReservar: true,
                  user: {
                     name: payload.clientName,
                     email: payload.clientEmail,
                     idUser: payload.idUser,
                  },
                  idReservation: payload.id,
                  timestamp: payload.timestamp,
                  relatedTables: payload.idTables.map(id => ({
                     id,
                     name: state.tables.find(t => t.id === id)?.name ?? 'Sin nombre'
                  }))
               }
            }
            return table;
         });
      },

      setCurrentValuesAction: (state, { payload }) => {
         if (payload.name === 'restaurant') {
            const data = state.restaurants.find((r) => r.name === payload.value);
            state.currentValue.restaurant = data || {};
            return;
         }

         if (payload.name === 'hour') {
            const data = state.hours.find((h) => h.hour === payload.value);
            state.currentValue.hour = data || {};
            return;
         }

         if (payload.name === 'dateStr') {
            state.currentValue.dateStr = payload.value;
            return;
         }
      },

      setCurrentSelectedTableAction: (state, { payload }) => {
         state.currentSelectedTable = payload ?? {};
      },

      updateCurrentSelectedTableAction: (state, { payload }) => {
         if (!payload || !payload.name || !payload.value) return;

         if (state.currentSelectedTable[payload.name] === payload.value) return;
         state.currentSelectedTable[payload.name] = payload.value;
      },

      toggleIsTempTableChangeAction: (state, { payload }) => {
         state.isTempTableChange = payload ?? !state.isTempTableChange;
      },

      deleteTableAction: (state, { payload }) => {
         state.tables = state.tables.filter((t) => t.id !== payload);
      },

      loaddingAction: (state, { payload }) => {
         state.loading[payload] = true
      },

      messageErrorAction: (state, { payload }) => {
         state.messageError = payload
         state.loading.tables = false
         state.loading.time = false
      }
   },
});


export const {
   loaddingAction,
   messageErrorAction,
   setCurrentSelectedTableAction,
   updateCurrentSelectedTableAction,
   toggleIsTempTableChangeAction,
   setCurrentRestaurantAction,
   setCurrentValuesAction,
   setRestaurantsAction,
   ModifyReservationTableAction,
   setHoursAction,
   setTablesAction,
   deleteTableAction,
} = tableAdminSlice.actions