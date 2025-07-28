import { Table } from '@/components/UI/table';
import { typeStatusTable } from '@/ultils';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipTrigger } from '../../UI/common';


export const TableEditItem = ({
   table,
   onDelete,
   onOpenEdit,
   highlighted = false,
   hasConflict = false,
   isCursorPreview = false
}) => {

   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const renderContent = () => (
      <>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button onClick={() => onOpenEdit(table)}>
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
               <Button onClick={() => onDelete(table)} variant="destructive">
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

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Table
               hasConflict={hasConflict}
               onClick={handleClick}
               color={table?.status}
               name={table?.name}
               user={table?.user}
               size={table?.size}
               chairs={table?.chairs}
               rotation={table?.rotation}
               isHighlighted={highlighted}
               isCursorPreview={isCursorPreview}
               isBlockedTemp={
                  !table?.isBlocked &&
                  table?.status === typeStatusTable.BLOCKED
               }
            />
         </PopoverTrigger>

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
      </Popover >
   );
}
