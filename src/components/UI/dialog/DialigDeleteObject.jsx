import { Card2 } from '../card';
import { Button, CardTitle } from '../common';

export const DialigDeleteObject = ({
   onConfirm,
   object,
}) => {

   return (
      <Card2 className='flex flex-col gap-4 justify-center items-center'>
         <CardTitle>
            ¿Estas seguro de eliminar el objeto? <br />
            <span className='text-center block'>{object.name}</span>
         </CardTitle>
         <div className='flex gap-2 justify-end'>
            <Button
               variant='destructive'
               className={'w-full'}
               onClick={onConfirm}
               size={'sm'}
            >
               Eliminar
            </Button>
         </div>
      </Card2>
   )
}