import { useSelector } from 'react-redux';

export const useRole = () => {
   const role = useSelector((state) => state.authReducer.role)

   return {
      role
   }
}
