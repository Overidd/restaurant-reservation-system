import { useEffect, useState } from 'react';

import { serviceProvider } from '@/doman/services';

export const useGetReservationsByUser = () => {
   const [state, setUser] = useState({
      reservations: [],
      isLoading: false,
      errorMessage: null
   })

   useEffect(() => {
      const fechReservations = async () => {
         setUser({
            reservations: [],
            isLoading: true,
            errorMessage: null
         })

         const { ok, errorMessage, reservations } = await serviceProvider.getAllReservations();

         if (ok) {
            setUser({
               reservations: reservations || [],
               isLoading: false,
               errorMessage: null
            })
            return;
         }

         setUser({
            reservations: [],
            isLoading: false,
            errorMessage: errorMessage
         })
      }
      fechReservations();
   }, [])

   const changeReservation = (reservation) => {
      setUser({
         reservations: state.reservations.map(res => res.id === reservation.id ? reservation : res),
         isLoading: false,
         errorMessage: null
      })
   }

   return {
      // Valores
      reservations: state.reservations,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,

      // Funciones
      changeReservation
   }
}