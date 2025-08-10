import { useReservation } from '@/hook/dashboard';
import { ReservationToast } from '@/toasts';
import { cn } from '@/ultils';
import { Card2 } from '../UI/card';
import { Modal } from '../UI/common';
import { Label } from '../UI/from';
import { FromReservation } from '../common';

export const CreateReservationModal = ({
   className,
   isOpen,
   onClose,
   date,
}) => {
   const {
      reserveTable,
   } = useReservation()

   const onSubmit = (({
      formState,
      resetForm,
   }) => {
      ReservationToast(
         reserveTable(formState), {
         onSuccess: () => {
            window.requestAnimationFrame(() => resetForm());
         },
      });
   });

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2 className={cn(
            className
         )}>
            <Label className={'text-center w-full'}>
               Crear nueva reserva
            </Label>

            <FromReservation
               isOpen={isOpen}
               onSubmit={onSubmit}
               initialValues={{
                  date,
               }}
               btns={[
                  {
                     name: 'reserve',
                     label: 'Reservar',
                     variant: 'default',
                     disabled: false,
                     type: 'submit',
                     size: 'lg',
                  },
               ]}
            />
         </Card2>
      </Modal>
   )
}