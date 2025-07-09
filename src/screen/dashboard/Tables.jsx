import { ModalProviderAsync } from '@/doman/context/dialogAsync';
import { useEditTables, useTableAdminStore } from '@/hook/dashboard';

import {
   TableList,
   TableAutoFilter,
   TableEditModal,
   TableEditPropertyModal,
   TableReserveModal,
} from '@/components/dashboard';

import {
   useModalTableEdit,
   useModalTableReserve,
   useModalTableEditProperty,
} from '@/hook';
import { cn } from '@/ultils';


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
   const { isEdit, toggleIsEdit } = useEditTables();

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
                  onClick={() => toggleIsEdit(false)}
                  className="fixed inset-0 z-10 bg-black/10 backdrop-blur-[5px] transition-all"
                  style={{ pointerEvents: 'auto' }}
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
               currentSelectedTable={currentSelectedTable}
               className={cn(
                  'w-[50rem] h-[50rem] overflow-hidden mx-auto select-none',
                  isEdit && 'z-20'
               )}
            />
         </ModalProviderAsync>

         <TableEditModal
            initial={currentSelectedTable}
            isOpen={isOpenModalEdit}
            onClose={closeModalEdit}
            onOpenEditProperty={onOpenEditTableProperty}
         />
         {
            isOpenModalReserve && (
               <TableReserveModal
                  currentTable={currentSelectedTable}
                  onReserveTable={reserveTable}
                  isOpen={isOpenModalReserve}
                  onClose={closeModalReserveTable}
                  currentHour={currentHour.hour}
                  currentDate={currentDate}
                  currentRestaurant={currentRestaurant}
               />
            )
         }

         {
            isOpenModalEditProperty && (
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
            )
         }
      </main>
   )
}