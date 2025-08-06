import { AlertTriangle } from 'lucide-react';
import { Button, CardContent, CardDescription, CardHeader, CardTitle } from '.';
import { Card2 } from '../card';

export const AlertCancelReservation = ({ code, onConfirm }) => {

   return (
      <Card2 className='w-full max-w-md mx-auto shadow-lg'>
         <CardHeader className='pb-4 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10'>
               <AlertTriangle className='h-5 w-5 text-destructive' />
            </div>
            <div>
               <CardTitle className='text-lg'>
                  Cancelar Reserva
               </CardTitle>
               <CardDescription>
                  Esta acción no se puede deshacer
               </CardDescription>
            </div>
         </CardHeader>

         <CardContent className='space-y-4'>
            <p className='text-sm text-accent-foreground/90'>
               ¿Estás seguro de que deseas cancelar la reserva?
               <br />
               <span className='font-semibold block text-center'>{code}</span>
            </p>

            <div className='flex flex-col-reverse sm:flex-row gap-2 pt-2'>
               <Button
                  variant='destructive'
                  onClick={onConfirm}
                  className='flex-1'
               >
                  Confirmar
               </Button>
            </div>
         </CardContent>
      </Card2>
   )
}
