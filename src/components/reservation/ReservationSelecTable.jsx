import toast from 'react-hot-toast';

import { ChevronLeft, Clock } from 'lucide-react';

import {
   useModalReserve,
   useReserve,
   useReserveTimer,
   useStepFormContext,
} from '@/hook';
import { cn } from '@/ultils/cn';

import { Badge, Button, ColorStatus } from '../UI/common';
import { TableList } from '../UI/table';

import { useGenerateResources } from '@/hook/dashboard';
import { ReservationLoadding } from '.';


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
   },
   {
      name: 'No disponibles',
      color: 'bg-table-notAvailable'
   }
]

export const ReservationSelecTable = () => {
   const {
      from,
      tables,
      objects,
      isLoading,
      isTableExceeded,
      isTableExceededDiners,
      restaurant,
      selectedTables,
      reserveSelectTable,
      reserveResetStateTables,
   } = useReserve()

   const {
      resources
   } = useGenerateResources({
      tables,
      objects,
      isTempResourceChange: false,
      selectedResource: {}
   });

   const {
      prevStep
   } = useStepFormContext();

   const {
      closeModal
   } = useModalReserve()

   const onChangePrevStep = () => {
      prevStep()
      reserveResetStateTables()
   }

   const handleCloseModal = () => {
      closeModal()
      reserveResetStateTables()
   }

   const onChangeTable = (table) => {
      const wasSelected = reserveSelectTable(table);

      if (wasSelected && isTableExceededDiners) {
         toast.error(`No puedes seleccionar mas mesas para ${from.info.diners} personas.`);
      }

      if (wasSelected && isTableExceeded) {
         toast.error(`No puedes seleccionar más de ${from.hour.tablesAvailable} mesas.`);
      }
   };

   return (
      <ReservationLoadding
         isLodding={isLoading.tables}
         className={'h-full flex flex-col justify-center items-center'}
      >
         <div className={cn(
            'h-full w-full flex flex-col 2xl:gap-4 gap-2',
         )}>
            <header className={cn(
               'flex w-[90%] mx-auto flex-col md:flex-row gap-4 md:gap-0 justify-between items-center',
            )}>
               <div className='space-x-4'>
                  <Button
                     className={'align-middle'}
                     onClick={onChangePrevStep}
                  >
                     <ChevronLeft />
                  </Button>
                  <Button
                     className={'align-middle'}
                     onClick={handleCloseModal}
                  >
                     Cancelar
                  </Button>
               </div>
               <ColorStatus
                  className="flex flex-row gap-5"
                  data={dataInfo}
               />

               <h4 className='text-muted-foreground font-bold'>
                  <Badge className={'bg-gray-700'}>
                     {from.hour.tablesAvailable} Mesas Disponibles
                  </Badge>
               </h4>

               {/* <TiemLimit /> */}
            </header>

            <TableList
               resources={resources}
               rows={restaurant.rows}
               columns={restaurant.columns}
               selectedTables={selectedTables}
               onChangeTable={onChangeTable}
               className={'h-[20rem] md:h-full md:flex-1 md:w-[90%] 2xl:w-full overflow-hidden mx-auto select-none'}
            />

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