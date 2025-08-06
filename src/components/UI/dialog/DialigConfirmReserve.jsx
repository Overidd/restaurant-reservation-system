import { cn } from '@/ultils'
import { AlertTriangle } from 'lucide-react'
import { Card2 } from '../card'
import { Button, CardFooter, CardHeader, CardTitle } from '../common'

export const DialigConfirmReserve = ({
   onCancel,
   onConfirm,
   table,
}) => {

   return (
      <Card2 className={cn(
         'space-y-4'
      )}>
         <CardHeader className={'gap-3'}>
            <div className='mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center'>
               <AlertTriangle className='w-6 h-6 text-amber-600' />
            </div>
            <CardTitle className={'text-background text-center'}>
               Confirmar la reserva
            </CardTitle>
            <strong className={'text-background/80 text-center'}>
               {table.reservation.code}
            </strong>
         </CardHeader>

         <CardFooter className={'gap-4 justify-center  flex-wrap '}>
            <Button
               onClick={onConfirm}
               size={'sm'}
            >
               Confirmar
            </Button>
         </CardFooter>
      </Card2>
   )
}

