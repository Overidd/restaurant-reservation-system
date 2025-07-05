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

const parseLocalDate = (dateStr) => {
   const [year, month, day] = dateStr.split('-').map(Number);
   return new Date(year, month - 1, day);
}


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

   return (
      <Form className={cn(
         'flex flex-wrap justify-center gap-4',
         className
      )}>
         <FormItem>
            <Select
               name={'restaurant'}
               value={restaurant || undefined}
               onValueChange={onValueChange}
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
            name={'dateStr'}
            variant={'outline'}
            btnClassName={'shadow-xl hover:bg-sidebar hover:text-muted-foreground'}
            onValueChange={onValueChange}
            date={parseLocalDate(date)}
            configDate={null}
         />

         <FormItem>
            <Select
               name={'hour'}
               value={hour || undefined}
               onValueChange={onValueChange}
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