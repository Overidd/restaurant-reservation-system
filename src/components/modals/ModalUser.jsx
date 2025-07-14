import { ModalProviderAsync } from '@/doman/context/dialogAsync'
import { useModalAsync } from '@/hook'
import { useGetReservationsByUser } from '@/hook/fetchings'
import { useModalUser } from '@/hook/modals'
import { useUserSettings } from '@/hook/user'
import { UserSettingToasts } from '@/toasts'
import { cn, typeStatusTable } from '@/ultils'
import { Calendar, CalendarCheck, CircleUser, Clock, Loader2, Mail, MapPin, Phone, User, Users } from 'lucide-react'
import { AlertCancelReservation, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Modal, Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/common'
import { Input, Label } from '../UI/from'

export const ModalUser = () => {
   const { closeModal, isOpen, paramsRef } = useModalUser()

   if (!isOpen) return null

   return (

      <Modal
         isOpen={isOpen}
         onClose={closeModal}
      >
         <Tabs
            defaultValue={paramsRef}
            className={cn(
               'w-full bg-white p-4 px-4 rounded-lg overflow-hidden',
               'w-[40rem] h-[40rem] bg-sidebar-background rounded-2xl'
            )}
         >

            <TabsList className='grid w-full grid-cols-2'>
               <TabsTrigger value='profile' className='flex items-center gap-2'>
                  <CircleUser className='h-4 w-4' />
                  Editar Perfil
               </TabsTrigger>
               <TabsTrigger value='reservations' className='flex items-center gap-2'>
                  <CalendarCheck className='h-4 w-4' />
                  Tus Reservas
               </TabsTrigger>
            </TabsList>
            <ModalProviderAsync>
               <TabsContent value='profile' className='space-y-6 mt-6'>
                  <ProfileUser />
               </TabsContent>
               <TabsContent value='reservations' className='space-y-6 mt-6'>
                  <HistoryReservationUser />
               </TabsContent>
            </ModalProviderAsync>
         </Tabs>
      </Modal>
   )
}


export const ProfileUser = () => {
   return (
      <Card
         className={'p-4 bg-transparent border-none shadow-none'}
      >
         <CardHeader>
            <CardTitle className='flex items-center gap-2'>
               <User className='h-5 w-5' />
               Información Personal
            </CardTitle>
            <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
         </CardHeader>
         <CardContent className='space-y-4'>
            <div className='flex justify-center mb-6'>
               {/* <Avatar className='h-24 w-24'>
                  <AvatarImage src={photoURL || '/placeholder.svg'} alt={name} />
                  <AvatarFallback className='text-2xl'>
                     {name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || 'U'}
                  </AvatarFallback>
               </Avatar> */}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
               <div className='space-y-2'>
                  <Label htmlFor='name' className='flex items-center gap-2'>
                     <User className='h-4 w-4' />
                     Nombre completo
                  </Label>
                  <Input
                     id='name'
                     // value={formData.name}
                     // onChange={(e) => handleInputChange('name', e.target.value)}
                     placeholder='Ingresa tu nombre completo'
                  />
               </div>

               <div className='space-y-2'>
                  <Label htmlFor='phone' className='flex items-center gap-2'>
                     <Phone className='h-4 w-4' />
                     Teléfono
                  </Label>
                  <Input
                     id='phone'
                     // value={formData.phone}
                     // onChange={(e) => handleInputChange('phone', e.target.value)}
                     placeholder='Ingresa tu teléfono'
                  />
               </div>

               <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='email' className='flex items-center gap-2'>
                     <Mail className='h-4 w-4' />
                     Correo electrónico
                  </Label>
                  <Input
                     id='email'
                     type='email'
                     // value={formData.email}
                     // onChange={(e) => handleInputChange('email', e.target.value)}
                     placeholder='Ingresa tu correo electrónico'
                  />
               </div>
            </div>

            {/* {isRoleAdmin && (
               <div className='pt-4'>
                  <Badge variant='secondary' className='bg-purple-100 text-purple-800'>
                     Administrador
                  </Badge>
               </div>
            )}

            <div className='flex justify-end pt-4'>
               <Button onClick={handleSaveProfile} className='px-8'>
                  Guardar Cambios
               </Button>
            </div> */}
         </CardContent>
      </Card>
   )
}

export const HistoryReservationUser = () => {
   const { reservations, isLoading, changeReservation } = useGetReservationsByUser();
   const { showAsyncModal } = useModalAsync();
   const { cancelReservation } = useUserSettings()

   const handleCancelReservation = async (reservation) => {
      const confirmed = await showAsyncModal(({ onConfirm, onCancel }) => (
         <AlertCancelReservation
            code={reservation.code}
            onCancel={onCancel}
            onConfirm={onConfirm}
         />
      ))
      if (!confirmed) return

      UserSettingToasts.cancelReservation(
         cancelReservation(reservation.id), {
         onSuccess: changeReservation
      });
   }

   return (
      <Card className={'p-4 bg-transparent border-none shadow-none'}>
         <CardHeader>
            <CardTitle className='flex items-center gap-2'>
               <CalendarCheck className='h-5 w-5' />
               Historial de Reservas
            </CardTitle>
            <CardDescription>
               Todas tus reservas de mesas en restaurantes
            </CardDescription>
         </CardHeader>
         <CardContent>
            {reservations.length === 0 ? (

               isLoading ? (
                  <div className='flex items-center justify-center h-40'>
                     <Loader2 className='h-6 w-6 animate-spin' />
                  </div>
               ) : (
                  <div className='text-center py-8'>
                     <CalendarCheck className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
                     <p className='text-muted-foreground'>No tienes reservas registradas</p>
                  </div>
               )

            ) : (
               <div className='space-y-4'>
                  {reservations.map((reservation) => (
                     <HistorialReservationItem
                        key={reservation.id}
                        reservation={reservation}
                        onCancelReservation={handleCancelReservation}
                     />
                  ))}
               </div>
            )}
         </CardContent>
      </Card>
   )
}

export const HistorialReservationItem = ({
   reservation,
   onCancelReservation
}) => {

   return (
      <Card className={cn(
         'border-l-4 border-l-primary bg-card',
         reservation.status === typeStatusTable.CANCELED && 'border-l-destructive opacity-70'
      )}>
         <CardContent className='p-4 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='space-y-2'>
               <p className='flex items-center gap-2'>
                  <span className='font-semibold text-lg'>{reservation.restaurantName}</span>
                  <Badge state={reservation.status} />
               </p>

               <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                  <time className='flex items-center gap-1'>
                     <Calendar className='h-4 w-4' />
                     {new Date(reservation.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                     })}
                  </time>
                  <time className='flex items-center gap-1'>
                     <Clock className='h-4 w-4' />
                     {reservation.hour}
                  </time>
                  <div className='flex items-center gap-1'>
                     <Users className='h-4 w-4' />
                     {reservation.diners} personas
                  </div>
               </div>

               <p className='flex items-center gap-1 text-sm text-muted-foreground'>
                  <MapPin className='h-4 w-4' />
                  {reservation.restaurantName}
               </p>
            </div>
            {
               reservation.status !== typeStatusTable.CANCELED && (
                  <Button
                     onClick={() => onCancelReservation(reservation)}
                     variant='destructive'
                     size='sm'
                  >
                     Eliminar
                  </Button>
               )
            }
         </CardContent>
      </Card>
   )
}