import { CalendarPlus, PackagePlus, Pen, Printer, Save, Trash2 } from 'lucide-react';
import { SpeedDial } from '../UI/common/SpeedDial';

export const ActionSpeedDial = () => {
   const formActions = [
      {
         icon: Pen,
         label: 'Editar mesas',
         onClick: () => alert('Save as Draft')
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
