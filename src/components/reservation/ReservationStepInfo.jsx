import { Suspense } from 'react';

import {
   useForm,
   useGetAllLocation,
   useReserve,
   useStepFormContext,
} from '@/hook';
import { validateObject } from '@/ultils';
import { cn } from '@/ultils/cn';

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


export const ReservationStepInfo = ({
   schema,
   className,
   reasonData = []
}) => {
   const { locations } = useGetAllLocation();
   const { nextStep } = useStepFormContext();
   const { reserveSetInfo, from } = useReserve();

   const {
      onSubmitForm,
      onValueChange,
      isFormValid,
      formState: { location, reason, diners },
      formValidation: { locationValid, reasonValid, dinersValid },
   } = useForm({
      initialState: validateObject(from.info) ? from.info : schema.initial,
      validations: schema.valid,
      activeValidation: true,
      additionalData: {
         location: locations,
      },
   });

   const onSubmit = onSubmitForm((value) => {
      const location = locations.find((item) =>
         item.name?.toLowerCase() === value.location?.toLowerCase()
      );

      reserveSetInfo({
         ...value,
         locationId: location?.id,
      });

      nextStep();
   })

   return (
      <Suspense>
         <Form
            onSubmit={onSubmit}
            className={cn(
               'w-[50%] h-full mx-auto space-y-4',
               className
            )}
         >
            <FormItem>
               <Select
                  name='location'
                  value={location || undefined}
                  onValueChange={onValueChange}
               >
                  <SelectTrigger
                     isError={!!locationValid}
                     variant='crystal'
                     className='w-full'
                  >
                     <SelectValue placeholder='Seleccione una localidad' />
                  </SelectTrigger>
                  <SelectContent>
                     {locations.map((item) => (
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
                  className={'!text-lg py-1'}
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