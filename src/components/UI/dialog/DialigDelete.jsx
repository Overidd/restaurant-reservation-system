import { cn } from '@/ultils';
import { Card2 } from '../card';
import { Button, CardFooter, CardHeader, CardTitle } from '../common';

export const DialigDelete = ({
   onCancel,
   onConfirm,
   label,
}) => {

   return (
      <Card2 className={cn(
         'space-y-4'
      )}>
         <CardHeader className={'gap-3'}>
            <CardTitle className={'text-background text-center'}>
               {label}
            </CardTitle>
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