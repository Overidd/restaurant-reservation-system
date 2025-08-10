import { cn } from '@/ultils';
import { Badge, Card, CardContent, CardDescription, CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/common';

export const ProblematicClients = ({
   className,
   problematicClients = [],
}) => {
   return (
      <Card
         className={cn(
            className
         )}
      >
         <CardHeader>
            {/* <CardTitle>
               Clientes no presentados
            </CardTitle> */}
            <CardDescription>
               Clientes que no se presentaron a sus reservas
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
                        No presentados
                     </TableHead>
                     <TableHead>
                        Última Fecha
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {problematicClients.map((cliente) => (
                     <TableRow key={cliente.name}>
                        <TableCell className='font-medium'>
                           {cliente.name}
                        </TableCell>
                        <TableCell>
                           <Badge variant='destructive'>
                              {cliente.noShow}
                           </Badge>
                        </TableCell>
                        <TableCell className='text-muted-foreground'>
                           {cliente.dataStr}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   )
}