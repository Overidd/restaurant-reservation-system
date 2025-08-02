
import {
   BrowserRouter,
   Navigate,
   Route,
   Routes
} from 'react-router-dom';

import { LoadingScreen } from '@/components/common';
import {
   AppLayout,
   AuthLayout,
   DashboardLayout
} from '@/layout';
import { Suspense } from 'react';
import {
   ProtectedRoute,
   PublicOnlyRoute,
   PublicRoute,
} from '.';

import {
   CalendarScreen,
   DashboardScreen,
   HomeScreen,
   LocationScreen,
   LoginScreen,
   MapScreen,
   ProductScreen,
   RecoverScreen,
   RegisterScreen,
   ReservationScreen,
   RestaurantScreen,
   SearchReservationScreen,
   UserDetailScreen,
} from './lazyRoutes';

const AppRoutes = () => {
   return (
      <Suspense fallback={<LoadingScreen />}>
         <Routes>
            <Route element={<PublicRoute />}>
               <Route path='/' element={<AppLayout />}>
                  <Route path='home' element={<HomeScreen />}>
                     <Route path='reserve' element={<ReservationScreen />} />
                     <Route element={<PublicOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                           <Route path='login' element={<LoginScreen />} />
                           <Route path='register' element={<RegisterScreen />} />
                           <Route path='recover' element={<RecoverScreen />} />
                        </Route>
                     </Route>
                  </Route>

                  <Route path='product' element={<ProductScreen />}>
                     <Route path='reserve' element={<ReservationScreen />} />
                     <Route element={<PublicOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                           <Route path='login' element={<LoginScreen />} />
                           <Route path='register' element={<RegisterScreen />} />
                           <Route path='recover' element={<RecoverScreen />} />
                        </Route>
                     </Route>
                  </Route>

                  <Route path='location' element={<LocationScreen />}>
                     <Route path='reserve' element={<ReservationScreen />} />
                     <Route element={<PublicOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                           <Route path='login' element={<LoginScreen />} />
                           <Route path='register' element={<RegisterScreen />} />
                           <Route path='recover' element={<RecoverScreen />} />
                        </Route>
                     </Route>
                  </Route>

                  <Route path='search-reservation' element={<SearchReservationScreen />}>
                     <Route path='reserve' element={<ReservationScreen />} />
                     <Route element={<PublicOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                           <Route path='login' element={<LoginScreen />} />
                           <Route path='register' element={<RegisterScreen />} />
                           <Route path='recover' element={<RecoverScreen />} />
                        </Route>
                     </Route>
                  </Route>

                  <Route index element={<Navigate to='home' />} />
                  <Route path='*' element={<Navigate to='/home' />} />
               </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo='/home' />}>
               <Route path='/dashboard' element={<DashboardLayout />} >
                  <Route index element={<DashboardScreen />} />
                  <Route path='tables' element={<MapScreen />} />
                  <Route path='calendar' element={<CalendarScreen />} />
                  <Route path='details' element={<UserDetailScreen />} />
                  <Route path='store' element={<RestaurantScreen />} />
                  {/* <Route index element={<Navigate to='tables' />} /> */}
               </Route>
            </Route>
         </Routes>
      </Suspense>
   );
};

export const RouterApp = () => (
   <BrowserRouter>
      <AppRoutes />
   </BrowserRouter>
);