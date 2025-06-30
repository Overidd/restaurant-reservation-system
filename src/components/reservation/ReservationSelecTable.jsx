import { cn } from '@/ultils/cn';
import { TableList } from '../UI/table';
import { ReservationLoadding } from '.';
import { Button, ColorStatus } from '../UI/common';
import { ChevronLeft, Clock } from 'lucide-react';

import {
   useReserve,
   useReserveTimer,
   useStepFormContext,
} from '@/hook';

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


export const ReservationSelecTable = () => {
   const {
      tables,
      isLoading,
      restaurant,
      selectedTables,
      reserveSelectTable,
      reserveResetStateTables,
   } = useReserve()

   const { prevStep } = useStepFormContext();

   const onChangePrevStep = () => {
      prevStep()
      reserveResetStateTables()
   }

   return (
      <ReservationLoadding
         isLodding={isLoading.tables}
      >
         <div className={cn(
            'flex-1 grid justify-center content-between gap-4',
         )}
         >
            <header className={cn(
               'flex justify-between items-center',
            )}>
               <Button
                  onClick={onChangePrevStep}
               >
                  <ChevronLeft />
               </Button>
               <ColorStatus
                  className="flex flex-row gap-5"
                  data={dataInfo}
               />
               <TiemLimit />
            </header>

            <main>
               <TableList
                  tables={tables}
                  rows={restaurant.rows}
                  columns={restaurant.columns}
                  selectedTables={selectedTables}
                  onChangeTable={reserveSelectTable}
                  className={'max-w-[50rem] max-h-[50rem] overflow-hidden mx-auto'}
               />
            </main>
         </div >
      </ReservationLoadding>
   )
}


const TiemLimit = () => {
   const { formattedMinutes, formattedSeconds } = useReserveTimer()
   return (
      <div className="space-x-2 text-primary-foreground font-mono">
         <Clock className="inline-block align-middle" />
         <time className="inline-block align-middle font-semibold text-lg">
            {formattedMinutes}:{formattedSeconds}
         </time>
      </div>
   )
}


/**
   <section
      className="w-[50%] flex flex-row gap-5 items-center"
   >
      <CalendarButton
         date={date}
         onValueChange={onValueChangeDate}
      />

      <Select
         value={from.hour}
         onValueChange={onValueChangeHour}
      >
         <SelectTrigger
            className="w-full"
            variant="crystal"
         >
            <SelectValue />
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
         value={from.info.diners}
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
               Array.from({ length: reason.max },
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
 */