import { useReservation } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { useModalAsync } from '../common';
import { DialogCancelReserve2 } from '@/components/UI/dialog';


export const useReservationActions = () => {
   const { showAsyncModal } = useModalAsync();

   const {
      cancelFullReservation,
      confirmReservation,
      releasedReservation,
      isLoading,
   } = useReservation();

   const cancelReservationWithToastSimple = async (
      reservation,
      { onSuccess = () => { } } = {}
   ) => {
      const res = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialogCancelReserve2
            onCancel={onCancel}
            onConfirm={onConfirm}
            reservation={reservation}
         />
      ));
      if (!res) return;

      AdminTableToasts.cancelFullReservation(
         cancelFullReservation({
            idUser: reservation.idUser,
            tables: reservation.tables,
            idReservation: reservation.id,
            idRestaurant: reservation.idRestaurant,
            isNoShow: res?.noShow || false,
            hour: reservation.hour,
            dateStr: reservation.dateStr
         }), {
         onSuccess
      });
   };

   const confirmReservationWithToast = (reservation) => {
      AdminTableToasts.confirmReserve(
         confirmReservation({
            idUser: reservation.idUser,
            hour: reservation.hour,
            idReservation: reservation.id,
            idRestaurant: reservation.idRestaurant,
            tablesReservation: reservation.tables,
            dateStr: reservation.dateStr,
         })
      );
   };

   const releaseReservationWithToast = (reservation) => {
      AdminTableToasts.releaseReserve(
         releasedReservation({
            hour: reservation.hour,
            idUser: reservation.idUser,
            dateStr: reservation.dateStr,
            idRestaurant: reservation.idRestaurant,
            tablesReservation: reservation.tables,
            idReservation: reservation.id,
         })
      );
   };

   return {
      isLoading,
      cancelReservationWithToastSimple,
      confirmReservationWithToast,
      releaseReservationWithToast,
   };
};