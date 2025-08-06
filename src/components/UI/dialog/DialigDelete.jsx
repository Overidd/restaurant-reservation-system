import { cn } from '@/ultils';
import { Card2 } from '../card';
import { Button, CardFooter, CardHeader, CardTitle } from '../common';

export const DialigDelete = ({
   onConfirm,
   label,
}) => {

   return (
      <Card2 className={cn(
         'space-y-4',
      )}>
         <CardHeader className={'gap-3'}>
            <CardTitle className={'text-background text-center'}>
               {label}
            </CardTitle>
         </CardHeader>

         <CardFooter className={'gap-4 justify-center  flex-wrap '}>
            <Button
               className={'w-full'}
               onClick={onConfirm}
               size={'sm'}
            >
               Confirmar
            </Button>
         </CardFooter>
      </Card2>
   )
}