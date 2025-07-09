import { useDispatch, useSelector } from 'react-redux';

import { closeModalTableEditAction, openModalTableEditAction } from '@/doman/store';

export const useModalTableEdit = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalTableEdit);

   const openModal = () => {
      dispatch(openModalTableEditAction())
   };

   const closeModal = () => {
      dispatch(closeModalTableEditAction())
   };

   return {
      isOpen,
      openModal,
      closeModal
   }
}
