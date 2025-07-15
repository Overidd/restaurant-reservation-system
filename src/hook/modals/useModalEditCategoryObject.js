import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  closeModalEditCategoryObjectAction,
  openModalEditCategoryObjectAction
} from '@/doman/store';

export const useModalEditCategoryObject = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.UIReducer.isOpenModalEditCategoryObject);

  const openModal = () => {
    dispatch(openModalEditCategoryObjectAction())
  };

  const closeModal = () => {
    dispatch(closeModalEditCategoryObjectAction())
  };

  return {
    isOpen,
    openModal,
    closeModal,
  }
}
