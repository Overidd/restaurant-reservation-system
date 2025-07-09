import { useModalAsync } from '@/hook';
import { DateDiff, typeStatusTable } from '@/ultils';
import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Card2, CardLoadding } from '../UI/card';
import { TableItem } from '../UI/table';

import {
   Button,
   CardContent,
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

import { useEditTables } from '@/hook/dashboard';
import { adminTableToasts } from '@/toasts';
import {
   AlertTriangle,
   CalendarPlus,
   CheckCircle,
   Dice1,
   Lock,
   LockOpen,
   OctagonX,
   Pencil,
   Plus,
   Trash,
   Unlink2
} from 'lucide-react';
import { Checkbox, Label } from '../UI/from';

export const TableList = ({
   rows,
   columns,
   className,
   onChangeTable,
   onDeleteTable,
   onCancelFullReservation,
   onCancelATablesReservation,
   onOpenEditTable,
   onConfirmReservation,
   onReleasedReservation,
   onOpenReserveTable,
   currentSelectedTable,
   isLoading = false,
   tables = []
}) => {
   const { showAsyncModal } = useModalAsync();
   const { isEdit } = useEditTables();

   // 1. Estado levantado para las mesas seleccionadas en el modal
   const [highlightedTableIds, setHighlightedTableIds] = useState([]);
   const [selectTable, setSelectTable] = useState(null);

   if (!Array.isArray(tables)) return null;

   const handleSelectTable = (idTable) => {
      setSelectTable(idTable);
   }

   const handleDeleteTable = async (table) => {
      handleSelectTable(table.id);
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
      handleSelectTable(null);
   }

   const handleCancelReserve = async (table) => {
      const res = await showAsyncModal(({ onConfirm, onCancel }) => (
         <DialigCancelReserve
            table={table}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onCancelATablesReservation={onCancelATablesReservation}
            setHighlightedTableIds={setHighlightedTableIds}
         />
      ));

      if (res) {
         adminTableToasts.cancelFullReservation(
            onCancelFullReservation(res?.data)
         )
      }

      setHighlightedTableIds([]);
      handleSelectTable(null);
   }

   const handleConfirmReservation = async (table) => {
      adminTableToasts.confirmReserve(
         onConfirmReservation({
            idTable: table.id,
            idReservation: table.reservation.idReservation
         })
      );
   }

   const handleReleaseReservation = async (table) => {
      adminTableToasts.releaseReserve(
         onReleasedReservation({
            idTable: table.id,
            idReservation: table.reservation.idReservation
         })
      );
   }

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
            <TableItemPopover
               key={'table-' + table.id}
               table={table}
               onOpenEditTable={onOpenEditTable}
               onChangeTable={onChangeTable}
               onCancelReserve={handleCancelReserve}
               onDeleteTable={handleDeleteTable}
               onConfirmReservation={handleConfirmReservation}
               onReleasedReservation={handleReleaseReservation}
               onOpenReserveTable={onOpenReserveTable}
               highlighted={
                  highlightedTableIds.includes(table.id) ||
                  selectTable === table.id ||
                  currentSelectedTable?.id === table?.id
               }
            />
         );
      });
   };

   const paintedEditTables = () => {
      return Array.from({ length: rows * columns }).map((_, index) => {
         const x = Math.floor(index / columns) + 1;
         const y = (index % columns) + 1;
         const table = tables.find(
            (table) => table.positionX == x && table.positionY == y
         );

         if (!table) return (
            <div
               className='w-fit mx-auto'
               key={'empty-node' + index}
            >
               <Button>
                  <Plus />
               </Button>
            </div>
         );

         return (
            <TableItem
               role='button'
               key={'table-' + table.id}
               onClick={() => console.log('table')}
               color={table?.status}
               size={table?.size}
               chairs={table?.chairs}
               name={table?.name}
               rotation={table?.rotation}
            />
         )
      });
   }

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
               {
                  isEdit
                     ? paintedEditTables()
                     : paintedTables()
               }
            </div>


            {/* Top */}
            <div className='absolute left-0 top-0 h-2 w-full grid grid-cols-[40%_50%] justify-between'>
               <div className={`w-full h-full rounded-br-lg ${colorBorder}`} />
               <div className={`w-full h-full rounded-bl-lg ${colorBorder}`} />
            </div>

            {/* Left */}
            <div className={`absolute top-0 bottom-0 left-0 w-2 h-full ${colorBorder}`} />


            {/* Right */}
            <div className='absolute right-0 top-0 bottom-0 w-2 h-full grid grid-rows-2'>
               <div className={`w-full h-[50%] rounded-bl-md ${colorBorder}`} />
               <div className={`w-full h-full rounded-tl-md ${colorBorder}`} />
            </div>

            {/* Bottom */}
            <div className='absolute left-0 bottom-0 h-2 w-full grid grid-cols-[50%_40%] justify-between'>
               <div className={`w-full h-full rounded-tr-lg ${colorBorder}`} />
               <div className={`w-full h-full rounded-tl-lg ${colorBorder}`} />
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
   onCancelATablesReservation,
   onConfirm,
   onCancel,
   table,
   setHighlightedTableIds = () => { },
}) => {
   console.log(table.reservation?.relatedTables);
   const [relatedTables, setRelatedTables] = useState(table.reservation?.relatedTables ?? []);
   const [localHighlightedId, setLocalHighlightedId] = useState([]);
   const [isProcessing, setIsProcessing] = useState(false);
   const contentTogglesRef = useRef(null);
   const isCheckedNoShowRef = useRef(false);

   const toggleSelected = (item) => {
      if (isProcessing) return;
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
      if (isProcessing) return;
      isCheckedNoShowRef.current = !isCheckedNoShowRef.current;
   }
   const handleSetRelatedTables = () => {
      setRelatedTables((prev) => prev.filter(t => !localHighlightedId.includes(t.id)));
   }

   const hasSelectes = () => {
      if (localHighlightedId.length === table.reservation.relatedTables.length) {
         onConfirm({
            user: table.user,
            idTables: localHighlightedId,
            idReservation: table.reservation.idReservation,
            isNoShow: isCheckedNoShowRef.current,
         });
         return;
      }

      if (localHighlightedId.length > 0) {
         setIsProcessing(true);
         adminTableToasts.cancelATablesReservation(
            onCancelATablesReservation({
               idReservation: table.reservation.idReservation,
               idTables: localHighlightedId,
               idTablesNoSelect: table.reservation.relatedTables.map(t => t.id).filter(id => !localHighlightedId.includes(id))
            }),
            {
               onSuccess: () => {
                  handleSetRelatedTables();
                  setIsProcessing(false);
               },
               onError: () => {
                  setIsProcessing(false);
               }
            }
         )

         setHighlightedTableIds((prev) => prev.filter(id => !localHighlightedId.includes(id)));
         return;
      }

      const element = contentTogglesRef.current;
      if (!element) return;
      element.classList.remove('animate__shakeX');
      void element.offsetWidth;
      element.classList.add('animate__shakeX');
   };

   const user = table.user;
   const isActiveCheck = localHighlightedId.length === relatedTables.length;

   return (
      <Card2 className={cn(
         'p-4 flex flex-col gap-4',
         'w-72'
      )}>
         <CardHeader className={'gap-2'}>
            <div className='mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center'>
               <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <CardTitle className={'text-background text-center'}>
               Cancelar la reserva
            </CardTitle>
            <strong className={'text-background/80 text-center'}>
               {user.code}
            </strong>
         </CardHeader>

         <CardContent
            ref={contentTogglesRef}
            className='flex flex-col gap-2 animate__animated'
         >
            {
               relatedTables.map((item) => (
                  <Toggle
                     key={item.id}
                     variant={'crystal'}
                     onClick={() => toggleSelected(item)}
                     className={localHighlightedId.includes(item.id) ? 'ring-2 ring-amber-400' : ''}
                     disabled={isProcessing}
                  >
                     <Dice1 />
                     {item.name}
                  </Toggle>
               ))
            }
         </CardContent>

         <CardFooter className={'gap-4 justify-center  flex-wrap '}>
            <Label
               className={'space-x-2 text-background/70 basis-full'}
            >
               <Checkbox
                  disabled={!isActiveCheck || isProcessing}
                  onChange={handleCheckNoShow}
                  className='inline-block align-middle'
               />
               <span className='inline-block align-middle'>
                  Marcar como no-show
               </span>
            </Label>

            <Button
               onClick={hasSelectes}
               disabled={isProcessing}
               size={'sm'}
            >
               Confirmar
            </Button>
            <Button
               onClick={onCancel}
               size={'sm'}
               variant='destructive'
               disabled={isProcessing}
            >
               Eliminar
            </Button>
         </CardFooter>
      </Card2>
   )
}

export const DialigConfirmReserve = ({
   onCancel,
   onConfirm,
   table,
}) => {

   return (
      <Card2 className={cn(
         'space-y-4'
      )}>
         <CardHeader className={'gap-3'}>
            <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
               <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <CardTitle className={'text-background text-center'}>
               Confirmar la reserva
            </CardTitle>
            <strong className={'text-background/80 text-center'}>
               {table.reservation.code}
            </strong>
         </CardHeader>

         <CardFooter className={'gap-4 justify-center  flex-wrap '}>
            <Button
               onClick={onConfirm}
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

export const TableItemPopover = ({
   table,
   onDeleteTable,
   onOpenEditTable,
   onCancelReserve,
   onConfirmReservation,
   onReleasedReservation,
   onOpenReserveTable,
   highlighted = false,
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

   const renderRightContent = () => (
      <>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button onClick={() => onOpenEditTable(table)}>
                  <Pencil />
               </Button>
            </TooltipTrigger>
            <TooltipContent
               side="right"
               className="text-inherit rounded"
            >
               Editar
            </TooltipContent>
         </Tooltip>

         <Tooltip>
            <TooltipTrigger asChild>
               <Button onClick={() => onDeleteTable(table)} variant="destructive">
                  <Trash />
               </Button>
            </TooltipTrigger>
            <TooltipContent
               side="right"
               className="text-inherit rounded"
            >
               Eliminar
            </TooltipContent>
         </Tooltip>
      </>
   );

   const renderLeftContent = () => {
      switch (table.status) {
         case typeStatusTable.PENDING:
            return (
               <>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button onClick={() => onCancelReserve(table)}>
                           <OctagonX />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent
                        side="right"
                        className="text-inherit rounded"
                     >
                        Cancelar la reserva
                     </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button onClick={() => onConfirmReservation(table)}>
                           <CheckCircle />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent
                        side="right"
                        className="text-inherit rounded"
                     >
                        Confirmar la reserva
                     </TooltipContent>
                  </Tooltip>
               </>
            );

         case typeStatusTable.AVAILABLE:
            return (
               <>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button>
                           <Lock />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent
                        side="right"
                        className="text-inherit rounded"
                     >
                        Bloquear
                     </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           onClick={() => onOpenReserveTable(table)}
                        >
                           <CalendarPlus />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent
                        side="right"
                        className="text-inherit rounded"
                     >
                        Reservar
                     </TooltipContent>
                  </Tooltip>
               </>
            );

         case typeStatusTable.CONFIRMED:
            return (
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button onClick={() => onReleasedReservation(table)}>
                        <Unlink2 />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent
                     side="right"
                     className="text-inherit rounded"
                  >
                     Liberar reserva
                  </TooltipContent>
               </Tooltip>
            );

         case typeStatusTable.BLOCKED:
            return (
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button>
                        <LockOpen />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent
                     side="right"
                     className="text-inherit rounded"
                  >
                     Desbloquear
                  </TooltipContent>
               </Tooltip>
            );

         default:
            return null;
      }
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
                     className={highlighted ? 'transition-shadow shadow-[0_0_30px_rgba(0,0,0,0.20)] rounded-2xl' : ''}
                  />
               </TooltipTrigger>
            </PopoverTrigger>
            {!open && (
               <TooltipContent
                  className={'z-10'}
               >
                  <InfoTableTooltip
                     hasReservar={table.hasReservar}
                     timestamp={table.reservation?.timestamp}
                     code={table.reservation?.code}
                     status={table.status}
                     {...table.user}
                  />
               </TooltipContent>
            )}
         </Tooltip>

         <PopoverContent
            align='center'
            side='right'
            sideOffset={-10}
            onInteractOutside={handleClose}
            onClick={handleClose}
            className='flex flex-col gap-4 w-fit p-4 rounded-2xl shadow-xl'
         >
            {
               popoverType === 'right' ?
                  renderRightContent() :
                  renderLeftContent()
            }
         </PopoverContent>
      </Popover>
   );
};


const InfoTableTooltip = ({
   status,
   name,
   email,
   code,
   timestamp,
   hasReservar
}) => {

   if (!hasReservar) return (
      <div className='text-xs text-muted-foreground text-center px-2 py-1'>
         Mesa disponible
      </div>
   );

   if (status === typeStatusTable.PENDING) {
      const currentTime = DateDiff.inMinutes(new Date(), new Date(timestamp));
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

            <InfoUser
               name={name}
               email={email}
               code={code}
            />
         </>
      )
   };

   if (status === typeStatusTable.CONFIRMED) {
      return (
         <>
            <div className='flex items-center gap-2'>
               <span className='text-xs font-semibold text-card-foreground'>
                  Reserva confirmada
               </span>
               <span className='bg-table-confirmed/20 text-table-confirmed text-[10px] px-2 py-0.5 rounded-full ml-2'>
                  Confirmado
               </span>
            </div>

            <InfoUser
               name={name}
               email={email}
               code={code}
            />
         </>
      );
   }
};

const InfoUser = ({ name, email, code }) => {
   return (
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
   )
}