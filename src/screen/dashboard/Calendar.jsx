import { FromReservation } from '@/components/common'
import { Card2 } from '@/components/UI/card'
import { Button, Modal } from '@/components/UI/common'
import { FormItem, Label } from '@/components/UI/from'
import { useLoadDataCalendar, useReservation } from '@/hook/dashboard'
import { AdminTableToasts, ReservationToast } from '@/toasts'
import { cn, DateParser } from '@/ultils'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import esES from 'date-fns/locale/es'
import { useCallback, useState } from 'react'
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
      <div className='w-[90%] mx-auto max-h-dvh overflow-hidden'>
         <CalendarReservations />
      </div>
   )
}

const CalendarReservations = () => {
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


const CreateReservationModal = ({
   className,
   isOpen,
   onClose,
   date,
}) => {
   const {
      reserveTable,
   } = useReservation()

   const onSubmit = (({
      formState,
      resetForm,
   }) => {
      ReservationToast({
         promise: reserveTable(formState),
         onSuccess: () => {
            window.requestAnimationFrame(() => resetForm());
         },
      });
   });

   return (

      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2 className={cn(
            className
         )}>
            <Label className={'text-center w-full'}>
               Crear nueva reserva
            </Label>

            <FromReservation
               isOpen={isOpen}
               onSubmit={onSubmit}
               initialValues={{
                  date,
               }}
            >
               <FormItem>
                  <Button
                     size='lg'
                     type='submit'
                     className='mt-2 flex items-center gap-2'
                  // disabled={isLoadingReservation}
                  >
                     Reservar
                  </Button>
               </FormItem>
            </FromReservation>
         </Card2>
      </Modal>
   )
}

const EditReservationModal = ({
   className,
   isOpen,
   onClose,
   reservation
}) => {
   const {
      cancelFullReservation,
      updateReservation,
   } = useReservation()

   const onSubmit = (({
      formState,
   }) => {
      AdminTableToasts.updateReservation(
         updateReservation(formState),
      );
   });

   const cancelReservation = () => {
      AdminTableToasts.cancelFullReservation(
         cancelFullReservation({
            idReservation: reservation?.id,
            tables: reservation?.tables
         }), {
         onSuccess: () => {
            window.requestAnimationFrame(() => onClose());
         },
      });
   }

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
      >
         <Card2 className={cn(
            className
         )}>
            <Label className={'text-center w-full'}>
               Editar reserva
            </Label>

            <FromReservation
               isOpen={isOpen}
               isEdit={true}
               onSubmit={onSubmit}
               initialValues={{
                  ...reservation,
                  date: DateParser.toDate(reservation?.dateStr),
               }}
               btns={[
                  {
                     label: 'Actualizar',
                     variant: 'default',
                     disabledBySelected: true,
                     type: 'submit',
                     size: 'lg',
                  },
                  {
                     label: 'Cancelar',
                     variant: 'destructive',
                     onClick: cancelReservation,
                     disabledBySelected: false,
                     type: 'button',
                     size: 'lg',
                  },
               ]}
            />
         </Card2>
      </Modal>
   )
}