import {
   closeModalCreateItemObjectAction,
   openModalCreateItemObjectAction
} from '@/doman/store';

import {
   useDispatch,
   useSelector
} from 'react-redux';

export const useModalCreateItemObject = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalCreateItemObject);

   const openModal = () => {
      dispatch(openModalCreateItemObjectAction())
   };

   const closeModal = () => {
      dispatch(closeModalCreateItemObjectAction())
   };

   return {
      isOpen,
      openModal,
      closeModal,
   }
}
