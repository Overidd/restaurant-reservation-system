import { useCreateCategoryContext } from '@/hook/context';
import { useModalCreateCategory, useModalCreateItemObject, useModalEditCategoryObject, useModalEditItemObject } from '@/hook/modals';
import { cn, typeObj } from '@/ultils';
import { Pen, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { CreateObject, CreateTable, ModalCreateCategoryObject, ModalCreateItemObject, ModalEditCategoryObject, ModalEditItemObject } from '..';
import { Card2 } from '../../UI/card';
import { Button, SlideOver } from '../../UI/common';
import {
   FormLabel,
   Label,
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectSeparator,
   SelectTrigger,
   SelectValue
} from '../../UI/from';

export const CreateResourceSlide = ({
   selectedResource,
   restaurant,
   className,
   onClose,
   isOpen = false
}) => {
   // const [category?.name, setTypeCategory] = useState(null) // table, y etc...

   const {
      openModal: openModalCreateCategory
   } = useModalCreateCategory()

   const {
      openModal: openModalEditCategory
   } = useModalEditCategoryObject()

   const {
      category,
      categorys,
      setCategory,
      isLoadingLoad,
      getCategoryByName,
   } = useCreateCategoryContext()

   const handleCategoryChange = ({ value }) => {
      if (!value) return
      setCategory(getCategoryByName(value))
   }

   const handleModalEditCategory = () => {
      if (!category) return
      openModalEditCategory()
   }

   useEffect(() => {
      if (!selectedResource.idTemp || restaurant === null) return;
      setCategory(null)
   }, [selectedResource.idTemp])



   return (
      <SlideOver
         isOpen={isOpen}
         onClose={onClose}
         direction='topright'
      >
         <Card2
            className={cn(
               className
            )}
         >
            <Label className={'text-center w-full mb-4'}>
               {
                  category?.name === typeObj.TABLE
                     ? 'Crear una mesa'
                     : 'Crear un objeto'
               }
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
                  value={category?.name || ''}
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
                     <SelectSeparator />
                     <SelectGroup>
                        <Button
                           onClick={openModalCreateCategory}
                           className={'w-full'}
                        >
                           Nueva categoría <Plus size={16} />
                        </Button>
                     </SelectGroup>
                  </SelectContent>
               </Select>

               <Button
                  size='icon'
                  variant={'crystal'}
                  onClick={handleModalEditCategory}
               >
                  <Pen />
               </Button>
            </div>
            {
               (category?.name === typeObj.TABLE) &&
               <CreateTable
                  selectedResource={selectedResource}
                  restaurant={restaurant}
               />
            }
            {
               (!!category?.name && category?.name !== typeObj.TABLE) &&
               <CreateObject
                  restaurant={restaurant}
                  selectedResource={selectedResource}
                  currentCategory={getCategoryByName(category?.name)}
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