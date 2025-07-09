import PropTypes from 'prop-types';

import { ChevronDownIcon } from 'lucide-react';

import {
   Button,
   Popover,
   PopoverContent,
   PopoverTrigger
} from '../common';

import { Calendar } from '.';

export const CalendarButton = ({
   date,
   onValueChange,
   className,
   btnClassName,
   variant,
   defaultValue,
   name,
   configDate = (date) => date < new Date(new Date().setDate(new Date().getDate() - 1))
}) => {
   return (
      <Popover className={className}>
         <PopoverTrigger asChild>
            <Button
               className={`w-48 p-5 justify-between font-normal ${btnClassName}`}
               variant={variant || 'crystal'}
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
               selected={defaultValue || date}
               captionLayout='dropdown'
               disabled={configDate}
               onSelect={(date) => onValueChange({ name, value: date })}
            />
         </PopoverContent>
      </Popover>
   )
}

CalendarButton.propTypes = {
   date: PropTypes.instanceOf(Date),
   onValueChange: PropTypes.func
}