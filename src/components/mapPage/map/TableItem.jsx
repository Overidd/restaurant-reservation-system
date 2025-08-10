import { DateDiff, typeStatusTable } from '@/ultils';
import { CalendarPlus, CheckCircle, Lock, LockOpen, OctagonX, Unlink2 } from 'lucide-react';
import { useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipTrigger } from '../../UI/common';
import { Table } from '../../UI/table';


export const TableItem = ({
   table,
   onCancelReserve,
   onConfirmReservation,
   onReleasedReservation,
   onOpenReserveTable,
   onBlockTempTable,
   onUnblockTempTable,
   highlighted = false,
}) => {
   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const renderContent = () => {
      switch (table.status) {
         case typeStatusTable.PENDING:
            return (
               <>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button variant={'destructive'} onClick={() => onCancelReserve(table)}>
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
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button onClick={() => onBlockTempTable(table)}>
                           <LockOpen />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent
                        side="right"
                        className="text-inherit rounded"
                     >
                        Bloqueo temporal
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
                     Completar reserva
                  </TooltipContent>
               </Tooltip>
            );

         case typeStatusTable.BLOCKED:
            return (
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button onClick={() => onUnblockTempTable(table)}>
                        <Lock />
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
                  <Table
                     tabIndex={0}
                     role='button'
                     onClick={handleClick}
                     color={table?.status}
                     size={table?.size}
                     chairs={table?.chairs}
                     isBlockedTemp={
                        !table?.isBlocked &&
                        table?.status === typeStatusTable.BLOCKED
                     }
                     // width={table?.width} // 2, 3
                     // height={table?.height}
                     // positionY={table?.positionY}
                     // positionX={table?.positionX}
                     name={table?.name}
                     user={table?.user}
                     rotation={table?.rotation}
                     isHighlighted={highlighted}
                  />
               </TooltipTrigger>
            </PopoverTrigger>
            {!open && (
               <TooltipContent
                  className={'z-10'}
               >
                  <InfoTableTooltip
                     isBlocked={table.isBlocked}
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
            // sideOffset={-10}
            onInteractOutside={handleClose}
            onClick={handleClose}
            className='flex flex-col gap-4 w-fit p-4 rounded-2xl shadow-xl'
         >
            {renderContent()}
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
   hasReservar,
   isBlocked = false
}) => {
   if (!isBlocked && status === typeStatusTable.BLOCKED) {
      return (
         <div className='text-xs text-muted-foreground text-center px-2 py-1'>
            Bloqueada temporal
         </div>
      );
   }

   if (isBlocked) return (
      <div className='text-xs text-muted-foreground text-center px-2 py-1'>
         Bloqueada permanentemente
      </div>
   );

   if (!hasReservar) return (
      <div className='text-xs text-muted-foreground text-center px-2 py-1'>
         Disponible
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
            <strong>Nombre:</strong> {name || <span className='text-card-foreground'>Sin nombre</span>}
         </span>
         <span className='text-xs text-card-foreground'>
            <strong>Correo:</strong> {email || <span className='text-card-foreground'>Sin email</span>}
         </span>
         <span className='text-xs tracking-wider text-card-foreground'>
            <strong>Codigo:</strong> {code || <span className='text-card-foreground'>Sin código</span>}
         </span>
      </p>
   )
}