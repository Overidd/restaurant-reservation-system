import { useRef, useState } from 'react';
import { useModalAsync } from '@/hook';
import PropTypes from 'prop-types';
import { cn } from '@/ultils/cn';
import { TableItem } from '../UI/table';
import { Card2, CardLoadding } from '../UI/card';
import { getTimeDifference, typeStatusTable } from '@/ultils';

import {
   Button,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Toggle,
   Tooltip,
   TooltipContent,
   TooltipTrigger
} from '../UI/common';

import {
   AlertTriangle,
   CheckCircle,
   Dice1,
   Lock,
   LockOpen,
   OctagonX,
   Pencil,
   Table,
   Trash,
   Unlock,
   User
} from 'lucide-react';
import { Checkbox, Label } from '../UI/from';

export const TableList = ({
   rows,
   columns,
   className,
   onChangeTable,
   onDeleteTable,
   onCancelReserveTable,
   onCancelReservationTables,
   onOpenEditTable,
   onOpenReserveTable,
   isLoading = false,
   tables = []
}) => {
   const { showAsyncModal } = useModalAsync();

   // 1. Estado levantado para las mesas seleccionadas en el modal
   const [highlightedTableIds, setHighlightedTableIds] = useState([]);

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
   const handleCancelReserve = async (table) => {
      // No limpies aquí, deja que el modal controle el estado
      const res = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigCancelReserve
            table={table}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onCancelReservationTables={onCancelReservationTables}
            setHighlightedTableIds={setHighlightedTableIds}
         />
      ));
      if (res) {
         onCancelReserveTable(res?.data);
      }
      // Limpiar selección al cerrar modal
      setHighlightedTableIds([]);
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
               onCancelReserveTable={handleCancelReserve}
               onDeleteTable={handleDeleteTable}
               // 3. Pasar prop para resaltar
               highlighted={highlightedTableIds.includes(table.id)}
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

export const DialigCancelReserve = ({
   onCancelReservationTables,
   onConfirm,
   onCancel,
   table,
   setHighlightedTableIds = () => { },
}) => {
   const [localHighlightedId, setLocalHighlightedId] = useState([]);
   const contentTogglesRef = useRef(null);
   const isCheckedNoShowRef = useRef(false);

   const toggleSelected = (item) => {
      setLocalHighlightedId((prev) => {
         let updated;
         if (prev.includes(item.id)) {
            updated = prev.filter((id) => id !== item.id);
         } else {
            updated = [...prev, item.id];
         }
         setHighlightedTableIds(updated);
         return updated;
      });
   };

   const handleCheckNoShow = () => {
      isCheckedNoShowRef.current = !isCheckedNoShowRef.current;
   }

   const hasSelectes = () => {
      if (localHighlightedId.length === table.relatedTables.length) {
         onCancelReservationTables({
            idReservation: table.idReservation,
            idTables: localHighlightedId
         });
         return;
      }

      if (localHighlightedId.length > 0) {
         onConfirm({
            user: table.user,
            idTables: localHighlightedId,
            idReservation: table.idReservation,
            isNoShow: isCheckedNoShowRef.current,
         });
         return;
      }
      const element = contentTogglesRef.current;
      if (!element) return;
      element.classList.remove('animate__shakeX');
      void element.offsetWidth;
      element.classList.add('animate__shakeX');
   };

   const user = table.user;
   const isActiveCheck = localHighlightedId.length === table.relatedTables.length;

   return (
      <Card2 className={cn(
         'p-4 flex flex-col gap-4',
         'w-72'
      )}>
         <CardHeader className={'gap-2'}>
            <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
               <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <CardTitle className={'text-background text-center'}>
               Cancelar la reserva
            </CardTitle>
            <UserCard
               className='mx-auto'
               user={user}
            />
         </CardHeader>

         <CardContent
            ref={contentTogglesRef}
            className='flex flex-col gap-2 animate__animated'
         >
            {
               table.relatedTables && (
                  table.relatedTables.map((item) => (
                     <Toggle
                        key={item.id}
                        variant={'crystal'}
                        onClick={() => toggleSelected(item)}
                        className={localHighlightedId.includes(item.id) ? 'ring-2 ring-amber-400' : ''}
                     >
                        <Dice1 />
                        {item.name}
                     </Toggle>
                  ))
               )
            }
         </CardContent>

         <CardFooter className={'gap-4 justify-center  flex-wrap '}>
            <Label
               className={'space-x-2 text-background/70 basis-full'}
            >
               <Checkbox
                  disabled={!isActiveCheck}
                  onChange={handleCheckNoShow}
                  className='inline-block align-middle'
               />
               <span className='inline-block align-middle'>
                  Marcar como no-show
               </span>
            </Label>

            <Button
               onClick={hasSelectes}
               size={'sm'}
            >
               Confirmar
            </Button>
            <Button
               onClick={onCancel}
               size={'sm'}
               variant='destructive'
            >
               Eliminar
            </Button>
         </CardFooter>
      </Card2>
   )
}

export const UserCard = ({ user, className }) => {
   return (
      <div className={cn(
         'flex items-center space-x-3 text-card-primary',
         className
      )}>
         <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
         </div>
         <div>
            <p className="text-sm font-medium">Usuario</p>
            <p className="text-sm">
               {user.name}
            </p>
         </div>
      </div>
   )
}

const TableItemPopover = ({
   table,
   onDeleteTable,
   onOpenEditTable,
   onOpenReserveTable,
   onCancelReserveTable,
   highlighted = false
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
                     // 4. Resalta la mesa en el grid si está seleccionada
                     className={highlighted ? 'transition-shadow shadow-[0_0_30px_rgba(0,0,0,0.20)] rounded-2xl' : ''}
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
                     onClick={() => onDeleteTable(table)}
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
                     table.status === typeStatusTable.PENDING && (
                        <>
                           <Button
                              title='Cancelar'
                              onClick={() => onCancelReserveTable(table)}
                           >
                              <OctagonX />
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