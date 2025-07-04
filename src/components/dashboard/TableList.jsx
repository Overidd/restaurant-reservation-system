import { useState } from 'react';
import { useModalAsync } from '@/hook';
import PropTypes from 'prop-types';
import { cn } from '@/ultils/cn';
import { TableItem } from '../UI/table';
import { Card2, CardLoadding } from '../UI/card';
import { getTimeDifference, typeStatusTable } from '@/ultils';

import {
   Button,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Tooltip,
   TooltipContent,
   TooltipTrigger
} from '../UI/common';

import {
   CheckCircle,
   Lock,
   LockOpen,
   Pencil,
   Table,
   Trash,
   Unlock
} from 'lucide-react';

export const TableList = ({
   rows,
   columns,
   className,
   onChangeTable,
   onDeleteTable,
   onOpenEditTable,
   onOpenReserveTable,
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
            <TableItemPopover
               key={'table-' + table.id}
               table={table}
               onOpenEditTable={onOpenEditTable}
               onOpenReserveTable={onOpenReserveTable}
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
      <Card2 className='flex flex-col gap-4 p-4 justify-center items-center text-card-foreground'>
         <h2 className='text-sm text-card-primary'>¿Estás seguro de eliminar la mesa {table.name}?</h2>
         <div className='flex gap-2 justify-end'>
            <Button
               onClick={onCancel}
               size={'sm'}
            >
               Cancelar
            </Button>
            <Button
               onClick={onConfirm}
               size={'sm'}
               variant='destructive'
            >
               Eliminar
            </Button>
         </div>
      </Card2>
   )
}

const TableItemPopover = ({
   table,
   handleDeleteTable,
   onOpenEditTable,
   onOpenReserveTable
}) => {
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
         <Tooltip asChild>
            <PopoverTrigger asChild>
               <TooltipTrigger asChild>
                  <TableItem
                     tabIndex={0}
                     role='button'
                     onClick={handleLeftClick}
                     onContextMenu={handleRightClick}
                     color={table?.status}
                     size={table?.size}
                     chairs={table?.chairs}
                     name={table?.name}
                     rotation={table?.rotation}
                  />
               </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent>
               <InfoTableTooltip
                  hasReservar={table.hasReservar}
                  timestamp={table.timestamp}
                  {...table.user}
               />
            </TooltipContent>
         </Tooltip>

         {
            popoverType === 'right' && (
               <PopoverContent
                  onInteractOutside={handleClose}
                  align='center'
                  side='right'
                  sideOffset={-10}
                  onClick={handleClose}
                  className={'flex flex-col gap-4 w-fit p-4 rounded-2xl shadow-xl'}
               >
                  <Button
                     title='Editar'
                     onClick={() => onOpenEditTable(table)}
                  >
                     {/* Editar */}
                     <Pencil />
                  </Button>
                  <Button
                     title='Eliminar'
                     onClick={() => handleDeleteTable(table)}
                     variant='destructive'
                  >
                     <Trash />
                  </Button>
               </PopoverContent>
            )
         }
         {
            popoverType === 'left' && (
               <PopoverContent
                  align='center'
                  side='right'
                  sideOffset={-10}
                  className={'flex flex-col gap-4 w-fit p-4 rounded-2xl shadow-xl'}
                  onInteractOutside={handleClose}
                  onClick={handleClose}
               >
                  {
                     table.status === typeStatusTable.BUSY && (
                        <>
                           <Button
                              title='Cancelar'
                           // onClick={() => onOpenReleaseTable(table)}
                           >
                              <Unlock />
                              Cancelar
                           </Button>
                           <Button
                              title='Confirmar'
                           >
                              <CheckCircle />
                              Confirmar
                           </Button>
                        </>
                     )
                  }
                  {
                     table.status === typeStatusTable.AVAILABLE && (
                        <>
                           <Button
                              title='Bloquear'
                           >
                              <Lock />
                              Bloquear
                           </Button>
                           <Button
                              title='Reservar'
                              onClick={() => onOpenReserveTable(table)}
                           >
                              <Table />
                              Reservar
                           </Button>
                        </>
                     )
                  }
                  {
                     table.status === typeStatusTable.BLOCKED && (
                        <Button>
                           <LockOpen />
                        </Button>
                     )
                  }
               </PopoverContent>
            )
         }
      </Popover >
   );
};


const InfoTableTooltip = ({
   name,
   email,
   code,
   timestamp,
   hasReservar
}) => {
   if (!hasReservar || !timestamp) return (
      <div className='text-xs text-muted-foreground text-center px-2 py-1'>
         Mesa disponible
      </div>
   );

   const currentTime = getTimeDifference(new Date(), new Date(timestamp));
   const isExpired = currentTime === -1;

   return (
      <>
         <div className='flex items-center gap-2'>
            <span className={`text-xs font-semibold text-card-foreground`}>
               {isExpired ? 'Reserva expirada' : `Pendiente: ${currentTime}`}
            </span>
            {!isExpired && (
               <span className='bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full ml-2'>
                  Activa
               </span>
            )}
            {isExpired && (
               <span className='bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full ml-2'>
                  Expirada
               </span>
            )}
         </div>

         <p className='flex flex-col gap-2 mt-2'>
            <span className='text-xs text-card-foreground' >
               {name || <span className='text-card-foreground'>Sin nombre</span>}
            </span>

            <span className='text-xs text-card-foreground'>
               {email || <span className='text-card-foreground'>Sin email</span>}
            </span>

            <span className='text-xs tracking-wider text-card-foreground'>
               {code || <span className='text-card-foreground'>Sin código</span>}
            </span>
         </p>
      </>
   );
};