import { CheckCircle, XCircle } from 'lucide-react';
import { HistorialReservationItem } from '.';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/from';
import { Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/common';
import { typeStatusTable } from '@/ultils';

export const UserDetailTabs = ({
   selectUser,
   filteredReservations,
   handleStatusFilter,
   selectedStatus,
   isLoading,
   handleEditReservetion,
   handleCancelReservation,
   handleConfirmReservation,
   handleReleasedReservation
}) => (
   <Tabs defaultValue='resumen' className='w-full'>
      <TabsList className='grid w-full grid-cols-2 gap-4'>
         <TabsTrigger value='resumen'>
            Resumen
         </TabsTrigger>
         <TabsTrigger value='historical'>
            Historial
         </TabsTrigger>
      </TabsList>
      <TabsContent value='historical' className='space-y-4'>
         <div className='flex items-center ml-auto w-fit gap-4'>
            <Label className={'text-accent-foreground/80'}>Filtar</Label>
            <Select
               value={selectedStatus}
               name={'status'}
               onValueChange={({ value }) => handleStatusFilter(value)}
            >
               <SelectTrigger className='w-40' variant='crystal'>
                  <SelectValue placeholder="Seleccionar" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem
                     value='all'>
                     Todos
                  </SelectItem>
                  <SelectItem
                     value={typeStatusTable.PENDING}
                  >
                     Pendientes
                  </SelectItem>
                  <SelectItem
                     value={typeStatusTable.CONFIRMED}
                  >
                     Confirmados
                  </SelectItem>
                  <SelectItem
                     value={typeStatusTable.RELEASED}
                  >
                     Completados
                  </SelectItem>
                  <SelectItem
                     value={typeStatusTable.CANCELED}
                  >
                     Cancelados
                  </SelectItem>
               </SelectContent>
            </Select>
         </div>
         {filteredReservations.map((reservation) => (
            <HistorialReservationItem
               key={reservation?.id}
               isLoading={isLoading}
               reservation={reservation}
               onEditReservetion={handleEditReservetion}
               onCancelReservation={handleCancelReservation}
               onConfirmReservation={handleConfirmReservation}
               onReleasedReservation={handleReleasedReservation}
            />
         ))}
      </TabsContent>
      <TabsContent value='resumen' className='space-y-4'>
         <Card className={'style-class text-background'}>
            <CardContent className='grid grid-cols-3 gap-4'>
               <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-table-confirmed' />
                  <span className='text-sm'>
                     Confirmadas: {selectUser.metrics?.confirmed}
                  </span>
               </div>
               <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-table-released' />
                  <span className='text-sm'>
                     Liberadas: {selectUser.metrics?.released}
                  </span>
               </div>
               <div className='flex items-center gap-2'>
                  <XCircle className='h-4 w-4 text-table-canceled' />
                  <span className='text-sm'>
                     Canceladas: {selectUser.metrics?.canceled}
                  </span>
               </div>
            </CardContent>
         </Card>
      </TabsContent>
   </Tabs>
);