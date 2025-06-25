import PropTypes from 'prop-types';
import { useStepFormContext } from '@/hook';
import { Form, FormItem, Label } from '../UI/from';
import { Button, Calendar, DayPicker, Popover } from '../UI/common';
import { ChevronDownIcon } from 'lucide-react';
import { ReservationTitle } from '.';
import { cn } from '@/ultils/cn';
import { useState } from 'react';

export const ReservationStepDate = ({ className }) => {
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

      nextStep(newDate);
   }

   return (
      <Form
         className={cn(
            `bg-menu gradient-radial-primary`,
            'shadow-primary rounded-2xl backdrop-blur-lg p-4',
            className,
         )}
      >
         <Label>
            <ReservationTitle
               title={'Selecionar'}
               subtitle={'Fecha'}
            />
         </Label>

         <FormItem>
            <DayPicker
               name='date'
               onChange={onValueChange}
            />
         </FormItem>

         <FormItem>
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
         </FormItem>
      </Form>
   )
}

ReservationStepDate.propTypes = {
   schema: PropTypes.object
}