import { useModalAsync } from '@/hook';
import { useUserSettings } from '@/hook/auth';
import { useGetReservationsByUser } from '@/hook/fetchings';
import { AdminTableToasts, UserSettingToasts } from '@/toasts';
import { cn, DateParser, typeStatusTable } from '@/ultils';
import { Calendar, CalendarCheck, Clock, Loader2, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { Card2 } from '../UI/card';
import { AlertCancelReservation, Badge, Button, Card, CardContent, CardHeader, CardTitle, Modal } from '../UI/common';
import { Label } from '../UI/from';
import { FromReservation } from '../common';


export const HistoryReservationUser = () => {
   const { reservations, isLoading, changeReservation } = useGetReservationsByUser();
   const { showAsyncModal } = useModalAsync();
   const { cancelReservation } = useUserSettings()

   const [isOpenEdit, setIsOpenEdit] = useState(false)
   const [selectReserve, setSelectReserve] = useState(null)


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

      UserSettingToasts.cancelReservation(
         cancelReservation(reservation.id), {
         onSuccess: changeReservation
      });
   }

   return (
      <>
         <Card className={'p-4 h-full bg-transparent border-none shadow-none overflow-y-auto [&::-webkit-scrollbar]:hidden'}>
            <CardHeader>
               <CardTitle className='flex items-center gap-2 text-background'>
                  <CalendarCheck className='h-5 w-5' />
                  Historial de Reservas
               </CardTitle>
            </CardHeader>
            <CardContent>
               {reservations.length === 0 ? (
                  isLoading ? (
                     <div className='flex items-center justify-center h-40'>
                        <Loader2 className='h-6 w-6 animate-spin' />
                     </div>
                  ) : (
                     <div className='text-center py-8'>
                        <CalendarCheck className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
                        <p className='text-muted-foreground'>No tienes reservas registradas</p>
                     </div>
                  )

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
                  isOpen={isOpenEdit}
                  onClose={() => setIsOpenEdit(false)}
                  reservation={selectReserve}
               />
            )
         }
      </>
   )
}

export const HistorialReservationItem = ({
   reservation,
   onCancelReservation,
   onSelectReserve
}) => {

   return (
      <Card className={cn(
         'border-l-4 border-l-primary style-class text-background',
         reservation.status === typeStatusTable.CANCELED && 'border-l-destructive opacity-70'
      )}>
         <CardContent className='p-4 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='space-y-2'>
               <p className='flex items-center gap-2'>
                  <span className='font-semibold text-base'>{reservation.restaurantName}</span>
                  <Badge state={reservation.status} />
               </p>

               <div className='flex flex-col md:flex-row md:items-center gap-4 text-sm'>
                  <time className='flex items-center gap-1'>
                     <Calendar className='h-4 w-4' />
                     {new Date(reservation.dateStr).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                     })}
                  </time>
                  <time className='flex items-center gap-1'>
                     <Clock className='h-4 w-4' />
                     {reservation.hour}
                  </time>
                  <div className='flex items-center gap-1'>
                     <Users className='h-4 w-4' />
                     {reservation.diners} personas
                  </div>
               </div>

               <div className='flex items-center justify-between'>
                  <p className='flex items-center gap-1 text-sm'>
                     <MapPin className='h-4 w-4' />
                     {reservation.restaurantName}
                  </p>

                  {
                     reservation.status !== typeStatusTable.CANCELED && (
                        <>
                           <Button
                              onClick={() => onCancelReservation(reservation)}
                              variant='destructive'
                              size='sm'
                           >
                              Cancelar
                           </Button>
                           <Button
                              onClick={() => onSelectReserve(reservation)}
                              size='sm'
                           >
                              Editar
                           </Button>
                        </>
                     )
                  }
               </div>
            </div>

         </CardContent>
      </Card>
   )
}

const EditReservationModal = ({
   className,
   isOpen,
   onClose,
   reservation
}) => {
   const {
      updateReservation,
      cancelReservation
   } = useUserSettings()

   const onSubmit = (({
      formState,
   }) => {
      AdminTableToasts.updateReservation(
         updateReservation(formState),
      );
   });

   const handleCancelReservation = () => {
      AdminTableToasts.cancelFullReservation(
         cancelReservation(reservation.id), {
         onSuccess: () => {
            window.requestAnimationFrame(() => onClose());
         },
      });
   }

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2 className={cn(
            className
         )}>
            <Label className={'text-center w-full'}>
               Editar reserva
            </Label>

            <FromReservation
               isOpen={isOpen}
               isEdit={true}
               onSubmit={onSubmit}
               initialValues={{
                  ...reservation,
                  date: DateParser.toDate(reservation?.dateStr),
               }}
               btns={[
                  {
                     label: 'Actualizar',
                     variant: 'default',
                     disabledBySelected: true,
                     type: 'submit',
                     size: 'lg',
                  },
                  {
                     label: 'Cancelar',
                     variant: 'destructive',
                     onClick: handleCancelReservation,
                     disabledBySelected: false,
                     type: 'button',
                     size: 'lg',
                  },
               ]}
            />
         </Card2>
      </Modal>
   )
}