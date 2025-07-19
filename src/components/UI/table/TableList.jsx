import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { Table } from '.';
import { CardLoadding } from '../card';

export const TableList = ({
   rows,
   columns,
   className,
   onChangeTable,
   isLoading = false,
   tables = []
}) => {

   if (!Array.isArray(tables)) return null;

   const paintedTables = () => {
      return Array.from({ length: rows * columns }).map((_, index) => {
         const x = Math.floor(index / columns) + 1;
         const y = (index % columns) + 1;

         const table = tables.find(
            (table) => table.positionX == x && table.positionY == y
         );

         if (!table) return (
            <div key={'empty-node' + index} />
         );

         return (
            <Table
               key={'table-' + table.id}
               onClick={() => onChangeTable(table)}
               color={table.status}
               size={table?.size}
               chairs={table?.chairs}
               name={table?.name}
               rotation={table?.rotation}
            />
         );
      });
   };

   const colorBorder = 'bg-[#545454]'

   return (
      <div className={cn(
         'relative rounded-md overflow-hidden',
         'w-fit h-fit p-4',
         'bg-gray-300/10',
         className
      )}>
         <CardLoadding
            className='w-full h-full flex items-center justify-center'
            isLodding={isLoading}
         >
            <div
               className={cn(
                  'w-full h-full',
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
               <div className={`w-full h-full rounded-br-lg ${colorBorder}`}/>
               <div className={`w-full h-full rounded-bl-lg ${colorBorder}`}/>
            </div>

            {/* Left */}
            <div className={`absolute top-0 bottom-0 left-0 w-2 h-full ${colorBorder}`}/>

            {/* Right */}
            <div className='absolute right-0 top-0 bottom-0 w-2 h-full grid grid-rows-2'>
               <div className={`w-full h-[50%] rounded-bl-md ${colorBorder}`}/>
               <div className={`w-full h-full rounded-tl-md ${colorBorder}`}/>
            </div>

            {/* Bottom */}
            <div className='absolute left-0 bottom-0 h-2 w-full grid grid-cols-[50%_40%] justify-between'>
               <div className={`w-full h-full rounded-tr-lg ${colorBorder}`}/>
               <div className={`w-full h-full rounded-tl-lg ${colorBorder}`}/>
            </div>
         </CardLoadding >
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