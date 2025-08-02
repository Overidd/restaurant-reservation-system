import { useEditTables } from '@/hook/dashboard';
import { useModalReservationsCreate } from '@/hook/modals';
import { CalendarPlus, Pen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SpeedDial } from '../UI/common/SpeedDial';

export const ActionSpeedDial = () => {
   const [isMobil, setIsMobil] = useState(false)
   const { openModal: openReservations } = useModalReservationsCreate();
   const { toggleIsEdit } = useEditTables();
   const location = useLocation();

   useEffect(() => {
      if (window.innerWidth < 768) {
         setIsMobil(true)
      }
   }, [])


   const formActions = [
      {
         id: 'edit',
         icon: Pen,
         label: 'Editar mesas',
         disabled: location.pathname !== '/dashboard/tables' || isMobil,
         onClick: () => toggleIsEdit(true)
      },
      {
         id: 'reserve',
         icon: CalendarPlus,
         label: 'Reservar mesas',
         disabled: false,
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
