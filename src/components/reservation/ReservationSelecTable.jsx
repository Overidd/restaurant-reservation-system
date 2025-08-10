import toast from 'react-hot-toast';

import { Calendar, ChevronLeft } from 'lucide-react';

import { cn } from '@/ultils/cn';

import { Badge, Button, ColorStatus } from '../UI/common';
import { TableList } from '../UI/table';

import { useModalAuth, useUser } from '@/hook/auth';
import { useModalAsync } from '@/hook/common';
import { useGenerateResources } from '@/hook/dashboard';
import { useModalReserve, useReservationFromStep, useStepFormContext } from '@/hook/reservationFromStep';
import { ReservationToast } from '@/toasts';
import { useState } from 'react';
import { ReservationInfoTable, ReservationLoadding } from '.';
import { DialogEnterPhone } from '../UI/dialog';


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
   const [isOpenPreview, setIsOpenPreview] = useState(false);
   const [isReserving, setIsReserving] = useState(false)

   const {
      from,
      tables,
      objects,
      isLoading,
      isTableExceeded,
      isTableExceededDiners,
      restaurant,
      reserveSelectCurrent,
      reserveSelectTable,
      reserveResetStateTables,
      isSelectedTable,
      reservePendingAuth,
      reservePending,
      reserveConfirm,
   } = useReservationFromStep()

   const {
      isRegisterPhone,
      isAuthenticated
   } = useUser()

   const {
      showAsyncModal
   } = useModalAsync();

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
      closeModal: closeModalReserve
   } = useModalReserve()

   const {
      openModal: openModalAuth
   } = useModalAuth()

   const onChangePrevStep = () => {
      prevStep()
      reserveResetStateTables()
   }

   const handleCloseModal = () => {
      closeModalReserve()
      reserveResetStateTables()
      reserveSelectCurrent({})
   }

   const handleReserve = async () => {
      if (isReserving) return;

      if (!isAuthenticated) {
         reservePendingAuth();
         openModalAuth('login');
         return;
      }

      setIsReserving(true)
      if (!isRegisterPhone) {
         const res = await showAsyncModal(({
            onConfirm,
            onCancel
         }) => (
            <DialogEnterPhone
               onCancel={onCancel}
               onConfirm={onConfirm}
            />
         ));
         setIsReserving(false)
         if (!res) return;
      }

      reservePending()

      ReservationToast(
         reserveConfirm(), {
         onSuccess: () => {
            window.requestAnimationFrame(() => {
               closeModalReserve();
               reserveSelectCurrent({})
            })
         },
         onFinally: () => {
            window.requestAnimationFrame(() => {
               setIsReserving(false)
            })
         }
      });
   }

   const handleCurrentTable = (table) => {
      if (!table) return
      reserveSelectCurrent(table)
      setIsOpenPreview(true)
   }

   const handleClosePreview = () => {
      setIsOpenPreview(false)
   }

   const handleSelectTables = (table) => {
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
            'h-full w-full flex-col justify-between 2xl:gap-4 gap-2 animate__animated animate__faster hidden',
            !isOpenPreview && 'flex animate-in fade-in zoom-in-90 ease-in-out '
         )}>
            <header className={cn(
               'grid grid-cols-2 md:grid-cols-4',
            )}>
               <div className='space-x-4'>
                  <Button
                     size={'sm'}
                     className={'align-middle'}
                     onClick={onChangePrevStep}
                  >
                     <ChevronLeft />
                  </Button>
                  <Button
                     size={'sm'}
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

               <Badge className={'bg-gray-700 font-bold hidden md:flex h-fit place-self-center'}>
                  {from.hour.tablesAvailable} Mesas Disponibles
               </Badge>

               <Button
                  size={'sm'}
                  disabled={!isSelectedTable || isReserving}
                  onClick={handleReserve}
                  className={'w-fit ml-auto hidden md:flex'}
               >
                  Reservar
                  <Calendar />
               </Button>
            </header>

            <TableList
               resources={resources}
               rows={restaurant.rows}
               columns={restaurant.columns}
               onSelectTables={handleSelectTables}
               onCurrentTable={handleCurrentTable}
               className={'h-[24rem] md:h-full md:flex-1 md:w-[90%] 2xl:w-full overflow-hidden mx-auto select-none'}
            />

            <div className='flex justify-between md:hidden'>
               <Badge className={'bg-gray-700 font-bold h-fit place-self-center'}>
                  {from.hour.tablesAvailable} Mesas Disponibles
               </Badge>

               <Button
                  size={'sm'}
                  disabled={!isSelectedTable || isReserving}
                  onClick={handleReserve}
                  className={'w-fit ml-auto'}
               >
                  Reservar
                  <Calendar />
               </Button>
            </div>
         </div>
         <div className={cn(
            'h-full w-full flex-col 2xl:gap-4 gap-2 animate__animated animate__faster hidden',
            isOpenPreview && 'flex animate-in fade-in zoom-in-90 ease-in-out'
         )}>
            <header className={cn(
               'w-full mx-auto mb-2',
            )}>
               <Button
                  size={'sm'}
                  className={'align-middle'}
                  onClick={handleClosePreview}
               >
                  <ChevronLeft />
               </Button>
            </header>

            <ReservationInfoTable />
         </div>
      </ReservationLoadding >
   )
}
