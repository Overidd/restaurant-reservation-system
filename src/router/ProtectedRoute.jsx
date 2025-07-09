import { Navigate, Outlet } from 'react-router-dom';

import { useRole } from '@/hook';

export const ProtectedRoute = ({ allowedRoles, redirectTo = '/' }) => {
   const { role } = useRole();

   if (!role) return <Navigate to={redirectTo} replace />;

   if (!allowedRoles.includes(role)) return <Navigate to={redirectTo} replace />;

   return <Outlet />;
};