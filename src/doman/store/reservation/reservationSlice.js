
import { createSlice } from '@reduxjs/toolkit';

import { typeStatusTable } from '@/ultils';

export const typeLoading = {
   HOUR: 'hour',
   TABLES: 'tables',
   SELECTEDTABLES: 'selectedTables',
   RESERVE: 'reserve'
}

export const typeStatus = {
   ACTIVE: 'active',
   PENDING: 'pending',
   PENDING_AUTH: 'pendingAuth',
   COMPLETED: 'completed',
}

export const reservationSlice = createSlice({
   name: 'reservation',

   initialState: {
      stateReserve: typeStatus.ACTIVE,
      errorMessage: null,
      stateMessage: null,
      isOpenModal: false,
      from: {
         info: {
            restaurantId: null,
            reason: null,
            diners: null,
         },

         hour: {
            id: null,
            name: null,
            tablesAvailable: null
         },

         date: null,
      },

      isLoading: {
         hour: false,
         tables: false,
         selectedTables: false,
         reserve: false
      },

      tables: [],
      objects: [],
      availableHour: [],

      currentSelectedTable: {},
      selectedTables: [],
      restaurant: {},
   },

   reducers: {
      //* Metdodo para guardar acciones del usuario DAAAA
      reserveSetAvailableHoursAction: (state, { payload }) => {
         state.availableHour = payload;
         state.isLoading.hour = false;
         state.errorMessage = null;
      },
      reserveSetTablesAction: (state, { payload }) => {
         state.tables = payload;
         state.isLoading.tables = false;
         state.errorMessage = null;
      },

      reserveSetObjectAction: (state, { payload }) => {
         state.objects = payload;
         state.isLoading.hour = false;
         state.errorMessage = null;
      },

      reserveSetRestaurantAction: (state, { payload }) => {
         state.restaurant = payload;
      },

      //* Metodos de loding
      reserveLoadingAction: (state, { payload }) => {
         state.isLoading[payload] = true;
      },

      reserveMessageErrorAction: (state, { payload }) => {
         state.errorMessage = payload;
         state.isLoading.hour = null;
         state.isLoading.tables = null;
         state.isLoading.selectedTables = null;
      },

      reserveStateMessageAction: (state, { payload }) => {
         state.stateMessage = payload
      },

      //* Metodo para guardar las tablas Seleccionadas siuuu
      reserveSetInfoAction: (state, { payload }) => {
         state.from.info = payload
      },

      reserveSetDateAction: (state, { payload }) => {
         state.from.date = payload
      },

      reserveSetHoursAction: (state, { payload }) => {
         state.from.hour = payload
      },

      reserveToggleTableAction: (state, { payload }) => {
         const { id, status } = payload;
         const isSelected = state.selectedTables.some(table => table.id === id);

         if (status === typeStatusTable.BUSY || status === typeStatusTable.NOTAVAILABLE) return;

         if (isSelected) {
            // Deseleccionar la mesa
            state.selectedTables = state.selectedTables.filter(table => table.id !== id);

            state.tables = state.tables.map(table =>
               table.id === id
                  ? { ...table, isSelected: false, status: typeStatusTable.AVAILABLE }
                  : table
            );
            return;
         }

         // if (state.selectedTables.length >= state.from.time.tablesAvailable) {
         //    return;
         // };

         if (state.selectedTables.length >= state.from.hour.tablesAvailable) return;
         if (state.selectedTables.reduce((acc, table) => acc + table.chairs, 0) >= state.from.info.diners) return;


         state.selectedTables.push({ ...payload, isSelected: true });

         state.tables = state.tables.map(table =>
            table.id === id
               ? { ...table, isSelected: true, status: typeStatusTable.SELECTED }
               : table
         );
      },


      reserveSelectTableAction: (state, { payload }) => {
         state.currentSelectedTable = payload;
      },

      //* Metodo para resetear
      reserveResetAction: (state) => {
         state.errorMessage = null;
         state.stateMessage = null;
         state.isOpenModal = false;
         state.from = {
            info: {
               restaurantId: null,
               reason: null,
               diners: null,
            },
            hour: {
               id: null,
               name: null,
               tablesAvailable: null
            },
            date: null,
         }

         state.isLoading = {
            hour: false,
            tables: false,
            selectedTables: false,
            reserve: false
         }
         state.selectedTables = [];
         state.currentSelectedTable = {};
         state.tables = [];
         state.restaurant = {};
         state.availableHour = [];
      },

      reserveResetInfoAction: (state) => {
         state.from = {
            info: {
               restaurantId: null,
               reason: null,
               diners: null,
            },
            hour: {
               id: null,
               name: null,
               tablesAvailable: null
            },
            date: null,
         }
      },

      reserveResetStateTablesAction: (state) => {
         state.selectedTables = [];
         state.currentSelectedTable = {};
         state.tables = [];
      },

      reserveResetSelectedTablesAction: (state) => {
         state.selectedTables = [];
         state.currentSelectedTable = {};
         state.tables = state.tables.map(table => {
            if (table.isSelected) {
               table.isSelected = false;
               table.status = typeStatusTable.AVAILABLE;
            }
            return table
         });
      },

      reserveChangeStateAction: (state, { payload }) => {
         state.stateReserve = payload;
      },
   },
});

export const {
   //* Metdodo para guardar acciones del usuario DAAAA
   reserveSetHoursAction,
   reserveSetAvailableHoursAction,
   reserveSetTablesAction,
   reserveSetRestaurantAction,
   reserveLoadingAction,
   reserveMessageErrorAction,

   reserveSetInfoAction,
   reserveSetDateAction,
   reserveToggleTableAction,
   reserveSelectTableAction,
   reserveChangeStateAction,
   reserveStateMessageAction,
   reserveResetStateTablesAction,
   reserveResetInfoAction,
   reserveResetSelectedTablesAction,
   reserveSetObjectAction,

   reserveResetAction,
} = reservationSlice.actions;