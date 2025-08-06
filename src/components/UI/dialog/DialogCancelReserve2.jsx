import { AlertTriangle } from 'lucide-react'
import { Card2 } from '../card'
import { Button, CardContent, CardDescription, CardHeader, CardTitle } from '../common'
import { useState } from 'react'
import { Checkbox, Label } from '../from'

export const DialogCancelReserve2 = ({
   reservation,
   onConfirm
}) => {
   const [isCheck, setIsCheck] = useState(false)

   const handleConfirm = () => {
      onConfirm({
         noShow: isCheck
      })
   }

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
               <span className='font-semibold block text-center'>
                  {reservation?.code}
               </span>
            </p>

            <div className='flex items-center gap-4'>
               <Checkbox
                  name={'noShow'}
                  checked={isCheck}
                  onChange={({ value }) => setIsCheck(value)}
               />
               <Label>
                  Marcar como no presentado
               </Label>
            </div>

            <div className='flex flex-col-reverse sm:flex-row gap-2 pt-2'>
               <Button
                  variant='destructive'
                  onClick={handleConfirm}
                  className='flex-1'
               >
                  Confirmar
               </Button>
            </div>
         </CardContent>
      </Card2>

   )
}
