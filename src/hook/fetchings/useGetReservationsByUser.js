import { useMemo, useState } from 'react';

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

   const changeReservations = (reservation) => {
      setUser({
         reservations: state.reservations.map(res => res.id === reservation.id ? { ...res, ...reservation } : res),
         isLoading: false,
         errorMessage: null
      })
   }

   const deleteByIdReservation = (id) => setUser(prev => ({
      ...prev,
      reservations: prev.reservations.filter(res => res.id !== id),
      isLoading: false,
      errorMessage: null,
   }))

   const reservations = useMemo(() => {
      return Array.isArray(state.reservations) ? state.reservations?.sort((a, b) => b.updatedAt - a.updatedAt) : [];
   }, [state.reservations]);

   return {
      // Valores
      reservations: reservations,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,

      // Funciones
      changeReservations,
      loadReservationsActive,
      loadReservationsCancel,
      deleteByIdReservation
   }
}