import { useCreateCategoryContext } from '@/hook/context';
import { useModalCreateCategory, useModalCreateItemObject, useModalEditCategoryObject, useModalEditItemObject } from '@/hook/modals';
import { typeObj } from '@/ultils';
import { Pen, Plus } from 'lucide-react';
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
   const [typeCategory, setTypeCategory] = useState(null) // table, y etc...

   const {
      openModal: openModalCreateCategory
   } = useModalCreateCategory()

   const {
      openModal: openModalEditCategory
   } = useModalEditCategoryObject()

   const {
      categorys,
      setCategory,
      isLoadingLoad,
      getCategoryByName,
   } = useCreateCategoryContext()

   const handleCategoryChange = ({ value }) => {
      if (!value) return
      setTypeCategory(value)
   }

   const handleModalEditCategory = () => {
      if (!typeCategory) return
      setCategory(getCategoryByName(typeCategory))
      openModalEditCategory()
   }

   return (
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
                     isLoading={isLoadingLoad}
                     disabled={isLoadingLoad}
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

                     <Button
                        onClick={(e) => {
                           e.stopPropagation();
                           openModalCreateCategory();
                        }}
                        className="cursor-pointer px-2 py-2 text-sm hover:bg-muted flex items-center gap-2"
                     >
                        Crear nueva categoría <Plus size={16} />
                     </Button>
                  </SelectContent>

                  <Button
                     variant={'crystal'}
                     className={'h-10'}
                     onClick={handleModalEditCategory}
                  >
                     <Pen />
                  </Button>
               </Select>
            </div>
            {
               (typeObj.TABLE === typeCategory) &&
               <CreateObjectTable />
            }
            {
               (typeCategory && !typeObj.TABLE !== typeCategory) &&
               <CreateObjectAny
                  currentCategory={getCategoryByName(typeCategory)}
               />
            }
         </Card2>
      </SlideOver>
   )
}

export const ModalManagerObjects = () => {
   const {
      closeModal: closeModalCreateItemObj,
      isOpen: isOpenModalCreateItemObj,
   } = useModalCreateItemObject()

   const {
      closeModal: closeModalEditItemObj,
      isOpen: isOpenModalEditItemObj,
   } = useModalEditItemObject()

   const {
      closeModal: closeModalCreateCategory,
      isOpen: isOpenModalCreateCategory,
   } = useModalCreateCategory()

   const {
      closeModal: closeModalEditCategoryObj,
      isOpen: isOpenModalEditCategoryObj,
   } = useModalEditCategoryObject()

   return (
      <>
         {
            isOpenModalCreateItemObj &&
            <ModalCreateItemObject
               isOpen={isOpenModalCreateItemObj}
               onClose={closeModalCreateItemObj}
            />
         }
         {
            isOpenModalEditItemObj &&
            <ModalEditItemObject
               isOpen={isOpenModalEditItemObj}
               onClose={closeModalEditItemObj}
            />
         }
         {
            isOpenModalCreateCategory &&
            <ModalCreateCategoryObject
               isOpen={isOpenModalCreateCategory}
               onClose={closeModalCreateCategory}
            />
         }

         {
            isOpenModalEditCategoryObj &&
            <ModalEditCategoryObject
               isOpen={isOpenModalEditCategoryObj}
               onClose={closeModalEditCategoryObj}
            />
         }
      </>
   )
}