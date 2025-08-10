import { FromReservation } from '@/components/common';
import { Card2 } from '@/components/UI/card';
import { CardTitle, Modal } from '@/components/UI/common';
import { Label } from '@/components/UI/from';
import { useReservation } from '@/hook/dashboard';
import { useModalReservationsCreate } from '@/hook/modals';
import { ReservationToast } from '@/toasts';
import { cn } from '@/ultils';

export const CreateReservationsModal = ({
   className
}) => {
   const { closeModal, isOpen } = useModalReservationsCreate();

   const {
      reserveTable,
      isLoading: isLoadingReservation,
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
         onClose={closeModal}
      >
         <Card2 className={cn(
            className
         )}>

            <CardTitle className={'flex justify-center items-center gap-4 mb-2'}>
               <Label>
                  Crear una reserva
               </Label>
            </CardTitle>

            <FromReservation
               isOpen={isOpen}
               onSubmit={onSubmit}
               isEdit={false}
               btns={[
                  {
                     name: 'reserve',
                     label: 'Reservar',
                     variant: 'default',
                     disabled: isLoadingReservation,
                     type: 'submit',
                     size: 'lg',
                  },
               ]}
            />
         </Card2>
      </Modal>
   )
}