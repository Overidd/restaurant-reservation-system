import { createSlice } from '@reduxjs/toolkit';

export const mapUiSlice = createSlice({
   name: 'mapUi',

   initialState: {
      isEdit: false,

      isTempResourceChange: false,
      selectedResource: null,
      tempRestaurant: {},
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

      setTempRestaurantAction: (state, { payload }) => {
         state.tempRestaurant = payload ?? {};
      },

      changeValueTempRestaurantAction: (state, { payload }) => {
         if (!payload?.name || !payload?.value) return;
         state.tempRestaurant[payload.name] = payload.value;
      },
   },
});

export const {
   toggleIsEditAction,
   toggleIsTempResourceChangeAction,
   setSelectedResourceAction,
   updateSelectedResourceAction,
   setTempRestaurantAction,
   changeValueTempRestaurantAction
} = mapUiSlice.actions;