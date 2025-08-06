import { cn } from '@/ultils';
import { Card2 } from '../UI/card';
import { Badge, CardFooter, CardHeader, CardTitle, Modal } from '../UI/common';
// import { StateReservationButtons } from '../common';
// import { useReservationActions } from '@/hook/dashboard';
import { CalendarDays, Clock, Mail, MessageSquare, Phone, Table, Tag, Users, Utensils } from 'lucide-react';

export const EditStateReserveModal = ({
   className,
   isOpen,
   onClose,
   reservation,
}) => {
   // const {
   //    isLoading,
   //    releaseReservationWithToast,
   //    confirmReservationWithToast,
   //    cancelReservationWithToastSimple,
   // } = useReservationActions();

   const handleEditReservetion = (reservation) => {
      // setIsEditReservation(true);
      // setCurrentReservation(reservation);
   };
   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2 className={cn(
            'space-y-2',
            className
         )}>
            <CardHeader className={'gap-3 flex justify-between'}>
               <CardTitle className={'text-background text-center'}>
                  Estado de la reserva
               </CardTitle>
               <Badge state={reservation.status} />
            </CardHeader>

            {/* <ul className={'p-4 rounded-2xl overflow-hidden space-y-2'}> */}
            <ul className='style-class p-4 rounded-xl overflow-hidden space-y-2'>
               <li className='flex items-center gap-2'>
                  <Tag className='h-4 w-4' />
                  <span className='text-sm font-medium'>
                     Código:
                  </span>
                  <span className='text-sm font-semibold text-accent-foreground/80'>
                     {reservation.code}
                  </span>
               </li>
               <li className='flex items-center gap-2'>
                  <CalendarDays className='h-4 w-4' />
                  <span className='text-sm font-medium'>
                     Fecha:
                  </span>
                  <span className='text-sm font-semibold text-accent-foreground/80'>
                     {reservation.dateStr}
                  </span>
               </li>
               <li className='flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  <span className='text-sm font-medium'>
                     Hora:
                  </span>
                  <span className='text-sm font-semibold text-accent-foreground/80'>
                     {reservation.hour}
                  </span>
               </li>
               <li className='flex items-center gap-2'>
                  <Users className='h-4 w-4' />
                  <span className='text-sm font-medium'>
                     Comensales:
                  </span>
                  <span className='text-sm font-semibold text-accent-foreground/80'>
                     {reservation.diners}
                  </span>
               </li>
            </ul>

            <ul className='grid gap-2 style-class p-4 rounded-xl overflow-hidden' >
               <li className='flex items-center gap-2'>
                  <Utensils className='h-4 w-4' />
                  <span className='text-sm font-medium'>
                     Motivo:
                  </span>
                  <span className='text-sm text-accent-foreground/80'>
                     {reservation.reason}
                  </span>
               </li>
               <li className='flex items-start gap-2'>
                  <Table className='h-4 w-4 mt-1' />
                  <span className='text-sm font-medium'>
                     Mesas:
                  </span>
                  <div className='text-sm flex flex-col text-accent-foreground/80'>
                     {reservation.tables.map((table) => (
                        <span key={table.id}>
                           {table.name} ({table.chairs} sillas)
                        </span>
                     ))}
                  </div>
               </li>
               {reservation.comment && (
                  <div className='flex items-start gap-2'>
                     <MessageSquare className='h-4 w-4 mt-1' />
                     <span className='text-sm font-medium'>
                        Comentarios:
                     </span>
                     <span className='text-sm text-accent-foreground/80'>
                        {reservation.comment}
                     </span>
                  </div>
               )}
            </ul>

            <ul className='grid gap-2 style-class p-4 rounded-xl overflow-hidden'>
               <li className='flex items-center gap-2'>
                  <Users className='h-4 w-4' />
                  <span className='text-sm font-medium '>
                     Nombre:
                  </span>
                  <span className='text-sm text-accent-foreground/80'>
                     {reservation.name}
                  </span>
               </li>
               <li className='flex items-center gap-2'>
                  <Mail className='h-4 w-4' />
                  <span className='text-sm font-medium'>
                     Email:
                  </span>
                  <span className='text-sm text-accent-foreground/80'>
                     {reservation.email}
                  </span>
               </li>
               <li className='flex items-center gap-2'>
                  <Phone className='h-4 w-4' />
                  <span className='text-sm font-medium'>
                     Teléfono:
                  </span>
                  <span className='text-sm text-accent-foreground/80' >
                     {reservation.phone}
                  </span>
               </li>
            </ul>

            <CardFooter className='w-fit mx-auto flex flex-row gap-2 sm:gap-3'>
               {/* <StateReservationButtons
                  reservation={reservation}
                  onEditReservetion={handleEditReservetion}
                  onCancelReservation={cancelReservationWithToastSimple}
                  onConfirmReservation={confirmReservationWithToast}
                  onReleasedReservation={releaseReservationWithToast}
                  isLoading={isLoading}
               /> */}
            </CardFooter>
         </Card2>
      </Modal >
   )
}


