import { useLoadDataCalendar } from '@/hook/dashboard'
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
      <div>
         <CalendarReservations />
      </div>
   )
}

export default function CalendarReservations() {
   const { isLoading, reservations } = useLoadDataCalendar()

   const [selectedReservation, setSelectedReservation] = useState(null)
   const [isEditing, setIsEditing] = useState(false)

   const eventStyleGetter = (event) => {
      let backgroundColor = "#3174ad"

      switch (event.status) {
         case "confirmed":
            backgroundColor = "#10b981"
            break
         case "pending":
            backgroundColor = "#f59e0b"
            break
         case "cancelled":
            backgroundColor = "#ef4444"
            break
      }

      return {
         style: {
            backgroundColor,
            color: "white",
            borderRadius: "4px",
            border: "none",
         },
      }
   }

   // Manejar selección de evento
   const handleSelectEvent = useCallback((event) => {
      setSelectedReservation(event)

      setIsEditing(true)
      // setIsModalOpen(true)
   }, [])

   // Manejar selección de slot para nueva reserva
   const handleSelectSlot = useCallback(({ start, end }) => { //: { start: Date; end: Date }
      setSelectedReservation(null)
      // setFormData({
      //    name: "",
      //    phone: "",
      //    email: "",
      //    tables: [],
      //    guests: 2,
      //    status: "pending",
      //    notes: "",
      //    start: new Date(start),
      //    end: new Date(end),
      // })
      setIsEditing(false)
      // setIsModalOpen(true)
   }, [])


   // Guardar reserva
   const handleSaveReservation = () => {
      // if (!formData.name || !formData.tables?.length || !formData.start || !formData.end) {
      // alert("Por favor, completa todos los campos obligatorios")
      // return
      // }

      // const startDate = new Date(formData.start)
      // const endDate = new Date(formData.end)

      // if (startDate >= endDate) {
      //    alert("La fecha de fin debe ser posterior a la fecha de inicio")
      //    return
      // }

      // const reservation = {
      //    id: isEditing ? selectedReservation.id : Date.now().toString(),
      //    title: `${formData.tables.join(", ")} - ${formData.name}`,
      //    start: startDate,
      //    end: endDate,
      //    status: formData.status, // "pending" | "confirmed" | "cancelled",
      //    name: formData.name,
      //    phone: formData.phone || "",
      //    email: formData.email || "",
      //    tables: formData.tables,
      //    guests: formData.guests || 2,
      //    notes: formData.notes || "",
      // }

      // if (isEditing) {
      //    setReservations((prev) => prev.map((r) => (r.id === reservation.id ? reservation : r)))
      // } else {
      //    setReservations((prev) => [...prev, reservation])
      // }

      // setIsModalOpen(false)
      // setFormData({})
   }

   // Eliminar reserva
   const handleDeleteReservation = () => {
      if (selectedReservation) {
         // setReservations((prev) => prev.filter((r) => r.id !== selectedReservation.id))
         // setIsModalOpen(false)
      }
   }

   // Cambiar estado de reserva
   const handleStatusChange = (status) => {//: "pending" | "confirmed" | "cancelled"
      if (selectedReservation) {
         const updatedReservation = { ...selectedReservation, status }
         // setReservations((prev) => prev.map((r) => (r.id === selectedReservation.id ? updatedReservation : r)))
         // setSelectedReservation(updatedReservation)
         // setFormData((prev) => ({ ...prev, status }))
      }
   }

   // Manejar cambio en mesas seleccionadas
   const handleTableChange = (table, checked) => {
      // setFormData((prev) => ({
      //    ...prev,
      //    tables: checked ? [...(prev.tables || []), table] : (prev.tables || []).filter((t) => t !== table),
      // }))
   }

   return (
      <div className="p-4">

         <h2 className="text-xl font-semibold mb-4">Calendario de Reservas</h2>

         <Calendar
            localizer={localizer}
            events={reservations}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            views={["month", "week", "day"]}
            defaultView={Views.WEEK}
            step={30}
            timeslots={2}
            messages={{
               next: "Siguiente",
               previous: "Anterior",
               today: "Hoy",
               month: "Mes",
               week: "Semana",
               day: "Día",
               agenda: "Agenda",
               date: "Fecha",
               time: "Hora",
               event: "Evento",
               noEventsInRange: "No hay reservas en este rango",
               showMore: (total) => `+ Ver más (${total})`,
            }}
         />
      </div>
   )
}