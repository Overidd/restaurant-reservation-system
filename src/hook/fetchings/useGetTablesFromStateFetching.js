import { serviceProvider } from '@/doman/services';
import { typeStatusTable } from '@/ultils';
import { useState } from 'react';

export const useGetTablesFromStateFetching = (typeState = typeStatusTable.AVAILABLE) => {
   const [state, setState] = useState({
      tables: [],
      isLoading: false,
      errorMessage: null
   })

   const loadTables = async ({
      idRestaurant,
      dateStr,
      hour,
      diners
   }) => {

      if (!idRestaurant || !dateStr || !hour) return;

      setState(prev => ({
         ...prev,
         isLoading: true,
         errorMessage: null,
      }));

      const tables = await serviceProvider.getTables({
         dateStr,
         idRestaurant,
         hour,
         diners
      });

      if (!tables || !tables.length) {
         setState(prev => ({
            ...prev,
            tables: [],
            isLoading: false,
            errorMessage: 'No hay mesas disponibles',
         }));
         return;
      };

      setState(prev => ({
         ...prev,
         tables: tables.filter(t => t.status === typeState),
         isLoading: false,
         errorMessage: null,
      }));
   }

   const clearTables = () => setState(prev => ({
      ...prev,
      tables: [],
      isLoading: false,
      errorMessage: null,
   }))

   const isLoadTables = state.tables.length > 0;

   return {
      tables: state.tables,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      isLoadTables,
      loadTables,
      clearTables
   }
}
