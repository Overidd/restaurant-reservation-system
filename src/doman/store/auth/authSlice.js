
import { createSlice } from '@reduxjs/toolkit';
import { authStateEmun } from './emun.auth';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      status: authStateEmun.checking, // 'not-authenticated', 'authenticated'
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null,
   },
   reducers: {
      login: (state, { payload }) => {
         state.status = authStateEmun.authenticated
         state.uid = payload.uid;
         state.email = payload.email;
         state.displayName = payload.displayName;
         state.photoURL = payload.photoURL;
         state.errorMessage = null;
      },
      logout: (state, { payload }) => {
         state.status = authStateEmun.notAuthenticated;
         state.uid = null;
         state.email = null;
         state.displayName = null;
         state.photoURL = null;
         state.errorMessage = payload.errorMessage || null;
      },
      checkingCredentials: (state) => {
         state.status = authStateEmun.checking
      }
   },
});

export const {
   login,
   logout,
   checkingCredentials
} = authSlice.actions;