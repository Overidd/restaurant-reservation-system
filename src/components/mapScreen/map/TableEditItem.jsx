import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipTrigger } from '../../UI/common';
import { TableItem } from '../../UI/table';


export const TableEditItem = ({
   table,
   onDeleteTable,
   onOpenEditTable,
   highlighted = false
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

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <TableItem
               tabIndex={0}
               role='button'
               onClick={handleClick}
               color={table?.status}
               name={table?.name}
               user={table?.user}
               size={table?.size}
               chairs={table?.chairs}
               width={table?.width} // 2, 3
               height={table?.height}
               positionY={table?.positionY}
               positionX={table?.positionX}
               rotation={table?.rotation}
               isHighlighted={highlighted}
            />
         </PopoverTrigger>

         <PopoverContent
            align='center'
            side='right'
            sideOffset={-10}
            onInteractOutside={handleClose}
            onClick={handleClose}
            className='flex flex-col gap-4 w-fit p-4 rounded-2xl shadow-xl'
         >
            {renderContent()}
         </PopoverContent>
      </Popover >
   );
}