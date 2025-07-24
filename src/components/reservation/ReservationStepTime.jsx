import {
   useReserve,
   useStepFormContext
} from '@/hook';
import { cn } from '@/ultils/cn';

import { Button } from '../UI/common';


import {
   ReservationLoadding,
   ReservationTitle
} from '.';

export const ReservationStepTime = ({ className }) => {
   const { isLoading, availableTime, reserveSetTime } = useReserve();
   const { nextStep } = useStepFormContext();

   const onValueChange = (data) => {
      reserveSetTime(data);
      nextStep();
   }

   return (
      <ReservationLoadding
         isLodding={isLoading.time}
         className={'h-full mx-auto'}
      >
         <section
            className={cn(
               'md:w-[50%] h-full mx-auto flex flex-col justify-center gap-8',
               'text-center',
               className
            )}
         >
            <ReservationTitle
               title={'Seleccionar'}
               subtitle={'Hora'}
               className={'mx-auto'}
            />

            <div className='flex flex-wrap gap-5 justify-center'>
               {
                  availableTime.map(({ id, hour, tablesAvailable }) => (
                     <div
                        className='space-y-2'
                        key={id}
                     >
                        <Button
                           className={'w-24'}
                           onClick={() => onValueChange({ id, hour, tablesAvailable })}
                           type='button'
                        >
                           {hour}
                        </Button>
                        <span className="block capitalize text-sm text-muted-foreground font-bold">
                           {tablesAvailable} Disponibles
                        </span>
                     </div>
                  ))
               }
               {
                  !availableTime.length && (
                     <span className="block capitalize text-muted-foreground font-bold">
                        No hay horas disponibles
                     </span>
                  )
               }
            </div>
         </section>
      </ReservationLoadding>
   )
}