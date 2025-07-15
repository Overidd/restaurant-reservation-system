import { tablesSizeData } from '@/data';
import { useForm } from '@/hook';
import { useState } from 'react';
import { Button } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/from';

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

export const CreateObjectTable = () => {
   const [currentTableSize, setCurrentTableSize] = useState(
      tablesSizeData.find((item) => item.value === size) || tablesSizeData[0]
   );

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: {
         name,
         description,
         linkImage,
         zone,
         size,
         chairs,
         positionX,
         positionY,
         rotation,
         width,
         height,
      },
      formValidation: {
         nameValid,
         descriptionValid,
         linkImageValid,
         zoneValid,
         positionXValid,
         positionYValid,
         rotationValid,
         widthValid,
         heightValid,
      }
   } = useForm({
      initialState: schema.initial,
      activeValidation: true,
      // changeValueCallback: onInitialFrom
   });

   const onSubmit = onSubmitForm((value) => {
      console.log(value)
   })

   const handleChangeSize = (value) => {
      setCurrentTableSize(
         tablesSizeData.find((item) => item.value === value) || tablesSizeData[0]
      );
   };

   return (
      <Form
         onSubmit={onSubmit}
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
               href='linkImage'
               required
            >
               Link Image
            </FormLabel>
            <Input
               required
               type='url'
               id='linkImage'
               name='linkImage'
               value={linkImage}
               isError={!!linkImageValid}
               onChange={onValueChange}
            />
         </FormItem>

         <FromGroup>
            <FormItem>
               <FormLabel
                  href='description'
                  required
               >
                  Descripcion
               </FormLabel>
               <Input
                  required
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
                  href='zone'
               >
                  Zona
               </FormLabel>
               <Input
                  type='text'
                  id='zone'
                  name='zone'
                  value={zone}
                  isError={!!zoneValid}
                  onChange={onValueChange}
               />
            </FormItem>
         </FromGroup>

         <FromGroup>
            <FormItem>
               <FormLabel
                  formItemId={'size'}
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
                     variant='crystal'
                     className='w-full'
                  >
                     <SelectValue
                        placeholder='Seleccione un tamaño'
                     />
                  </SelectTrigger>
                  <SelectContent>
                     {tablesSizeData.map((item) => (
                        <SelectItem
                           key={item.id}
                           value={item.value}
                        >
                           {item.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </FormItem>

            <FormItem>
               <FormLabel
                  formItemId={'chairs'}
                  required
               >
                  Sillas
               </FormLabel>

               <Select
                  value={chairs || undefined}
                  name={'chairs'}
                  onValueChange={onValueChange}
               >
                  <SelectTrigger
                     variant='crystal'
                     className='w-full'
                     name='chairs'
                     id='chairs'
                  >
                     <SelectValue
                        placeholder='Numero de sillas'
                     />
                  </SelectTrigger>
                  <SelectContent>
                     {currentTableSize && Array.from({ length: currentTableSize.chairs }).map((_, index) => (
                        <SelectItem
                           key={`chairs-${index}`}
                           value={index + 1}
                        >
                           {index + 1}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </FormItem>
         </FromGroup>

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
               Crear Mesa
            </Button>
         </FormItem>
      </Form>
   )
}