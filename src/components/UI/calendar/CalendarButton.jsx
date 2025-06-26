import PropTypes from 'prop-types';
import { Calendar, ChevronDownIcon } from 'lucide-react';
import { Button, Popover } from '../common';

export const CalendarButton = ({
   date,
   onValueChange
}) => {
   return (
      <Popover
         className='w-fit'
         placement='bottom'
         content={
            <Calendar
               mode='single'
               selected={date}
               captionLayout='dropdown'
               disabled={(date) => date <= new Date(new Date().setDate(new Date().getDate() - 1))}
               onSelect={onValueChange}
            />
         }
      >
         <Button
            className='w-48 justify-between font-normal'
            variant='crystal'
            type='button'
            id='date'
         >
            {date ? date.toLocaleDateString() : 'Seleccione una fecha'}
            <ChevronDownIcon />
         </Button>
      </Popover>
   )
}

CalendarButton.propTypes = {
   date: PropTypes.instanceOf(Date),
   onValueChange: PropTypes.func
}