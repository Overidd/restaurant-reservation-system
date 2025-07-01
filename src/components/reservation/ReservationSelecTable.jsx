import { cn } from '@/ultils/cn';
import toast from 'react-hot-toast';
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
      from,
      tables,
      isLoading,
      isTableExceeded,
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

   const onChangeTable = (table) => {
      const wasSelected = reserveSelectTable(table);
      if (wasSelected && isTableExceeded) {
         toast.error(`No puedes seleccionar más de ${from.time.tablesAvailable} mesas.`);
      }
   };

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

               <h4 className='text-muted-foreground font-bold'>
                  {from.time.tablesAvailable} Mesas disponibles
               </h4>

               <TiemLimit />
            </header>

            <main>
               <TableList
                  tables={tables}
                  rows={restaurant.rows}
                  columns={restaurant.columns}
                  selectedTables={selectedTables}
                  onChangeTable={onChangeTable}
                  className={'max-w-[50rem] max-h-[50rem] overflow-hidden mx-auto select-none'}
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