import PropTypes from 'prop-types';
import { TableItem } from '.';
import { cn } from '@/ultils/cn';
import { useEffect, useState } from 'react';
import { typeStatusTable } from '@/ultils';

export const TableList = ({
   rows,
   columns,
   className,
   onChangeTable,
   selectedTables = [],
   dataTables = []
}) => {
   const [tables, setTables] = useState(dataTables);

   useEffect(() => {
      setTables((tables) =>
         tables.map((table) => ({
            ...table,
            ...(selectedTables.find((item) => item.id === table.id) || { isSelected: false }),
         }))
      );
   }, [selectedTables]);

   if (!Array.isArray(tables)) return null;

   const paintedTables = () => {
      return Array.from({ length: rows * columns }).map((_, index) => {
         const x = Math.floor(index / columns) + 1;
         const y = (index % columns) + 1;

         const table = tables.find(
            (table) => table.positionX == x && table.positionY == y
         );
         if (!table) return (
            <div key={'empty-node' + index}>
            </div>
         );

         return (
            <TableItem
               key={'table-' + table.id}
               onClick={() => onChangeTable(table)}
               color={table.isSelected ? typeStatusTable.SELECTED : table?.status}
               {...table}
               style={{ transform: `rotate(${table.rotation}deg)` }}
            />
         );
      });
   };

   return (
      <div className={cn(
         'relative rounded-md overflow-hidden',
         'w-fit h-fit p-4',
         'bg-gray-300/10',
         className
      )}>
         <div
            className={cn(
               'max-w-[50rem] max-h-[50rem]',
               'grid items-center justify-center gap-2 overflow-auto [&::-webkit-scrollbar]:hidden'
            )}
            style={{
               gridTemplateColumns: `repeat(${columns}, 1fr)`,
               gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
         >
            {paintedTables()}
         </div>

         {/* Top */}
         <div className='absolute left-0 top-0 h-2 w-full grid grid-cols-[40%_50%] justify-between'>
            <div className='w-full h-full bg-gray-200/50 rounded-br-lg'></div>
            <div className='w-full h-full bg-gray-200/50 rounded-bl-lg'></div>
         </div>

         {/* Left */}
         <div className='absolute top-0 bottom-0 left-0 w-2 h-full bg-gray-200/50'>
         </div>

         {/* Right */}
         <div className='absolute right-0 top-0 bottom-0 w-2 h-full grid grid-rows-2'>
            <div className='w-full h-[50%] bg-gray-200/50 rounded-bl-md'></div>
            <div className='w-full h-full bg-gray-200/50 rounded-tl-md'></div>
         </div>

         {/* Bottom */}
         <div className='absolute left-0 bottom-0 h-2 w-full grid grid-cols-[50%_40%] justify-between'>
            <div className='w-full h-full bg-gray-200/50 rounded-tr-lg'></div>
            <div className='w-full h-full bg-gray-200/50 rounded-tl-lg'></div>
         </div>
      </div>
   );
};

TableList.propTypes = {
   className: PropTypes.string,
   onChangeTable: PropTypes.func,
   selectedTables: PropTypes.array,
   dataTables: PropTypes.array,
   rows: PropTypes.number,
   columns: PropTypes.number
};