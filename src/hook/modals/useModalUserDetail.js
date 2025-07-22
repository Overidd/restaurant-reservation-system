import { closeModalUserDetailAction, openModalUserDetailAction } from '@/doman/store';
import { useDispatch, useSelector } from 'react-redux';

export const useModalUserDetail = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalUserDetail);

   const openModal = () => {
      dispatch(openModalUserDetailAction())
   };

   const closeModal = () => {
      dispatch(closeModalUserDetailAction())
   };

   return {
      isOpen,
      openModal,
      closeModal,
   }
}
