import {
   useDispatch,
   useSelector
} from 'react-redux';

import {
   closeModalEditItemObjectAction,
   openModalEditItemObjectAction
} from '@/doman/store';

let currentData = null

export const useModalEditItemObject = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalEditItemObject);

   const openModal = (data) => {
      if (currentData) {
         currentData = data
      }

      dispatch(openModalEditItemObjectAction())
   };

   const closeModal = () => {
      currentData = null
      dispatch(closeModalEditItemObjectAction())
   };

   return {
      isOpen,
      openModal,
      closeModal,
      currentData
   }
}
