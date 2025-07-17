import { setSelectedResourceAction, toggleIsTempResourceChangeAction, updateSelectedResourceAction } from '@/doman/store/dashboard';
import { typeObj } from '@/ultils';
import { useDispatch, useSelector } from 'react-redux';

export const useCreateObject = () => {
   const dispatch = useDispatch();

   const selectedResource = useSelector((state) => state.restaurantUiReducer.selectedResource)


   const toggleIsTempResorce = (is) => {
      dispatch(toggleIsTempResourceChangeAction(is));
   };

   const createTempObject = (data) => {
      const dateObject = {
         ...selectedResource,
         ...data,
         type: typeObj.ANY,
         imagen: data.linkImage
      }

      dispatch(setSelectedResourceAction(dateObject));
   }

   const updateSelectedResource = (data) => {
      dispatch(updateSelectedResourceAction(data));
   }



   const createObject = (data) => {

   }

   const createTempTable = (data) => {

   }

   const createTable = (data) => {

   }

   return {
      selectedResource,
      createObject,
      createTable,
      createTempObject,
      updateSelectedResource,
      createTempTable,
      toggleIsTempResorce
   }
}
