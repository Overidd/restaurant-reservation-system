import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/common"
import { Input } from "@/components/UI/from"
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, Clock, Mail, Phone, Search, XCircle } from "lucide-react"
import { useState } from "react"

// Datos de ejemplo expandidos para demostrar paginación
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
  // Datos adicionales para demostrar paginación
  {
    id: 6,
    nombre: "Roberto Fernández",
    telefono: "+34 622 111 333",
    email: "roberto.fernandez@email.com",
    fechaReserva: "2024-01-18",
    horaReserva: "20:15",
    personas: 5,
    mesa: "Mesa 9",
  },
  {
    id: 7,
    nombre: "Elena Moreno",
    telefono: "+34 633 222 444",
    email: "elena.moreno@email.com",
    fechaReserva: "2024-01-18",
    horaReserva: "19:45",
    personas: 3,
    mesa: "Mesa 11",
  },
  {
    id: 8,
    nombre: "Francisco Jiménez",
    telefono: "+34 644 333 555",
    email: "francisco.jimenez@email.com",
    fechaReserva: "2024-01-17",
    horaReserva: "21:30",
    personas: 4,
    mesa: "Mesa 14",
  },
  {
    id: 9,
    nombre: "Carmen Ruiz",
    telefono: "+34 655 444 666",
    email: "carmen.ruiz@email.com",
    fechaReserva: "2024-01-17",
    horaReserva: "20:45",
    personas: 2,
    mesa: "Mesa 2",
  },
  {
    id: 10,
    nombre: "Manuel Torres",
    telefono: "+34 666 555 777",
    email: "manuel.torres@email.com",
    fechaReserva: "2024-01-16",
    horaReserva: "19:15",
    personas: 6,
    mesa: "Mesa 16",
  },
]

const clientesCancelados = [
  {
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
    nombre: "Carmen Díaz",
    telefono: "+34 655 444 555",
    email: "carmen.diaz@email.com",
    fechaReserva: "2024-01-15",
    horaReserva: "20:30",
    personas: 3,
    motivoCancelacion: "Trabajo",
    fechaCancelacion: "2024-01-14",
  },
  {
    id: 15,
    nombre: "Alberto Vázquez",
    telefono: "+34 666 555 666",
    email: "alberto.vazquez@email.com",
    fechaReserva: "2024-01-14",
    horaReserva: "19:00",
    personas: 5,
    motivoCancelacion: "Clima",
    fechaCancelacion: "2024-01-13",
  },
  {
    id: 16,
    nombre: "Patricia Herrera",
    telefono: "+34 677 666 777",
    email: "patricia.herrera@email.com",
    fechaReserva: "2024-01-13",
    horaReserva: "20:15",
    personas: 2,
    motivoCancelacion: "Enfermedad",
    fechaCancelacion: "2024-01-12",
  },
]

const clientesNoShow = [
  {
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
    nombre: "Lucía Jiménez",
    telefono: "+34 699 888 999",
    email: "lucia.jimenez@email.com",
    fechaReserva: "2024-01-08",
    horaReserva: "20:30",
    personas: 3,
    mesa: "Mesa 6",
    tiempoEspera: "60 min",
  },
  {
    id: 21,
    nombre: "Raúl Castillo",
    telefono: "+34 611 999 111",
    email: "raul.castillo@email.com",
    fechaReserva: "2024-01-07",
    horaReserva: "19:45",
    personas: 4,
    mesa: "Mesa 13",
    tiempoEspera: "25 min",
  },
]

export function StatisticScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPageConfirmadas, setCurrentPageConfirmadas] = useState(1)
  const [currentPageCanceladas, setCurrentPageCanceladas] = useState(1)
  const [currentPageNoShow, setCurrentPageNoShow] = useState(1)

  const itemsPerPage = 5

  // Función para filtrar y paginar datos
  const getPaginatedData = (data, searchTerm, currentPage) => {
    const filteredData = data.filter(
      (item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.telefono.includes(searchTerm),
    )

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    return { data: paginatedData, totalPages, totalItems: filteredData.length }
  }

  const confirmadosData = getPaginatedData(clientesConfirmados, searchTerm, currentPageConfirmadas)
  const canceladosData = getPaginatedData(clientesCancelados, searchTerm, currentPageCanceladas)
  const noShowData = getPaginatedData(clientesNoShow, searchTerm, currentPageNoShow)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Detalle de Clientes</h1>
            <p className="text-muted-foreground">
              Vista detallada de todos los clientes según el estado de sus reservas
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Volver a Estadísticas</Button>
            <Button variant="outline">Exportar Lista</Button>
            <Button>Contactar Cliente</Button>
          </div>
        </div>

        {/* Métricas rápidas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{clientesConfirmados.length}</div>
              <p className="text-xs text-muted-foreground">Reservas activas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{clientesCancelados.length}</div>
              <p className="text-xs text-muted-foreground">Reservas canceladas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">No Show</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{clientesNoShow.length}</div>
              <p className="text-xs text-muted-foreground">No se presentaron</p>
            </CardContent>
          </Card>
        </div>

        {/* Sección principal con tabs y paginación */}
        <Card>
          <CardHeader>
            <CardTitle>Listado Completo de Clientes</CardTitle>
            <CardDescription>Navegue por las diferentes categorías de clientes con paginación</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="confirmadas" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="confirmadas" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Confirmadas ({confirmadosData.totalItems})
                </TabsTrigger>
                <TabsTrigger value="canceladas" className="flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Canceladas ({canceladosData.totalItems})
                </TabsTrigger>
                <TabsTrigger value="noshow" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  No Show ({noShowData.totalItems})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="confirmadas" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cliente confirmado..."
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPageConfirmadas(1)
                    }}
                  />
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
                    {confirmadosData.data.map((cliente) => (
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
                <Pagination
                  currentPage={currentPageConfirmadas}
                  totalPages={confirmadosData.totalPages}
                  onPageChange={setCurrentPageConfirmadas}
                />
              </TabsContent>

              <TabsContent value="canceladas" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cliente cancelado..."
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPageCanceladas(1)
                    }}
                  />
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
                    {canceladosData.data.map((cliente) => (
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
                <Pagination
                  currentPage={currentPageCanceladas}
                  totalPages={canceladosData.totalPages}
                  onPageChange={setCurrentPageCanceladas}
                />
              </TabsContent>

              <TabsContent value="noshow" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cliente no-show..."
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPageNoShow(1)
                    }}
                  />
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
                    {noShowData.data.map((cliente) => (
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
                <Pagination
                  currentPage={currentPageNoShow}
                  totalPages={noShowData.totalPages}
                  onPageChange={setCurrentPageNoShow}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            Página {currentPage} de {totalPages}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
