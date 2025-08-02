
import { createSlice } from '@reduxjs/toolkit';

export const authStateEmun = {
   checking: 'checking',
   notAuthenticated: 'not-authenticated',
   authenticated: 'authenticated',
}

export const ReducerType = {
   AuthReducer: 'authReducer',
   JournalReducer: 'journalReducer',
   ProductReducer: 'productReducer',
};

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      status: authStateEmun.checking, // 'checking', 'not-authenticated', 'authenticated' 
      isLoading: false,
      errorMessage: null,
      user: {
         id: null,
         email: null,
         name: null,
         photoURL: null,
         phone: null,
         address: null,
         role: null
      }
   },

   reducers: {
      loginAction: (state, { payload }) => {
         state.status = authStateEmun.authenticated
         state.user = payload;
         state.errorMessage = null;
         state.isLoading = false;
      },

      logoutAction: (state, { payload }) => {
         state.status = authStateEmun.notAuthenticated;
         state.user = {};
         state.errorMessage = payload?.errorMessage || null;
         state.isLoading = false;
      },

      checkingCredentialAction: (state) => {
         state.status = authStateEmun.checking
      },

      loaddingAction: (state, { payload }) => {
         state.isLoading = payload ?? true;
      },

      updateProfileAction: (state, { payload }) => {
         state.user = {
            ...state.user,
            ...payload
         };
      }
   },
});

export const {
   loginAction,
   logoutAction,
   loaddingAction,
   checkingCredentialAction,
   updateProfileAction
} = authSlice.actions;