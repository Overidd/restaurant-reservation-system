import { dasboardServiceProvider } from '@/doman/services';
import { loadingDashboardAction, setDashboardData, setMessageErrorDashboardAction } from './dashboardSlice';

// export const dashboardDataThunk = createAsyncThunk(
//    'dashboard/fetchData',
//    async (_, thunkAPI) => {
//       const { ok, ...res } = await dasboardServiceProvider.getDashboardData();

//       console.log(res);
//       if (!ok) {
//          return thunkAPI.rejectWithValue(res.errorMessage);
//       }

//       return res;
//    }
// );


export const dashboardDataThunk = () => {
   return async (dispatch) => {
      dispatch(loadingDashboardAction());
      const { ok, ...res } = await dasboardServiceProvider.getDashboardData({
         request: 'all',
      });

      if (!ok) {
         dispatch(setMessageErrorDashboardAction(res.errorMessage));
      }

      dispatch(setDashboardData(res));
   }
}
