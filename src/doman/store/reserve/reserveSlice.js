
import { typeStatusTable } from '@/ultils';
import { createSlice } from '@reduxjs/toolkit';

export const reserveSlice = createSlice({
   name: 'reverse',

   initialState: {
      errorMessage: null,
      isOpenModal: false,
      data: {
         info: {
            location: null,
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

      availableHours: [

      ],
   },

   reducers: {
      //* Metdodo para guardar acciones del usuario DAAAA
      reserveSetInfoAction: (state, { payload }) => {
         state.data.info = payload
      },

      reserveSetDateAction: (state, { payload }) => {
         state.data.date = payload
      },

      reserveSetHourAction: (state, { payload }) => {
         state.data.hour = payload
      },

      reserveSetTablesAction: (state, { payload }) => {
         state.tables = payload
      },

      reserveSetHoursAction: (state, { payload }) => {
         state.availableHours = payload
      },

      //* Metodo para guardar las tablas Seleccionadas siuuu
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
               location: null,
               reason: null,
               diners: null,
            },
            date: null,
            hour: null,
         };

      },


      //TODO: trasladar a otro Slice gaaa. Metodos de UI
      openModalAction: (state) => {
         state.isOpenModal = true;
      },

      closeModalAction: (state) => {
         state.isOpenModal = false;
      },
   },
});

export const {
   //* Metdodo para guardar acciones del usuario DAAAA
   reserveSetInfoAction,
   reserveSetDateAction,
   reserveSetHourAction,
   reserveSetTablesAction,
   reserveSetHoursAction,

   reserveToggleTableAction,
   reserveSelectTableAction,
   reserveResetAction,


   // openModalAction,
   // closeModalAction
} = reserveSlice.actions;