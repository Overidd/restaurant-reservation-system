import { dasboardServiceProvider } from '@/doman/services';
import { deleteTableAction, setObjectAction, setSelectedResourceAction, setTableAction, toggleIsTempResourceChangeAction, updateSelectedResourceAction } from '@/doman/store/dashboard';
import { typeObj, typeStatusTable, validateObject } from '@/ultils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const useResource = () => {
   const [loading, setLoading] = useState({
      table: false,
      object: false
   })

   const dispatch = useDispatch();

   const toggleIsTempResourceChange = (is) => {
      dispatch(toggleIsTempResourceChangeAction(is));
   };

   const setSelectedResource = (table) => {
      dispatch(setSelectedResourceAction(table));
   }

   const createTempObject = (selectedResource, data) => {
      const dataObject = {
         ...selectedResource,
         ...data,
         type: typeObj.OBJECT,
         image: data.image,
         isCursor: true
      }

      console.log('dataObject', dataObject);

      dispatch(setSelectedResourceAction(dataObject));
   }

   // TODOD: el nombre deberia ser changeSelectedResource
   const updateSelectedResource = (data) => {
      dispatch(updateSelectedResourceAction(data));
   }

   const createTempTable = (selectedResource, tableType) => {
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
         isReservable: false,
         status: typeStatusTable.AVAILABLE,
         isCursor: true
      }

      dispatch(setSelectedResourceAction(dataTable));
   }

   const createTable = async (data) => {
      if (!data || !validateObject(data)) {
         throw new Error('Error al crear la mesa');
      };

      setLoading((prev) => ({ ...prev, table: true }));

      const res = await dasboardServiceProvider.createTable(data);

      setLoading((prev) => ({ ...prev, table: false }));

      if (!res.ok) {
         throw res.errorMessage
      }

      dispatch(setTableAction(res.table));
   };


   const createObject = async (data) => {
      if (!data || !validateObject(data)) {
         throw new Error('Error al crear el objeto');
      };
      
      const res = await dasboardServiceProvider.createObject(data);
      
      if (!res.ok) {
         throw res.errorMessage
      }

      dispatch(setObjectAction(res.object));
   }


   const deleteTable = async ({ idTable, idRestaurant }) => {
      if (!idTable || !idRestaurant) return;
      await dasboardServiceProvider?.deleteTable({ idTable, idRestaurant });
      dispatch(deleteTableAction(idTable));
   };


   return {
      createObject,
      createTable,
      createTempObject,
      updateSelectedResource,
      createTempTable,
      toggleIsTempResourceChange,
      setSelectedResource,
      deleteTable,
      isLoadingCreateTable: loading.table,
      isLoadingCreateObject: loading.object
   }
}
