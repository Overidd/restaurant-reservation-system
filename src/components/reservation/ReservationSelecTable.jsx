import { cn } from "@/ultils/cn"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../UI/from"
import { Button, Calendar, Card, CardContent, CardHeader, CardImage, Popover } from "../UI/common"
import { ChevronDownIcon, Clock } from "lucide-react"
import { useState } from "react"
import { TableList } from "../UI/table"
import { ReservationCard } from "."
import { useReserve, useReserveTimer } from "@/hook"



const dataInfo = [
   {
      name: 'Disponible',
      color: 'bg-table-avaible'
   },
   {
      name: 'Ocupado',
      color: 'bg-table-busy'
   },
   {
      name: 'Seleccionado',
      color: 'bg-table-selected'
   }
]

const hourAvailable = [
   {
      id: 1,
      hour: '12:00',
   },
   {
      id: 2,
      hour: '13:00',
   },
   {
      id: 3,
      hour: '14:00',
   },
   {
      id: 4,
      hour: '15:00',
   },
]

const reason = {
   min: 1,
   max: 10,
}

export const ReservationSelecTable = () => {
   const { reserveSelectTable, selectedTables } = useReserve()
   const [date, setDate] = useState(undefined)

   return (
      <div className={cn(
         'grid gap-4 grid-cols-[70%_1fr] grid-table-container'
      )}>
         <header className={cn(
            'grid-table-header',
            'flex justify-between',
            // 'border-b-2 border-[#0002]'
         )}>
            <section className="flex flex-row gap-5">
               {
                  dataInfo.map(({ name, color }, index) => (
                     <div key={index} className={'space-x-2'}>
                        <Popover
                           content={
                              <p className="bg-primary-foreground text-sm p-2">
                                 {name}
                              </p>
                           }
                        >
                           <div
                              className={`w-6 h-6 rounded-full cursor-pointer inline-block align-middle ${color}`}
                           ></div>
                           {/* <span className="align-middle inline-block font-semibold text-lg">
                           {name}
                        </span> */}

                        </Popover>
                     </div>
                  ))
               }
            </section>

            <section
               className="flex flex-row gap-5 items-center"
            >
               <Popover
                  className='w-fit'
                  placement='bottom'
                  content={
                     <Calendar
                        mode='single'
                        selected={date}
                        captionLayout='dropdown'
                        disabled={(date) => date <= new Date(new Date().setDate(new Date().getDate() - 1))}
                        onSelect={(date) => {
                           setDate(date)
                           // onValueChange(date)
                        }}
                     />
                  }
               >
                  <Button
                     className='w-48 justify-between font-normal'
                     variant='crystal'
                     type='button'
                     id='date'

                  >
                     {date ? date.toLocaleDateString() : 'Seleccione una fecha'}
                     <ChevronDownIcon />
                  </Button>
               </Popover>

               <Select
               // value={currentHour}
               // onValueChange={(value) => onValueChange({ name: 'reason', value })}
               >
                  <SelectTrigger
                     className="w-full"
                     variant="crystal"
                  >
                     <SelectValue placeholder="Seleccione un hora" />
                  </SelectTrigger>
                  <SelectContent>
                     {hourAvailable.map((item) => (
                        <SelectItem key={item.id} value={item.hour}>
                           {item.hour}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>

               {/* Pipol */}
               <Select
               >
                  <SelectTrigger
                     className="w-full"
                     variant="crystal"
                  >
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     {
                        Array.from({ length: reason.max }, (_, index) => index + reason.min).map((item) => (
                           <SelectItem key={item} value={item}>
                              {item}
                           </SelectItem>
                        ))
                     }
                  </SelectContent>
               </Select>
            </section>

            <TiemLimit />
         </header>

         <main className="grid-table-main">
            <TableList
               onChangeTable={reserveSelectTable}
               selectedTables={selectedTables}
            />
         </main>

         <aside className="grid-table-aside" hidden>

            <Card className={'w-full text-center'}>
               <CardHeader>
                  Resumen de la reserva
               </CardHeader>
               <CardContent className={'space-y-4'}>
                  <p className='text-card-foreground font-bold truncate-text-nowarp max-w-[90%] mx-auto'>
                     {/* {name} */}
                     Mesas 1
                  </p>
                  <small
                     className="font-bold text-muted-foreground/80 truncate-text-lines max-w-[90%] mx-auto"
                  >
                     {/* {description} */}
                     interior
                  </small>
               </CardContent>
            </Card>
         </aside>
      </div >
   )

}


const TiemLimit = () => {
   const { formattedMinutes, formattedSeconds } = useReserveTimer()


   return (
      <div className="space-x-2 text-primary-foreground">
         <Clock className="inline-block align-middle" />
         <time className="inline-block align-middle font-semibold text-lg">
            {formattedMinutes}:{formattedSeconds}
         </time>
      </div>
   )
}