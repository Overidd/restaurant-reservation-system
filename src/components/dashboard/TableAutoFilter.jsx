import { CalendarButton } from '../UI/calendar';
import { cn } from '@/ultils';

import {
   Form,
   FormItem,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';

export const TableAutoFilter = ({
   className,
   onChange,
   restaurants = [],
   hours = [],
   restaurant = '',
   hour = '',
   date = '',
}) => {

   const onValueChange = ({ name, value }) => {
      if (!value || !name) return;
      if (value instanceof Date) {
         value = value.toISOString().split('T')[0];
      }

      onChange({ name, value });
   };

   console.log({ date, hour, restaurant });


   return (
      <Form className={cn(
         'flex flex-wrap justify-center gap-4',
         className
      )}>
         <FormItem>
            <Select
               value={restaurant || undefined}
               onValueChange={(value) => onValueChange({ name: 'restaurant', value })}
            >
               <SelectTrigger
                  size='lg'
                  className='w-full shadow-xl'
               >
                  <SelectValue
                     placeholder='Seleccione una restaurante'
                  />
               </SelectTrigger>
               <SelectContent>
                  {restaurants.map((item) => (
                     <SelectItem
                        key={item.id}
                        value={item.name}
                     >
                        {item.name}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </FormItem>

         <CalendarButton
            variant={'outline'}
            btnClassName={'shadow-xl hover:bg-sidebar hover:text-muted-foreground'}
            onValueChange={(value) => onValueChange({ name: 'date', value })}
            date={new Date(date)}
            configDate={null}
         />

         <FormItem>
            <Select
               value={hour || undefined}
               onValueChange={(value) => onValueChange({ name: 'hour', value })}
            >
               <SelectTrigger
                  size='lg'
                  className='w-full shadow-xl'
               >
                  <SelectValue
                     placeholder='Seleccione una hora'
                  />
               </SelectTrigger>
               <SelectContent>
                  {hours.map((item, index) => (
                     <SelectItem
                        key={item.id || 'hour' + index}
                        value={item.hour}
                     >
                        {item.hour}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </FormItem>
      </Form>
   )
}