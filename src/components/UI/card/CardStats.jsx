
import { cn, typeStatusTable } from '@/ultils';
import { Calendar, CheckCircle, Clock, LockKeyhole } from 'lucide-react';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '../common';
import { NumberSkeleton } from '../skeleton';

// interface TableStatsProps {
//   reserved?: number
//   available?: number
//   temporary?: number
//   blocked?: number
// }

// export const TableStats = ({
//    reserved = 12,
//    available = 8,
//    temporary = 3,
//    blocked = 2,
//    className,
// }) => {

//    const total = reserved + available + temporary + blocked

//    const stats = [
//       {
//          title: 'Mesas Reservadas',
//          value: reserved,
//          icon: Calendar,
//          color: 'bg-blue-500',
//          textColor: 'text-blue-600',
//          bgColor: 'bg-blue-50',
//          description: 'Reservas confirmadas',
//       },
//       {
//          title: 'Mesas Disponibles',
//          value: available,
//          icon: CheckCircle,
//          color: 'bg-green-500',
//          textColor: 'text-green-600',
//          bgColor: 'bg-green-50',
//          description: 'Listas para reservar',
//       },
//       {
//          title: 'Mesas Temporales',
//          value: temporary,
//          icon: Clock,
//          color: 'bg-yellow-500',
//          textColor: 'text-yellow-600',
//          bgColor: 'bg-yellow-50',
//          description: 'En proceso de reserva',
//       },
//       {
//          title: 'Mesas Bloqueadas',
//          value: blocked,
//          icon: XCircle,
//          color: 'bg-red-500',
//          textColor: 'text-red-600',
//          bgColor: 'bg-red-50',
//          description: 'No disponibles',
//       },
//    ]

//    return (
//       <div className={cn(
//          'w-full max-w-6xl mx-auto p-6',
//          className
//       )}>
//          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
//             {stats.map((stat, index) => {
//                const Icon = stat.icon
//                const percentage = total > 0 ? Math.round((stat.value / total) * 100) : 0

//                return (
//                   <Card key={index} className='relative overflow-hidden'>
//                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                         <CardTitle className='text-sm font-medium text-gray-600'>{stat.title}</CardTitle>
//                         <div className={`p-2 rounded-full ${stat.bgColor}`}>
//                            <Icon className={`h-4 w-4 ${stat.textColor}`} />
//                         </div>
//                      </CardHeader>
//                      <CardContent>
//                         <div className='flex items-baseline justify-between'>
//                            <div className='text-2xl font-bold text-gray-900'>{stat.value}</div>
//                            <Badge variant='secondary' className='text-xs'>
//                               {percentage}%
//                            </Badge>
//                         </div>
//                         <p className='text-xs text-gray-500 mt-1'>{stat.description}</p>

//                         {/* Barra de progreso */}
//                         <div className='mt-3'>
//                            <div className='w-full bg-gray-200 rounded-full h-2'>
//                               <div
//                                  className={`h-2 rounded-full ${stat.color} transition-all duration-300`}
//                                  style={{ width: `${percentage}%` }}
//                               />
//                            </div>
//                         </div>
//                      </CardContent>
//                   </Card>
//                )
//             })}
//          </div>

//          {/* Resumen adicional */}
//          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
//             <Card className='bg-gradient-to-r from-blue-50 to-indigo-50'>
//                <CardContent className='p-4'>
//                   <div className='text-sm text-gray-600'>Ocupación</div>
//                   <div className='text-xl font-semibold text-blue-600'>
//                      {total > 0 ? Math.round(((reserved + temporary) / total) * 100) : 0}%
//                   </div>
//                </CardContent>
//             </Card>

//             <Card className='bg-gradient-to-r from-green-50 to-emerald-50'>
//                <CardContent className='p-4'>
//                   <div className='text-sm text-gray-600'>Disponibilidad</div>
//                   <div className='text-xl font-semibold text-green-600'>
//                      {total > 0 ? Math.round((available / total) * 100) : 0}%
//                   </div>
//                </CardContent>
//             </Card>

//             <Card className='bg-gradient-to-r from-purple-50 to-pink-50'>
//                <CardContent className='p-4'>
//                   <div className='text-sm text-gray-600'>Eficiencia</div>
//                   <div className='text-xl font-semibold text-purple-600'>
//                      {blocked > 0 ? Math.round(((total - blocked) / total) * 100) : 100}%
//                   </div>
//                </CardContent>
//             </Card>
//          </div>
//       </div>
//    )
// }
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
         <CardContent>
            <div className={`text-2xl font-bold`} style={{ color }}>
               {!isLoading
                  ? count
                  : <NumberSkeleton
                     size='md'
                  />
               }
            </div>
            <div className='text-xs text-muted-foreground'>
               {!isNaN(rate) && (
                  !isLoading
                     ? `${rate}%`
                     : <NumberSkeleton
                        size='sm'
                     />
               )
               }
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