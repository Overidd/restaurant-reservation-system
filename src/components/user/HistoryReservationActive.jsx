import { useUserSettings } from '@/hook/auth';
import { useModalAsync } from '@/hook/common';
import { useGetReservationsByUser } from '@/hook/fetchings';
import { AdminTableToasts } from '@/toasts';
import { CalendarCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EditReservationModal, HistorialReservationItem } from '.';
import { AlertCancelReservation, Card, CardContent, CardHeader, CardTitle } from '../UI/common';

export const HistoryReservationActive = () => {
   const [isOpenEdit, setIsOpenEdit] = useState(false);
   const [selectReserve, setSelectReserve] = useState(null);

   const {
      reservations,
      isLoading,
      changeReservation,
      loadReservationsActive
   } = useGetReservationsByUser();

   const {
      showAsyncModal
   } = useModalAsync();

   const {
      cancelReservation
   } = useUserSettings()

   const handleSelectReserve = (reserve) => {
      setIsOpenEdit(true)
      setSelectReserve(reserve)
   }

   const handleCancelReservation = async (reservation) => {
      const confirmed = await showAsyncModal(({ onConfirm, onCancel }) => (
         <AlertCancelReservation
            code={reservation.code}
            onCancel={onCancel}
            onConfirm={onConfirm}
         />
      ))
      if (!confirmed) return

      AdminTableToasts.cancelFullReservation(
         cancelReservation(reservation.id), {
         onSuccess: changeReservation
      });
   }

   useEffect(() => {
      loadReservationsActive()
   }, [])

   return (
      <>
         <Card className={'p-4 h-full bg-transparent border-none shadow-none overflow-y-auto [&::-webkit-scrollbar]:hidden'}>
            <CardHeader>
               <CardTitle className='flex items-center gap-2 text-background text-sm md:text-base'>
                  <CalendarCheck className='h-4 w-4 md:h-5 md:w-5' />
                  Historial de Reservas Activas
               </CardTitle>
            </CardHeader>
            <CardContent>
               {reservations.length === 0 ? (
                  isLoading
                     ? <div className='flex items-center justify-center h-40'>
                        <Loader2 className='h-6 w-6 animate-spin' />
                     </div>
                     :
                     <div className='text-center py-8'>
                        <CalendarCheck className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
                        <p className='text-muted-foreground'>No tienes reservas registradas</p>
                     </div>
               ) : (
                  <div className='space-y-4'>
                     {reservations.map((reservation) => (
                        <HistorialReservationItem
                           key={reservation.id}
                           reservation={reservation}
                           onSelectReserve={handleSelectReserve}
                           onCancelReservation={handleCancelReservation}
                        />
                     ))}
                  </div>
               )}
            </CardContent>
         </Card>
         {
            isOpenEdit && (
               <EditReservationModal
                  className={'md:w-[35rem]'}
                  isOpen={isOpenEdit}
                  onClose={() => setIsOpenEdit(false)}
                  reservation={selectReserve}
               />
            )
         }
      </>
   )
}
