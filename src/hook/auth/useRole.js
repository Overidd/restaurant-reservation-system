import { useSelector } from 'react-redux';

export const useRole = () => {
   const role = useSelector((state) => state.authReducer.user.role);

   return {
      role
   }
}
