import { createSlice } from '@reduxjs/toolkit';

export const UISlice = createSlice({
   name: 'UI',
   initialState: {
      isOpenModalReserve: false,
      isOpenModalAuth: false
   },
   reducers: {
      openModalReserveAction: (state) => {
         state.isOpenModalReserve = true;
      },

      closeModalReserveAction: (state) => {
         state.isOpenModalReserve = false;
      },

      openModalAuthAction: (state) => {
         state.isOpenModalAuth = true;
      },

      closeModalAuthAction: (state) => {
         state.isOpenModalAuth = false;
      },
   },
});


export const {
   openModalReserveAction,
   closeModalReserveAction,
   openModalAuthAction,
   closeModalAuthAction
} = UISlice.actions;