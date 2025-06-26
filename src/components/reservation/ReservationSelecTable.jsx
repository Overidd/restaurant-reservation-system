import { cn } from '@/ultils/cn';
import { useState } from 'react';
import { Clock } from 'lucide-react';
import { TableList } from '../UI/table';
import { ColorStatus } from '../UI/common';
import { CalendarButton } from '../UI/calendar';

import {
   useReserve,
   useReserveTimer,
   useStepFormContext
} from '@/hook';

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';

const dataInfo = [
   {
      name: 'Disponible',
      color: 'bg-table-avaible'
   },
   {
      name: 'Ocupado',
      color: 'bg-table-busy'
   },
   {
      name: 'Seleccionado',
      color: 'bg-table-selected'
   }
]

const hourAvailable = [
   {
      id: 1,
      hour: '12:00',
   },
   {
      id: 2,
      hour: '13:00',
   },
   {
      id: 3,
      hour: '14:00',
   },
   {
      id: 4,
      hour: '15:00',
   },
]

const reason = {
   min: 1,
   max: 10,
}

export const ReservationSelecTable = () => {
   const { setStateValue, stateForm } = useStepFormContext();
   const { reserveSelectTable, selectedTables } = useReserve()
   const [date, setDate] = useState(stateForm.date || new Date());

   const onValueChangeDate = (value) => {
      setStateValue({ value, name: 'date' });
      setDate(value);
   }

   const onValueChangeHour = (value) => {
      setStateValue({ value, name: 'hour' });
   }

   const onValueChangeDiners = (diners) => {
      setStateValue({ value: { ...stateForm.info, diners: diners, }, name: 'info' });
   }

   return (
      <div className={cn(
         'grid gap-4 grid-cols-[70%_1fr] grid-table-container'
      )}>
         <header className={cn(
            'grid-table-header',
            'flex justify-between',
            // 'border-b-2 border-[#0002]'
         )}>
            <section>
               <ColorStatus
                  className="flex flex-row gap-5"
                  data={dataInfo}
               />
            </section>

            <section
               className="flex flex-row gap-5 items-center"
            >
               <CalendarButton
                  date={date}
                  onValueChange={onValueChangeDate}
               />

               <Select
                  value={stateForm.hour}
                  onValueChange={onValueChangeHour}
               >
                  <SelectTrigger
                     className="w-full"
                     variant="crystal"
                  >
                  </SelectTrigger>
                  <SelectContent>
                     {hourAvailable.map((item) => (
                        <SelectItem key={item.id} value={item.hour}>
                           {item.hour}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>

               <Select
                  value={stateForm.info.diners}
                  onValueChange={onValueChangeDiners}
               >
                  <SelectTrigger
                     className="w-full"
                     variant="crystal"
                  >
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     {
                        Array.from(
                           { length: reason.max },
                           (_, index) => index + reason.min
                        ).map((item) => (
                           <SelectItem key={item} value={item}>
                              {item}
                           </SelectItem>
                        ))
                     }
                  </SelectContent>
               </Select>
            </section>

            <TiemLimit />
         </header>

         <main className="grid-table-main">
            <TableList
               onChangeTable={reserveSelectTable}
               selectedTables={selectedTables}
            />
         </main>
      </div >
   )
}


const TiemLimit = () => {
   const { formattedMinutes, formattedSeconds } = useReserveTimer()
   return (
      <div className="space-x-2 text-primary-foreground">
         <Clock className="inline-block align-middle" />
         <time className="inline-block align-middle font-semibold text-lg">
            {formattedMinutes}:{formattedSeconds}
         </time>
      </div>
   )
}