import { cn } from '@/ultils';
import { Badge, Card, CardContent, CardDescription, CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/common';

export const TopReservationAnalysis = ({
   className,
   topClientAnalysis = []
}) => {

   console.log(topClientAnalysis);

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
               Desglose detallado de confirmadas, canceladas y no-show por cliente
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Cliente</TableHead>
                     <TableHead className='text-center'>
                        Confirmadas
                     </TableHead>
                     <TableHead className='text-center'>
                        Canceladas
                     </TableHead>
                     <TableHead className='text-center'>
                        No presentado
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
                  {topClientAnalysis.map((client) => {
                     const total = client.confirmed + client.canceled + client.noShow
                     const rateSuccess = ((client.confirmed / total) * 100).toFixed(1)

                     return (
                        <TableRow key={client.name}>
                           <TableCell className='font-medium'>{client.name}</TableCell>
                           <TableCell className='text-center'>
                              <Badge
                                 state={'confirmed'}
                              >
                                 {client.confirmed}
                              </Badge>
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
                                 state={'noShow'}
                              >
                                 {client.noShow}
                              </Badge>
                           </TableCell>
                           <TableCell className='text-center font-semibold'>
                              {total}
                           </TableCell>
                           <TableCell className='text-center'>
                              <span
                                 className={`font-semibold ${Number.parseFloat(rateSuccess) >= 80
                                    ? 'text-green-600'
                                    : Number.parseFloat(rateSuccess) >= 60
                                       ? 'text-orange-600'
                                       : 'text-red-600'
                                    }`}
                              >
                                 {rateSuccess}%
                              </span>
                           </TableCell>
                        </TableRow>
                     )
                  })}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   )
}
