import { tableTypeData } from '@/data';
import { useForm } from '@/hook/common';
import { useResource } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { Validations } from '@/ultils';
import { BetweenHorizontalStart, BetweenVerticalStart, MoveHorizontal, MoveVertical, RotateCwSquare } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, NumberInput, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../UI/from';

const schema = {
   initial: {
      name: '',
      description: '',
      image: '',
      zone: '',
      size: '',
      chairs: 2,
      positionX: 0,
      positionY: 0,
      rotation: 0,
      width: 1,
      height: 1,
   },

   validation: {
      name: [
         (value) => value?.length >= 2,
         'El nombre debe tener al menos 3 caracteres',
      ],
      description: [
         (value) => value?.length >= 2,
         'La descripcion debe tener al menos 3 caracteres',
      ],
      image: [
         (value) => Validations.urlImage(value),
         'La url de la imagen no es valida',
      ],
      zone: [
         (value) => value?.length >= 2,
         'La zona debe tener al menos 3 caracteres',
      ],
      size: [
         (value) => !!value,
         'El tamaño de mesa es obligatorio',
      ],
      positionX: [
         (value, _, data) => value >= 0 && value <= (data.maxPositionX ?? 15),
         'La posicion X debe ser mayor a 0',
         true,
      ],
      positionY: [
         (value, _, data) => value >= 0 && value <= (data.maxPositionY ?? 15),
         'La posicion Y debe ser mayor a 0',
         true,
      ],
      chairs: [
         (value) => !!value,
         'El numero de sillas es obligatorio',
      ],

      rotation: [
         (value) => value >= 0 && value <= 360,
         'La rotacion debe ser mayor a 0',
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
   },
}

const keysChange = ['chairs', 'size', 'rotation', 'width', 'height', 'positionX', 'positionY']

export const CreateTable = ({
   selectedResource,
   restaurant,
}) => {
   const [selectTypeTable, setSelectTypeTable] = useState([]);

   const {
      createTable,
      createTempTable,
      updateSelectedResource,
      isLoadingCreateTable
   } = useResource()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onInitialFrom,
      formState,
      formValidation,
      onResetForm,
   } = useForm({
      activeValidation: true,
      validations: schema.validation,
      additionalData: {
         maxPositionX: restaurant?.rows,
         maxPositionY: restaurant?.columns,
      },
      initialState: {
         ...schema.initial,
         positionX: selectedResource.positionX,
         positionY: selectedResource.positionY,
      },
      changeValueCallback: ({ name, value }) => {
         if (!name || !value) return;
         if (keysChange.includes(name)) {
            updateSelectedResource({ name, value })
         }
      }
   });
   const {
      name,
      description,
      image,
      zone,
      size,
      positionX,
      positionY,
      chairs,
      width,
      height,
      rotation,
   } = formState;

   const {
      nameValid,
      descriptionValid,
      imageValid,
      zoneValid,
      positionXValid,
      positionYValid,
      rotationValid,
      widthValid,
      heightValid,
      chairsValid
   } = formValidation

   const handleChangeSize = (name) => {
      const tableType = tableTypeData.find((item) => item.name === name);
      setSelectTypeTable({
         ...tableType,
         id: `${tableType.id}createtable`,
      });
      createTempTable(
         selectedResource, {
         ...tableType,
         id: `${tableType.id}createtable`,
      })
      onInitialFrom({
         ...formState,
         chairs: tableType.chairs ?? 2,
         width: tableType.width,
         height: tableType.height,
         rotation: tableType.rotation,
         positionX: selectedResource.positionX,
         positionY: selectedResource.positionY
      })
   };

   const onSubmit = onSubmitForm((value) => {
      AdminTableToasts.createTable(
         createTable({
            ...selectedResource,
            ...value,
            idRestaurant: restaurant.id,
            size: selectTypeTable?.size
         }), {
         onSuccess: () => {
            onResetForm({
               name,
               description,
               image,
               zone,
            });
         }
      });
   })

   return (
      <Form
         noValidate
         onSubmit={onSubmit}
         className={'max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden'}
      >
         <FromGroup
            className={'grid grid-cols-2 gap-4'}
         >
            <FormItem>
               <FormLabel
                  href='name'
                  required
               >
                  Nombre
               </FormLabel>
               <Input
                  required
                  size='base'
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  isError={!!nameValid}
                  onChange={onValueChange}
               />
            </FormItem>

            <FormItem>
               <FormLabel
                  href='zone'
               >
                  Zona
               </FormLabel>
               <Input
                  size='base'
                  type='text'
                  id='zone'
                  name='zone'
                  value={zone}
                  isError={!!zoneValid}
                  onChange={onValueChange}
               />
            </FormItem>
         </FromGroup>

         <FormItem>
            <FormLabel
               href='description'
               required
            >
               Descripcion
            </FormLabel>
            <Input
               required
               size='base'
               type='text'
               id='description'
               name='description'
               value={description}
               isError={!!descriptionValid}
               onChange={onValueChange}
            />
         </FormItem>

         <FormItem>
            <FormLabel
               href='image'
               required
            >
               Link Image
            </FormLabel>
            <Input
               required
               size='base'
               type='url'
               id='image'
               name='image'
               value={image}
               isError={!!imageValid}
               onChange={onValueChange}
            />
         </FormItem>

         <FromGroup
            className={'grid grid-cols-2 gap-4'}
         >
            <FormItem>
               <FormLabel
                  htmlFor={'size'}
                  required
               >
                  Tamaño de mesa
               </FormLabel>
               <Select
                  name='size'
                  value={size || undefined}
                  onValueChange={(data) => {
                     handleChangeSize(data.value);
                     onValueChange(data)
                  }}
               >
                  <SelectTrigger
                     size='base'
                     className='w-full'
                     variant='crystal'
                  >
                     <SelectValue
                        placeholder='Tamaño'
                     />
                  </SelectTrigger>
                  <SelectContent>
                     {tableTypeData.map((item) => (
                        <SelectItem
                           key={item.id}
                           value={item.name}
                        >
                           {item.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </FormItem>

            <FormItem>
               <FormLabel
                  htmlFor={'chairs'}
                  required
               >
                  Sillas
               </FormLabel>

               <Select
                  value={String(chairs) || undefined}
                  onValueChange={onValueChange}
                  name={'chairs'}
                  type='number'
               >
                  <SelectTrigger
                     isError={!!chairsValid}
                     size='base'
                     className='w-full'
                     variant='crystal'
                     name='chairs'
                     id='chairs'
                  >
                     <SelectValue
                        placeholder='Sillas'
                     />
                  </SelectTrigger>
                  <SelectContent>
                     {selectTypeTable && Array.from({ length: selectTypeTable.maxChairs }).map((_, index) => (
                        <SelectItem
                           key={`chairs-${index}`}
                           value={`${index + 1}`}
                        >
                           {index + 1}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </FormItem>
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
                  step={10}
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
               type='submit'
               disabled={!isFormValid || isLoadingCreateTable}
            >
               Crear Mesa
            </Button>
         </FormItem>
      </Form>
   )
}