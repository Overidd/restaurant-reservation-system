import { useForm } from '@/hook';
import { useCreateObjectContext } from '@/hook/context';
import { useModalCreateItemObject, useModalEditItemObject } from '@/hook/modals';
import { Pen, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/from';

const schema = {
   initial: {
      positionX: 0,
      positionY: 0,
      rotation: 0,
      width: 0,
      height: 0,
      typeObj: ''
   },
}

export const CreateObjectAny = ({
   currentCategory
}) => {

   const {
      openModal: onOpenCreateItemObj
   } = useModalCreateItemObject()

   const {
      openModal: onOpenEditItemObj
   } = useModalEditItemObject()

   const {
      setCategory,
      loadObjects,
      isLoadingLoad,
      setSelectObject,
      getObjectByName,
      objects,
   } = useCreateObjectContext()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onInitialFrom,
      formState: {
         positionX,
         positionY,
         rotation,
         width,
         height,
         typeObj
      },
      formValidation: {
         positionXValid,
         positionYValid,
         rotationValid,
         widthValid,
         heightValid,
      }
   } = useForm({
      initialState: schema.initial,
      activeValidation: true,
   });

   const onSubmit = onSubmitForm((data) => {
      console.log(data);
   })

   const handleModalCreateObject = () => {
      setCategory(currentCategory)
      onOpenCreateItemObj()
   }

   const handleModalEditObject = () => {
      if (!typeObj) return
      setCategory(currentCategory)
      setSelectObject(getObjectByName(typeObj))
      onOpenEditItemObj()
   }

   useEffect(() => {
      if (currentCategory) {
         loadObjects(currentCategory.id)
         return;
      }
   }, [currentCategory])

   return (
      <Form
         onSubmit={onSubmit}
      >
         <FormItem>
            <FormLabel>
               Tipo de objeto
            </FormLabel>

            <Select
               value={typeObj}
               onValueChange={onValueChange}
            >
               <SelectTrigger
                  isLoading={isLoadingLoad}
                  disabled={isLoadingLoad}
                  variant='crystal'
                  className='w-full'
                  name='typeObj'
                  id='typeObj'
               >
                  <SelectValue
                     placeholder=''
                  />
               </SelectTrigger>
               <SelectContent>
                  {objects.map((item) => (
                     <SelectItem
                        key={item.id}
                        value={item.name}
                     >
                        {item.name}
                     </SelectItem>
                  ))}

                  <Button
                     type='button'
                     onClick={handleModalCreateObject}
                  >
                     Crear nueva objeto <Plus />
                  </Button>
               </SelectContent>
            </Select>
            <Button
               type='button'
               variant={'crystal'}
               className={'h-10'}
               onClick={handleModalEditObject}
            >
               <Pen />
            </Button>
         </FormItem>

         <FromGroup>
            <FormLabel>
               Posicion
            </FormLabel>

            <FormItem>
               <FormLabel
                  formItemId={'positionX'}
               >
                  X
               </FormLabel>
               <Input
                  type='number'
                  name='positionX'
                  value={positionX}
                  isError={!!positionXValid}
                  onChange={onValueChange}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  formItemId={'positionY'}
               >
                  Y
               </FormLabel>
               <Input
                  type='number'
                  name='positionY'
                  value={positionY}
                  isError={!!positionYValid}
                  onChange={onValueChange}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  formItemId={'rotation'}
               >
                  Rotate
               </FormLabel>
               <Input
                  type='number'
                  name='rotation'
                  value={rotation}
                  isError={!!rotationValid}
                  onChange={onValueChange}
               />
            </FormItem>
         </FromGroup>

         <FromGroup>
            <FormLabel>
               Tamaño en la escena
            </FormLabel>

            <FormItem>
               <FormLabel
                  formItemId={'width'}
               >
                  Width
               </FormLabel>
               <Input
                  type='number'
                  name='width'
                  value={width}
                  isError={!!widthValid}
                  onChange={onValueChange}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  formItemId={'height'}
               >
                  Height
               </FormLabel>
               <Input
                  type='number'
                  name='height'
                  value={height}
                  isError={!!heightValid}
                  onChange={onValueChange}
               />
            </FormItem>
         </FromGroup>

         <FormItem>
            <Button
               type='submit'
               disabled={!isFormValid}
            >
               Crear objeto
            </Button>
         </FormItem>
      </Form>
   )
}