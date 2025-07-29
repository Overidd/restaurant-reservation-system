import { cn } from '@/ultils';
import { Badge, Card, CardContent, CardDescription, CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/common';


export const TopClients = ({
   className,
   topClients = [],
}) => {
   return (
      <Card className={cn(
         className
      )}>
         <CardHeader>
            {/* <CardTitle>
               Top 5 Clientes con Más Reservas
            </CardTitle> */}
            <CardDescription>
               Clientes más frecuentes del restaurante
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>
                        Cliente
                     </TableHead>
                     <TableHead>
                        Teléfono
                     </TableHead>
                     <TableHead className='text-right'>
                        Reservas
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {topClients.map((cliente, index) => (
                     <TableRow key={cliente.name}>
                        <TableCell className='font-medium'>
                           <div className='flex items-center gap-2'>
                              <Badge variant={'default'}>
                                 #{index + 1}
                              </Badge>
                              {cliente.name}
                           </div>
                        </TableCell>
                        <TableCell className='text-muted-foreground'>
                           {cliente.phone}
                        </TableCell>
                        <TableCell className='text-right font-semibold'>
                           {cliente.total}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   )
}
