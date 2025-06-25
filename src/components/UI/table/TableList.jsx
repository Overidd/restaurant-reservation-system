import { cn } from '@/ultils/cn';
import { TableItem } from '.';
import { tableData } from '@/data';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { typeStatusTable } from '@/ultils';


const initTableData = tableData.map(item => ({ ...item, isSelected: false }))

export const TableList = ({
   className,
   onChangeTable,
   selectedTables = [],
}) => {
   const [tables, setTables] = useState(initTableData);

   useEffect(() => {
      setTables((tables) => tables.map(table => ({
         ...table,
         ...(selectedTables.find(item => item.id === table.id) || { isSelected: false })
      })))
   }, [selectedTables])

   if (!Array.isArray(tables)) return null;

   return (
      <div
         className={cn(
            'max-w-[40rem]',
            'grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] items-center justify-center',
            className
         )}
      >
         {
            tables.map((value, index) => (
               <TableItem
                  key={value?.id ?? new Date().getTime() + index}
                  onClick={() => onChangeTable(value)}
                  color={value.isSelected ? typeStatusTable.SELECTED : value?.status}
                  {...value}
               />
            ))
         }
      </div>
   )
}

TableList.propTypes = {
   className: PropTypes.string,
   onChangeTable: PropTypes.func,
   selectedTables: PropTypes.array
}