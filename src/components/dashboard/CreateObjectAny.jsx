import { useForm } from '@/hook';
import { useModalCreateItemObject } from '@/hook/modals';
import { Plus } from 'lucide-react';
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

export const CreateObjectAny = () => {

   const {
      openModal: onOpenNewItemObj
   } = useModalCreateItemObject()

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
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
      changeValueCallback: onInitialFrom
   });

   function onInitialFrom({ name, value }) {

   }

   const onSubmit = onSubmitForm((value) => {
      console.log(value)
   })

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
                  {[].map((item) => (
                     <SelectItem
                        key={item.id}
                        value={item.name}
                     >
                        {item.name}
                     </SelectItem>
                  ))}

                  <SelectItem
                     value={null}
                  >
                     <Button
                        type='button'
                        onClick={onOpenNewItemObj}
                     >
                        Crear nueva objeto <Plus />
                     </Button>
                  </SelectItem>
               </SelectContent>
            </Select>
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