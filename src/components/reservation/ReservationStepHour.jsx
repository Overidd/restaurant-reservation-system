import { cn } from '@/ultils/cn';
import { Button } from '../UI/common';
import { Label } from '../UI/from';

import {
   useReserve,
   useStepFormContext
} from '@/hook';

import {
   ReservationLoadding,
   ReservationTitle
} from '.';


export const ReservationStepHour = ({ className }) => {
   const { isLoading, availableHours, reserveSetHour } = useReserve();
   const { nextStep } = useStepFormContext();

   const onValueChange = (hour) => {
      reserveSetHour(hour);
      nextStep();
   }

   return (
      <ReservationLoadding
         isLodding={isLoading.hour}
      >
         <section
            className={cn(
               'w-[50%] h-full mx-auto space-y-10',
               'text-center',
               className
            )}
         >
            <Label>
               <ReservationTitle
                  title={'Seleccionar'}
                  subtitle={'Hora'}
                  className={'mx-auto'}
               />
            </Label>

            <div className='grid grid-cols-4 gap-5'>
               {
                  availableHours.map((hour) => (
                     <Button
                        onClick={() => onValueChange(hour.hour)}
                        type='button'
                        key={hour.id}
                     >
                        {hour.hour}
                     </Button>
                  ))
               }
            </div>
         </section>
      </ReservationLoadding>
   )
}