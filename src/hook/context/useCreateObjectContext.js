import { CreateObjectContext } from '@/doman/context/object/createObjectContext';
import { useContext } from 'react';

export const useCreateObjectContext = () => {
   const ctx = useContext(CreateObjectContext)
   if (!ctx) throw new Error('useCreateItemObjectContext debe usarse dentro de CreateItemObjectProvider')
   return {
      category: ctx.category,
      setCategory: ctx.setCategory,
      objects: ctx.objects,
      createObject: ctx.createObject,
      updateObject: ctx.updateObject,
      deleteObject: ctx.deleteObject,
      loadObjects: ctx.loadObjects,
      getObjectByName: ctx.getObjectByName,
      isLoadingCreate: ctx.isLoadingCreate,
      isLoadingDelete: ctx.isLoadingDelete,
      isLoadingUpdate: ctx.isLoadingUpdate,
      isLoadingLoad: ctx.isLoadingLoad,
      selectObject: ctx.selectObject,
      setSelectObject: ctx.setSelectObject
   }
}