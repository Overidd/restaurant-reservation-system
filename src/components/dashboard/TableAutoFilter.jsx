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
import { Card2 } from '../UI/card';


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
      <Card2
         className={cn(
            'p-2 bg-transparent shadow-none px-4 py-3 border-2 !border-dashed',
         )}
      >
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
                     className='w-full bg-[#fcf8f0]'
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
               variant='outline'
               btnClassName={'hover:bg-[#fcf8f0] hover:text-muted-foreground bg-[#fcf8f0]'}
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
                     className='w-full bg-[#fcf8f0]'
                  // variant='crystal'
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
      </Card2>
   )
}