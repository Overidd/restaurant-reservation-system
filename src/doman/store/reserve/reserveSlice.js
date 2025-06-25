
import { typeStatusTable } from '@/ultils';
import { createSlice } from '@reduxjs/toolkit';

export const reserveSlice = createSlice({
   name: 'reverse',

   initialState: {
      errorMessage: null,
      isLoading: false,
      date: {
         info: {
            location: null,
            reason: null,
            diners: null,
         },
         date: null,
         hour: null,
      },

      selectedTables: [
         // {
         //    id: 1,
         //    name: null,
         //    description: null,
         //    image: null,
         //    status: null,
         //    type: null,
         //    chairs: null,
         // }
      ],
      currentSelectedTable: {
         // id: 1,
         // name: null,
         // description: null,
         // image: null,
         // status: null,
         // type: null,
         // chairs: null,
      }
   },

   reducers: {
      reserveSetDataAction: (state, { payload }) => {
         state.date = payload
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

      reserveResetAction: (state) => {
         state.errorMessage = null;
         state.isLoading = false;
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

      reserveSetErrorAction: (state, { payload }) => {
         state.errorMessage = payload;
      },
   },
});

export const {
   reserveSetErrorAction,
   reserveSetDataAction,
   reserveToggleTableAction,
   reserveSelectTableAction,
   reserveResetAction,
} = reserveSlice.actions;