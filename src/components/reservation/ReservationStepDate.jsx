import PropTypes from 'prop-types';
import { useState } from 'react';
import { cn } from '@/ultils/cn';
import { ReservationTitle } from '.';
import { Label } from '../UI/from';
import { DayPicker } from '../UI/common';
import { useStepFormContext } from '@/hook';
import { CalendarButton } from '../UI/calendar';

export const ReservationStepDate = ({ className, name }) => {
   const { nextStep } = useStepFormContext();
   const [date, setDate] = useState(undefined)

   // number || Date
   const onValueChange = (date) => {
      let currentData = date

      if (currentData instanceof Date) {
         nextStep(currentData);
         return;
      }

      const newDate = new Date();
      newDate.setDate(date);

      nextStep({ value: newDate, name: name });
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
               className={'mx-auto'}
               title={'Selecionar'}
               subtitle={'Fecha'}
            />
         </Label>

         <DayPicker
            name='date'
            onChange={onValueChange}
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