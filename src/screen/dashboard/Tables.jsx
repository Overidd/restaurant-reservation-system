import { ModalProviderAsync } from '@/doman/context/dialogAsync';
import { useTableAdminStore } from '@/hook/dashboard';

import {
   TableAutoFilter,
   TableEditModal,
   TableEditPropertyModal,
   TableList
} from '@/components/dashboard';

import {
   useModalTableEdit,
   useModalTableEditProperty
} from '@/hook';

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
   };

   // console.log(currentSelectedTable)

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
            <TableList
               columns={currentRestaurant.columns}
               rows={currentRestaurant.rows}
               tables={tables}
               isLoading={loading.tables}
               onDeleteTable={deleteTable}
               onOpenEditTable={onOpenEditTable}
               className={'w-[50rem] h-[50rem] overflow-hidden mx-auto select-none'}
            />
         </ModalProviderAsync>

         <TableEditModal
            initial={currentSelectedTable}
            isOpen={isOpenModalEdit}
            onClose={closeModalEdit}
            onOpenEditProperty={onOpenEditTableProperty}
         />

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
         <aside>
         </aside>
      </main>
   )
}