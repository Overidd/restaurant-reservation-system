import { useForm } from '@/hook';
import { useCreateObjectContext } from '@/hook/context';
import { useCreateObject } from '@/hook/dashboard';
import { useModalCreateItemObject, useModalEditItemObject } from '@/hook/modals';
import { Pen, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '../../UI/from';

const schema = {
   initial: {
      positionX: '', // TODO Esa posicion de Y, X, deberia de recibir del objecto vacio seleccionado
      positionY: '',
      rotation: '',
      width: '',
      height: '',
   },
}

// TODO: Hasta que no seleccione algun tipo de objecto, los campos deberia estar por defecto desabilitados

// TODO: Seria ideal recibir el ancho y alto del tablero

export const CreateObject = ({
   currentCategory
}) => {
   const [objectName, setObjectName] = useState(null) // table, y etc...

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
      updateSelectedResource,
      selectedResource,
      createTempObject,
      toggleIsTempResourceChange
   } = useCreateObject()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onInitialFrom,
      onResetForm,
      formState: {
         positionX,
         positionY,
         rotation,
         width,
         height,
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
      changeValueCallback: ({ name, value }) => {
         if (!name || !value) return
         updateSelectedResource({ name, value })
      }
   });

   const onSubmit = onSubmitForm((data) => {
      console.log(data);
   })

   const handleSelectObject = ({ value }) => {
      const object = getObjectByName(value);
      if (!value || !object) return
      setObjectName(value)
      onInitialFrom({
         ...object,
         positionX: selectedResource.positionX,
         positionY: selectedResource.positionY
      })
      createTempObject(object)
      toggleIsTempResourceChange(true)
   }

   const handleModalCreateObject = () => {
      setCategory(currentCategory)
      onOpenCreateItemObj()
   }

   const handleModalEditObject = () => {
      if (!objectName || !currentCategory || !getObjectByName(objectName)) return
      setCategory(currentCategory)
      setSelectObject(getObjectByName(objectName))
      onOpenEditItemObj()
   }

   useEffect(() => {
      if (currentCategory) {
         loadObjects(currentCategory.id)
         setObjectName(null)
         onResetForm()
         return;
      }
   }, [currentCategory])

   return (
      <Form
         onSubmit={onSubmit}
      >
         <FromGroup
            className={'flex items-center gap-2'}
         >
            <FormItem className='flex-1'>
               <FormLabel htmlFor='typeObj'>
                  Tipo de objeto
               </FormLabel>

               <Select
                  name='typeObj'
                  value={objectName}
                  onValueChange={handleSelectObject}
               >
                  <SelectTrigger
                     isLoading={isLoadingLoad}
                     disabled={isLoadingLoad}
                     id='typeObj'
                     variant='crystal'
                     className={'w-full'}
                     size='base'
                  >
                     <SelectValue
                        placeholder='Seleccione un objeto'
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

                     <SelectSeparator />

                     <Button
                        type='button'
                        onClick={handleModalCreateObject}
                        className={'w-full'}
                     >
                        Crear nueva objeto <Plus />
                     </Button>
                  </SelectContent>
               </Select>
            </FormItem>
            <Button
               size={'icon'}
               type='button'
               variant={'crystal'}
               className={'place-self-end'}
               onClick={handleModalEditObject}
            >
               <Pen />
            </Button>
         </FromGroup>

         <FormLabel>
            Posicion
         </FormLabel>
         <FromGroup
            className={'grid grid-cols-3 gap-4'}
         >

            <FormItem>
               <FormLabel
                  htmlFor={'positionX'}
               >
                  X
               </FormLabel>
               <Input
                  size='base'
                  type='number'
                  id='positionX'
                  name='positionX'
                  value={positionX}
                  isError={!!positionXValid}
                  onChange={onValueChange}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor={'positionY'}
               >
                  Y
               </FormLabel>
               <Input
                  size='base'
                  type='number'
                  id='positionY'
                  name='positionY'
                  value={positionY}
                  isError={!!positionYValid}
                  onChange={onValueChange}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor={'rotation'}
               >
                  Rotate
               </FormLabel>
               <Input
                  size='base'
                  type='number'
                  id='rotation'
                  name='rotation'
                  value={rotation}
                  isError={!!rotationValid}
                  onChange={onValueChange}
               />
            </FormItem>
         </FromGroup>

         <FormLabel>
            Tamaño en la escena
         </FormLabel>

         <FromGroup
            className={'grid grid-cols-3 gap-4'}
         >
            <FormItem>
               <FormLabel
                  htmlFor={'width'}
               >
                  Width
               </FormLabel>
               <Input
                  size='base'
                  type='number'
                  id='width'
                  name='width'
                  value={width}
                  isError={!!widthValid}
                  onChange={onValueChange}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor={'height'}
               >
                  Height
               </FormLabel>
               <Input
                  size='base'
                  type='number'
                  id='height'
                  name='height'
                  value={height}
                  isError={!!heightValid}
                  onChange={onValueChange}
               />
            </FormItem>
         </FromGroup>

         <FormItem>
            <Button
               size='base'
               type='submit'
               disabled={!isFormValid}
            >
               Crear objeto
            </Button>
         </FormItem>
      </Form>
   )
}