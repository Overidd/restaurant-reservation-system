import { ModalContextAsync } from '@/doman/context/dialogAsync';
import { useContext } from 'react';


export const useModalAsync = () => {
   const context = useContext(ModalContextAsync);

   if (!context) {
      throw new Error('useModalAsync must be used within a ModalProviderAsync');
   }

   return {
      showAsyncModal: context.showAsyncModal
   }
}
