import { tablesSizeData } from '@/data';
import { useForm } from '@/hook';
import { cn } from '@/ultils';
import { useState } from 'react';
import { Card2 } from '../../UI/card';
import { Button, SlideOver } from '../../UI/common';

import { useResource } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
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
} from '../../UI/from';

const schema = {
   initial: {
      positionX: 0,
      positionY: 0,
      rotation: 0,
      size: 0,
      chairs: 0
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
         'La rotación debe ser un valor entre 0 y 360',
         true
      ],
   }
}

export const EditTablePropertySlide = ({
   className,
   isOpen,
   onClose,
   restaurant = {},
   selectedResource = {},
}) => {
   const [currentTableSize, setCurrentTableSize] = useState(
      tablesSizeData.find((item) => item.value === selectedResource?.size) ||
      tablesSizeData[0]);

   const {
      updateTable,
      updateSelectedResource,
      isLoadingUpdateTable,
   } = useResource();

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: {
         positionX,
         positionY,
         rotation,
         size,
         chairs
      },
   } = useForm({
      activeValidation: true,
      validations: schema.validation,
      additionalData: {
         maxPositionX: restaurant?.rows,
         maxPositionY: restaurant?.columns,
      },
      initialState: {
         ...schema.initial,
         positionX: selectedResource?.positionX,
         positionY: selectedResource?.positionY,
         rotation: selectedResource?.rotation,
         size: selectedResource?.size,
         chairs: selectedResource?.chairs
      },
      changeValueCallback: ({ name, value }) => {
         if (!name || !value) return;
         updateSelectedResource({ name, value });
      },
   });

   const handleChangeSize = (value) => {
      setCurrentTableSize(
         tablesSizeData.find((item) => item.value === value) || tablesSizeData[0]
      );
   };

   const onSubmit = onSubmitForm((value) => {
      AdminTableToasts.updateTable(
         updateTable({
            ...value,
            idTable: selectedResource?.id,
            idRestaurant: restaurant?.id
         })
      )
   })

   return (
      <SlideOver
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
                        htmlFor={'positionX'}
                     >
                        X
                     </FormLabel>
                     <Input
                        id='positionX'
                        type='number'
                        name='positionX'
                        variant='crystal'
                        min={1}
                        max={restaurant.x}
                        value={positionX}
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
                        id='positionY'
                        type='number'
                        name='positionY'
                        variant='crystal'
                        min={1}
                        max={restaurant.y}
                        value={positionY}
                        onChange={onValueChange}
                     />
                  </FormItem>

                  <FormItem>
                     <FormLabel
                        htmlFor={'rotation'}
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
                        value={Number(rotation)}
                        onChange={onValueChange}
                     />
                  </FormItem>
               </FromGroup>

               <FormItem>
                  <FormLabel
                     htmlFor={'size'}
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
                     htmlFor={'chairs'}
                  >
                     Sillas
                  </FormLabel>

                  <Select
                     value={chairs || undefined}
                     onValueChange={onValueChange}
                     name={'chairs'}
                     type='number'
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
                     disabled={!isFormValid || isLoadingUpdateTable}
                  >
                     Actualizar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </SlideOver>
   )
}