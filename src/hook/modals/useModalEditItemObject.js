import {
   useDispatch,
   useSelector
} from 'react-redux';

import {
   closeModalEditItemObjectAction,
   openModalEditItemObjectAction
} from '@/doman/store';


export const useModalEditItemObject = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalEditItemObject);

   const openModal = () => {
      dispatch(openModalEditItemObjectAction())
   };

   const closeModal = () => {
      dispatch(closeModalEditItemObjectAction())
   };

   return {
      isOpen,
      openModal,
      closeModal,
   }
}
