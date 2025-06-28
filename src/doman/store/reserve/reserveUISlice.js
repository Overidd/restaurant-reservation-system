import { createSlice } from '@reduxjs/toolkit';

export const reserveUISlice = createSlice({
   name: 'reserveUI',
   initialState: {
      isOpenModal: false
   },
   reducers: {
      openModalAction: (state) => {
         state.isOpenModal = true;
      },

      closeModalAction: (state) => {
         state.isOpenModal = false;
      },
   },
});


export const {
   openModalAction,
   closeModalAction
} = reserveUISlice.actions;