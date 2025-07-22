import { usePaginatedUsers } from '@/hook/dashboard'
import { cn } from '@/ultils'
import { Phone, Search } from 'lucide-react'
import { UserCard } from '../UI/card'
import { Button, Card, CardContent, CardHeader, CardTitle, Pagination, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/common'
import { Input } from '../UI/from'

export const UsersTable = ({
   onSelectUser,
   className,
   users,
   itemsPerPage = 10
}) => {

   const {
      searchTerm,
      setSearchTerm,
      setCurrentPage,
      filteredClientes,
      totalItems,
      currentPage,
      totalPages,
   } = usePaginatedUsers({
      users,
      itemsPerPage
   })

   return (
      <Card className={cn(
         className
      )}>
         <CardHeader>
            <CardTitle>
               Directorio de Clientes
            </CardTitle>
            {/* <CardDescription>
               Haga clic en Ver Detalles para acceder al historial completo y perfil del user
            </CardDescription> */}
         </CardHeader>
         <CardContent>
            <div className='space-y-4'>
               <div className='flex items-center space-x-2'>
                  <Search className='h-4 w-4 text-muted-foreground' />
                  <Input
                     placeholder='Buscar por nombre, email o teléfono...'
                     className='max-w-sm'
                     value={searchTerm}
                     variant='outline'
                     onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                     }}
                  />
               </div>

               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>
                           Regristrado
                        </TableHead>
                        <TableHead>
                           Usuario
                        </TableHead>
                        <TableHead >
                           phone
                        </TableHead>
                        <TableHead>
                           Total Reservas
                        </TableHead>
                        <TableHead>
                           Tasa Éxito
                        </TableHead>
                        <TableHead>
                           Acciones
                        </TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody
                  >
                     {filteredClientes.map((user) => {
                        const rateSuccess = ((user.metrics?.released || 0) / (user.metrics?.total || 0) * 100).toFixed(1)
                        return (
                           <TableRow key={user.id}>
                              <TableCell
                                 className='text-sm text-muted-foreground'
                              >
                                 {user?.updatedAt ?? new Date().toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                 <div className='flex items-center gap-3'>
                                    <UserCard
                                       mustShow={['name', 'email']}
                                       user={{
                                          name: user.name,
                                          email: user.email,
                                          photoURL: user?.photoURL
                                       }}
                                    />
                                 </div>
                              </TableCell>
                              <TableCell
                              >
                                 <div className='flex items-center gap-1 text-sm'>
                                    <Phone className='h-3 w-3' />
                                    {user.phone}
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <div className='text-center'>
                                    <div className='font-semibold'>
                                       {user.metrics.total}
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                       reservas
                                    </div>
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <div
                                    className={`text-center font-semibold ${Number.parseFloat(rateSuccess) >= 90
                                       ? 'text-green-600'
                                       : Number.parseFloat(rateSuccess) >= 80
                                          ? 'text-yellow-600'
                                          : 'text-red-600'
                                       }`}
                                 >
                                    {
                                       rateSuccess === 'NaN'
                                          ? '0%'
                                          : rateSuccess + '%'
                                    }
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() => onSelectUser(user)}
                                 >
                                    Ver Detalles
                                 </Button>
                              </TableCell>
                           </TableRow>
                        )
                     })}
                  </TableBody>
               </Table>

               {totalItems > 0 && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     totalItems={totalItems}
                     itemsPerPage={itemsPerPage}
                     onPageChange={setCurrentPage}
                  />
               )}

               {filteredClientes.length === 0 && (
                  <div className='text-center py-8 text-muted-foreground'>
                     No se encontraron clientes que coincidan con la búsqueda.
                  </div>
               )}
            </div>
         </CardContent>
      </Card>
   )
}
