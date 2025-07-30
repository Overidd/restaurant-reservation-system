import { FromReservation } from '@/components/common';
import { Card2 } from '@/components/UI/card';
import { Button, Modal } from '@/components/UI/common';
import { FormItem } from '@/components/UI/from';
import { useReservation } from '@/hook/dashboard';
import { useModalReservationsCreate } from '@/hook/modals';
import { ReservationToast } from '@/toasts';
import { cn } from '@/ultils';
import { CalendarPlus, LoaderCircle } from 'lucide-react';

export const CreateReservationsModal = ({
   className
}) => {
   const { closeModal, isOpen } = useModalReservationsCreate();

   const {
      reserveTable,
      toggleLoading,
      isLoading: isLoadingReservation,
   } = useReservation()

   const onSubmit = (({
      // selectedTables,
      formState,
      resetForm,
   }) => {
      ReservationToast({
         promise: reserveTable(formState),
         onSuccess: () => {
            window.requestAnimationFrame(() => resetForm());
         },
         onFinally: () => {
            toggleLoading(false);
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
            <FromReservation
               isOpen={isOpen}
               onSubmit={onSubmit}
               isEdit={false}
            >
               <FormItem>
                  <Button
                     size='lg'
                     type='submit'
                     className='mt-2 flex items-center gap-2'
                     disabled={isLoadingReservation}
                  >
                     {
                        isLoadingReservation
                           ? <LoaderCircle className='animate-spin' />
                           : <CalendarPlus />
                     }
                     <span>
                        Reservar
                     </span>
                  </Button>
               </FormItem>
            </FromReservation>
         </Card2>
      </Modal>
   )
}