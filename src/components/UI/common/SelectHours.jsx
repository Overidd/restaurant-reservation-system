import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button } from '.';
import { Input } from '../from';

export const SelectHours = ({
   classNameItem,
   className,
   name,
   isError,
   onValueChange,
   value = [],
}) => {
   const [hour, setHour] = useState('')

   const handlSetHour = ({ target: { value } }) => {
      setHour(value)
   }

   const handleAddHour = ({ target: { value } }) => {
      if (!value) return

      onValueChange((hours) => {
         return [...hours, value]
      })
   }

   const handleRemoveHour = (hour) => {
      if (!hour) return

      onValueChange((hours) => {
         return hours.filter((h) => h !== hour)
      })
   }

   return (
      <>
         <div className={
            className
         }>
            <Input
               value={hour}
               type='time'
               name={name}
               isError={!isError}
               onChange={handlSetHour}
               required
            />
            <Button
               type='button'
               onClick={handleAddHour}
               variant='outline'
            >
               <Plus className='w-4 h-4' />
            </Button>
         </div>
         <div className={
            classNameItem
         }>
            {value.map((hour) => (
               <Badge
                  key={hour.id}
                  variant='secondary'
                  className='flex items-center gap-1'
               >
                  {hour.hour}
                  <button
                     onClick={() => handleRemoveHour(hour)} className='ml-1 hover:text-destructive'
                  >
                     ×
                  </button>
               </Badge>
            ))}
         </div>
      </>
   )
}
