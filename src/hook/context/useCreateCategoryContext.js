import { CreateCategoryContext } from '@/doman/context/object';
import { useContext } from 'react';

export const useCreateCategoryContext = () => {
   const ctx = useContext(CreateCategoryContext)
   if (!ctx) throw new Error('useCreateItemObjectContext debe usarse dentro de CreateItemObjectProvider')
   return {
      category: ctx.category,
      setCategory: ctx.setCategory,
      categorys: ctx.categorys,
      createObjectCategory: ctx.createObjectCategory,
      updateObjectCategory: ctx.updateObjectCategory,
      deleteObjectCategory: ctx.deleteObjectCategory,
      getCategoryByName: ctx.getCategoryByName,
      loadObjectCategory: ctx.loadObjectCategory,
      getIdCategoryByName: ctx.getIdCategoryByName,
      isLoadingCreate: ctx.isLoadingCreate,
      isLoadingDelete: ctx.isLoadingDelete,
      isLoadingUpdate: ctx.isLoadingUpdate,
      isLoadingLoad: ctx.isLoadingLoad
   }
}