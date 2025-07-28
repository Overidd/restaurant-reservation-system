import { useState } from 'react';

import { serviceProvider } from '@/doman/services';

export const useGetReservationsByUser = () => {
   const [state, setUser] = useState({
      reservations: [],
      isLoading: false,
      errorMessage: null
   })

   const loadReservationsActive = async () => {
      setUser({
         reservations: [],
         isLoading: true,
         errorMessage: null
      })

      const { ok, errorMessage, reservations } = await serviceProvider.getAllReservationsByUser({
         loadFilters: ['pending', 'released', 'confirmed']
      });

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

   const loadReservationsCancel = async () => {
      setUser({
         reservations: [],
         isLoading: true,
         errorMessage: null
      })

      const { ok, errorMessage, reservations } = await serviceProvider.getAllReservationsByUser({
         loadFilters: ['canceled']
      });

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
      changeReservation,
      loadReservationsActive,
      loadReservationsCancel
   }
}