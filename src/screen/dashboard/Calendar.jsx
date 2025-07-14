
// config
import { format, getDay, parse, startOfWeek } from 'date-fns'
import esES from 'date-fns/locale/es'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
   es: esES,
}

export const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek,
   getDay,
   locales,
})


export const CalendarScreen = () => {
   return (
      <div>
         <CalendarReservations />
      </div>
   )
}



const events = [
   {
      id: 1,
      title: 'Reserva de mesa 5',
      start: new Date(2025, 6, 11, 19, 0), // 11 de julio 2025 7:00 PM
      end: new Date(2025, 6, 11, 21, 0),
      resource: 'Mesa 5',
   },
   {
      id: 2,
      title: 'Mesa 2 - Aniversario',
      start: new Date(2025, 6, 12, 18, 0),
      end: new Date(2025, 6, 12, 20, 0),
      resource: 'Mesa 2',
   },
]

export default function CalendarReservations() {
   return (
      <div className="p-4">
         <h2 className="text-xl font-semibold mb-4">Calendario de Reservas</h2>
         <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.WEEK}
            views={['month', 'week', 'day', 'agenda']}
            style={{ height: 600 }}
            messages={{
               today: 'Hoy',
               previous: 'Anterior',
               next: 'Siguiente',
               month: 'Mes',
               week: 'Semana',
               day: 'Día',
               agenda: 'Agenda',
               date: 'Fecha',
               time: 'Hora',
               event: 'Reserva',
               noEventsInRange: 'No hay reservas en este rango',
            }}
         />
      </div>
   )
}