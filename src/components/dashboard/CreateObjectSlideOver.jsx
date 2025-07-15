import { useCreateCategoryContext } from '@/hook/context';
import { useModalCreateCategory, useModalCreateItemObject, useModalEditCategoryObject, useModalEditItemObject } from '@/hook/modals';
import { cn, typeObj } from '@/ultils';
import { Pen, Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateObjectAny, CreateObjectTable, ModalCreateCategoryObject, ModalCreateItemObject, ModalEditCategoryObject } from '.';
import { Card2 } from '../UI/card';
import { Button, SlideOver } from '../UI/common';
import {
   FormLabel,
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
         <Card2
            className={cn(
               'w-80'
            )}
         >
            <Label className={'text-center w-full mb-4'}>
               Crear objeto
            </Label>

            <div className={cn(
               'grid-cols-[1fr_auto] grid gap-2 mb-3'
            )}>
               <FormLabel
                  className={'col-span-2'}
                  htmlFor='category'
               >
                  Categoria
               </FormLabel>

               <Select
                  name='category'
                  value={typeCategory}
                  onValueChange={handleCategoryChange}
               >
                  <SelectTrigger
                     isLoading={isLoadingLoad}
                     disabled={isLoadingLoad}
                     id='category'
                     size='base'
                     variant='crystal'
                     className='w-full'
                  >
                     <SelectValue
                        placeholder='Selecciona una categoria'
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
                        onClick={openModalCreateCategory}
                        className={'w-full'}
                     >
                        Nueva categoría <Plus size={16} />
                     </Button>
                  </SelectContent>
               </Select>

               <Button
                  variant={'crystal'}
                  onClick={handleModalEditCategory}
                  size='icon'
               >
                  <Pen />
               </Button>
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
               className={'w-80'}
               isOpen={isOpenModalCreateItemObj}
               onClose={closeModalCreateItemObj}
            />
         }
         {
            isOpenModalEditItemObj &&
            <ModalEditItemObject
               className={'w-96'}
               isOpen={isOpenModalEditItemObj}
               onClose={closeModalEditItemObj}
            />
         }
         {
            isOpenModalCreateCategory &&
            <ModalCreateCategoryObject
               className={'w-fit'}
               isOpen={isOpenModalCreateCategory}
               onClose={closeModalCreateCategory}
            />
         }

         {
            isOpenModalEditCategoryObj &&
            <ModalEditCategoryObject
               className={'w-fit'}
               isOpen={isOpenModalEditCategoryObj}
               onClose={closeModalEditCategoryObj}
            />
         }
      </>
   )
}