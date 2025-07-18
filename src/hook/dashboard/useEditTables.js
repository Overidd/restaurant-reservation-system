import { useDispatch, useSelector } from 'react-redux';

import { toggleIsEditAction } from '@/doman/store/dashboard';
import { useSlideOverObjectCreate } from '../slideover';
import { useModalTableEdit } from '../useModalTableEdit';
import { useModalTableEditProperty } from '../useModalTableEditProperty';
import { useCreateObject } from './useCreateObject';

export const useEditTables = () => {
   const isEdit = useSelector((state) => state.restaurantUiReducer.isEdit);
   const dispatch = useDispatch();

   const {
      toggleIsTempResourceChange,
      setSelectedResource
   } = useCreateObject();

   const {
      isOpen: isOpenModalObjectCreate,
      closeModal: closeModalObjectCreate,
   } = useSlideOverObjectCreate();

   const {
      isOpen: isOpenModalEdit,
      closeModal: closeModalEdit
   } = useModalTableEdit();

   const {
      isOpen: isOpenModalEditProperty,
      closeModal: closeModalEditProperty,
   } = useModalTableEditProperty();

   const waitForModalsToClose = () => {
      return new Promise((resolve) => {
         const interval = setInterval(() => {
            const allClosed =
               !isOpenModalObjectCreate &&
               !isOpenModalEdit &&
               !isOpenModalEditProperty;

            if (allClosed) {
               clearInterval(interval);
               resolve();
            }
         }, 50);
      });
   };

   const toggleIsEdit = async (is) => {
      if (!is) {
         const shouldCloseAny =
            isOpenModalObjectCreate ||
            isOpenModalEdit ||
            isOpenModalEditProperty;

         if (shouldCloseAny) {
            if (isOpenModalObjectCreate) closeModalObjectCreate();
            if (isOpenModalEdit) closeModalEdit();
            if (isOpenModalEditProperty) closeModalEditProperty();

            setSelectedResource(null);
            toggleIsTempResourceChange(false);

            await waitForModalsToClose();
         }
      }

      dispatch(toggleIsEditAction(is));
   };

   return {
      isEdit,
      toggleIsEdit
   };
}

