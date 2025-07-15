import { useObjectCategories } from '@/hook/fetchings';
import { useModalCreateItemObject } from '@/hook/modals';
import { typeObj } from '@/ultils';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateObjectAny, CreateObjectTable, ModalCreateCategoryObject, ModalCreateItemObject, ModalEditCategoryObject } from '.';
import { Card2 } from '../UI/card';
import { Button, SlideOver } from '../UI/common';
import {
   Label,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';
import { ModalEditItemObject } from './ModalEditItemObject';

export const CreateObjectSlideOver = ({
   isOpen = false
}) => {

   const {
      isOpen: isOpenModalNewItemObj,
      openModal: openModalNewItemObj
   } = useModalCreateItemObject()

   const {
      isLoading,
      categorys,
      errorMessage,
   } = useObjectCategories({ isInitialLoad: true })

   const [typeCategory, setTypeCategory] = useState(null) // table, y etc...

   const handleCategoryChange = ({ value }) => {
      if (!value) return
      setTypeCategory(value)
   }

   return (
      <>
         <SlideOver
            isOpen={isOpen}
            direction='topright'
         >
            <Card2>
               <div>
                  <Label>
                     Selecciona una categoria
                  </Label>

                  <Select
                     value={typeCategory}
                     onValueChange={handleCategoryChange}
                  >
                     <SelectTrigger
                        variant='crystal'
                        className='w-full'
                        name='category'
                        id='category'
                     >
                        <SelectValue
                           placeholder=''
                        />
                     </SelectTrigger>
                     <SelectContent>
                        {categorys.map((item) => (
                           <SelectItem
                              key={item.id}
                              value={item.name}
                           >
                              {item.name}
                           </SelectItem>
                        ))}

                        {/* <SelectItem
                        onClick={openModalNewItemObj}
                     >
                        Crear nueva categoria <Plus />
                     </SelectItem> */}
                        <Button
                           onClick={(e) => {
                              e.stopPropagation();
                              openModalNewItemObj();
                           }}
                           className="cursor-pointer px-2 py-2 text-sm hover:bg-muted flex items-center gap-2"
                        >
                           Crear nueva categoría <Plus size={16} />
                        </Button>
                     </SelectContent>

                  </Select>
               </div>
               {
                  (typeObj.TABLE === typeCategory) &&
                  <CreateObjectTable />
               }
               {
                  (typeCategory && !typeObj.TABLE !== typeCategory) &&
                  <CreateObjectAny />
               }
            </Card2>
         </SlideOver>

         <ModalCreateItemObject />
         <ModalEditItemObject />
         <ModalCreateCategoryObject />
         <ModalEditCategoryObject />
      </>
   )
}


{/* <FormItem>
   <FormLabel>
      Nuevo
   </FormLabel>
   <Button
      variant={'crystal'}
      onClick={onIsCreating}
      className={'h-10'}
   >
      <Plus />
   </Button>
</FormItem> */}