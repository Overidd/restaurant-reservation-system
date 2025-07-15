import {
   closeModalCreateItemObjectAction,
   openModalCreateItemObjectAction
} from '@/doman/store';
import {
   useDispatch,
   useSelector
} from 'react-redux';

let currentData = null

export const useModalCreateItemObject = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalCreateItemObject);

   const openModal = (data) => {
      if (currentData) {
         currentData = data;
      }

      if (!currentData) return;
      dispatch(openModalCreateItemObjectAction())
   };

   const closeModal = () => {
      currentData = null;
      dispatch(closeModalCreateItemObjectAction())
   };

   return {
      isOpen,
      openModal,
      closeModal,
      currentData
   }
}
