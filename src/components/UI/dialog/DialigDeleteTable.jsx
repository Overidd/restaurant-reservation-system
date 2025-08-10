import { Card2 } from '../card';
import { Button, CardTitle } from '../common';

export const DialigDeleteTable = ({
   onConfirm,
   onCancel,
   table,
}) => {

   return (
      <Card2 className='flex flex-col gap-4 justify-center items-center'>
         <CardTitle>
            ¿Estás seguro de eliminar la mesa? <br />
            <span className='block text-center'>{table.name}</span>
         </CardTitle>
         <div className='flex gap-2 justify-end'>
            <Button
               className={'w-full'}
               variant='destructive'
               onClick={onConfirm}
               size={'sm'}
            >
               Eliminar
            </Button>
         </div>
      </Card2>
   )
}