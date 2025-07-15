import {
   useDispatch,
   useSelector
} from 'react-redux';

import {
   closeSlideOverObjectCreateAction,
   openSlideOverObjectCreateAction
} from '@/doman/store';

export const useSlideOverObjectCreate = () => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state) => state.UIReducer.isOpenSlideOverObjectCreate);

   const openModal = () => {
      dispatch(openSlideOverObjectCreateAction())
   };

   const closeModal = () => {
      dispatch(closeSlideOverObjectCreateAction())
   };

   return {
      isOpen,
      openModal,
      closeModal
   }
}
