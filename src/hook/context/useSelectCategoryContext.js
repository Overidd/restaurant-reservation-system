import { SelectedCategoryContext } from '@/doman/context/selectCategory';
import { useContext } from 'react';

export const useSelectCategoryContext = () => {
   const context = useContext(SelectedCategoryContext)
   if (!context) throw new Error('useCreateItemObjectContext debe usarse dentro de CreateItemObjectProvider')
   return {
      categorySelected: context.category,
      setCategorySelected: context.setCategory
   }
}
