import { cn, generateId } from '@/ultils';
import { Clock, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { Badge, Button } from '.';
import { Input } from '../from';

export const SelectHours = ({
   classNameItem,
   className,
   name,
   isError,
   onChange,
   hours = [],
}) => {
   const [hour, setHour] = useState('');
   const inputRef = useRef(null); // Referencia al input

   const handlSetHour = ({ target: { value } }) => {
      setHour(value);
   };

   const handleAddHour = () => {
      if (!hour || hours.some(h => h.name === hour)) return;

      const data = {
         id: generateId(),
         name: hour,
      };

      onChange({
         name: name,
         value: [...hours, data]
      });

      setHour('');
   };

   const handleRemoveHour = (hour) => {
      if (!hour) return;

      onChange({
         target: {
            name: name,
            value: hours.filter(h => h.id !== hour.id)
         }
      });
   };

   const handleOpenPicker = () => {
      if (inputRef.current && inputRef.current.showPicker) {
         inputRef.current.showPicker();
      }
   };

   return (
      <div className={cn('flex flex-col gap-2', className)}>
         <div className='flex items-center gap-2 w-full'>
            <div className='relative flex-1 w-full'>
               <Input
                  ref={inputRef} // asignar la ref
                  value={hour}
                  type='time'
                  name={name}
                  isError={!!isError}
                  onChange={handlSetHour}
                  onClick={handleOpenPicker}
                  className='w-full pr-10'
                  required
               />
               <Clock
                  className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer w-4 h-4 text-muted-foreground'
                  onClick={handleOpenPicker}
               />
            </div>
            <Button
               type='button'
               onClick={handleAddHour}
               variant='crystal'
            >
               <Plus className='w-4 h-4' />
            </Button>
         </div>
         <div className={cn('flex flex-wrap gap-2 items-center', classNameItem)}>
            {hours.map((hour) => (
               <Badge
                  key={hour.id}
                  variant='secondary'
                  className='flex items-center gap-1'
               >
                  {hour.name}
                  <button
                     onClick={() => handleRemoveHour(hour)}
                     className='ml-1 hover:text-destructive'
                  >
                     ×
                  </button>
               </Badge>
            ))}
         </div>
      </div>
   );
};
