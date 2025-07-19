import { useTableStats } from '@/hook/dashboard';
import { cn } from '@/ultils';
import { Card2, CardStats } from '../UI/card';
import { Badge } from '../UI/common';


export const TableStats = ({
   className,
}) => {

   const { stats, total } = useTableStats();

   return (
      <Card2
         vairant='dashed'
         className={cn(
            'space-y-4',
            className
         )}>
         <Badge variant='outline' className='text-sm'>
            Total: {total} mesas
         </Badge>
         {/* <div className='text-sm text-gray-500'>Última actualización: {new Date().toLocaleTimeString('es-ES')}</div> */}

         {
            stats.map((item) => (
               <CardStats
                  key={item.status}
                  status={item.status}
                  value={item.value}
                  total={total}
               />
            ))
         }
      </Card2>
   )
}
