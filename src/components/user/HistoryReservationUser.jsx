import { useModalAsync } from '@/hook';
import { useUserSettings } from '@/hook/auth';
import { useGetReservationsByUser } from '@/hook/fetchings';
import { UserSettingToasts } from '@/toasts';
import { cn, typeStatusTable } from '@/ultils';
import { Calendar, CalendarCheck, Clock, Loader2, MapPin, Users } from 'lucide-react';
import { AlertCancelReservation, Badge, Button, Card, CardContent, CardHeader, CardTitle } from '../UI/common';


export const HistoryReservationUser = () => {
   const { reservations, isLoading, changeReservation } = useGetReservationsByUser();
   const { showAsyncModal } = useModalAsync();
   const { cancelReservation } = useUserSettings()

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
      <Card className={'p-4 bg-transparent border-none shadow-none'}>
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
                        onCancelReservation={handleCancelReservation}
                     />
                  ))}
               </div>
            )}
         </CardContent>
      </Card>
   )
}

export const HistorialReservationItem = ({
   reservation,
   onCancelReservation
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

               <p className='flex items-center gap-1 text-sm'>
                  <MapPin className='h-4 w-4' />
                  {reservation.restaurantName}
               </p>
            </div>
            {
               reservation.status !== typeStatusTable.CANCELED && (
                  <Button
                     onClick={() => onCancelReservation(reservation)}
                     variant='destructive'
                     size='sm'
                  >
                     Cancelar
                  </Button>
               )
            }
         </CardContent>
      </Card>
   )
}