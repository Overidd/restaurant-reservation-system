import { cn } from '@/ultils';
import { Heart, Star } from 'lucide-react';
import { UserCard } from '.';

// Las recetas aquí no sólo son deliciosas
export const CardTestimonial = ({
   className,
   text = '',
   user = {},
   stars = 5
}) => {
   return (
      <div
         data-aos='fade-left'
         data-aos-anchor='#example-anchor'
         data-aos-offset='500'
         data-aos-duration='500'
         className={cn(
            'max-w-sm mx-auto bg-card rounded-2xl p-3 space-y-2',
            className
         )}>
         <div className='flex justify-center space-x-1'>
            {[...Array(5)].map((_, i) => (
               <Star key={i} className={cn(
                  'w-4 h-4',
                  i < stars && 'w-5 h-5 fill-yellow-400 text-yellow-400',
                  !(i < stars) && 'w-5 h-5 fill-gray-200 text-gray-200'
               )} />
            ))}
         </div>

         <div className='text-center'>
            <p className='text-gray-800 bg-gray-100 p-4 text-md font-medium leading-relaxed'>
               {text}
            </p>
         </div>

         <div className='flex items-center justify-between pt-4'>
            <UserCard user={user} />

            <Heart className='w-6 h-6 text-gray-600 hover:text-primary cursor-pointer transition-colors' />
         </div>
      </div>
   )
}
