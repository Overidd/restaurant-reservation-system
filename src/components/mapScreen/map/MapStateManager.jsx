import { useMapManagerContext } from '@/hook/context';
import { useRestaurantUi, useStateFilterRestaurant } from '@/hook/dashboard';
import { useModalTableReserve } from '@/hook/map';
import { MapState, ModalTableReserve } from '..';

export const MapStateManager = () => {
   const {
      resources,
   } = useMapManagerContext()

   const {
      selectedResource,
      setSelectedResource,
   } = useRestaurantUi();

   const {
      filter: {
         restaurant,
         dateStr,
         hour
      },
   } = useStateFilterRestaurant();

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
            filter={{ restaurant, dateStr, hour }}
            selectedResource={selectedResource}
            onOpenReserveTable={onOpenReserveTable}
         />

         {isOpenModalReserve && (
            <ModalTableReserve
               className={'w-[22rem]'}
               currentTable={selectedResource}
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