import { serviceProvider } from '@/doman/services';
import { typeStatusTable } from '@/ultils';
import { useState } from 'react';

export const useGelHourFromStateFetching = (typeState = typeStatusTable.AVAILABLE) => {

   const [state, setState] = useState({
      hours: [],
      isLoading: false,
      errorMessage: null
   })

   const loadHours = async ({
      idRestaurant,
      dateStr,
   }) => {

      if (!idRestaurant || !dateStr) return;

      setState(prev => ({
         ...prev,
         isLoading: true,
         errorMessage: null,
      }));

      const { availableHours, ok, messageError } = await serviceProvider.getAvailableHours({ dateStr, idRestaurant });

      if (!ok) {
         setState(prev => ({
            ...prev,
            hours: [],
            isLoading: false,
            errorMessage: messageError || 'No hay horas disponibles',
         }));
         return;
      }

      setState(prev => ({
         ...prev,
         hours: availableHours || [],
         isLoading: false,
         errorMessage: null,
      }));

   }

   const clearHours = () => setState(prev => ({
      ...prev,
      hours: [],
      isLoading: false,
      errorMessage: null,
   }))

   const isLoadHours = state.hours.length > 0;

   return {
      hours: state.hours,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      isLoadHours,
      loadHours,
      clearHours
   }
}
