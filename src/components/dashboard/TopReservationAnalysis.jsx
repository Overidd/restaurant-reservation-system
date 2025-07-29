import { cn } from '@/ultils';
import { Badge, Card, CardContent, CardDescription, CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/common';

export const TopReservationAnalysis = ({
   className,
   topClientAnalysis = []
}) => {
   return (
      <Card
         className={cn(
            className
         )}
      >
         <CardHeader>
            {/* <CardTitle>
               Análisis de Reservas por Cliente
            </CardTitle> */}
            <CardDescription>
               Análisis de Reservas por Cliente
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Cliente</TableHead>
                     <TableHead className='text-center'>
                        Canceladas
                     </TableHead>
                     <TableHead className='text-center'>
                        Confirmadas
                     </TableHead>
                     <TableHead className='text-center'>
                        No presentado
                     </TableHead>
                     <TableHead className='text-center'>
                        Completadas
                     </TableHead>
                     <TableHead className='text-center'>
                        Total
                     </TableHead>
                     <TableHead className='text-center'>
                        Tasa Éxito
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {topClientAnalysis.map((client) => (
                     <TableRow key={client.name}>
                        <TableCell className='font-medium'>
                           {client.name}
                        </TableCell>
                        <TableCell className='text-center'>
                           <Badge
                              state={'canceled'}
                           >
                              {client.canceled}
                           </Badge>
                        </TableCell>
                        <TableCell className='text-center'>
                           <Badge
                              state={'confirmed'}
                           >
                              {client.confirmed}
                           </Badge>
                        </TableCell>
                        <TableCell className='text-center'>
                           <Badge
                              state={'noShow'}
                           >
                              {client.noShow}
                           </Badge>
                        </TableCell>
                        <TableCell className='text-center'>
                           <Badge
                              state={'released'}
                           >
                              {client.released}
                           </Badge>
                        </TableCell>
                        <TableCell className='text-center font-semibold'>
                           {client.total}
                        </TableCell>
                        <TableCell className='text-center'>
                           <span
                              className={`font-semibold ${Number.parseFloat(client.rate) >= 80
                                 ? 'text-green-600'
                                 : Number.parseFloat(client.rate) >= 60
                                    ? 'text-orange-600'
                                    : 'text-red-600'
                                 }`}
                           >
                              {client.rate} %
                           </span>
                        </TableCell>
                     </TableRow>
                  )
                  )}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   )
}
