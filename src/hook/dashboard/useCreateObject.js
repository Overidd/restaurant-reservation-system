import { setSelectedResourceAction, toggleIsTempResourceChangeAction, updateSelectedResourceAction } from '@/doman/store/dashboard';
import { typeObj, typeStatusTable } from '@/ultils';
import { useDispatch, useSelector } from 'react-redux';

export const useCreateObject = () => {
   const dispatch = useDispatch();

   const selectedResource = useSelector((state) => state.restaurantUiReducer.selectedResource)


   const toggleIsTempResourceChange = (is) => {
      dispatch(toggleIsTempResourceChangeAction(is));
   };

   const setSelectedResource = (table) => {
      dispatch(setSelectedResourceAction(table));
   }

   const createTempObject = (data) => {
      const dataObject = {
         ...selectedResource,
         ...data,
         type: typeObj.OBJECT,
         imagen: data.linkImage
      }

      console.log('dataObject', dataObject);

      dispatch(setSelectedResourceAction(dataObject));
   }

   const updateSelectedResource = (data) => {
      dispatch(updateSelectedResourceAction(data));
   }



   const createObject = (data) => {

   }

   const createTempTable = (tableType) => {
      if (!tableType) return;
      const dataTable = {
         id: tableType?.id ?? selectedResource?.id,
         positionX: selectedResource.positionX,
         positionY: selectedResource.positionY,
         type: typeObj.TABLE,
         size: tableType.size,
         chairs: tableType.chairs,
         width: tableType.width,
         height: tableType.height,
         rotation: tableType.rotation,
         image: null,
         zone: null,
         name: null,
         description: null,
         idRestaurant: null,
         isReservable: false,
         createdAt: null,
         status: typeStatusTable.AVAILABLE,
         hasReservar: false,
         reservation: null,
         user: null,
      }

      dispatch(setSelectedResourceAction(dataTable));
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
      toggleIsTempResourceChange,
      setSelectedResource
   }
}
