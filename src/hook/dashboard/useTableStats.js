import { typeStatusTable } from '@/ultils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';


const statsData = [
   {
      status: typeStatusTable.AVAILABLE,
      value: 8,
   },
   {
      status: typeStatusTable.PENDING,
      value: 3,
   },
   {
      status: typeStatusTable.CONFIRMED,
      value: 12,
   },
   {
      status: typeStatusTable.BLOCKED,
      value: 2,
   }
]
// typeStatusTable
export const useTableStats = () => {
   const tables = useSelector((state) => state.restaurantResourceReducer.tables)


   const stats = useMemo(() => {
      return statsData.map((stat) => ({ ...stat, value: tables.filter(table => table.status === stat.status).length }))
   }, [tables])

   const total = stats.reduce((acc, item) => acc + item.value, 0)

   return {
      stats,
      total
   }
}
