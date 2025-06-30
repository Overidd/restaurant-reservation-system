import { useDispatch, useSelector } from 'react-redux';

import {
   closeModalConfirmReserveAction,
   openModalConfirmReserveAction
} from '@/doman/store';

export const useModalConfirmReserve = () => {
   const dispatch = useDispatch();

   const isOpenModal = useSelector((state) => state.UIReducer.isOpenModalConfirmReserve);

   const openModal = () => {
      dispatch(openModalConfirmReserveAction())
   };

   const closeModal = () => {
      dispatch(closeModalConfirmReserveAction())
   };

   return {
      isOpenModal,
      openModal,
      closeModal
   }
}