import { setSelectedResourceAction, toggleIsTempResourceChangeAction, updateSelectedResourceAction } from '@/doman/store/dashboard';
import { useDispatch, useSelector } from 'react-redux';

export const useRestaurantUi = () => {
   const state = useSelector((state) => state.restaurantUiReducer)
   const dispatch = useDispatch();

   const setSelectedResource = (table) => {
      dispatch(setSelectedResourceAction(table));
   }

   const updateSelectedResource = ({ name, value }) => {
      if (!value || !name) return;
      dispatch(updateSelectedResourceAction({ name, value }));
   };

   const toggleIsTempResourceChange = (is) => {
      dispatch(toggleIsTempResourceChangeAction(is));
   };

   return {
      // States
      isEdit: state.isEdit,
      isTempResourceChange: state.isTempResourceChange,
      selectedResource: state.selectedResource,


      // Funciones 
      setSelectedResource,
      updateSelectedResource,
      toggleIsTempResourceChange
   }
}
