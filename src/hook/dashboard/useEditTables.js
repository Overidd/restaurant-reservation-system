import { useDispatch, useSelector } from 'react-redux';

import { toggleIsEditAction } from '@/doman/store/dashboard';
import { useModalTableEditProperty } from '../map/useModalTableEditProperty';
import { useSlideOverObjectCreate } from '../slideover';
import { useDimensionMap } from './useDimensionMap';
import { useModalTableEdit } from './useModalTableEdit';
import { useResource } from './useResource';
import { useStateFilterRestaurant } from './useStateFilterRestaurant';

export const useEditTables = () => {
   const isEdit = useSelector((state) => state.restaurantUiReducer.isEdit);
   const dispatch = useDispatch();

   const {
      filter: {
         restaurant,
      },
   } = useStateFilterRestaurant({});

   const {
      setTempRestaurant
   } = useDimensionMap();

   const {
      toggleIsTempResourceChange,
      setSelectedResource
   } = useResource();

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

      if (is) {
         setTempRestaurant(restaurant);
      }

      dispatch(toggleIsEditAction(is));
   };

   return {
      isEdit,
      toggleIsEdit
   };
}

