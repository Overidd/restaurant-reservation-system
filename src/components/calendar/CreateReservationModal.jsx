import { useReservation } from '@/hook/dashboard';
import { ReservationToast } from '@/toasts';
import { cn } from '@/ultils';
import { Card2 } from '../UI/card';
import { Button, Modal } from '../UI/common';
import { FormItem, Label } from '../UI/from';
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
      ReservationToast({
         promise: reserveTable(formState),
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
            >
               <FormItem>
                  <Button
                     size='lg'
                     type='submit'
                     className='mt-2 flex items-center gap-2'
                  // disabled={isLoadingReservation}
                  >
                     Reservar
                  </Button>
               </FormItem>
            </FromReservation>
         </Card2>
      </Modal>
   )
}
