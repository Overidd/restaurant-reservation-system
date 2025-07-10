import { Button } from '.';
import { Card2 } from '../card';

export const AlertCancelReservation = ({ code, onCancel, onConfirm }) => {

   return (
      <Card2 className='flex flex-col gap-4 p-4 justify-center items-center text-card-foreground'>
         <h2 className='text-sm text-card-primary'>¿Estás seguro de cancelar la reserva {code}?</h2>
         <div className='flex gap-2 justify-end'>
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
               Cencelar
            </Button>
         </div>
      </Card2>
   )
}
