import { useEditTables } from '@/hook/dashboard';
import { useModalReservationsCreate } from '@/hook/modals';
import { CalendarPlus, PackagePlus, Pen } from 'lucide-react';
import { SpeedDial } from '../UI/common/SpeedDial';

export const ActionSpeedDial = () => {
   const { openModal: openReservations } = useModalReservationsCreate();
   const { toggleIsEdit } = useEditTables();

   const formActions = [
      {
         icon: Pen,
         label: 'Editar mesas',
         onClick: () => toggleIsEdit(true)
      },
      {
         icon: PackagePlus,
         label: 'Agregar mesas',
         onClick: () => alert('Print Form')
      },
      {
         icon: CalendarPlus,
         label: 'Reservar mesas',
         onClick: () => openReservations()
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
