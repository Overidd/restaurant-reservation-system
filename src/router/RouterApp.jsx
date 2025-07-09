
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
   TablesScreen
} from '@/screen/dashboard';
import { StatisticScreen } from '@/screen/dashboard/Statistic';
import { LocationScreen } from '@/screen/location';
import { ProductScreen } from '@/screen/product';
import { ReservationScreen } from '@/screen/reservation';

import {
   ProtectedRoute,
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

               <Route index element={<Navigate to='product' />} />
               <Route path='*' element={<Navigate to='/product' />} />
            </Route>
         </Route>

         <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo='/product' />}>
            <Route path='/dashboard' element={<DashboardLayout />} >
               <Route path='tables' element={<TablesScreen />} />
               <Route path='calendar' element={<CalendarScreen />} />
               <Route path='statistic' element={<StatisticScreen />} />

               <Route index element={<Navigate to='tables' />} />
            </Route>
         </Route>
      </Routes>
   );
};

export const RouterApp = () => (
   <BrowserRouter>
      <AppRoutes />
   </BrowserRouter>
);