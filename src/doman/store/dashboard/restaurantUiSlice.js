import { createSlice } from '@reduxjs/toolkit';

export const restaurantUiSlice = createSlice({
   name: 'restaurantUi',

   initialState: {
      isEdit: false,

      isTempResourceChange: false,
      selectedResource: null
   },

   reducers: {
      toggleIsEditAction: (state, { payload }) => {
         state.isEdit = payload ?? !state.isEdit;
      },

      toggleIsTempResourceChangeAction: (state, { payload }) => {
         state.isTempResourceChange = payload ?? !state.isTempResourceChange;
      },

      setSelectedResourceAction: (state, { payload }) => {
         state.selectedResource = payload ?? {};
      },

      updateSelectedResourceAction: (state, { payload }) => {
         if (!payload || !payload.name || !payload.value) return;

         if (state.selectedResource[payload.name] === payload.value) return;
         state.selectedResource[payload.name] = payload.value;
      },
   },
});

export const {
   toggleIsEditAction,
   toggleIsTempResourceChangeAction,
   setSelectedResourceAction,
   updateSelectedResourceAction
} = restaurantUiSlice.actions;