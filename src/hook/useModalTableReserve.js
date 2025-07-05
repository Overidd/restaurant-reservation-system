import {
   useDispatch,
   useSelector
} from 'react-redux';

import {
   closeModalReserveTableAction,
   openModalReserveTableAction
} from '@/doman/store';

export const useModalTableReserve = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalTableReserve);

   const openModal = () => {
      dispatch(openModalReserveTableAction())
   };

   const closeModal = () => {
      dispatch(closeModalReserveTableAction())
   };

   return {
      isOpen,
      openModal,
      closeModal
   }
}
