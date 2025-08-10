import { useReservation } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { useModalAsync } from '../common';
import { DialigCancelReserve, DialogCancelReserve2 } from '@/components/UI/dialog';


export const useReservationWithToast = () => {
   const { showAsyncModal } = useModalAsync();

   const {
      cancelFullReservation,
      confirmReservation,
      releasedReservation,
      isLoading,
      blockTempTable,
      unblockTempTable,
      cancelATablesReservation,
   } = useReservation();

   const cancelReservationWithToastSimple = async (
      reservation,
      { onSuccess } = {}
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
            isNoShow: res.data.isCheck || false,
            hour: reservation.hour,
            dateStr: reservation.dateStr
         }), {
         onSuccess
      });
   };

   const handleCancelReserveWithToast = async ({ table, setHighlightedTableIds = () => { } }) => {
      const res = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigCancelReserve
            table={table}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onCancelATablesReservation={cancelATablesReservation}
            setHighlightedTableIds={setHighlightedTableIds}
         />
      ));

      if (res?.data) {
         AdminTableToasts.cancelFullReservation(
            cancelFullReservation(res?.data)
         )
      }

      setHighlightedTableIds([]);
   }

   const confirmReservationWithToast = (reservation) => {
      console.log({
         idUser: reservation.idUser,
         hour: reservation.hour,
         idReservation: reservation.id,
         idRestaurant: reservation.idRestaurant,
         tablesReservation: reservation.tables,
         dateStr: reservation.dateStr,
      });
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
      console.log({
         idUser: reservation.idUser,
         hour: reservation.hour,
         idReservation: reservation.id,
         idRestaurant: reservation.idRestaurant,
         tablesReservation: reservation.tables,
         dateStr: reservation.dateStr,
      });
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

   const blockTempTableWithToast = async ({ table, filter }) => {

      AdminTableToasts.blockTempTable(
         blockTempTable({
            idTable: table.id,
            idRestaurant: filter.restaurant.id,
            hour: filter.hour,
            dateStr: filter.dateStr,
            status: table.status,
            idUser: table.user.idUser
         })
      );
   }
   const unblockTempTableWithToast = async ({ table, filter }) => {
      AdminTableToasts.unblockTempTable(
         unblockTempTable({
            idTable: table.id,
            idRestaurant: filter.restaurant.id,
            hour: filter.hour,
            dateStr: filter.dateStr,
         })
      );
   }

   return {
      isLoading,
      cancelReservationWithToastSimple,
      handleCancelReserveWithToast,
      confirmReservationWithToast,
      releaseReservationWithToast,
      blockTempTableWithToast,
      unblockTempTableWithToast
   };
};