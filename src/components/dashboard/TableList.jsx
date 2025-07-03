import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { typeStatusTable } from '@/ultils';
import { TableItem } from '../UI/table';
import { Button, Popover, PopoverContent, PopoverTrigger } from '../UI/common';
import { Card2, CardLoadding } from '../UI/card';
import { useModalAsync } from '@/hook';
import { useState } from 'react';

export const TableList = ({
   rows,
   columns,
   className,
   onChangeTable,
   onDeleteTable,
   onOpenEdit,
   isLoading = false,
   tables = []
}) => {
   const { showAsyncModal } = useModalAsync();

   if (!Array.isArray(tables)) return null;

   const handleDeleteTable = async (table) => {
      const confirmed = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigDeleteTable
            onCancel={onCancel}
            onConfirm={onConfirm}
            table={table}
         />
      ));
      if (confirmed) {
         onDeleteTable(table.id);
      }
   }

   const paintedTables = () => {
      return Array.from({ length: rows * columns }).map((_, index) => {
         const x = Math.floor(index / columns) + 1;
         const y = (index % columns) + 1;

         const table = tables.find(
            (table) => table.positionX == x && table.positionY == y
         );

         if (!table) return (
            <div key={'empty-node' + index}></div>
         );

         return (
            <TablePopoverItem
               key={'table-' + table.id}
               table={table}
               onOpenEdit={onOpenEdit}
               onChangeTable={onChangeTable}
               handleDeleteTable={handleDeleteTable}
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
               <div className={`w-full h-full rounded-br-lg ${colorBorder}`}></div>
               <div className={`w-full h-full rounded-bl-lg ${colorBorder}`}></div>
            </div>

            {/* Left */}
            <div className={`absolute top-0 bottom-0 left-0 w-2 h-full ${colorBorder}`}>
            </div>

            {/* Right */}
            <div className='absolute right-0 top-0 bottom-0 w-2 h-full grid grid-rows-2'>
               <div className={`w-full h-[50%] rounded-bl-md ${colorBorder}`}></div>
               <div className={`w-full h-full rounded-tl-md ${colorBorder}`}></div>
            </div>

            {/* Bottom */}
            <div className='absolute left-0 bottom-0 h-2 w-full grid grid-cols-[50%_40%] justify-between'>
               <div className={`w-full h-full rounded-tr-lg ${colorBorder}`}></div>
               <div className={`w-full h-full rounded-tl-lg ${colorBorder}`}></div>
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


export const DialigDeleteTable = ({
   onConfirm,
   onCancel,
   table,
}) => {

   return (
      <Card2 className="flex flex-col gap-4 p-4 justify-center items-center text-card-foreground">
         <h2 className="text-sm text-card-primary">¿Estás seguro de eliminar la mesa {table.name}?</h2>
         <div className="flex gap-2 justify-end">
            <Button
               onClick={onCancel}
               size={'sm'}
            // variant="outline"
            >
               Cancelar
            </Button>
            <Button
               onClick={onConfirm}
               size={'sm'}
               variant="destructive"
            >
               Eliminar
            </Button>
         </div>
      </Card2>
   )
}

const TablePopoverItem = ({ table, handleDeleteTable, onOpenEdit }) => {
   const [popoverType, setPopoverType] = useState(null);
   const [open, setOpen] = useState(false);

   const handleLeftClick = (e) => {
      e.preventDefault();
      setPopoverType('left');
      setOpen(true);
   };

   const handleRightClick = (e) => {
      e.preventDefault();
      setPopoverType('right');
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
      setPopoverType(null);
   };

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <div
               onClick={handleLeftClick}
               onContextMenu={handleRightClick}
               style={{ display: 'inline-block' }}
            >
               <TableItem
                  color={table.isSelected ? typeStatusTable.SELECTED : table?.status}
                  {...table}
                  style={{ transform: `rotate(${table.rotation}deg)` }}
               />
            </div>
         </PopoverTrigger>
         {popoverType === 'right' && (
            <PopoverContent
               className={'flex flex-col gap-4 w-fit p-4 rounded-2xl shadow-xl'}
               onInteractOutside={handleClose}
            >
               <Button
                  onClick={onOpenEdit}
               >
                  Editar
               </Button>
               <Button>Reservar</Button>
               <Button onClick={() => handleDeleteTable(table)} variant='destructive'>Elminar</Button>
            </PopoverContent>
         )}
         {popoverType === 'left' && (
            <PopoverContent
               className={'flex flex-col gap-4 w-fit p-4 rounded-2xl shadow-xl'}
               onInteractOutside={handleClose}
            >
               {
                  table.status === typeStatusTable.BUSY && (
                     <>
                        <Button>Liberar</Button>
                        <Button>Bloquear</Button>
                     </>
                  )
               }
               {
                  table.status === typeStatusTable.AVAILABLE && (
                     <Button>Bloquear</Button>
                  )
               }
               {
                  table.status === typeStatusTable.BLOCKED && (
                     <Button>Desbloquear</Button>
                  )
               }
            </PopoverContent>
         )}
      </Popover>
   );
};