import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRole } from '@/hook';

export const PublicOnlyRoute = () => {
   const location = useLocation();

   const { role } = useRole();

   if (role) return <Navigate to={`/${location.pathname.split('/')[1]}`} replace />;

   return <Outlet />;
};