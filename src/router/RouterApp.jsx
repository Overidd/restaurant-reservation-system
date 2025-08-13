
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
   CalendarPage,
   DashboardPage,
   HomePage,
   LocationPage,
   LoginPage,
   MapPage,
   ProductPage,
   RecoverPage,
   RegisterPage,
   ReservationPage,
   RestaurantPage,
   SearchReservationPage,
   UserDetailPage,
} from './lazyRoutes';

const AppRoutes = () => {
   return (
      <Suspense fallback={<LoadingScreen />}>
         <Routes>
            <Route element={<PublicRoute />}>
               <Route path='/' element={<AppLayout />}>
                  <Route path='home' element={<HomePage />}>
                     <Route path='reserve' element={<ReservationPage />} />
                     <Route element={<PublicOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                           <Route path='login' element={<LoginPage />} />
                           <Route path='register' element={<RegisterPage />} />
                           <Route path='recover' element={<RecoverPage />} />
                        </Route>
                     </Route>
                  </Route>

                  <Route path='product' element={<ProductPage />}>
                     <Route path='reserve' element={<ReservationPage />} />
                     <Route element={<PublicOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                           <Route path='login' element={<LoginPage />} />
                           <Route path='register' element={<RegisterPage />} />
                           <Route path='recover' element={<RecoverPage />} />
                        </Route>
                     </Route>
                  </Route>

                  <Route path='location' element={<LocationPage />}>
                     <Route path='reserve' element={<ReservationPage />} />
                     <Route element={<PublicOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                           <Route path='login' element={<LoginPage />} />
                           <Route path='register' element={<RegisterPage />} />
                           <Route path='recover' element={<RecoverPage />} />
                        </Route>
                     </Route>
                  </Route>

                  <Route path='search-reservation' element={<SearchReservationPage />}>
                     <Route path='reserve' element={<ReservationPage />} />
                     <Route element={<PublicOnlyRoute />}>
                        <Route element={<AuthLayout />}>
                           <Route path='login' element={<LoginPage />} />
                           <Route path='register' element={<RegisterPage />} />
                           <Route path='recover' element={<RecoverPage />} />
                        </Route>
                     </Route>
                  </Route>

                  <Route index element={<Navigate to='home' />} />
                  <Route path='*' element={<Navigate to='/home' />} />
               </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo='/home' />}>
               <Route path='/dashboard' element={<DashboardLayout />} >
                  <Route index element={<DashboardPage />} />
                  <Route path='tables' element={<MapPage />} />
                  <Route path='calendar' element={<CalendarPage />} />
                  <Route path='details' element={<UserDetailPage />} />
                  <Route path='store' element={<RestaurantPage />} />
                  <Route index element={<Navigate to='/dashboard' />} />
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