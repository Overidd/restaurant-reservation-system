
import { createSlice } from '@reduxjs/toolkit';

import { typeStatusTable } from '@/ultils';

export const typeLoading = {
   TIME: 'time',
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

export const reserveSlice = createSlice({
   name: 'reverse',

   initialState: {
      stateReserve: typeStatus.ACTIVE,
      errorMessage: null,
      stateMessage: null,
      isOpenModal: false,
      from: {
         info: {
            locationId: null,
            reason: null,
            diners: null,
         },

         time: {
            id: null,
            hour: null,
            tablesAvailable: null
         },

         date: null,
      },

      isLoading: {
         time: false,
         tables: false,
         selectedTables: false,
         reserve: false
      },

      tables: [],
      availableTime: [],

      currentSelectedTable: {},
      selectedTables: [],
      restaurant: {},
   },

   reducers: {
      //* Metdodo para guardar acciones del usuario DAAAA
      reserveSetAvailableTimesAction: (state, { payload }) => {
         state.availableTime = payload;
         state.isLoading.time = false;
         state.errorMessage = null;
      },
      reserveSetTablesAction: (state, { payload }) => {
         state.tables = payload;
         state.isLoading.tables = false;
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
         state.isLoading.time = null;
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

      reserveSetTimeAction: (state, { payload }) => {
         state.from.time = payload
      },

      reserveToggleTableAction: (state, { payload }) => {
         const { id, status } = payload;
         const isSelected = state.selectedTables.some(table => table.id === id);

         if (status === typeStatusTable.BUSY) return;

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

         if (state.selectedTables.length >= state.from.time.tablesAvailable) {
            return;
         };

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
               locationId: null,
               reason: null,
               diners: null,
            },
            time: {
               id: null,
               hour: null,
               tablesAvailable: null
            },
            date: null,
         }

         state.isLoading = {
            time: false,
            tables: false,
            selectedTables: false,
            reserve: false
         }
         state.selectedTables = [];
         state.currentSelectedTable = {};
         state.tables = [];
         state.restaurant = {};
         state.availableTime = [];
      },

      reserveResetInfoAction: (state) => {
         state.from = {
            info: {
               locationId: null,
               reason: null,
               diners: null,
            },
            time: {
               id: null,
               hour: null,
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
   reserveSetTimeAction,
   reserveSetAvailableTimesAction,
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

   reserveResetAction,
} = reserveSlice.actions;