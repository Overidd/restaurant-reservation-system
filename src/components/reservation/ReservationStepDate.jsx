import PropTypes from 'prop-types';


import { cn } from '@/ultils/cn';

import { CalendarButton } from '../UI/calendar';
import { DayPicker } from '../UI/common';

import { useReserve, useStepFormContext } from '@/hook/reservation';
import { ReservationTitle } from '.';


export const ReservationStepDate = ({ className }) => {
   const { reserveSetDate } = useReserve();
   const { nextStep } = useStepFormContext();

   const onValueChange = ({ value }) => {
      if (value instanceof Date) {
         reserveSetDate(value);
         nextStep();
         return;
      }

      const newDate = new Date();
      newDate.setDate(value);

      reserveSetDate(newDate);
      nextStep();
   }

   return (
      <section
         className={cn(
            'md:w-[70%] h-full mx-auto flex flex-col justify-center gap-8',
            className,
         )}
      >
         <ReservationTitle
            subtitle={'Fecha'}
            title={'Selecionar'}
            className={'mx-auto'}
         />

         <DayPicker
            name='date'
            onChange={onValueChange}
            className={'mx-auto'}
         />

         <div className={'mx-auto w-fit'}>
            <CalendarButton
               name={'date'}
               onValueChange={onValueChange}
            />
         </div>
      </section>
   )
}

ReservationStepDate.propTypes = {
   schema: PropTypes.object
}