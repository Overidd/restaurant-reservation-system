import { useRole } from '@/hook/auth';
import { Navigate, Outlet } from 'react-router-dom';


export const ProtectedRoute = ({ allowedRoles, redirectTo = '/' }) => {
   const { role } = useRole();

   if (!role) return <Navigate to={redirectTo} replace />;

   if (!allowedRoles.includes(role)) return <Navigate to={redirectTo} replace />;

   return <Outlet />;
};