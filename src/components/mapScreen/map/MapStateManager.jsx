import { useModalTableReserve } from '@/hook';
import { useMapManagerContext } from '@/hook/context';
import { useReservation, useStateFilterRestaurant } from '@/hook/dashboard';
import { MapState, ModalTableReserve } from '..';

export const MapStateManager = () => {
   const {
      resources,
      selectedResource,
      setSelectedResource
   } = useMapManagerContext()

   const {
      filter: {
         restaurant,
         dateStr,
         hour
      },
   } = useStateFilterRestaurant();

   const {
      cancelATablesReservation,
      cancelFullReservation,
      confirmReservation,
      releasedReservation,
      reserveTable,
   } = useReservation()

   const {
      isOpen: isOpenModalReserve,
      openModal: openModalReserve,
      closeModal: closeModalReserve
   } = useModalTableReserve()

   const onOpenReserveTable = (table) => {
      openModalReserve();
      setSelectedResource(table);
   }

   const closeModalReserveTable = () => {
      closeModalReserve();
      setSelectedResource({});
   }

   return (
      <>
         <MapState
            rows={restaurant.rows}
            columns={restaurant.columns}
            resources={resources}
            onCancelFullReservation={cancelFullReservation}
            onCancelATablesReservation={cancelATablesReservation}
            onConfirmReservation={confirmReservation}
            onReleasedReservation={releasedReservation}
            selectedResource={selectedResource}
            onOpenReserveTable={onOpenReserveTable}
         />

         {isOpenModalReserve && (
            <ModalTableReserve
               currentTable={selectedResource}
               onReserveTable={reserveTable}
               isOpen={isOpenModalReserve}
               onClose={closeModalReserveTable}
               currentHour={hour}
               currentDate={dateStr}
               currentRestaurant={restaurant}
            />
         )}
      </>
   )
}