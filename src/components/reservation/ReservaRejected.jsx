import toast from 'react-hot-toast';

import { X } from 'lucide-react';

import { Button } from '../UI/common';

export const ReservaRejected = ({ t, message }) => {
   return (
      <div className='flex items-start justify-between gap-4 p-2'>
         <div>
            <p className='font-semibold text-lg flex items-center gap-1'>
               <X size={18} className='text-red-500' />
               Error en la reserva
            </p>
            <p className='text-sm mt-1'>{message}</p>
         </div>
         <Button onClick={() => toast.dismiss(t.id)} >
            <X size={18} />
         </Button>
      </div>
   )
}