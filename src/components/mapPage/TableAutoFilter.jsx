import { cn, DateParser } from '@/ultils';
import { CalendarButton } from '../UI/calendar';

import { useLoadFilterMap, useStateFilterRestaurant } from '@/hook/dashboard';
import { Card2 } from '../UI/card';
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
}) => {

   useLoadFilterMap();

   const {
      hours,
      restaurants,
      changeValueFilter,
      filter: { restaurant, hour, dateStr },
   } = useStateFilterRestaurant();

   const onValueChange = ({ name, value }) => {
      if (!value || !name) return;
      if (value instanceof Date) {
         value = value.toISOString().split('T')[0];
      }

      changeValueFilter({ name, value });
   };

   return (
      <Card2
         vairant='dashed'
         className={cn(
            className
         )}
      >
         <Form className={cn(
            'flex flex-wrap justify-center gap-4',
         )}>
            <FormItem>
               <Select
                  name={'restaurant'}
                  value={restaurant.name || undefined}
                  onValueChange={onValueChange}
               >
                  <SelectTrigger
                     size='lg'
                     className='w-full min-w-64 bg-card'
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
               btnClassName={'hover:bg-card hover:text-muted-foreground bg-card'}
               onValueChange={onValueChange}
               date={DateParser.fromString(dateStr)}
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
                     className='w-full bg-card'
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
                           value={item.name}
                        >
                           {item.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </FormItem>
         </Form>
      </Card2>
   )
}