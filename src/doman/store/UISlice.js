import { createSlice } from '@reduxjs/toolkit';

export const UISlice = createSlice({
   name: 'UI',
   initialState: {
      isOpenModalReserve: false,
      isOpenModalAuth: false,
      isOpenModalConfirmReserve: false
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

      openModalConfirmReserveAction: (state) => {
         state.isOpenModalConfirmReserve = true;
      },

      closeModalConfirmReserveAction: (state) => {
         state.isOpenModalConfirmReserve = false;
      },
   },
});


export const {
   openModalReserveAction,
   closeModalReserveAction,
   openModalAuthAction,
   closeModalAuthAction,
   openModalConfirmReserveAction,
   closeModalConfirmReserveAction
} = UISlice.actions;