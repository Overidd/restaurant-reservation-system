
import { Card2 } from '@/components/UI/card'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/UI/common'
import { Input } from '@/components/UI/from'
import { useGetReserveFetchin } from '@/hook/fetchings'
import { DateFormat } from '@/ultils'
import { Calendar, CheckCircle, Clock, LoaderCircle, MapPin, MessageSquare, Search, Users, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export const SearchReservationPage = () => {
   const { errorMessage, reservation, searchReserveByCode } = useGetReserveFetchin()
   const [searchCode, setSearchCode] = useState('')
   const [searchState, setSearchState] = useState('idle')

   const handleSearch = async () => {
      if (!searchCode.trim()) return
      setSearchState('searching')
      const { errorMessage, reservation } = await searchReserveByCode(searchCode)
      errorMessage && setSearchState('not-found')
      reservation && setSearchState('found')
   }

   return (
      <div
         className='mt-40 min-h-screen p-4 sm:p-6 lg:p-8 md:w-4xl mx-auto'
         style={{ backgroundColor: '#faf3e6' }}
      >
         <div className='text-center mb-8'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
               Buscador de Reservas
            </h1>
            <p className='text-sm md:text-base text-gray-600'>
               Ingresa el código de tu reserva para consultar los detalles
            </p>
         </div>

         <Card2
            vairant='dashed'
            className='mb-8 p-0'
         >
            <CardContent className={'flex justify-center items-center gap-5 p-4'}>
               <Input
                  type='text'
                  variant={'default'}
                  placeholder='RESERVA-OOOOO'
                  value={searchCode}
                  disabled={searchState === 'searching'}
                  onChange={(e) => setSearchCode(e.target.value)}
               />
               <Button
                  size={'icon'}
                  onClick={handleSearch}
                  disabled={!searchCode.trim() || searchState === 'searching'}
               >
                  {searchState === 'searching' ? (
                     <LoaderCircle
                        className='animate-spin'
                     />
                  ) : (
                     <Search />
                  )}
               </Button>
            </CardContent>
         </Card2>

         {searchState === 'not-found' && (
            <Card>
               <CardContent className='pt-6'>
                  <div className='text-center py-8'>
                     <XCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
                     <h3 className='text-xl font-semibold text-red-700 mb-2'>
                        Reserva no encontrada
                     </h3>
                     <p className='text-gray-600'>
                        No se encontró ninguna reserva con el código
                        <strong>{searchCode}</strong>
                     </p>
                     <code>
                        {errorMessage}
                     </code>
                     <p className='text-sm mt-2'>
                        Verifica que el código sea correcto e intenta nuevamente
                     </p>
                  </div>
               </CardContent>
            </Card>
         )}

         {searchState === 'found' && reservation && (
            <Card2
               vairant='dashed'
               className={'p-4'}
            >
               <CardHeader className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2 text-green-800'>
                     <CheckCircle className='w-5 h-5' />
                     Reserva Encontrada
                  </CardTitle>
                  <Badge state={reservation.status} />
               </CardHeader>
               <CardContent className='pt-6'>
                  <div className='grid gap-6 md:grid-cols-2'>
                     <div className='space-y-4'>
                        <h3 className='font-semibold text-lg border-b pb-2'>
                           Información del Cliente
                        </h3>
                        <div className='space-y-3'>
                           <div className='flex items-center gap-2'>
                              <Users className='w-4 h-4' />
                              <span className='font-medium'>
                                 Nombre:
                              </span>
                              <span className='capitalize'>
                                 {reservation.name}
                              </span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <span className='w-4 h-4'>
                                 @
                              </span>
                              <span className='font-medium'>
                                 Email:
                              </span>
                              <span>
                                 {reservation.email}
                              </span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <span className='w-4 h-4'>
                                 #
                              </span>
                              <span className='font-medium'>
                                 Código:
                              </span>
                              <Badge >
                                 <span>{reservation.code}</span>
                              </Badge>
                           </div>
                        </div>
                     </div>

                     {/* Detalles de la Reserva */}
                     <div className='space-y-4'>
                        <h3 className='font-semibold text-lg border-b pb-2'>
                           Detalles de la Reserva
                        </h3>
                        <div className='space-y-3'>
                           <div className='flex items-center gap-2'>
                              <Calendar className='w-4 h-4' />
                              <span className='font-medium'>
                                 Fecha:
                              </span>
                              <span>
                                 {DateFormat.weekYearMonthDay(reservation.dateStr)}
                              </span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Clock className='w-4 h-4' />
                              <span className='font-medium'>
                                 Hora:
                              </span>
                              <span>
                                 {reservation.hour}
                              </span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Users className='w-4 h-4' />
                              <span className='font-medium'>
                                 Comensales:
                              </span>
                              <span>
                                 {reservation.diners} personas
                              </span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <MapPin className='w-4 h-4' />
                              <span className='font-medium'>
                                 Mesa:
                              </span>
                              <span>
                                 {reservation.tables.map((t) => t.name).join(', ')}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className='space-y-4'>
                     <h3 className='font-semibold text-lg'>
                        Información Adicional
                     </h3>
                     <div className='grid gap-4 md:grid-cols-2'>
                        <div className='flex items-center gap-2'>
                           <MessageSquare className='w-4 h-4' />
                           <span className='font-medium'>
                              Motivo:
                           </span>
                           <span>
                              {reservation.reason}
                           </span>
                        </div>
                        <div className='flex items-center gap-2'>
                           <span className='font-medium'>
                              Restaurante ID:
                           </span>
                           <span>
                              {reservation.idRestaurant}
                           </span>
                        </div>
                     </div>

                     {reservation.comment && (
                        <div className='rounded-lg flex items-center gap-2'>
                           <MessageSquare className='w-4 h-4' />
                           <span className='font-medium'>
                              Comentarios:
                           </span>
                           <span>
                              {reservation.comment}
                           </span>
                        </div>
                     )}
                  </div>

                  <div className='mt-6 text-sm space-y-1'>
                     <p>
                        <strong>Creada:</strong> {reservation.createdAt}
                     </p>
                     <p>
                        <strong>Actualizada:</strong> {reservation.updatedAt}
                     </p>
                  </div>
               </CardContent>
            </Card2>
         )}
         <Outlet />
      </div>
   )
}

export default SearchReservationPage;