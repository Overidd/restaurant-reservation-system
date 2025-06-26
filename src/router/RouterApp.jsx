import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/App';
import { ProductScreen } from '../screen/product';
import { LocationScreen } from '../screen/location';
import { ReservationScreen } from '@/screen/reservation';

const AppRoutes = () => {

   return (
      <Routes>
         <Route path="/" element={<AppLayout />}>
            <Route path="product" element={<ProductScreen />}>
               <Route path="reserve" element={<ReservationScreen />} />
            </Route>

            <Route path="location" element={<LocationScreen />} >
               <Route path="reserve" element={<ReservationScreen />} />
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
