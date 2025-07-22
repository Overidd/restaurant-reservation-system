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
      isOpenModalUser: false,
      isOpenModalCreateReservations: false,
      isOpenSlideOverObjectCreate: false,
      isOpenModalCreateItemObject: false,
      isOpenModalEditItemObject: false,
      isOpenModalCreateCategoryObject: false,
      isOpenModalEditCategoryObject: false,
      isOpenModalUserDetail: false
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

      openModalCreateReservationsAction: (state) => {
         state.isOpenModalCreateReservations = true;
      },

      closeModalCreateReservationsAction: (state) => {
         state.isOpenModalCreateReservations = false;
      },

      openSlideOverObjectCreateAction: (state) => {
         state.isOpenSlideOverObjectCreate = true;
      },

      closeSlideOverObjectCreateAction: (state) => {
         state.isOpenSlideOverObjectCreate = false;
      },

      //* isOpenModalCreateItemObject
      openModalCreateItemObjectAction: (state) => {
         state.isOpenModalCreateItemObject = true;
      },

      closeModalCreateItemObjectAction: (state) => {
         state.isOpenModalCreateItemObject = false;
      },

      //* isOpenModalEditItemObject 
      openModalEditItemObjectAction: (state) => {
         state.isOpenModalEditItemObject = true;
      },

      closeModalEditItemObjectAction: (state) => {
         state.isOpenModalEditItemObject = false;
      },

      //* isOpenModalCreateCategoryObject
      openModalCreateCategoryObjectAction: (state) => {
         state.isOpenModalCreateCategoryObject = true;
      },

      closeModalCreateCategoryObjectAction: (state) => {
         state.isOpenModalCreateCategoryObject = false;
      },

      //* isOpenModalEditCategoryObject
      openModalEditCategoryObjectAction: (state) => {
         state.isOpenModalEditCategoryObject = true;
      },

      closeModalEditCategoryObjectAction: (state) => {
         state.isOpenModalEditCategoryObject = false;
      },

      openModalUserDetailAction: (state) => {
         state.isOpenModalUserDetail = true;
      },

      closeModalUserDetailAction: (state) => {
         state.isOpenModalUserDetail = false;
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
   closeModalUserAction,

   openModalCreateReservationsAction,
   closeModalCreateReservationsAction,

   openSlideOverObjectCreateAction,
   closeSlideOverObjectCreateAction,

   openModalCreateItemObjectAction,
   closeModalCreateItemObjectAction,

   openModalEditItemObjectAction,
   closeModalEditItemObjectAction,

   openModalCreateCategoryObjectAction,
   closeModalCreateCategoryObjectAction,

   openModalEditCategoryObjectAction,
   closeModalEditCategoryObjectAction,

   openModalUserDetailAction,
   closeModalUserDetailAction
} = UISlice.actions;