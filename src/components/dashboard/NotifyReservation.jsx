import { cn } from '@/ultils';
import { useState } from 'react';
import { CalendarButton } from '../UI/calendar';
import { Card2, UserCardReservation } from '../UI/card';
import { Bell, ChevronRight, Dice1, Settings, Timer } from 'lucide-react';

import {
   Badge,
   Button,
   CardContent,
   CardHeader,
   CardTitle,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Toggle,
   Tooltip,
   TooltipContent,
   TooltipTrigger
} from '../UI/common';

import {
   Checkbox,
   Label,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';

export const NofityReservation = () => {
   const [openHistory, setOpenHistory] = useState(false);

   return (
      <div className="sticky top-0 h-dvh flex items-start">
         <Tooltip>
            <TooltipTrigger asChild>
               <button
                  className="my-4 rounded-full shadow-lg p-2 transition-all cursor-pointer absolute -left-12 bg-[#fcf8f0]"
                  onClick={() => setOpenHistory(!openHistory)}
                  aria-label="Abrir historial"
               >
                  {!openHistory ? (
                     <div className="relative">
                        <span className="absolute -top-1 right-0 flex size-3">
                           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                           <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
                        </span>
                        <Bell />
                     </div>
                  ) : (
                     <ChevronRight />
                  )}
               </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-inherit rounded">
               {
                  !openHistory ? 'Abrir Notificaciones' : 'Cerrar Notificaciones'
               }
            </TooltipContent>
         </Tooltip>

         <Card2
            className={cn(
               'h-full shadow-xl transition-all duration-200 overflow-x-hidden overflow-y-auto rounded-none rounded-l-lg',
               'p-0 py-4',
               '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
               'overflow-x-hidden',
               openHistory ? 'w-80 min-w-[23rem] max-w-[23rem]' : 'w-0 min-w-0 max-w-0'
            )}
         >
            {openHistory && (
               <>
                  <CardTitle className="text-pretty text-center mb-4 px-4">
                     Notificaciones de reservas
                  </CardTitle>

                  <CardHeader className="px-4 flex flex-col gap-4">
                     <NofityReservationFilter />
                  </CardHeader>

                  {/* <hr className="border-border my-4" /> */}

                  <CardContent className="overflow-x-hidden px-4">
                     <NotifyReservationList />
                  </CardContent>
               </>
            )}
         </Card2>
      </div>
   );
};

export const NofityReservationFilter = () => {
   const [filterType, setFilterType] = useState('Nuevos');
   const showControles = filterType === 'Fecha';
   const handleToggle = () => {
      setFilterType(filterType === 'Nuevos' ? 'Fecha' : 'Nuevos');
   };

   return (
      <div className="flex flex-wrap items-center justify-between gap-2 w-full">
         <Popover>
            <PopoverTrigger>
               <Button
                  size='icon'
                  variant='outline'
                  className={'hover:bg-transparent hover:text-muted-foreground'}
               >
                  <Settings />
               </Button>
            </PopoverTrigger>
            <PopoverContent
               className={'w-fit flex flex-col gap-2 p-4'}
            >
               <Toggle
                  pressed={filterType === 'Fecha'}
                  onPressedChange={handleToggle}
               >
                  Nuevos
               </Toggle>
               <Toggle
                  pressed={filterType === 'Nuevos'}
                  onPressedChange={handleToggle}
               >
                  Fecha
               </Toggle>
            </PopoverContent>
         </Popover>

         {showControles && (
            <HistorialControls />
         )}
      </div>
   )
}

const restaurants = [
   { id: 1, name: 'Restaurante 1' },
   { id: 2, name: 'Restaurante 2' },
   { id: 3, name: 'Restaurante 3' }
];
export const HistorialControls = () => {

   return (
      <div className="flex flex-wrap gap-2 items-center animate__animated animate__fadeIn w-full">
         <div
            className='flex flex-row gap-2 w-full'
         >
            <Select
               name={'restaurant'}
            // value={restaurant || undefined}
            // onValueChange={onValueChange}
            >
               <SelectTrigger
                  size='lg'
                  className='flex-1 bg-[#fcf8f0]'
               >
                  <SelectValue
                     placeholder='Rerestaurante'
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

            <CalendarButton
               name="dateStr"
               variant="outline"
               btnClassName="hover:bg-[#fcf8f0] hover:text-muted-foreground bg-[#fcf8f0] flex-1"
               date={new Date()}
               configDate={null}
            />
         </div>

         <Label htmlFor="auto-date" >
            <Checkbox
               size="sm"
               id="auto-date"
               className='inline-block align-middle mr-2'
            />
            <span className="text-sm align-middle">
               Auto date
            </span>
         </Label>
      </div>
   )
}

export const NotifyReservationList = () => {

   return (
      <table className="min-w-full table-auto border-separate border-spacing-y-5 text-sm text-left">
         <tbody>
            {[...Array(10)].map((_, index) => (
               <NotifyReservationItem key={index} />
            ))}
         </tbody>
      </table>
   )
}

export const NotifyReservationItem = () => {

   return (
      <tr className="">
         <td className="">
            <UserCardReservation
               className="text-foreground"
               user={{ name: 'John Doe', code: 'RESERVE-D2KWQ3', date: new Date().toISOString().split('T')[0] }}
            />
         </td>

         <td className="">
            <Badge variant='primary' className={'py-1'}>
               <Timer
               />
               6:00
            </Badge>
         </td>

         <td className="">
            <Badge
               variant='none'
               state="pending"
            />
         </td>
         <td className="">
            <Dice1 />
         </td>
      </tr>
   )
}