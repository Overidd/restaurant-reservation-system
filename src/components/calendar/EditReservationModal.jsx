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
   reservation
}) => {
   const {
      cancelFullReservation,
      updateReservation,
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
            tables: reservation?.tables
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
                     onClick: cancelReservation,
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