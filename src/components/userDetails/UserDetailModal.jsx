import { cn } from '@/ultils';
import { Calendar, CheckCircle, Mail, MapPin, Phone, XCircle } from 'lucide-react';
import { Card2, UserCard } from '../UI/card';
import { Badge, Card, CardContent, Modal, Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/common';

export const UserDetailModal = ({
   isOpen,
   onClose,
   client,
   className
}) => {
   const rateSuccess = ((client.metrics.released / client.totalReservas) * 100).toFixed(1)

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         className=''
      >
         <Card2
            className={cn(
               'space-y-6',
               className
            )}
         >
            <div className='flex flex-col items-start gap-4'>
               <UserCard
                  className={'text-background'}
                  mustShow={['name', 'lastName', 'email']}
                  user={{
                     name: client.name,
                     email: client.email,
                     photoURL: client.photoURL,
                     lastName: client?.lastName,
                  }}
               />
               <div className='flex-1 space-y-2'>
                  <h3 className='text-xl font-semibold'>
                     {client.name}
                  </h3>
                  <div className='grid grid-cols-2 gap-4 text-sm text-background'>
                     <div className='flex items-center gap-2'>
                        <Mail className='h-3 w-3' />
                        {client.email}
                     </div>
                     <div className='flex items-center gap-2'>
                        <Phone className='h-3 w-3' />
                        {client?.phone}
                     </div>
                     <div className='flex items-center gap-2'>
                        <Calendar className='h-3 w-3' />
                        Cliente desde: {client?.createdAt}
                     </div>
                     <div className='flex items-center gap-2'>
                        <MapPin className='h-3 w-3' />
                        {client?.address}
                     </div>
                  </div>
               </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
               <Card className={'border-transparent shadow input-style-class bg-transparent text-background'}>
                  <CardContent className='p-4'>
                     <div className='text-2xl font-bold'>
                        {client.metrics.total}
                     </div>
                     <p className='text-xs'>
                        Total Reservas
                     </p>
                  </CardContent>
               </Card>
               <Card className={'border-transparent shadow input-style-class bg-transparent text-background'}>
                  <CardContent className='p-4'>
                     <div className='text-2xl font-bold text-green-600'>
                        {
                           rateSuccess === 'NaN'
                              ? '0%'
                              : rateSuccess + '%'
                        }
                     </div>
                     <p className='text-xs'>
                        Tasa de Éxito
                     </p>
                  </CardContent>
               </Card>
            </div>

            {/* Tabs con información detallada */}
            <Tabs
               defaultValue='historical'
               className='w-full'
            >
               <TabsList className='grid w-full grid-cols-2 gap-4'>
                  <TabsTrigger
                     // className='style-class'
                     value='historical'
                  >
                     Historial
                  </TabsTrigger>
                  <TabsTrigger
                     value='resumen'
                  >
                     Resumen
                  </TabsTrigger>
               </TabsList>

               <TabsContent
                  value='historical'
                  className='space-y-4'
               >
                  <div className='space-y-3'>
                     {client.reservations.map((reserve) => (
                        <Card
                           key={reserve.id}
                           className={'border-transparent shadow style-class bg-transparent text-background'}
                        >
                           <CardContent
                              className='grid grid-cols-3 gap-4 text-sm p-4'
                           >
                              <div className='md:col-span-2 flex gap-2'>
                                 <Calendar className='h-4 w-4' />
                                 <span className='font-medium'>
                                    {reserve.dateStr} - {reserve.hour}
                                 </span>
                              </div>
                              <Badge
                                 className={'place-self-end'}
                                 state={reserve.status}
                              />
                              <div>
                                 <span className='font-medium'>
                                    Personas:
                                 </span> {reserve.diners}
                              </div>
                              <div>
                                 <span className='font-medium'>
                                    Mesa:
                                 </span>
                                 {reserve.tables.map((table) =>
                                    `${table.name} `)
                                    .join(', ')
                                 }
                              </div>
                              <div className='md:col-start-1 md:col-end-3 '>
                                 <span className='font-medium'>
                                    ID:
                                 </span> {reserve.id}
                              </div>
                              {reserve.note && (
                                 <div className='mt-2 text-sm'>
                                    <span className='font-medium'>
                                       Nota:
                                    </span> {reserve?.note}
                                 </div>
                              )}
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </TabsContent>

               <TabsContent value='resumen' className='space-y-4'>
                  <Card className={'style-class text-background'}>
                     <CardContent
                        className='grid grid-cols-3 gap-4'
                     >
                        <div className='flex items-center gap-2'>
                           <CheckCircle className='h-4 w-4 text-table-confirmed' />
                           <span className='text-sm'>
                              Confirmadas: {client.metrics.confirmed}
                           </span>
                        </div>
                        <div className='flex items-center gap-2'>
                           <CheckCircle className='h-4 w-4 text-table-released' />
                           <span className='text-sm'>
                              Liberadas: {client.metrics.released}
                           </span>
                        </div>
                        <div className='flex items-center gap-2'>
                           <XCircle className='h-4 w-4 text-table-canceled' />
                           <span className='text-sm'>
                              Canceladas: {client.metrics.canceled}
                           </span>
                        </div>
                        {/* <div className='flex items-center gap-2'>
                           <Clock className='h-4 w-4 text-orange-600' />
                           <span className='text-sm'>No Shows: {client.noShows}</span>
                        </div> */}
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>

         </Card2>
      </Modal>
   )
}
