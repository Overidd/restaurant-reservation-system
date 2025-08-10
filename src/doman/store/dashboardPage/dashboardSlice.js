import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
   name: 'dashboard',
   initialState: {
      isRequest: false,
      isLoading: false,
      metrics: {
         total: 0,
         confirmed: 0,
         released: 0,
         canceled: 0,
         noShow: 0,
      },
      growthRateClients: {
         totalClients: 0,
         newClientsThisMonth: 0,
         growthRate: 0
      },
      trends: [],
      topClients: [],
      problematicClients: [],
      topClientAnalysis: [],
      clientReservations: [], // TODO: 
      messageError: null,
   }, // DashboardState,
   reducers: {
      setDashboardData: (state, action) => {
         // if (!action.payload) return;
         Object.assign(state, {
            ...action.payload,
            isLoading: false,
            error: null,
            isRequest: true
         });
      },

      setMessageErrorDashboardAction: (state, { payload }) => {
         state.messageError = payload;
      },

      loadingDashboardAction: (state, { payload }) => {
         state.isLoading = payload ?? true;
      },
   },
   // extraReducers: (builder) => {
   //    builder
   //       .addCase(dashboardDataThunk.pending, (state) => {
   //          state.isLoading = true;
   //       })
   //       .addCase(dashboardDataThunk.fulfilled, (state, action) => {
   //          Object.assign(state, {
   //             ...action.payload,
   //             isLoading: false,
   //             error: null,
   //             isRequest: true
   //          });
   //       })
   //       .addCase(dashboardDataThunk.rejected, (state, action) => {
   //          state.isLoading = false;
   //          state.messageError = action?.error?.message || 'Error al cargar el dashboard';
   //       });
   // },
});

export const {
   setDashboardData,
   loadingDashboardAction,
   setMessageErrorDashboardAction
} = dashboardSlice.actions;