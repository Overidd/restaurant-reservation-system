import { CalendarPlus, PackagePlus, Pen, Printer, Save, Trash2 } from 'lucide-react';
import { SpeedDial } from '../UI/common/SpeedDial';
import { useEditTables } from '@/hook/dashboard';

export const ActionSpeedDial = () => {
   const { toggleIsEdit } = useEditTables();

   const formActions = [
      {
         icon: Pen,
         label: 'Editar mesas',
         onClick: () => toggleIsEdit()
      },
      {
         icon: PackagePlus,
         label: 'Agregar mesas',
         onClick: () => alert('Print Form')
      },
      {
         icon: CalendarPlus,
         label: 'Reservar mesas',
         onClick: () => alert('Print Form')
      },
   ]

   return (
      <div
         className='fixed bottom-4 right-4'
      >
         <SpeedDial
            actions={formActions}
            triggerOn='hover'
            direction='up'
         />

      </div>
   )
}
