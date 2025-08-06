import { typeStatusTable } from '@/ultils';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '../UI/common';
import { CheckCircle, OctagonX, Pen, Unlink2 } from 'lucide-react';


export const StateReservationButtons = ({
   isLoading,
   reservation,
   onConfirmReservation,
   onCancelReservation,
   onReleasedReservation,
   onEditReservetion,
   showButtons = ['cancel', 'confirm', 'edit', 'release'],
}) => {
   switch (reservation.status) {
      case typeStatusTable.PENDING:
         return (
            <>
               {showButtons.includes('cancel') && (
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           type='button'
                           onClick={() => onCancelReservation(reservation)}
                           disabled={isLoading}
                           variant={'destructive'}
                        >
                           <OctagonX />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side='right' className='text-inherit rounded'>
                        Cancelar la reserva
                     </TooltipContent>
                  </Tooltip>
               )}
               {showButtons.includes('confirm') && (
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           type='button'
                           onClick={() => onConfirmReservation(reservation)}
                           disabled={isLoading}
                        >
                           <CheckCircle />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side='right' className='text-inherit rounded'>
                        Confirmar la reserva
                     </TooltipContent>
                  </Tooltip>
               )}
               {showButtons.includes('edit') && (
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           type='button'
                           onClick={() => onEditReservetion(reservation)}
                           disabled={isLoading}
                        >
                           <Pen />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side='right' className='text-inherit rounded'>
                        Editar
                     </TooltipContent>
                  </Tooltip>
               )}
            </>
         );

      case typeStatusTable.CONFIRMED:
         return (
            showButtons.includes('release') && (
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        type='button'
                        onClick={() => onReleasedReservation(reservation)}
                        disabled={isLoading}
                     >
                        <Unlink2 />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent side='right' className='text-inherit rounded'>
                     Completar reserva
                  </TooltipContent>
               </Tooltip>
            )
         );

      default:
         return null;
   }
}
