import { useDispatch, useSelector } from 'react-redux';

import { closeModalUserAction, openModalUserAction } from '@/doman/store';


let paramsRef = null
export const useUserModal = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalUser);
   
   const openModal = (params) => {
      paramsRef = params
      dispatch(openModalUserAction())
   };

   const closeModal = () => {
      dispatch(closeModalUserAction())
   };

   return {
      isOpen,
      openModal,
      closeModal,
      paramsRef
   }
}
