import { setSelectedResourceAction, toggleIsTempResourceChangeAction, updateSelectedResourceAction } from '@/doman/store/mapPage';
import { useDispatch, useSelector } from 'react-redux';

export const useRestaurantUi = () => {
   const state = useSelector((state) => state.mapUiReducer)
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
      tempRestaurant: state.tempRestaurant,


      // Funciones 
      setSelectedResource,
      updateSelectedResource,
      toggleIsTempResourceChange
   }
}
