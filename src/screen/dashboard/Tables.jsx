import { ModalProviderAsync } from '@/doman/context/dialogAsync';
import {
   useModalTableEdit,
   useModalTableEditProperty,
   useModalTableReserve,
} from '@/hook';
import { useEditTables, useTableAdminStore } from '@/hook/dashboard';
import { cn } from '@/ultils';

import {
   CreateObjectSlideOver,
   EditDimensionRestaurantModal,
   TableAutoFilter,
   TableEditModal,
   TableEditPropertyModal,
   TableList,
   TableReserveModal,
} from '@/components/dashboard';
import { useSlideOverObjectCreate } from '@/hook/slideover';


export const TablesScreen = () => {
   const {
      loadTables,
      setCurrentValue,
      tables,
      hours,
      restaurants,
      currentDate,
      currentHour,
      currentSelectedTable,
      setCurrentSelectedTable,
      currentRestaurant,
      changeCurrentTable,
      toggleIsTempTable,
      loading,
      deleteTable,
      cancelFullReservation,
      cancelATablesReservation,
      confirmReservation,
      releasedReservation,
      reserveTable,
      setCurrentSelectCreateObj,
      currentSelectedCreateObj
   } = useTableAdminStore();

   const {
      isOpen: isOpenModalEdit,
      openModal: openModalEdit,
      closeModal: closeModalEdit
   } = useModalTableEdit();

   const {
      isOpen: isOpenModalEditProperty,
      closeModal: closeModalEditProperty,
      openModal: openModalEditProperty,
   } = useModalTableEditProperty();

   const {
      isOpen: isOpenModalReserve,
      openModal: openModalReserve,
      closeModal: closeModalReserve
   } = useModalTableReserve()

   const {
      isOpen: isOpenObjectCreate,
      closeModal: closeModalObjectCreate,
      openModal: openModalCreateObj,
   } = useSlideOverObjectCreate();

   const onChangeFilter = (data) => {
      setCurrentValue(data);
      loadTables(data);
   }

   const onOpenEditTable = (table) => {
      setCurrentSelectedTable(table);
      openModalEdit();
   }

   const onOpenEditTableProperty = () => {
      openModalEditProperty();
      toggleIsTempTable(true);
      closeModalEdit();
   }

   const onCloseEditProperty = () => {
      toggleIsTempTable(false);
      closeModalEditProperty();
      setCurrentSelectedTable({});
   };

   const onOpenReserveTable = (table) => {
      openModalReserve();
      setCurrentSelectedTable(table);
   }

   const closeModalReserveTable = () => {
      closeModalReserve();
      setCurrentSelectedTable({});
   }

   const closeModalEditTable = () => {
      closeModalEdit();
      setCurrentSelectedTable({});
   }

   const onOpenCreateObj = (data) => {
      setCurrentSelectCreateObj(data);
      openModalCreateObj();
   }

   const { isEdit, toggleIsEdit } = useEditTables();

   const handleToggleIsEdit = () => {
      toggleIsEdit(false);
      closeModalObjectCreate();
   }

   return (
      <main className='mt-5 flex flex-col items-center gap-5'>
         <TableAutoFilter
            hours={hours}
            onChange={onChangeFilter}
            restaurants={restaurants}
            restaurant={currentRestaurant.name}
            hour={currentHour.hour}
            date={currentDate}
         />
         <ModalProviderAsync>

            {isEdit && (
               <div
                  role='button'
                  tabIndex={0}
                  onClick={handleToggleIsEdit}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                        handleToggleIsEdit();
                     }
                  }}
                  className='fixed inset-0 z-10 bg-black/10 backdrop-blur-[5px] transition-all'
                  style={{ pointerEvents: 'auto' }}
                  aria-label='Cerrar fondo del modal'
               />
            )}

            <TableList
               columns={currentRestaurant.columns}
               rows={currentRestaurant.rows}
               tables={tables}
               isLoading={loading.tables}
               onOpenEditTable={onOpenEditTable}
               onDeleteTable={deleteTable}
               onCancelFullReservation={cancelFullReservation}
               onCancelATablesReservation={cancelATablesReservation}
               onConfirmReservation={confirmReservation}
               onReleasedReservation={releasedReservation}
               onOpenReserveTable={onOpenReserveTable}
               onOpenCreateObj={onOpenCreateObj}
               currentSelectedTable={currentSelectedTable}
               currentSelectedCreateObj={currentSelectedCreateObj}
               className={cn(
                  'w-[50rem] h-[50rem] overflow-hidden mx-auto select-none',
                  isEdit && 'z-20'
               )}
            />
         </ModalProviderAsync>

         {isOpenModalReserve && (
            <TableReserveModal
               currentTable={currentSelectedTable}
               onReserveTable={reserveTable}
               isOpen={isOpenModalReserve}
               onClose={closeModalReserveTable}
               currentHour={currentHour.hour}
               currentDate={currentDate}
               currentRestaurant={currentRestaurant}
            />
         )}

         {isEdit && (
            <EditDimensionRestaurantModal
               name={currentRestaurant.name}
               rows={currentRestaurant.rows}
               columns={currentRestaurant.columns}
               isOpen={isEdit}
            />
         )}

         {isOpenObjectCreate &&
            <CreateObjectSlideOver
               isOpen={isOpenObjectCreate}
            />
         }

         <TableEditModal
            initial={currentSelectedTable}
            isOpen={isOpenModalEdit}
            onClose={closeModalEditTable}
            onOpenEditProperty={onOpenEditTableProperty}
         />

         {isOpenModalEditProperty && (
            <TableEditPropertyModal
               isOpen={isOpenModalEditProperty}
               onClose={onCloseEditProperty}
               initial={currentSelectedTable}
               onChangeValue={changeCurrentTable}
               axieRestaurant={{
                  x: currentRestaurant.rows,
                  y: currentRestaurant.columns
               }}
            />
         )}
      </main>
   )
}