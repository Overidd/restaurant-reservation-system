import {
   useDispatch,
   useSelector
} from 'react-redux';

import {
   closeModalTableEditPropertyAction,
   openModalTableEditPropertyAction
} from '@/doman/store';

export const useModalTableEditProperty = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalTableEditProperty);

   const openModal = () => {
      dispatch(openModalTableEditPropertyAction())
   };

   const closeModal = () => {
      dispatch(closeModalTableEditPropertyAction())
   };

   return {
      isOpen,
      openModal,
      closeModal
   }
}