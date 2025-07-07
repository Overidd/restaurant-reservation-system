import { typeStatusTable } from '@/ultils';
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
                  reservation: {
                     code: payload.code,
                     idReservation: payload.id,
                     timestamp: payload.timestamp,
                     relatedTables: payload.idTables.map(id => ({
                        id,
                        name: state.tables.find(t => t.id === id)?.name ?? 'Sin nombre'
                     }))
                  }
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

      deleteTablesAction: (state, { payload }) => {
         state.tables = state.tables.map((t) => {
            if (payload.includes(t.id)) {
               return {
                  ...t,
                  status: typeStatusTable.AVAILABLE,
                  hasReservar: false,
                  relatedTables: []
               };
            }
            return t;
         });
      },
      clearTablesRelationAction: (state, { payload: { idTablesNoSelect = [], idTables = [] } }) => {
         state.tables = state.tables.map((t) => {
            if (idTablesNoSelect.includes(t.id)) {
               return {
                  ...t,
                  relatedTables: t.relatedTables.filter((r) => !idTables.includes(r.id))
               };
            } else {
               return t;
            }
         })
      },
      changeStatusTableAction: (state, { payload }) => {

         if (payload.status === typeStatusTable.ACTIVE) {
            state.tables = state.tables.map((t) => {
               if (t.id === payload.idTable) {
                  return {
                     ...t,
                     status: typeStatusTable.ACTIVE,
                     hasReservar: false,
                     user: null,
                     reservation: null
                  };
               }
               return t;
            });

            return;
         }

         if (payload.status === typeStatusTable.COMPLETED) {
            state.tables = state.tables.map((t) => {
               if (t.id === payload.idTable) {
                  return {
                     ...t,
                     status: typeStatusTable.COMPLETED
                  };
               }
               return t;
            });
            return;
         }

         if (payload.status === typeStatusTable.PENDING) {
            const { reservation, idTables } = payload;
            state.tables = state.tables.map((t) => {
               if (idTables.includes(t.id)) {
                  return {
                     ...t,
                     hasReservar: true,
                     status: typeStatusTable.PENDING,
                     user: reservation?.user ?? null,
                     reservation: reservation?.reservation ?? null,
                     createdAt: reservation.createdAt,
                  };
               }
               return t;
            });
            return
         }

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
   deleteTablesAction,
   clearTablesRelationAction,
   changeStatusTableAction,
} = tableAdminSlice.actions