import {
   useDispatch,
   useSelector
} from 'react-redux';

import {
   closeModalCreateCategoryObjectAction,
   openModalCreateCategoryObjectAction
} from '@/doman/store';

export const useModalCreateCategory = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalCreateCategoryObject);

   const openModal = () => {
      dispatch(openModalCreateCategoryObjectAction())
   };

   const closeModal = () => {
      dispatch(closeModalCreateCategoryObjectAction())
   };

   return {
      isOpen,
      openModal,
      closeModal
   }
}
