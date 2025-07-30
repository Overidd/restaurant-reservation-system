import { useReserve } from '@/hook/reservation';
import { cn } from '@/ultils';
import { Users, Utensils } from 'lucide-react';
import { Badge, Card, CardContent, CardImage } from '../UI/common';

export const ReservationInfoTable = ({ className }) => {
   const { getCurrentSelectedTable } = useReserve()

   const {
      description,
      chairs,
      image,
      name,
      status
   } = getCurrentSelectedTable()

   return (
      <Card
         className={cn(
            'h-full w-full p-0 bg-transparent',
            'overflow-hidden border-none',
            'flex flex-col',
            className,
         )}
      >
         <div className='basis-[75%] relative rounded-2xl overflow-hidden'>
            <CardImage
               src={image}
               alt={name ?? 'Mesa no disponible'}
               className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

            <Badge
               className={'absolute top-2 right-2'}
               state={status}
            />
         </div>

         <CardContent className='space-y-4'>
            <div className='flex items-center gap-3'>
               <Utensils className='w-5 h-5 text-primary-foreground' />
               <h3 className='text-xl font-bold text-primary-foreground truncate flex-1'>
                  {name}
               </h3>
            </div>

            <div className='flex items-center gap-3'>
               <Users className='w-5 h-5 text-primary-foreground' />
               <div className='flex items-baseline gap-2'>
                  <span className='text-2xl font-bold text-primary-foreground'>
                     {chairs}
                  </span>
                  <span className='text-sm text-primary-foreground/70 font-medium'>
                     {chairs === 1
                        ? 'persona'
                        : 'personas'
                     }
                  </span>
               </div>
            </div>

            {description && (
               <p className='text-sm text-primary-foreground/80 leading-relaxed line-clamp-3'>
                  {description}
               </p>
            )}
         </CardContent>
      </Card>
   )
}
