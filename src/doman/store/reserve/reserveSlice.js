
import { typeStatusTable } from '@/ultils';
import { createSlice } from '@reduxjs/toolkit';

export const typeLoading = {
   HOUR: 'hour',
   TABLES: 'tables',
   SELECTEDTABLES: 'selectedTables'
}

export const reserveSlice = createSlice({
   name: 'reverse',

   initialState: {
      errorMessage: null,
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
         selectedTables: false
      },

      selectedTables: [

      ],

      currentSelectedTable: {

      },

      tables: [

      ],

      restaurant: {

      },

      availableHours: [

      ],
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
         const isExit = state.selectedTables.find(item => item.id === payload.id);

         if (!isExit && payload.status !== typeStatusTable.BUSY) {
            state.selectedTables.push({
               ...payload,
               isSelected: true
            })
            return;
         };

         state.selectedTables = state.selectedTables.filter(item => item.id !== payload.id);
      },

      reserveSelectTableAction: (state, { payload }) => {
         state.currentSelectedTable = payload;
      },
      //* Metodo para resetear
      reserveResetAction: (state) => {
         // state.errorMessage = null;
         // state.isLoading = false;
         state.minutes = 5;

         state.selectedTables = [];
         state.currentSelectedTable = null;

         state.date = {
            info: {
               locationId: null,
               reason: null,
               diners: null,
            },
            date: null,
            hour: null,
         };

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

   reserveResetAction,
} = reserveSlice.actions;