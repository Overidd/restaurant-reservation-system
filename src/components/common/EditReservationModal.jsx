import { useReservation } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { cn, DateParser } from '@/ultils';
import { Card2 } from '../UI/card';
import { Modal } from '../UI/common';
import { Label } from '../UI/from';
import { FromReservation } from '../common';


export const EditReservationModal = ({
   className,
   isOpen,
   onClose,
   reservation,
   isActiveOverflow = true,
   activaBtns = ['update', 'cancel'],
}) => {
   const {
      cancelFullReservation,
      updateReservation,
      isLoading
   } = useReservation()

   const onSubmit = (({
      formState,
   }) => {
      AdminTableToasts.updateReservation(
         updateReservation(formState),
      );
   });

   const cancelReservation = () => {
      AdminTableToasts.cancelFullReservation(
         cancelFullReservation({
            idReservation: reservation?.id,
            tables: reservation?.tables,
            idRestaurant: reservation.idRestaurant,
            dateStr: reservation.dateStr,
            hour: reservation.hour,
            isNoShow: false,
         }), {
         onSuccess: () => {
            window.requestAnimationFrame(() => onClose());
         },
      });
   }

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         isActiveOverflow={isActiveOverflow}
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
                     name: 'update',
                     label: 'Actualizar',
                     variant: 'default',
                     disabled: isLoading,
                     disabledBySelected: true,
                     type: 'submit',
                     size: 'lg',
                  },
                  {
                     name: 'cancel',
                     label: 'Cancelar',
                     variant: 'destructive',
                     disabled: isLoading,
                     onClick: cancelReservation,
                     disabledBySelected: false,
                     type: 'button',
                     size: 'lg',
                  },
               ].filter(({ name }) => activaBtns.includes(name))}
            />
         </Card2>
      </Modal>
   )
}