import toast from 'react-hot-toast'
import { Button } from '../UI/common'
import { X } from 'lucide-react'

export const ReservaSuccess = ({ t, code }) => {
   return (
      <div className='flex items-start justify-between gap-4 p-2'>
         <div>
            <p className='font-semibold text-lg'>¡Reserva confirmada! 🎉</p>
            <p className='text-sm mt-1'>Tu código de reserva es:</p>
            <p className='font-bold text-md mt-1'>{code}</p>
         </div>
         <Button onClick={() => toast.dismiss(t.id)} >
            <X size={18} />
         </Button>
      </div>
   )
}
