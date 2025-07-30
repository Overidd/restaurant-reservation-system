import { Suspense } from 'react';


import { cn } from '@/ultils/cn';

import { useForm } from '@/hook/common';
import { useGetAllRestaurants, useReserve, useStepFormContext } from '@/hook/reservation';
import { Button } from '../UI/common';
import {
   Form,
   FormItem,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';

const reasonData = [
   {
      id: 1,
      name: 'Cumpleaños',
   },
   {
      id: 2,
      name: 'Fiesta',
   },
   {
      id: 3,
      name: 'Aniversario',
   },
   {
      id: 4,
      name: 'Otros',
   }
]

const schema = {
   valid: {
      restaurant: [
         (value, state, additionalData) => additionalData.restaurant.some((item) => item.name === value),
         'Selecione una ubicación',
         true
      ],

      reason: [
         (value) => reasonData.some(item => item.name === value),
         'Selecione un motivo',
      ],

      diners: [
         (value) => value > 0,
         'Selecione la cantidad de comensales',
      ]
   },
   initial: {
      restaurant: '',
      reason: '',
      diners: 2
   }
}
export const ReservationStepInfo = ({
   className,
}) => {

   const { restaurants } = useGetAllRestaurants();
   const { nextStep } = useStepFormContext();
   const { reserveSetInfo, from } = useReserve();

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: {
         restaurant,
         reason,
         diners
      },
      formValidation: {
         restaurantValid,
         reasonValid,
         dinersValid
      },
   } = useForm({
      initialState: {
         ...schema.initial,
         ...from.info,
      },
      validations: schema.valid,
      activeValidation: true,
      additionalData: {
         restaurant: restaurants,
      },
   });

   const onSubmit = onSubmitForm((value) => {
      const restaurant = restaurants.find((item) =>
         item.name?.toLowerCase() === value.restaurant?.toLowerCase()
      );

      reserveSetInfo({
         ...value,
         restaurantId: restaurant?.id,
      });

      nextStep();
   })

   return (
      <Suspense>
         <Form
            onSubmit={onSubmit}
            className={cn(
               'md:w-[50%] h-full mx-auto flex flex-col justify-center gap-8',
               className
            )}
         >
            <FormItem>
               <Select
                  name='restaurant'
                  value={restaurant || undefined}
                  onValueChange={onValueChange}
               >
                  <SelectTrigger
                     isError={!!restaurantValid}
                     variant='crystal'
                     className='w-full'
                  >
                     <SelectValue placeholder='Seleccione una localidad' />
                  </SelectTrigger>
                  <SelectContent>
                     {restaurants.map((item) => (
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
               <Select
                  name='reason'
                  value={reason || undefined}
                  onValueChange={onValueChange}
               >
                  <SelectTrigger
                     isError={!!reasonValid}
                     variant='crystal'
                     className='w-full'
                  >
                     <SelectValue placeholder='Seleccione un motivo' />
                  </SelectTrigger>
                  <SelectContent>
                     {reasonData.map((item) => (
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
               <Input
                  max={12}
                  min={1}
                  type='number'
                  name='diners'
                  variant='crystal'
                  value={diners ?? ''}
                  onChange={onValueChange}
                  isError={!!dinersValid}
                  placeholder='Personas'
               />
            </FormItem>

            <Button
               type='submit'
               disabled={!isFormValid}
            >
               Siguiente
            </Button>
         </Form >
      </Suspense>
   )
}