import { dasboardServiceProvider } from '@/doman/services';
import { deleteObjectAction, deleteTableAction, setObjectAction, setSelectedResourceAction, setTableAction, toggleIsTempResourceChangeAction, updateSelectedResourceAction, updateTableAction } from '@/doman/store/mapPage';
import { typeObj, typeStatusTable, validateObject } from '@/ultils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const useResource = () => {
   const [loading, setLoading] = useState({
      table: false,
      object: false,
      updateTable: false,
      deleteTable: false
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
         isBlocked: false,
         status: typeStatusTable.AVAILABLE,
         isCursor: true
      }

      dispatch(setSelectedResourceAction(dataTable));
   }

   const createTable = async (data) => {
      if (!data || !validateObject(data)) {
         throw new Error('Error al crear la mesa');
      };
      const isConflict = document.querySelector(`[data-conflict="true"]`);

      if (isConflict) {
         throw new Error('Error. hay un conflicto en la posicion de la mesa');
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

      const isConflict = document.querySelector(`[data-conflict="true"]`);

      if (isConflict) {
         throw new Error('Error. hay un conflicto en la posicion del objeto');
      };

      setLoading((prev) => ({ ...prev, object: true }));

      const res = await dasboardServiceProvider.createObject(data);

      setLoading((prev) => ({ ...prev, object: false }));
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

   const deleteObject = async ({ idObject, idRestaurant }) => {
      if (!idRestaurant || !idObject) return;

      setLoading((prev) => ({ ...prev, deleteTable: true }));

      await dasboardServiceProvider?.deleteObject({ idRestaurant, idObject });

      setLoading((prev) => ({ ...prev, deleteTable: false }));

      dispatch(deleteObjectAction(idObject));
   };

   const updateTable = async (data) => {
      if (!data || !validateObject(data)) {
         throw new Error('Error al actualizar la mesa');
      };

      if (data.isBlocked === true && [typeStatusTable.CONFIRMED, typeStatusTable.PENDING].includes(data.status)) {
         throw new Error('La mesa debe estar disponible para bloquearla');
      }

      const isConflict = document.querySelector(`[data-conflict="true"]`);

      if (isConflict) {
         throw new Error('Error. hay un conflicto en la posicion de la mesa');
      };

      setLoading((prev) => ({ ...prev, updateTable: true }));

      const res = await dasboardServiceProvider.updateTable(data);

      setLoading((prev) => ({ ...prev, updateTable: false }));

      if (!res.ok) {
         throw res.errorMessage
      }

      dispatch(updateTableAction(res.table));
   }

   return {
      createObject,
      createTable,
      createTempObject,
      updateSelectedResource,
      createTempTable,
      toggleIsTempResourceChange,
      setSelectedResource,
      deleteTable,
      deleteObject,
      updateTable,
      isLoadingCreateTable: loading.table,
      isLoadingCreateObject: loading.object,
      isLoadingUpdateTable: loading.updateTable,
      isLoadingDeleteTable: loading.deleteTable
   }
}
