import { cn, generateId } from '@/ultils';
import { Plus } from 'lucide-react';
import { useState } from 'react';
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
   const [hour, setHour] = useState('')

   const handlSetHour = ({ target: { value } }) => {
      setHour(value)
   }

   const handleAddHour = () => {
      if (!hour) return

      if (hours.includes(hour)) return
      const data = {
         id: generateId(),
         name: hour,
      }

      onChange({
         name: name,
         value: [...hours, data]
      })

      setHour('')
   }

   const handleRemoveHour = (hour) => {
      if (!hour) return

      onChange({
         target: {
            name: name,
            value: hours.filter(h => h.id !== hour.id)
         }
      })
   }

   return (
      <div
         className={cn(
            'flex flex-col gap-2',
            className
         )}
      >
         <div className={cn(
            'flex items-center gap-2 w-full',
         )}>
            <Input
               value={hour}
               type='time'
               name={name}
               isError={!!isError}
               onChange={handlSetHour}
               className='flex-1 w-full'
               required
            />
            <Button
               type='button'
               onClick={handleAddHour}
               variant='crystal'
            >
               <Plus className='w-4 h-4' />
            </Button>
         </div>
         <div className={cn(
            'flex flex-wrap gap-2 items-center',
            classNameItem
         )}>
            {hours.map((hour) => (
               <Badge
                  key={hour.id}
                  variant='secondary'
                  className='flex items-center gap-1'
               >
                  {hour.name}
                  <button
                     onClick={() => handleRemoveHour(hour)} className='ml-1 hover:text-destructive'
                  >
                     ×
                  </button>
               </Badge>
            ))}
         </div>
      </div>
   )
}
