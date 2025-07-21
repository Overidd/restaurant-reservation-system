import { StatsSummary } from "@/components/dashboard"
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer, ChartTooltip, ChartTooltipContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/common"
import { Input } from "@/components/UI/from"
import { useLoadDashboard } from "@/hook/dashboard"
import { Calendar, CheckCircle, Clock, Mail, Phone, Search, XCircle } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

// Datos de ejemplo
const topClientsData = [
   { name: "María García", reservas: 24, telefono: "+34 666 123 456" },
   { name: "Carlos López", reservas: 18, telefono: "+34 677 234 567" },
   { name: "Ana Martínez", reservas: 15, telefono: "+34 688 345 678" },
   { name: "Pedro Rodríguez", reservas: 12, telefono: "+34 699 456 789" },
   { name: "Laura Sánchez", reservas: 10, telefono: "+34 611 567 890" },
]

const cancelacionesData = [
   { cliente: "Juan Pérez", canceladas: 8, confirmadas: 12, noShow: 2 },
   { cliente: "Isabel Torres", canceladas: 6, confirmadas: 15, noShow: 1 },
   { cliente: "Miguel Ruiz", canceladas: 5, confirmadas: 8, noShow: 3 },
   { cliente: "Carmen Díaz", canceladas: 4, confirmadas: 11, noShow: 1 },
   { cliente: "Roberto Silva", canceladas: 3, confirmadas: 9, noShow: 2 },
]

const chartData = [
   { mes: "Ene", confirmadas: 145, canceladas: 32, noShow: 18 },
   { mes: "Feb", confirmadas: 162, canceladas: 28, noShow: 15 },
   { mes: "Mar", confirmadas: 178, canceladas: 35, noShow: 22 },
   { mes: "Apr", confirmadas: 195, canceladas: 41, noShow: 19 },
   { mes: "May", confirmadas: 210, canceladas: 38, noShow: 25 },
   { mes: "Jun", confirmadas: 225, canceladas: 45, noShow: 28 },
]

const noShowClients = [
   { cliente: "Antonio Vega", noShows: 5, ultimaFecha: "2024-01-15" },
   { cliente: "Sofía Morales", noShows: 4, ultimaFecha: "2024-01-12" },
   { cliente: "Diego Herrera", noShows: 3, ultimaFecha: "2024-01-10" },
   { cliente: "Lucía Jiménez", noShows: 3, ultimaFecha: "2024-01-08" },
   { cliente: "Fernando Castro", noShows: 2, ultimaFecha: "2024-01-05" },
]

const clientesConfirmados = [
   {
      id: 1,
      nombre: "María García",
      telefono: "+34 666 123 456",
      email: "maria.garcia@email.com",
      fechaReserva: "2024-01-20",
      horaReserva: "20:30",
      personas: 4,
      mesa: "Mesa 12",
   },
   {
      id: 2,
      nombre: "Carlos López",
      telefono: "+34 677 234 567",
      email: "carlos.lopez@email.com",
      fechaReserva: "2024-01-20",
      horaReserva: "19:00",
      personas: 2,
      mesa: "Mesa 5",
   },
   {
      id: 3,
      nombre: "Ana Martínez",
      telefono: "+34 688 345 678",
      email: "ana.martinez@email.com",
      fechaReserva: "2024-01-20",
      horaReserva: "21:00",
      personas: 6,
      mesa: "Mesa 8",
   },
   {
      id: 4,
      nombre: "Pedro Rodríguez",
      telefono: "+34 699 456 789",
      email: "pedro.rodriguez@email.com",
      fechaReserva: "2024-01-19",
      horaReserva: "20:00",
      personas: 3,
      mesa: "Mesa 3",
   },
   {
      id: 5,
      nombre: "Laura Sánchez",
      telefono: "+34 611 567 890",
      email: "laura.sanchez@email.com",
      fechaReserva: "2024-01-19",
      horaReserva: "19:30",
      personas: 2,
      mesa: "Mesa 7",
   },
]

const clientesCancelados = [
   {
      id: 6,
      nombre: "Juan Pérez",
      telefono: "+34 622 111 222",
      email: "juan.perez@email.com",
      fechaReserva: "2024-01-18",
      horaReserva: "20:00",
      personas: 4,
      motivoCancelacion: "Enfermedad",
      fechaCancelacion: "2024-01-18",
   },
   {
      id: 7,
      nombre: "Isabel Torres",
      telefono: "+34 633 222 333",
      email: "isabel.torres@email.com",
      fechaReserva: "2024-01-17",
      horaReserva: "19:30",
      personas: 2,
      motivoCancelacion: "Cambio de planes",
      fechaCancelacion: "2024-01-16",
   },
   {
      id: 8,
      nombre: "Miguel Ruiz",
      telefono: "+34 644 333 444",
      email: "miguel.ruiz@email.com",
      fechaReserva: "2024-01-16",
      horaReserva: "21:00",
      personas: 8,
      motivoCancelacion: "Problema familiar",
      fechaCancelacion: "2024-01-15",
   },
   {
      id: 9,
      nombre: "Carmen Díaz",
      telefono: "+34 655 444 555",
      email: "carmen.diaz@email.com",
      fechaReserva: "2024-01-15",
      horaReserva: "20:30",
      personas: 3,
      motivoCancelacion: "Trabajo",
      fechaCancelacion: "2024-01-14",
   },
]

const clientesNoShow = [
   {
      id: 10,
      nombre: "Antonio Vega",
      telefono: "+34 666 555 666",
      email: "antonio.vega@email.com",
      fechaReserva: "2024-01-15",
      horaReserva: "20:00",
      personas: 4,
      mesa: "Mesa 10",
      tiempoEspera: "30 min",
   },
   {
      id: 11,
      nombre: "Sofía Morales",
      telefono: "+34 677 666 777",
      email: "sofia.morales@email.com",
      fechaReserva: "2024-01-12",
      horaReserva: "19:30",
      personas: 2,
      mesa: "Mesa 4",
      tiempoEspera: "45 min",
   },
   {
      id: 12,
      nombre: "Diego Herrera",
      telefono: "+34 688 777 888",
      email: "diego.herrera@email.com",
      fechaReserva: "2024-01-10",
      horaReserva: "21:00",
      personas: 6,
      mesa: "Mesa 15",
      tiempoEspera: "20 min",
   },
   {
      id: 13,
      nombre: "Lucía Jiménez",
      telefono: "+34 699 888 999",
      email: "lucia.jimenez@email.com",
      fechaReserva: "2024-01-08",
      horaReserva: "20:30",
      personas: 3,
      mesa: "Mesa 6",
      tiempoEspera: "60 min",
   },
]

export function DashboardScreen() {
   const data = useLoadDashboard()
   console.log(data);

   return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
         <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">Estadísticas de Reservas</h1>
                  <p className="text-muted-foreground">Panel de control del sistema de reservas - Restaurante La Mesa</p>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline">Exportar Datos</Button>
                  <Button>Generar Reporte</Button>
               </div>
            </div>

            {/* Métricas principales */}
            <StatsSummary
               metrics={data?.metrics}
            />
            {/* Gráfico de tendencias */}
            <Card>
               <CardHeader>
                  <CardTitle>Tendencia de Reservas por Mes</CardTitle>
                  <CardDescription>Comparativa de reservas confirmadas, canceladas y no-show</CardDescription>
               </CardHeader>
               <CardContent>
                  <ChartContainer
                     config={{
                        confirmadas: {
                           label: "Confirmadas",
                           color: "hsl(var(--chart-1))",
                        },
                        canceladas: {
                           label: "Canceladas",
                           color: "hsl(var(--chart-2))",
                        },
                        noShow: {
                           label: "No Show",
                           color: "hsl(var(--chart-3))",
                        },
                     }}
                     className="h-[300px]"
                  >
                     <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="mes" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="confirmadas" fill="var(--color-confirmadas)" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="canceladas" fill="var(--color-canceladas)" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="noShow" fill="var(--color-noShow)" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ChartContainer>
               </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
               {/* Top 5 clientes con más reservas */}
               <Card>
                  <CardHeader>
                     <CardTitle>Top 5 Clientes con Más Reservas</CardTitle>
                     <CardDescription>Clientes más frecuentes del restaurante</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableHead>Cliente</TableHead>
                              <TableHead>Teléfono</TableHead>
                              <TableHead className="text-right">Reservas</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {topClientsData.map((cliente, index) => (
                              <TableRow key={cliente.name}>
                                 <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                       <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                                       {cliente.name}
                                    </div>
                                 </TableCell>
                                 <TableCell className="text-muted-foreground">{cliente.telefono}</TableCell>
                                 <TableCell className="text-right font-semibold">{cliente.reservas}</TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </CardContent>
               </Card>

               {/* Clientes con más no-show */}
               <Card>
                  <CardHeader>
                     <CardTitle>Clientes con Más No-Show</CardTitle>
                     <CardDescription>Clientes que no se presentaron a sus reservas</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableHead>Cliente</TableHead>
                              <TableHead>No-Show</TableHead>
                              <TableHead>Última Fecha</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {noShowClients.map((cliente) => (
                              <TableRow key={cliente.cliente}>
                                 <TableCell className="font-medium">{cliente.cliente}</TableCell>
                                 <TableCell>
                                    <Badge variant="destructive">{cliente.noShows}</Badge>
                                 </TableCell>
                                 <TableCell className="text-muted-foreground">{cliente.ultimaFecha}</TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </CardContent>
               </Card>
            </div>

            {/* Análisis de cancelaciones por cliente */}
            <Card>
               <CardHeader>
                  <CardTitle>Análisis de Reservas por Cliente</CardTitle>
                  <CardDescription>Desglose detallado de confirmadas, canceladas y no-show por cliente</CardDescription>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Cliente</TableHead>
                           <TableHead className="text-center">Confirmadas</TableHead>
                           <TableHead className="text-center">Canceladas</TableHead>
                           <TableHead className="text-center">No-Show</TableHead>
                           <TableHead className="text-center">Total</TableHead>
                           <TableHead className="text-center">Tasa Éxito</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {cancelacionesData.map((cliente) => {
                           const total = cliente.confirmadas + cliente.canceladas + cliente.noShow
                           const tasaExito = ((cliente.confirmadas / total) * 100).toFixed(1)

                           return (
                              <TableRow key={cliente.cliente}>
                                 <TableCell className="font-medium">{cliente.cliente}</TableCell>
                                 <TableCell className="text-center">
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                       {cliente.confirmadas}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className="text-center">
                                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                                       {cliente.canceladas}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className="text-center">
                                    <Badge variant="outline" className="bg-orange-100 text-orange-800">
                                       {cliente.noShow}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className="text-center font-semibold">{total}</TableCell>
                                 <TableCell className="text-center">
                                    <span
                                       className={`font-semibold ${Number.parseFloat(tasaExito) >= 80
                                          ? "text-green-600"
                                          : Number.parseFloat(tasaExito) >= 60
                                             ? "text-orange-600"
                                             : "text-red-600"
                                          }`}
                                    >
                                       {tasaExito}%
                                    </span>
                                 </TableCell>
                              </TableRow>
                           )
                        })}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>

            {/* Sección detallada de clientes por estado */}
            <Card>
               <CardHeader>
                  <CardTitle>Detalle de Clientes por Estado de Reserva</CardTitle>
                  <CardDescription>Vista detallada de todos los clientes según el estado de sus reservas</CardDescription>
               </CardHeader>
               <CardContent>
                  <Tabs defaultValue="confirmadas" className="w-full">
                     <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="confirmadas" className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4" />
                           Confirmadas ({clientesConfirmados.length})
                        </TabsTrigger>
                        <TabsTrigger value="canceladas" className="flex items-center gap-2">
                           <XCircle className="h-4 w-4" />
                           Canceladas ({clientesCancelados.length})
                        </TabsTrigger>
                        <TabsTrigger value="noshow" className="flex items-center gap-2">
                           <Clock className="h-4 w-4" />
                           No Show ({clientesNoShow.length})
                        </TabsTrigger>
                     </TabsList>

                     <TabsContent value="confirmadas" className="space-y-4">
                        <div className="flex items-center space-x-2">
                           <Search className="h-4 w-4 text-muted-foreground" />
                           <Input placeholder="Buscar cliente confirmado..." className="max-w-sm" />
                        </div>
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Cliente</TableHead>
                                 <TableHead>Contacto</TableHead>
                                 <TableHead>Fecha & Hora</TableHead>
                                 <TableHead>Personas</TableHead>
                                 <TableHead>Mesa</TableHead>
                                 <TableHead>Estado</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {clientesConfirmados.map((cliente) => (
                                 <TableRow key={cliente.id}>
                                    <TableCell className="font-medium">{cliente.nombre}</TableCell>
                                    <TableCell>
                                       <div className="space-y-1">
                                          <div className="flex items-center gap-1 text-sm">
                                             <Phone className="h-3 w-3" />
                                             {cliente.telefono}
                                          </div>
                                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                             <Mail className="h-3 w-3" />
                                             {cliente.email}
                                          </div>
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <div className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          <span className="text-sm">
                                             {cliente.fechaReserva} - {cliente.horaReserva}
                                          </span>
                                       </div>
                                    </TableCell>
                                    <TableCell>{cliente.personas}</TableCell>
                                    <TableCell>{cliente.mesa}</TableCell>
                                    <TableCell>
                                       <Badge className="bg-green-100 text-green-800">Confirmada</Badge>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TabsContent>

                     <TabsContent value="canceladas" className="space-y-4">
                        <div className="flex items-center space-x-2">
                           <Search className="h-4 w-4 text-muted-foreground" />
                           <Input placeholder="Buscar cliente cancelado..." className="max-w-sm" />
                        </div>
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Cliente</TableHead>
                                 <TableHead>Contacto</TableHead>
                                 <TableHead>Fecha Reserva</TableHead>
                                 <TableHead>Personas</TableHead>
                                 <TableHead>Motivo</TableHead>
                                 <TableHead>Fecha Cancelación</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {clientesCancelados.map((cliente) => (
                                 <TableRow key={cliente.id}>
                                    <TableCell className="font-medium">{cliente.nombre}</TableCell>
                                    <TableCell>
                                       <div className="space-y-1">
                                          <div className="flex items-center gap-1 text-sm">
                                             <Phone className="h-3 w-3" />
                                             {cliente.telefono}
                                          </div>
                                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                             <Mail className="h-3 w-3" />
                                             {cliente.email}
                                          </div>
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <div className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          <span className="text-sm">
                                             {cliente.fechaReserva} - {cliente.horaReserva}
                                          </span>
                                       </div>
                                    </TableCell>
                                    <TableCell>{cliente.personas}</TableCell>
                                    <TableCell>
                                       <Badge variant="outline" className="bg-gray-100">
                                          {cliente.motivoCancelacion}
                                       </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{cliente.fechaCancelacion}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TabsContent>

                     <TabsContent value="noshow" className="space-y-4">
                        <div className="flex items-center space-x-2">
                           <Search className="h-4 w-4 text-muted-foreground" />
                           <Input placeholder="Buscar cliente no-show..." className="max-w-sm" />
                        </div>
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Cliente</TableHead>
                                 <TableHead>Contacto</TableHead>
                                 <TableHead>Fecha & Hora</TableHead>
                                 <TableHead>Personas</TableHead>
                                 <TableHead>Mesa Asignada</TableHead>
                                 <TableHead>Tiempo Esperado</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {clientesNoShow.map((cliente) => (
                                 <TableRow key={cliente.id}>
                                    <TableCell className="font-medium">{cliente.nombre}</TableCell>
                                    <TableCell>
                                       <div className="space-y-1">
                                          <div className="flex items-center gap-1 text-sm">
                                             <Phone className="h-3 w-3" />
                                             {cliente.telefono}
                                          </div>
                                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                             <Mail className="h-3 w-3" />
                                             {cliente.email}
                                          </div>
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <div className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          <span className="text-sm">
                                             {cliente.fechaReserva} - {cliente.horaReserva}
                                          </span>
                                       </div>
                                    </TableCell>
                                    <TableCell>{cliente.personas}</TableCell>
                                    <TableCell>{cliente.mesa}</TableCell>
                                    <TableCell>
                                       <Badge variant="destructive" className="bg-orange-100 text-orange-800">
                                          {cliente.tiempoEspera}
                                       </Badge>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TabsContent>
                  </Tabs>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
