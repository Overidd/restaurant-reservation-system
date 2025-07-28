
import { typeStatusTable } from '@/ultils';
import { createSlice } from '@reduxjs/toolkit';

export const restaurantResourceSlice = createSlice({
   name: 'restaurantResource',
   initialState: {
      messageError: null,

      tables: [],

      objects: [],

      loading: false,
   },

   reducers: {
      deleteTableAction: (state, { payload }) => {
         if (!payload) return;
         state.tables = state.tables.filter(t => t.id !== payload);
      },

      updateTableAction: (state, { payload }) => {
         if (!payload) return;
         state.tables = state.tables.map(t => t.id === payload.id ? { ...t, ...payload } : t);
      },

      deleteObjectAction: (state, { payload }) => {
         if (!payload) return;
         state.objects = state.objects.filter(o => o.id !== payload);
      },

      loaddingAction: (state, { payload }) => {
         state.loading = payload ?? true
      },

      messageErrorAction: (state, { payload }) => {
         state.messageError = payload
         state.loading = false
      },

      setObjectAction: (state, { payload }) => {
         state.objects = [...state.objects, { ...payload }]
      },

      setTableAction: (state, { payload }) => {
         state.tables = [...state.tables, {
            ...payload,
            hasReservar: false,
            isBlocked: false,
            status: typeStatusTable.AVAILABLE,
            reservation: null,
            user: null
         }]
      },

      setTablesAndObjectsAction: (state, { payload }) => {
         state.messageError = null
         state.loading = false
         state.tables = payload.tables;
         state.objects = payload.objects;
      },

      // Escuchar notificaciones
      listenTableNofityAction: (state, { payload }) => {
         state.tables = state.tables.map(table => {
            if (payload.tables.find(t => t.id === table.id)) {
               return {
                  ...table,
                  status: payload.status,
                  hasReservar: true,
                  user: {
                     name: payload.name,
                     email: payload.email,
                     idUser: payload.idUser,
                  },
                  reservation: {
                     code: payload.code,
                     idReservation: payload.id,
                     timestamp: payload.timestamp,
                     relatedTables: payload.tables
                  }
               }
            }
            return table;
         });
      },

      changeTableToAvailableAction: (state, { payload }) => {
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
                  relatedTables: t.reservation.relatedTables.filter((r) => !idTables.includes(r.id))
               };
            } else {
               return t;
            }
         })
      },

      changeStatusTableAction: (state, { payload }) => {
         if (payload.status === typeStatusTable.AVAILABLE) {
            state.tables = state.tables.map((t) => {
               if (payload.idTables.includes(t.id)) {
                  return {
                     ...t,
                     status: typeStatusTable.AVAILABLE,
                     hasReservar: false,
                     user: null,
                     reservation: null,
                     isBlocked: false
                  };
               }
               return t;
            });

            return;
         }

         if (payload.status === typeStatusTable.CONFIRMED) {
            state.tables = state.tables.map((t) => {
               if (payload.idTables.includes(t.id)) {
                  return {
                     ...t,
                     status: typeStatusTable.CONFIRMED
                  };
               }
               return t;
            });
            return;
         }

         if (payload.status === typeStatusTable.PENDING) {
            const { reservation, idTables } = payload;
            state.tables = state.tables.map((t) => {
               if (payload.idTables.includes(t.id)) {
                  return {
                     ...t,
                     hasReservar: true,
                     status: typeStatusTable.PENDING,
                     user: reservation?.user ?? null,
                     reservation: {
                        ...reservation.reservation,
                        relatedTables: idTables.map(id => ({
                           id,
                           name: state.tables.find(t => t.id === id)?.name ?? 'Sin nombre'
                        }))
                     },
                     createdAt: reservation.createdAt,
                  };
               }
               return t;
            });
            return
         }

         if (payload.status === typeStatusTable.BLOCKED) {
            state.tables = state.tables.map((t) => {
               if (payload.idTables.includes(t.id)) {
                  return {
                     ...t,
                     status: typeStatusTable.BLOCKED,
                     // isBlocked: true
                  };
               }
               return t;
            });
            return
         }

      },
   },
});

export const {
   setTablesAndObjectsAction,
   listenTableNofityAction,
   changeTableToAvailableAction,
   changeStatusTableAction,
   clearTablesRelationAction,
   loaddingAction,
   messageErrorAction,
   deleteTableAction,
   deleteObjectAction,
   setObjectAction,
   setTableAction,
   updateTableAction,
} = restaurantResourceSlice.actions