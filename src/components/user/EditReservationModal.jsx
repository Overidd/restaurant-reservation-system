import { useUserSettings } from "@/hook/auth";
import { AdminTableToasts } from "@/toasts";
import { cn, DateParser } from "@/ultils";
import { FromReservation } from "../common";
import { Card2 } from "../UI/card";
import { Modal } from "../UI/common";
import { Label } from "../UI/from";


export const EditReservationModal = ({
   className,
   isOpen,
   onClose,
   reservation,
}) => {
   const {
      updateReservation,
      cancelReservation,
      loading
   } = useUserSettings()

   const onSubmit = (({
      formState,
   }) => {
      AdminTableToasts.updateReservation(
         updateReservation(formState),
      );
   });

   const handleCancelReservation = () => {
      AdminTableToasts.cancelFullReservation(
         cancelReservation(reservation.id), {
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
                     disabled: loading.updateReservation,
                     type: 'submit',
                     size: 'lg',
                  },
                  {
                     label: 'Cancelar',
                     variant: 'destructive',
                     onClick: handleCancelReservation,
                     disabledBySelected: false,
                     disabled: loading.cancelReservation,
                     type: 'button',
                     size: 'lg',
                  },
               ]}
            />
         </Card2>
      </Modal>
   )
}