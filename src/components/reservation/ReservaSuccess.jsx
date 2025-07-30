import toast from 'react-hot-toast'

import { Calendar, Check, Clock, Copy, X } from 'lucide-react'

import { useState } from 'react'
import { Button } from '../UI/common'

export const ReservaSuccess = ({ t, code, hour, dateStr }) => {
   const [copied, setCopied] = useState(false)


   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(code)
         setCopied(true)
         toast.success('Código copiado al portapapeles', {
            duration: 2000,
            position: 'bottom-center',
         })

         // Reset copied state after 2 seconds
         setTimeout(() => setCopied(false), 2000)
      } catch (err) {
         toast.error('Error al copiar el código')
      }
   }

   return (
      <div className='flex items-start justify-between gap-4 p-2'>
         <div className='space-y-2'>
            <p className='font-semibold text-lg'>¡Reserva confirmada! 🎉</p>
            <p className='space-x-2'>
               <Calendar className='align-middle inline-block' />
               <span className='font-semibold align-middle'>
                  {dateStr}
               </span>
            </p>
            <p className='space-x-2'>
               <Clock className='align-middle inline-block' />
               <span className='font-semibold align-middle'>
                  {hour}
               </span>
            </p>
            <div className='px-4 py-3 border-2 border-dashed rounded-lg flex items-center justify-between gap-2 w-full'>
               <p className='font-bold text-md mt-1'>{code}</p>
               <Button
                  onClick={copyToClipboard}
                  disabled={copied}
                  variant={'outline'}
               >
                  {copied ? (
                     <>
                        <Check size={14} />
                     </>
                  ) : (
                     <>
                        <Copy size={14} />
                     </>
                  )}
               </Button>

            </div>
         </div>
         <Button onClick={() => toast.dismiss(t.id)} >
            <X size={18} />
         </Button>
      </div>
   )
}
