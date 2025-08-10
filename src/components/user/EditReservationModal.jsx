import { cn, DateParser } from '@/ultils';
import { FromReservation } from '../common';
import { Card2 } from '../UI/card';
import { Modal } from '../UI/common';
import { Label } from '../UI/from';


export const EditReservationModal = ({
   className,
   isOpen,
   onClose,
   loading,
   reservation,
   updateReservation,
   isActiveOverflow = true
}) => {

   const onSubmit = (({
      formState,
   }) => {
      updateReservation({
         ...reservation,
         ...formState,
      });
   });

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
               btns={[{
                  label: 'Actualizar',
                  variant: 'default',
                  disabledBySelected: true,
                  disabled: loading.updateReservation || loading.cancelReservation,
                  type: 'submit',
                  size: 'lg',
               }]}
            />
         </Card2>
      </Modal>
   )
}