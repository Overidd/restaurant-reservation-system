import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProductScreen } from '../screen/product';
import { LocationScreen } from '../screen/location';
import { ReservationScreen } from '@/screen/reservation';
import { AuthLayout, AppLayout } from '@/layout';
import { LoginScreen, RegisterScreen } from '@/screen/auth';

const AppRoutes = () => {

   return (
      <Routes>
         <Route path="/" element={<AppLayout />}>
            <Route path="product" element={<ProductScreen />}>
               <Route path="reserve" element={<ReservationScreen />} />

               <Route element={<AuthLayout />} >
                  <Route path="login" element={<LoginScreen />} />
                  <Route path="register" element={<RegisterScreen />} />
               </Route>
            </Route>

            <Route path="location" element={<LocationScreen />} >
               <Route path="reserve" element={<ReservationScreen />} />
               <Route element={<AuthLayout />} >
                  <Route path="login" element={<LoginScreen />} />
                  <Route path="register" element={<RegisterScreen />} />
               </Route>
            </Route>

            <Route index element={<Navigate to="product" />} />
            <Route path="*" element={<Navigate to="/product" />} />
         </Route>
      </Routes>
   );
};

export const RouterApp = () => (
   <BrowserRouter>
      <AppRoutes />
   </BrowserRouter>
);
