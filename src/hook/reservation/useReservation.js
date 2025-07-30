import { reserveTableThunks } from '@/doman/store/dashboard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export const useReservation = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);

   const reserveTable = async (data) => {
      setIsLoading(true);
      return dispatch(reserveTableThunks(data));
   }

   const toggleLoading = (is) => setIsLoading(is ?? !isLoading);

   return {
      // Estados
      isLoading,

      // Funciones
      reserveTable,
      toggleLoading,
   }
}
