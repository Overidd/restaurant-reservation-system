
import { cn, typeStatusTable } from '@/ultils';
import { Calendar, CheckCircle, Clock, LockKeyhole } from 'lucide-react';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '../common';
import { NumberSkeleton } from '../skeleton';

const typeStats = [
   {
      title: 'Mesas Disponibles',
      status: typeStatusTable.AVAILABLE,
      icon: CheckCircle,
      color: 'bg-table-avaible',
      textColor: 'text-table-avaible',
      bgColor: 'bg-table-avaible/1',
      description: 'Listas para reservar',
   },
   {
      title: 'Mesas Confirmadas',
      status: typeStatusTable.CONFIRMED,
      icon: Calendar,
      color: 'bg-table-confirmed',
      textColor: 'text-table-confirmed',
      bgColor: 'bg-table-confirmed/10',
      description: 'Reservas confirmadas',
   },
   {
      title: 'Reservas Pendientes',
      status: typeStatusTable.PENDING,
      icon: Clock,
      color: 'bg-table-pending',
      textColor: 'text-table-pending',
      bgColor: 'bg-table-pending/10',
      description: 'En proceso de reserva',
   },
   {
      title: 'Mesas Bloqueadas',
      status: typeStatusTable.BLOCKED,
      icon: LockKeyhole,
      color: 'bg-table-blocked',
      textColor: 'text-table-blocked',
      bgColor: 'bg-table-blocked/10',
      description: 'No disponibles',
   },
]

export const CardStats = ({
   value,
   status,
   description,
   total
}) => {
   const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
   const stats = typeStats.find((stat) => stat.status === status);
   const Icon = stats?.icon;

   return (
      <Card className='relative overflow-hidden'>
         <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 pt-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>{stats?.title}</CardTitle>
            <div className={`p-2 rounded-full ${stats?.bgColor}`}>
               <Icon className={`h-4 w-4 ${stats?.textColor}`} />
            </div>
         </CardHeader>
         <CardContent>
            <div className='flex items-baseline justify-between'>
               <div className='text-2xl font-bold text-gray-900'>{value}</div>
               <Badge variant='primary' className='text-xs'>
                  {percentage}%
               </Badge>
            </div>
            <p className='text-xs text-gray-500 mt-1'>{description}</p>

            {/* Barra de progreso */}
            <div className='mt-3'>
               <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                     className={`h-2 rounded-full ${stats?.color} transition-all duration-300`}
                     style={{ width: `${percentage}%` }}
                  />
               </div>
            </div>
         </CardContent>
      </Card>
   )
}

export const CardStatsResume = ({
   name,
   percent,
   className,
}) => {

   return (
      <Card className={cn(
         'bg-gradient-to-r from-blue-50 to-indigo-50',
         className
      )}>
         <CardContent className='p-4'>
            <div className='text-sm text-gray-600'>{name}</div>
            <div className='text-xl font-semibold'>
               {/* {total > 0 ? Math.round(((value + temporary) / total) * 100) : 0}% */}
               {percent}%
            </div>
         </CardContent>
      </Card>
   )
}

export const CardStatsResume2 = ({
   isLoading,
   title,
   icon,
   color,
   description,
   count,
   rate,
   className
}) => {
   const Icon = icon

   return (
      <Card
         className={cn(
            className
         )}
      >
         <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
               {title}
            </CardTitle>
            <Icon
               className={`h-4 w-4 `}
               style={{ color }}
            />
         </CardHeader>
         <CardContent className={'mt-auto'}>
            <div className={`text-2xl font-bold`} style={{ color }}>
               {!isLoading
                  ? count
                  : <NumberSkeleton
                     size='md'
                  />
               }
            </div>
            <div className='text-xs text-muted-foreground'>
               <span className='ml-1'>
                  {!isLoading &&
                     description &&
                     description
                  }
               </span>
            </div>
         </CardContent>
      </Card>
   )
}