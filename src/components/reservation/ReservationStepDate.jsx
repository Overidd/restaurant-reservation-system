import PropTypes from 'prop-types';
import { useState } from 'react';
import { cn } from '@/ultils/cn';
import { Label } from '../UI/from';
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
   const [date, setDate] = useState(undefined)

   // number || Date
   const onValueChange = (date) => {
      let currentData = date

      if (currentData instanceof Date) {
         reserveSetDate(newDate);
         nextStep();
         return;
      }

      const newDate = new Date();
      newDate.setDate(date);

      reserveSetDate(newDate);
      nextStep();
   }

   const onValueChangeDate = (date) => {
      setDate(date)
      onValueChange(date)
   }

   return (
      <section
         className={cn(
            'w-[50%] h-full mx-auto text-center space-y-10',
            className,
         )}
      >
         <Label>
            <ReservationTitle
               subtitle={'Fecha'}
               title={'Selecionar'}
               className={'mx-auto'}
            />
         </Label>

         <DayPicker
            name='date'
            onChange={onValueChange}
            className={'mx-auto'}
         />

         <CalendarButton
            date={date}
            onValueChange={onValueChangeDate}
         />
      </section>
   )
}

ReservationStepDate.propTypes = {
   schema: PropTypes.object
}