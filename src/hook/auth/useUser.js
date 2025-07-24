import { authStateEmun } from '@/doman/store/auth';
import { ROLEAUHT } from '@/enum';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useUser = () => {
   const state = useSelector((state) => state.authReducer);


   const isRoleAdmin = useMemo(() => state.user.role === ROLEAUHT.ADMIN, [state.user.role])

   const isAuthenticated = useMemo(() => state.status === authStateEmun.authenticated, [state.status])

   return {
      id: state.user.id,
      name: state.user.name,
      email: state.user.email,
      photoURL: state.user.photoURL,
      role: state.user.role,
      address: state.user.address,
      phone: state.user.phone,
      isRoleAdmin,
      isAuthenticated
   }
}
