import { useObjects } from '@/hook/fetchings';
import { useRef, useState } from 'react';
import { CreateObjectContext } from './createObjectContext';

export const CreateObjectProvider = ({ children }) => {
   const [category, setCategory] = useState(null)
   const selectObject = useRef(null)

   const {
      objects,
      updateObject,
      createObject,
      deleteObject,
      loadObjects,
      getObjectByName,
      isLoadingCreate,
      isLoadingDelete,
      isLoadingUpdate,
      isLoadingLoad,
   } = useObjects()

   const setSelectObject = (object) => {
      if (!object) selectObject.current = null;
      selectObject.current = object;
   }

   return (
      <CreateObjectContext.Provider value={{
         category,
         setCategory,
         objects,
         updateObject,
         createObject,
         deleteObject,
         loadObjects,
         getObjectByName,
         isLoadingCreate,
         isLoadingDelete,
         isLoadingUpdate,
         isLoadingLoad,
         selectObject: selectObject.current,
         setSelectObject,
      }}>
         {children}
      </CreateObjectContext.Provider>
   )
}