
import { cn } from '@/ultils/cn';

import { Button } from '../UI/common';


import { useReservationFromStep, useStepFormContext } from '@/hook/reservationFromStep';
import {
   ReservationLoadding,
   ReservationTitle
} from '.';

export const ReservationStepHour = ({ className }) => {
   const { isLoading, availableHour, reserveSetHour } = useReservationFromStep();
   const { nextStep } = useStepFormContext();

   const onValueChange = (data) => {
      reserveSetHour(data);
      nextStep();
   }

   return (
      <ReservationLoadding
         isLodding={isLoading.hour}
         className={'h-full mx-auto flex flex-col justify-center'}
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
                  availableHour.map(({ id, name, tablesAvailable }) => (
                     <div
                        className='space-y-2'
                        key={id}
                     >
                        <Button
                           className={'w-24'}
                           onClick={() => onValueChange({ id, name, tablesAvailable })}
                           type='button'
                        >
                           {name}
                        </Button>
                        <span className="block capitalize text-sm text-muted-foreground font-bold">
                           {tablesAvailable} Disponibles
                        </span>
                     </div>
                  ))
               }
               {
                  !availableHour.length && (
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