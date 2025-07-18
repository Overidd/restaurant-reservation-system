import { tableTypeData } from '@/data';
import { useForm } from '@/hook';
import { useCreateObject } from '@/hook/dashboard';
import { useState } from 'react';
import { Button } from '../../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../UI/from';

const schema = {
   initial: {
      name: '',
      description: '',
      linkImage: '',
      zone: '',
      size: '',
      chairs: 0,
      positionX: 0,
      positionY: 0,
      rotation: 0,
      width: 0,
      height: 0,
   },
}

const keysChange = ['chairs', 'size', 'rotation', 'width', 'height', 'positionX', 'positionY']

export const CreateTable = () => {
   const [selectTypeTable, setSelectTypeTable] = useState([]);

   const {
      createTempTable,
      updateSelectedResource,
      selectedResource,
   } = useCreateObject()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      onInitialFrom,
      formState,
      formValidation,
   } = useForm({
      activeValidation: true,
      initialState: {
         ...schema.initial,
         positionX: selectedResource.positionX,
         positionY: selectedResource.positionY,
      },
      changeValueCallback: ({ name, value }) => {
         if (!name || !value) return;
         if (keysChange.includes(name)) {
            console.log('name', name, 'value', value);
            updateSelectedResource({ name, value })
         }
      }
   });
   const {
      name,
      description,
      linkImage,
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
      linkImageValid,
      zoneValid,
      positionXValid,
      positionYValid,
      rotationValid,
      widthValid,
      heightValid,
   } = formValidation

   const handleChangeSize = (name) => {
      const tableType = tableTypeData.find((item) => item.name === name);
      setSelectTypeTable({
         ...tableType,
         id: `${tableType.id}createtable`,
      });
      createTempTable({
         ...tableType,
         id: `${tableType.id}createtable`,
      })
      onInitialFrom({
         ...formState,
         chairs: tableType.chairs ?? 2,
         width: tableType.width,
         height: tableType.height,
         rotation: tableType.rotation,
      })
   };

   const onSubmit = onSubmitForm((value) => {
      console.log(value)
   })

   return (
      <Form
         onSubmit={onSubmit}
         className={'max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden'}
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

         <FromGroup
            className={'grid grid-cols-2 gap-4'}
         >
            <FormItem>
               <FormLabel
                  href='linkImage'
                  required
               >
                  Link Image
               </FormLabel>
               <Input
                  required
                  size='base'
                  type='url'
                  id='linkImage'
                  name='linkImage'
                  value={linkImage}
                  isError={!!linkImageValid}
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
                  value={String(chairs) || '2'}
                  onValueChange={onValueChange}
                  name={'chairs'}
                  type='text'
               >
                  <SelectTrigger
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
                           value={String(index + 1)}
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
                  X
               </FormLabel>
               <Input
                  size='base'
                  type='number'
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
               Crear Mesa
            </Button>
         </FormItem>
      </Form>
   )
}