import { cn } from '@/ultils';
import { CardStatsResume2 } from '../UI/card';


export const StatsSummary = ({
   className,
   metrics = [],
}) => {

   return (
      <div className={cn(
         'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
         className
      )}>
         {
            metrics.map((metric) => (
               <CardStatsResume2
                  key={metric?.id}
                  {...metric}
               />
            ))
         }
      </div>

   )
}
