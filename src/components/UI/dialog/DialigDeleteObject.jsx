import { Card2 } from '../card';
import { Button } from '../common';

export const DialigDeleteObject = ({
   onConfirm,
   onCancel,
   object,
}) => {

   return (
      <Card2 className='flex flex-col gap-4 p-4 justify-center items-center text-card-foreground'>
         <h2 className='text-sm text-card-primary'>¿Estas seguro de eliminar el objeto {object.name}?</h2>
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