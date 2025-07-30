import { useContext } from 'react';

import { ModalAsyncContext } from '@/doman/context/dialogAsync';


export const useModalAsync = () => {
   const context = useContext(ModalAsyncContext);

   if (!context) {
      throw new Error('useModalAsync must be used within a ModalProviderAsync');
   }

   return {
      showAsyncModal: context.showAsyncModal
   }
}