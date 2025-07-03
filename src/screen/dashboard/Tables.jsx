import { ModalProviderAsync } from '@/doman/context/dialogAsync';
import { useTableAdminStore } from '@/hook/dashboard';

import {
   TableAutoFilter,
   TableEditModal,
   TableEditPropertyModal,
   TableList
} from '@/components/dashboard';

export const TablesScreen = () => {
   const {
      loadTables,
      setCurrentValue,
      tables,
      hours,
      restaurants,
      currentDate,
      currentHour,
      currentRestaurant,
      loading,
      deleteTable,
   } = useTableAdminStore();

   const onChangeFilter = (data) => {
      setCurrentValue(data);
      loadTables(data);
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
            <TableList
               columns={currentRestaurant.columns}
               rows={currentRestaurant.rows}
               tables={tables}
               isLoading={loading.tables}
               onDeleteTable={deleteTable}
               onOpenEdit={}
               className={'w-[50rem] h-[50rem] overflow-hidden mx-auto select-none'}
            />
         </ModalProviderAsync>

         <TableEditModal
            initial={ }
            isOpen={ }
            onClose={ }
            onOpenEditProperty={ }
         />

         {/* <TableEditPropertyModal /> */}

         <aside>
         </aside>
      </main>
   )
}