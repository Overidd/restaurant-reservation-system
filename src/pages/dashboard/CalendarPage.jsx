
import { CreateReservationModal, EditStateReserveModal } from '@/components/calendarPage';
import { EditReservationModal } from '@/components/common';
import { CardLoadding } from '@/components/UI/card';
import { ModalAsyncProvider } from '@/doman/context/dialogAsync';
import { useLoadDataCalendar } from '@/hook/dashboard';
import { typeStatusTable } from '@/ultils';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { useCallback, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ESModulesEvaluator } from 'vite/module-runner';

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

export const CalendarScreen = () => {
   const [isOpenCreateReserve, setisOpenCreateReserve] = useState(false)
   const [isOpenStateReserve, setisOpenStateReserve] = useState(false)
   const [isOpenEditReserve, setIsOpenEditReserve] = useState(false)

   const {
      selectedReservation,
      setSelectedReservation,
      reservations,
      isLoading,
   } = useLoadDataCalendar()

   const eventStyleGetter = (event) => {
      let backgroundColor = 'var(--table-pending)'

      switch (event.status) {
         case typeStatusTable.PENDING:
            backgroundColor = 'var(--table-pending)'
            break

         case typeStatusTable.CONFIRMED:
            backgroundColor = 'var(--table-confirmed)'
            break

         case typeStatusTable.RELEASED:
            backgroundColor = 'var(--table-released)'
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
      setisOpenStateReserve(true)
      setisOpenCreateReserve(false)
      setSelectedReservation(event)
   }, [])

   const handleSelectSlot = useCallback(({ start, end }) => {
      setisOpenCreateReserve(true)
      setisOpenStateReserve(false)
      setSelectedReservation({
         start: start,
         end: end,
      })
   }, [])

   const handleEditReservetion = () => {
      setIsOpenEditReserve(true)
   }

   const style = {
      height: '90dvh',
   }

   return (
      <div className='min-h-screen md:mt-6 mt-4 mx-auto max-w-7xl space-y-6 relative'>
         <CardLoadding
            className={'absolute h-screen w-full flex items-center justify-center z-10 bg-gray-100/40'}
            isLodding={isLoading}
         />
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
         <ModalAsyncProvider>
            {
               isOpenStateReserve &&
               <EditStateReserveModal
                  className={'md:w-xl'}
                  isOpen={isOpenStateReserve}
                  reservation={selectedReservation}
                  onClose={() => setisOpenStateReserve(false)}
                  isOpenModalEditReservation={handleEditReservetion}
               />
            }
            {
               isOpenEditReserve &&
               <EditReservationModal
                  className={'md:w-xl'}
                  activaBtns={['update']}
                  isActiveOverflow={false}
                  isOpen={isOpenEditReserve}
                  reservation={selectedReservation}
                  onClose={() => setIsOpenEditReserve(false)}
               />
            }
         </ModalAsyncProvider>
      </div>
   )
}

export default CalendarScreen;