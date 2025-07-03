import { useState } from 'react';
import { cn, validateObject } from '@/ultils';
import { Button, Modal } from '../UI/common';
import { tablesSizeData } from '@/data';
import { Card2 } from '../UI/card';
import { useForm } from '@/hook';

import {
   Form,
   FormItem,
   FormLabel,
   FromGroup,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';

const schema = {
   initial: {
      positionX: 0,
      positionY: 0,
      rotation: 0,
      size: 0,
      chairs: 0
   },
   // valid: {
   //    positionX: [
   //       (value) => value >= 0,
   //       'La posición X debe ser mayor o igual a 0',
   //    ],
   //    positionY: [
   //       (value) => value >= 0,
   //       'La posición Y debe ser mayor o igual a 0',
   //    ],
   //    rotation: [
   //       (value) => value >= 0,
   //       'La rotación debe ser mayor o igual a 0',
   //    ],
   //    size: [
   //       (value) => value >= 0,
   //       'El tamaño debe ser mayor o igual a 0',
   //    ],
   //    chairs: [
   //       (value) => value >= 0,
   //       'Las sillas debe ser mayor o igual a 0',
   //    ],
   // },
}

export const TableEditPropertyModal = ({
   className,
   initial,
   isOpen,
   onClose,
   onChangeValue,
   axieRestaurant = {
      y: 0,
      x: 0
   }
}) => {
   const [currentTableSize, setCurrentTableSize] = useState(tablesSizeData[0]);

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: { positionX, positionY, rotation, size, chairs },
   } = useForm({
      initialState: validateObject(initial) ? initial : schema.initial,
      validations: schema.valid,
      activeValidation: false,
      changeValueCallback: onChangeValue
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
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         direction='topright'
         overlayClassName={'backdrop-blur-none'}
      >
         <Card2
            className={cn(
               className
            )}
         >
            <Form onSubmit={onSubmit}>
               <FromGroup>
                  <FormLabel>
                     Actualizar posición
                  </FormLabel>
                  <FormItem>
                     <FormLabel
                        formItemId={'positionX'}
                     >
                        X
                     </FormLabel>
                     <Input
                        id='positionX'
                        type='number'
                        name='positionX'
                        variant='crystal'
                        min={1}
                        max={axieRestaurant.x}
                        value={positionX}
                        onChange={onValueChange}
                        className={'!text-lg py-1'}
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        formItemId={'positionY'}
                     >
                        Y
                     </FormLabel>
                     <Input
                        id='positionY'
                        type='number'
                        name='positionY'
                        variant='crystal'
                        min={1}
                        max={axieRestaurant.y}
                        value={positionY}
                        onChange={onValueChange}
                        className={'!text-lg py-1'}
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        formItemId={'rotation'}
                     >
                        Rotación
                     </FormLabel>
                     <Input
                        id='rotation'
                        type='number'
                        name='rotation'
                        variant='crystal'
                        min={0}
                        max={360}
                        value={Number(rotation ?? 0)}
                        onChange={onValueChange}
                        className={'!text-lg py-1'}
                     />
                  </FormItem>
               </FromGroup>

               <FormItem>
                  <FormLabel
                     formItemId={'size'}
                  >
                     Tamaño de mesa
                  </FormLabel>
                  <Select
                     value={size || undefined}
                     onValueChange={(value) => {
                        handleChangeSize(value);
                        onValueChange({ name: 'size', value })
                     }}
                  >
                     <SelectTrigger
                        variant='crystal'
                        className='w-full'
                     >
                        <SelectValue placeholder='Seleccione un tamaño' />
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
                  >
                     Sillas
                  </FormLabel>

                  <Select
                     value={chairs || undefined}
                     onValueChange={(value) =>
                        onValueChange({ name: 'chairs', value })
                     }
                  >
                     <SelectTrigger
                        variant='crystal'
                        className='w-full'
                        id='chairs'
                     >
                        <SelectValue placeholder='Numero de sillas' />
                     </SelectTrigger>
                     <SelectContent>
                        {currentTableSize && Array(currentTableSize.chairs).fill(0).map((_, index) => (
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

               <FormItem>
                  <Button
                     type='submit'
                     disabled={!isFormValid}
                  >
                     Actualizar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </Modal>
   )
}