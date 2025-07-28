import { useGetReservationsByUser } from '@/hook/fetchings';
import { CalendarCheck, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { HistorialReservationItem } from '.';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/common';


export const HistoryReservationCancel = () => {
   const {
      reservations,
      isLoading,
      loadReservationsCancel
   } = useGetReservationsByUser();

   useEffect(() => {
      loadReservationsCancel()
   }, [])


   return (
      <>
         <Card className={'p-4 h-full bg-transparent border-none shadow-none overflow-y-auto [&::-webkit-scrollbar]:hidden'}>
            <CardHeader>
               <CardTitle className='flex items-center gap-2 text-background text-sm md:text-base'>
                  <CalendarCheck className='h-4 w-4 md:h-5 md:w-5' />
                  Historial de Reservas Canceladas
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
                        />
                     ))}
                  </div>
               )}
            </CardContent>
         </Card>
      </>
   )
}
