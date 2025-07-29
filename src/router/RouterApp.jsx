
import {
   BrowserRouter,
   Navigate,
   Route,
   Routes
} from 'react-router-dom';

import {
   AppLayout,
   AuthLayout,
   DashboardLayout
} from '@/layout';
import {
   LoginScreen,
   RegisterScreen
} from '@/screen/auth';
import {
   CalendarScreen,
   DashboardScreen,
   MapScreen,
   RestaurantScreen
} from '@/screen/dashboard';
import { UserDetailScreen } from '@/screen/dashboard/UserDetails';
import { LocationScreen } from '@/screen/location';
import { ProductScreen } from '@/screen/product';
import { ReservationScreen } from '@/screen/reservation';

import { SearchReservationScreen } from '@/screen/search';
import {
   PublicOnlyRoute,
   PublicRoute,
} from '.';

const AppRoutes = () => {
   return (
      <Routes>
         <Route element={<PublicRoute />}>
            <Route path='/' element={<AppLayout />}>
               <Route path='product' element={<ProductScreen />}>
                  <Route path='reserve' element={<ReservationScreen />} />
                  <Route element={<PublicOnlyRoute />}>
                     <Route element={<AuthLayout />}>
                        <Route path='login' element={<LoginScreen />} />
                        <Route path='register' element={<RegisterScreen />} />
                     </Route>
                  </Route>
               </Route>

               <Route path='location' element={<LocationScreen />}>
                  <Route path='reserve' element={<ReservationScreen />} />
                  <Route element={<PublicOnlyRoute />}>
                     <Route element={<AuthLayout />}>
                        <Route path='login' element={<LoginScreen />} />
                        <Route path='register' element={<RegisterScreen />} />
                     </Route>
                  </Route>
               </Route>

               <Route path='search-reservation' element={<SearchReservationScreen />}>
                  <Route path='reserve' element={<ReservationScreen />} />
                  <Route element={<PublicOnlyRoute />}>
                     <Route element={<AuthLayout />}>
                        <Route path='login' element={<LoginScreen />} />
                        <Route path='register' element={<RegisterScreen />} />
                     </Route>
                  </Route>
               </Route>

               <Route index element={<Navigate to='product' />} />
               <Route path='*' element={<Navigate to='/product' />} />
            </Route>
         </Route>

         {/* <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo='/product' />}>
            <Route path='/dashboard' element={<DashboardLayout />} >
               <Route path='tables' element={<TablesScreen />} />
               <Route path='calendar' element={<CalendarScreen />} />
               <Route path='statistic' element={<StatisticScreen />} />

               <Route index element={<Navigate to='tables' />} />
            </Route>
         </Route> */}

         <Route path='/dashboard' element={<DashboardLayout />} >
            <Route index element={<DashboardScreen />} />
            <Route path='tables' element={<MapScreen />} />
            <Route path='calendar' element={<CalendarScreen />} />
            <Route path='details' element={<UserDetailScreen />} />
            <Route path='store' element={<RestaurantScreen />} />
            {/* <Route index element={<Navigate to='tables' />} /> */}
         </Route>
         {/* <Route path='*' element={<Navigate to='/' />} /> */}
      </Routes>
   );
};

export const RouterApp = () => (
   <BrowserRouter>
      <AppRoutes />
   </BrowserRouter>
);