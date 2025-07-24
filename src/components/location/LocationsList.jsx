import { cn } from '@/ultils';
import { CardSkeleton } from '../UI/skeleton';
import { ItemLocation } from './ItemLocation';

export const LocationsList = ({
   className,
   data = [],
   isLoading = false
}) => {
   return (
      <section
         className={cn(
            'grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8 auto-rows-[35rem]',
            className
         )}
      >
         {isLoading && Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton
               key={'index-' + index}
               variant='product'
            />
         ))

         }
         {!isLoading && data.map((value, index) => (
            <ItemLocation
               key={value?.id ?? new Date().getTime() + index}
               {...value}
            />
         ))
         }
      </section>
   )
}
