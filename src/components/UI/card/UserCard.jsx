import { cn } from '@/ultils';
import { User } from 'lucide-react';

export const UserCard = ({
   user: { name },
   className
}) => {
   return (
      <div className={cn(
         'flex items-center gap-2 text-card-primary',
         className
      )}>
         <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
         </div>
         <p className="text-sm space-x-1">
            <strong className='font-semibold block'>
               {name}
            </strong>
         </p>
      </div>
   )
}

export const UserCardReservation = ({
   user: { name, code, date },
   className
}) => {
   return (
      <div className={cn(
         'flex items-center gap-3 text-card-primary',
         className
      )}>
         <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-primary" />
         </div>

         <div className="text-sm leading-tight space-y-0.5">
            <p className="font-semibold text-foreground">{name}</p>

            {date && (
               <p className="text-xs text-muted-foreground">
                  {date}
               </p>
            )}
            {code && (
               <p className="text-xs text-muted-foreground">
                  {code}
               </p>
            )}

         </div>
      </div>
   );
}