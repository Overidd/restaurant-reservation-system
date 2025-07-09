import { createSlice } from '@reduxjs/toolkit';

export const UISlice = createSlice({
   name: 'UI',
   initialState: {
      isOpenModalReserve: false,
      isOpenModalAuth: false,
      isOpenModalConfirmReserve: false,
      isOpenModalTableEdit: false,
      isOpenModalTableEditProperty: false,
      isOpenModalTableReserve: false,
      isOpenModalUser: false
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

      openModalTableEditAction: (state) => {
         state.isOpenModalTableEdit = true;
      },

      closeModalTableEditAction: (state) => {
         state.isOpenModalTableEdit = false;
      },

      openModalTableEditPropertyAction: (state) => {
         state.isOpenModalTableEditProperty = true;
      },

      closeModalTableEditPropertyAction: (state) => {
         state.isOpenModalTableEditProperty = false;
      },

      openModalReserveTableAction: (state) => {
         state.isOpenModalTableReserve = true;
      },

      closeModalReserveTableAction: (state) => {
         state.isOpenModalTableReserve = false;
      },

      openModalUserAction: (state) => {
         state.isOpenModalUser = true;
      },

      closeModalUserAction: (state) => {
         state.isOpenModalUser = false;
      },
   },
});


export const {
   openModalReserveAction,
   closeModalReserveAction,
   openModalAuthAction,
   closeModalAuthAction,
   openModalConfirmReserveAction,
   closeModalConfirmReserveAction,
   openModalTableEditAction,
   closeModalTableEditAction,
   openModalTableEditPropertyAction,
   closeModalTableEditPropertyAction,
   openModalReserveTableAction,
   closeModalReserveTableAction,
   openModalUserAction,
   closeModalUserAction
} = UISlice.actions;