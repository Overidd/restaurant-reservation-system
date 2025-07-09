import { useModalUser } from '@/hook/modals'
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Modal, Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/common'
import { Calendar, CalendarCheck, CircleUser, Clock, Loader2, Mail, MapPin, Phone, User, Users } from 'lucide-react'
import { Input, Label } from '../UI/from'
import { cn } from '@/ultils'
import { useGetReservationsByUser } from '@/hook/fetchings'

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
               'w-full bg-white p-2 px-4 rounded-lg overflow-hidden',
               'w-[40rem] h-[40rem]'
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

            <TabsContent value="profile" className="space-y-6 mt-6">
               <ProfileUser />
            </TabsContent>
            <TabsContent value="reservations" className="space-y-6 mt-6">
               <HistoryReservationUser />
            </TabsContent>

         </Tabs>
      </Modal>
   )
}


export const ProfileUser = () => {
   return (
      <Card className={'p-4'}>
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <User className="h-5 w-5" />
               Información Personal
            </CardTitle>
            <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
               {/* <Avatar className="h-24 w-24">
                  <AvatarImage src={photoURL || "/placeholder.svg"} alt={name} />
                  <AvatarFallback className="text-2xl">
                     {name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                  </AvatarFallback>
               </Avatar> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                     <User className="h-4 w-4" />
                     Nombre completo
                  </Label>
                  <Input
                     id="name"
                     // value={formData.name}
                     // onChange={(e) => handleInputChange("name", e.target.value)}
                     placeholder="Ingresa tu nombre completo"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                     <Phone className="h-4 w-4" />
                     Teléfono
                  </Label>
                  <Input
                     id="phone"
                     // value={formData.phone}
                     // onChange={(e) => handleInputChange("phone", e.target.value)}
                     placeholder="Ingresa tu teléfono"
                  />
               </div>

               <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                     <Mail className="h-4 w-4" />
                     Correo electrónico
                  </Label>
                  <Input
                     id="email"
                     type="email"
                     // value={formData.email}
                     // onChange={(e) => handleInputChange("email", e.target.value)}
                     placeholder="Ingresa tu correo electrónico"
                  />
               </div>
            </div>

            {/* {isRoleAdmin && (
               <div className="pt-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                     Administrador
                  </Badge>
               </div>
            )}

            <div className="flex justify-end pt-4">
               <Button onClick={handleSaveProfile} className="px-8">
                  Guardar Cambios
               </Button>
            </div> */}
         </CardContent>
      </Card>
   )
}

export const HistoryReservationUser = () => {
   const { reservations, isLoading } = useGetReservationsByUser();

   return (
      <Card className={'p-4'}>
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <CalendarCheck className="h-5 w-5" />
               Historial de Reservas
            </CardTitle>
            <CardDescription>Todas tus reservas de mesas en restaurantes</CardDescription>
         </CardHeader>
         <CardContent>
            {reservations.length === 0 ? (

               isLoading ? (
                  <div className="flex items-center justify-center h-40">
                     <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
               ) : (
                  <div className="text-center py-8">
                     <CalendarCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                     <p className="text-muted-foreground">No tienes reservas registradas</p>
                  </div>
               )

            ) : (
               <div className="space-y-4">
                  {reservations.map((reservation) => (
                     <Card key={reservation.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-2">
                                 <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{reservation.restaurantName}</h3>
                                    <Badge state={reservation.status} />
                                 </div>

                                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                       <Calendar className="h-4 w-4" />
                                       {new Date(reservation.date).toLocaleDateString("es-ES", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                       })}
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <Clock className="h-4 w-4" />
                                       {reservation.hour}
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <Users className="h-4 w-4" />
                                       {reservation.diners} personas
                                    </div>
                                 </div>

                                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {reservation.restaurantName}
                                 </div>
                              </div>

                              <div className="flex gap-2">
                                 {reservation.status === "confirmada" && (
                                    <Button variant="outline" size="sm">
                                       Modificar
                                    </Button>
                                 )}
                                 <Button variant="outline" size="sm">
                                    Ver Detalles
                                 </Button>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            )}
         </CardContent>
      </Card>
   )
}