
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
      uid: null,
      email: null,
      name: null,
      photoURL: null,
   },
   reducers: {
      loginAction: (state, { payload }) => {
         state.status = authStateEmun.authenticated
         state.uid = payload.uid;
         state.email = payload.email;
         state.name = payload.name;
         state.photoURL = payload.photoURL;
         state.errorMessage = null;
         state.isLoading = false;
      },

      logoutAction: (state, { payload }) => {
         state.status = authStateEmun.notAuthenticated;
         state.uid = null;
         state.email = null;
         state.name = null;
         state.photoURL = null;
         state.errorMessage = payload?.errorMessage || null;
         state.isLoading = false;
      },

      checkingCredentialAction: (state, { payload }) => {
         console.log(payload);
         state.status = authStateEmun.checking
      },

      loaddingAction: (state) => {
         state.isLoading = true
      }
   },
});

export const {
   loginAction,
   logoutAction,
   loaddingAction,
   checkingCredentialAction
} = authSlice.actions;