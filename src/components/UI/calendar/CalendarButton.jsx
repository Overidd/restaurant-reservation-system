import PropTypes from 'prop-types';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '.';

import {
   Button,
   Popover,
   PopoverContent,
   PopoverTrigger
} from '../common';

export const CalendarButton = ({
   date,
   onValueChange,
   className,
}) => {
   return (
      <Popover className={className}>
         <PopoverTrigger asChild>
            <Button
               className='w-48 p-5 justify-between font-normal'
               variant='crystal'
               type='button'
               id='date'
            >
               {date ? date.toLocaleDateString() : 'Seleccione una fecha'}
               <ChevronDownIcon />
            </Button>
         </PopoverTrigger>

         <PopoverContent>
            <Calendar
               mode='single'
               selected={date}
               captionLayout='dropdown'
               disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
               onSelect={onValueChange}
            />
         </PopoverContent>
      </Popover>
   )
}

CalendarButton.propTypes = {
   date: PropTypes.instanceOf(Date),
   onValueChange: PropTypes.func
}