import { useForm } from '@/hook/common';
import { useCreateObjectContext } from '@/hook/context';
import { useResource } from '@/hook/dashboard';
import { useModalCreateItemObject, useModalEditItemObject } from '@/hook/modals';
import { AdminTableToasts } from '@/toasts';
import { typeResource } from '@/ultils';
import { BetweenHorizontalStart, BetweenVerticalStart, MoveHorizontal, MoveVertical, Pen, Plus, RotateCwSquare } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '../../UI/common';
import { Form, FormItem, FormLabel, FromGroup, NumberInput, Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '../../UI/from';

const schema = {
   initial: {
      positionX: '',
      positionY: '',
      rotation: '',
      width: '',
      height: '',
      chairs: 2,
   },
   validation: {
      positionX: [
         (value, _, data) => value > 0 && value <= (data.maxPositionX ?? 15),
         'El ancho debe ser mayor a 0',
         true
      ],
      positionY: [
         (value, _, data) => value > 0 && value <= (data.maxPositionY ?? 15),
         'El alto debe ser mayor a 0',
         true
      ],
      rotation: [
         (value) => value >= 0 && value <= 360,
         'La rotación debe estar entre 0 y 360',
         true
      ],
      width: [
         (value) => value > 0 && value <= 15,
         'El ancho debe ser mayor a 0',
         true
      ],
      height: [
         (value) => value > 0 && value <= 15,
         'El alto debe ser mayor a 0',
         true
      ],
   }
}

// TODO: Hasta que no seleccione algun tipo de objecto, los campos deberia estar por defecto desabilitados

// TODO: Seria ideal recibir el ancho y alto del tablero

export const CreateObject = ({
   selectedResource,
   currentCategory,
   restaurant,
}) => {

   const {
      openModal: onOpenCreateItemObj
   } = useModalCreateItemObject()

   const {
      openModal: onOpenEditItemObj
   } = useModalEditItemObject()

   const {
      objects,
      setCategory,
      loadObjects,
      isLoadingLoad,
      setSelectObject,
      getObjectByName,
      selectObject,
   } = useCreateObjectContext()

   const {
      createObject,
      createTempObject,
      updateSelectedResource,
      toggleIsTempResourceChange,
      isLoadingCreateObject,
      setSelectedResource
   } = useResource()

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
      activeValidation: true,
      validations: schema.validation,
      initialState: {
         ...schema.initial,
         positionX: selectedResource.positionX,
         positionY: selectedResource.positionY,
      },
      additionalData: {
         maxPositionX: restaurant?.rows,
         maxPositionY: restaurant?.columns,
      },
      changeValueCallback: ({ name, value }) => {
         if (!name || !value) return
         updateSelectedResource({ name, value })
      }
   });

   const handleSelectObject = ({ value }) => {
      const object = getObjectByName(value);
      if (!value || !object) return
      setSelectObject(getObjectByName(value))
      toggleIsTempResourceChange(true)

      createTempObject(
         selectedResource,
         object
      )
      onInitialFrom({
         ...object,
         positionX: selectedResource.positionX,
         positionY: selectedResource.positionY
      })
   }

   const handleModalCreateObject = () => {
      setCategory(currentCategory)
      onOpenCreateItemObj()
   }

   const handleModalEditObject = () => {
      if (!currentCategory) return
      setCategory(currentCategory)
      onOpenEditItemObj()
   }

   const onSubmit = onSubmitForm((data) => {
      AdminTableToasts.createObject(
         createObject({
            ...selectedResource,
            ...data,
            idRestaurant: restaurant?.id,
         })
      )
   })

   useEffect(() => {
      if (currentCategory) {
         loadObjects(currentCategory.id)
         setSelectObject(null)
         onResetForm()
         return;
      }
   }, [currentCategory])

   useEffect(() => {
      if (selectObject === null) {
         setSelectedResource({
            type: typeResource.OBJECT,
            idTemp: selectedResource?.idTemp,
            id: selectedResource.id,
            positionX,
            positionY,
         })
         onResetForm()
      };
   }, [selectObject])

   return (
      <Form
         noValidate
         onSubmit={onSubmit}
      >
         <FromGroup
            className={'flex items-center gap-2'}
         >
            <FormItem className='flex-1'>
               <FormLabel htmlFor='type'>
                  Tipo de objeto
               </FormLabel>

               <Select
                  name='type'
                  value={selectObject?.name}
                  onValueChange={handleSelectObject}
               >
                  <SelectTrigger
                     isLoading={isLoadingLoad}
                     disabled={isLoadingLoad}
                     id='type'
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
                  Y
               </FormLabel>
               <NumberInput
                  axis='y'
                  min={1}
                  max={restaurant?.rows}
                  name={'positionX'}
                  value={positionX}
                  isError={!!positionXValid}
                  onChange={onValueChange}
                  sensitivity={0.03}
                  prefix={
                     <MoveVertical
                        size={14}
                        className={'-mr-2'}
                     />
                  }
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor={'positionY'}
               >
                  X
               </FormLabel>

               <NumberInput
                  axis='x'
                  min={1}
                  max={restaurant?.columns}
                  name={'positionY'}
                  value={positionY}
                  isError={!!positionYValid}
                  onChange={onValueChange}
                  sensitivity={0.03}
                  prefix={
                     <MoveHorizontal
                        size={14}
                        className={'-mr-2'}
                     />
                  }
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor={'rotation'}
               >
                  Rotate
               </FormLabel>
               <NumberInput
                  min={0}
                  max={360}
                  axis='x'
                  name={'rotation'}
                  value={rotation}
                  isError={!!rotationValid}
                  onChange={onValueChange}
                  prefix={
                     <RotateCwSquare
                        size={14}
                        className={'-mr-2'}
                     />
                  }
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

               <NumberInput
                  min={1}
                  axis='x'
                  name={'width'}
                  value={width}
                  max={restaurant?.rows}
                  isError={!!widthValid}
                  onChange={onValueChange}
                  sensitivity={0.03}
                  prefix={
                     <BetweenVerticalStart
                        size={14}
                        className={'-mr-2'}
                     />
                  }
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor={'height'}
               >
                  Height
               </FormLabel>

               <NumberInput
                  min={1}
                  axis='y'
                  name={'height'}
                  value={height}
                  max={restaurant?.columns}
                  isError={!!heightValid}
                  onChange={onValueChange}
                  sensitivity={0.03}
                  prefix={
                     <BetweenHorizontalStart
                        size={14}
                        className={'-mr-2'}
                     />
                  }
               />
            </FormItem>
         </FromGroup>

         <FormItem>
            <Button
               size='base'
               type='submit'
               disabled={!isFormValid || isLoadingCreateObject}
            >
               Crear objeto
            </Button>
         </FormItem>
      </Form>
   )
}