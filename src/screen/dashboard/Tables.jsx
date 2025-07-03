import { TableAutoFilter } from '@/components/dashboard';
import { TableList } from '@/components/UI/table';
import { useTableAdminStore } from '@/hook/dashboard';
import React from 'react'

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

         <section>
            <TableList
               columns={currentRestaurant.columns}
               rows={currentRestaurant.rows}
               tables={tables}
               className={'w-[50rem] h-[50rem] overflow-hidden mx-auto select-none'}
            />
         </section>

         <aside>

         </aside>
      </main>
   )
}

