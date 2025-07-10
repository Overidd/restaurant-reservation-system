import { tablesSizeData } from '@/data';
import { useForm } from '@/hook';
import { cn, validateObject } from '@/ultils';
import { useState } from 'react';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';

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
   const [currentTableSize, setCurrentTableSize] = useState(
      tablesSizeData.find((item) => item.value === initial.size) || tablesSizeData[0]
   );

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: { positionX, positionY, rotation, size, chairs },
   } = useForm({
      initialState: validateObject(initial) ? initial : schema.initial,
      activeValidation: false,
      changeValueCallback: onInitialFrom
   });

   function onInitialFrom(newInitialState) {
      onChangeValue(newInitialState);
   };

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
               <FormLabel>
                  Actualizar posición
               </FormLabel>

               <FromGroup
                  className={'flex flex-row gap-4'}
               >
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
                        min={1}
                        max={360}
                        value={Number(rotation)}
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
                     name={'size'}
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