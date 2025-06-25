import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { useStepFormContext } from '@/hook';
import { Button, Calendar, DayPicker, Popover } from '../UI/common';
import { ChevronDownIcon } from 'lucide-react';
import { ReservationTitle } from '.';
import { useState } from 'react';
import { Label } from '../UI/from';

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

         <Popover
            className='w-fit'
            placement='bottom'
            content={
               <Calendar
                  mode='single'
                  selected={date}
                  captionLayout='dropdown'
                  disabled={(date) => date <= new Date(new Date().setDate(new Date().getDate() - 1))}
                  onSelect={(date) => {
                     setDate(date)
                     onValueChange(date)
                  }}
               />
            }
         >
            <Button
               className='w-48 justify-between font-normal'
               variant='outline'
               type='button'
               id='date'
            >
               {date ? date.toLocaleDateString() : 'Seleccione una fecha'}
               <ChevronDownIcon />
            </Button>
         </Popover>
      </section>
   )
}

ReservationStepDate.propTypes = {
   schema: PropTypes.object
}