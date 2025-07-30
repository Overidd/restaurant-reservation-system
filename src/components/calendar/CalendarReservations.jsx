

import { useLoadDataCalendar } from '@/hook/dashboard'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { useCallback, useState } from 'react'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { ESModulesEvaluator } from 'vite/module-runner'
import { CreateReservationModal, EditReservationModal } from '.'

const locales = {
   es: ESModulesEvaluator,
}

export const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek,
   getDay,
   locales,
})

export const CalendarReservations = () => {
   const [selectedReservation, setSelectedReservation] = useState(null)
   const [isOpenCreateReserve, setisOpenCreateReserve] = useState(false)
   const [isOpenEditReserve, setisOpenEditReserve] = useState(false)

   const { isLoading, reservations } = useLoadDataCalendar()

   const eventStyleGetter = (event) => {
      let backgroundColor = '#3174ad'

      switch (event.status) {
         case 'confirmed':
            backgroundColor = '#3B82F6'
            break
         case 'pending':
            backgroundColor = '#eca668'
            break
      }

      return {
         style: {
            backgroundColor,
            color: 'white',
            borderRadius: '4px',
            border: 'none',
         },
      }
   }

   const handleSelectEvent = useCallback((event) => {
      setisOpenEditReserve(true)
      setisOpenCreateReserve(false)
      setSelectedReservation(event)
   }, [])

   const handleSelectSlot = useCallback(({ start, end }) => {
      setisOpenCreateReserve(true)
      setisOpenEditReserve(false)
      setSelectedReservation({
         start: start,
         end: end,
      })
   }, [])

   const style = {
      height: '90dvh',
   }

   return (
      <div className='min-h-screen md:mt-6 mt-4 mx-auto max-w-7xl space-y-6'>
         {/* <h2 className='text-xl font-semibold mb-4'>Calendario de Reservas</h2> */}
         <Calendar
            localizer={localizer}
            events={reservations}
            startAccessor='start'
            endAccessor='end'
            style={style}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            views={['month', 'week', 'day']}
            defaultView={Views.WEEK}
            step={30}
            timeslots={2}
            messages={{
               next: 'Siguiente',
               previous: 'Anterior',
               today: 'Hoy',
               month: 'Mes',
               week: 'Semana',
               day: 'Día',
               agenda: 'Agenda',
               date: 'Fecha',
               time: 'Hora',
               event: 'Evento',
               noEventsInRange: 'No hay reservas en este rango',
               showMore: (total) => `+ Ver más (${total})`,
            }}

         />

         {
            isOpenCreateReserve &&
            <CreateReservationModal
               className={'w-xl'}
               isOpen={isOpenCreateReserve}
               onClose={() => setisOpenCreateReserve(false)}
               date={selectedReservation?.start}
            />
         }
         {
            isOpenEditReserve &&
            <EditReservationModal
               className={'w-xl'}
               isOpen={isOpenEditReserve}
               onClose={() => setisOpenEditReserve(false)}
               reservation={selectedReservation}
            />
         }
      </div>
   )
}
