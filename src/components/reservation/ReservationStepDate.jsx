import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { DayPicker } from '../UI/common';
import { CalendarButton } from '../UI/calendar';
import { ReservationTitle } from '.';

import {
   useReserve,
   useStepFormContext
} from '@/hook';

export const ReservationStepDate = ({ className }) => {
   const { reserveSetDate } = useReserve();
   const { nextStep } = useStepFormContext();

   const onValueChange = (currentData) => {
      if (currentData instanceof Date) {
         reserveSetDate(currentData);
         nextStep();
         return;
      }

      const newDate = new Date();
      newDate.setDate(currentData);

      reserveSetDate(newDate);
      nextStep();
   }

   return (
      <section
         className={cn(
            'w-[70%] h-full mx-auto text-center space-y-10',
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

         <CalendarButton
            onValueChange={onValueChange}
         />
      </section>
   )
}

ReservationStepDate.propTypes = {
   schema: PropTypes.object
}