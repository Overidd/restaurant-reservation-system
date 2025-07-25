import { useObjectCategories } from '@/hook/fetchings';
import { useState } from 'react';
import { CreateCategoryContext } from './createCategoryContext';

export const CreateCategoryProvider = ({ children }) => {
   const [category, setCategory] = useState(null)

   const {
      categorys,
      createObjectCategory,
      updateObjectCategory,
      deleteObjectCategory,
      getCategoryByName,
      loadObjectCategory,
      getIdCategoryByName,
      isLoadingCreate,
      isLoadingDelete,
      isLoadingUpdate,
      isLoadingLoad,
   } = useObjectCategories({ isInitialLoad: true })

   return (
      <CreateCategoryContext.Provider value={{
         category,
         setCategory,   
         categorys,
         createObjectCategory,
         updateObjectCategory,
         deleteObjectCategory,
         getCategoryByName,
         loadObjectCategory,
         getIdCategoryByName,
         isLoadingCreate,
         isLoadingDelete,
         isLoadingUpdate,
         isLoadingLoad
      }}>
         {children}
      </CreateCategoryContext.Provider>
   )
}
