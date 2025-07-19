import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipTrigger } from '@/components/UI/common';
import { Object } from '@/components/UI/resource';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export const ObjectEditItem = ({
   object,
   onDelete,
   // onOpenEdit,
   isCursorPreview,
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
         {/* <Tooltip>
            <TooltipTrigger asChild>
               <Button onClick={() => onOpenEdit(object)}>
                  <Pencil />
               </Button>
            </TooltipTrigger>
            <TooltipContent
               side='right'
               className='text-inherit rounded'
            >
               Editar
            </TooltipContent>
         </Tooltip> */}

         <Tooltip>
            <TooltipTrigger asChild>
               <Button onClick={() => onDelete(object)} variant='destructive'>
                  <Trash />
               </Button>
            </TooltipTrigger>
            <TooltipContent
               side='right'
               className='text-inherit rounded'
            >
               Eliminar
            </TooltipContent>
         </Tooltip>
      </>
   );

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Object
               object={object}
               highlighted={highlighted}
               isCursorPreview={isCursorPreview}
               onClick={handleClick}
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
   )
}

