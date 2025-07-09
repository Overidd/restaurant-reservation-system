import { useContext } from 'react';

import { ModalContextAsync } from '@/doman/context/dialogAsync';


export const useModalAsync = () => {
   const context = useContext(ModalContextAsync);

   if (!context) {
      throw new Error('useModalAsync must be used within a ModalProviderAsync');
   }

   return {
      showAsyncModal: context.showAsyncModal
   }
}