import { useState } from 'react';
import { SelectedCategoryContext } from './SelectedCategoryContext';

export const SelectedCategoryProvider = ({ children }) => {
   const [category, setCategory] = useState(null)

   return (
      <SelectedCategoryContext.Provider value={{ category, setCategory }}>
         {children}
      </SelectedCategoryContext.Provider>
   )
}
