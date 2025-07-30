import { CalendarReservations } from '@/components/calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';



export const CalendarScreen = () => {
   return (
      <div className='w-[90%] mx-auto max-h-dvh overflow-hidden'>
         <CalendarReservations />
      </div>
   )
}

export default CalendarScreen;