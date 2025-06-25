import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/App';
import { ProductScreen } from '../screen/product';
import { LocationScreen } from '../screen/location';
import { ReservationScreen } from '@/screen/reservation';

export const RouterApp = () => {

   return (
      <BrowserRouter>
         <Routes>
            <Route
               element={<AppLayout />}
            >
               {/* <Route
               index
               path="*"
               element={<Navigate to="/login" replace />}
            /> */}
               <Route
                  path="/product"
                  element={<ProductScreen />}
               />
               <Route
                  path="/location"
                  element={<LocationScreen />}
               />
               <Route
                  path="/reserve"
                  element={<ReservationScreen />}
               />
               <Route
                  path="/*"
                  element={<Navigate to="/product" />}
               />
            </Route>
         </Routes>

      </BrowserRouter>
   )
}