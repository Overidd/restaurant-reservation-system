import { userSettingProvider } from '@/doman/services';
import { useState } from 'react';

export const useGetReserveFetchin = () => {
   const [state, setReserve] = useState({
      reservation: null,
      isLoading: false,
      errorMessage: null
   })

   const searchReserveByCode = async (code) => {
      if (!code) return
      setReserve({
         reservation: null,
         isLoading: true,
         errorMessage: null
      })

      const { ok, reservation, errorMessage } = await userSettingProvider.getReservationByCode(code);

      if (!ok) {
         setReserve({
            reservation: null,
            isLoading: false,
            errorMessage
         })
      }

      setReserve({
         reservation: reservation,
         isLoading: false,
         errorMessage: null
      })
      
      return { ok, reservation, errorMessage }
   }

   return {
      reservation: state.reservation,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      searchReserveByCode
   }
}
