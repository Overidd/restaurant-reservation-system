
import { typeStatusTable } from '@/ultils';
import { createSlice } from '@reduxjs/toolkit';

export const typeLoading = {
   HOUR: 'hour',
   TABLES: 'tables',
   SELECTEDTABLES: 'selectedTables',
   RESERVE: 'reserve'
}

export const typeStatus = {
   ACTIVE: 'active',
   PENDING: 'pending',
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
         date: null,
         hour: null,
      },

      isLoading: {
         hour: false,
         tables: false,
         selectedTables: false,
         reserve: false
      },

      tables: [],
      restaurant: {},
      availableHours: [],
      selectedTables: [],
      currentSelectedTable: {},
   },

   reducers: {
      //* Metdodo para guardar acciones del usuario DAAAA
      reserveSetAvailableHoursAction: (state, { payload }) => {
         state.availableHours = payload;
         state.isLoading.hour = false;
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

      reserveSetHourAction: (state, { payload }) => {
         state.from.hour = payload
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
         } else {
            // Seleccionar la mesa
            state.selectedTables.push({ ...payload, isSelected: true });

            state.tables = state.tables.map(table =>
               table.id === id
                  ? { ...table, isSelected: true, status: typeStatusTable.SELECTED }
                  : table
            );
         }
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
            date: null,
            hour: null,
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
         state.availableHours = [];
      },

      reserveResetInfoAction: (state) => {
         state.from = {
            info: {
               locationId: null,
               reason: null,
               diners: null,
            },
            date: null,
            hour: null,
         }
      },

      reserveResetStateTablesAction: (state) => {
         state.selectedTables = [];
         state.currentSelectedTable = {};
         state.tables = [];
      },

      reserveChangeStateAction: (state, { payload }) => {
         state.stateReserve = payload;
      },
   },
});

export const {
   //* Metdodo para guardar acciones del usuario DAAAA
   reserveSetHourAction,
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

   reserveResetAction,
} = reserveSlice.actions;