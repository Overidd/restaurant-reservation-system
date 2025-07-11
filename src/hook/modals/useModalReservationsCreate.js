import {
   closeModalCreateReservationsAction,
   openModalCreateReservationsAction
} from '@/doman/store';

import {
   useDispatch,
   useSelector
} from 'react-redux';

export const useModalReservationsCreate = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenModalCreateReservations);

   const openModal = () => {
      dispatch(openModalCreateReservationsAction())
   };

   const closeModal = () => {
      dispatch(closeModalCreateReservationsAction())
   };

   return {
      isOpen,
      openModal,
      closeModal
   }
}
