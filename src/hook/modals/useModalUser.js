import { closeModalUserAction, openModalUserAction } from '@/doman/store';
import { useDispatch, useSelector } from 'react-redux';


let paramsRef = null
export const useModalUser = () => {
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
