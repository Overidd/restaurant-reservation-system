import { cn } from '@/ultils';
import { User } from 'lucide-react';

export const UserCard = ({ user, className }) => {
   return (
      <div className={cn(
         'flex items-center gap-2 text-card-primary',
         className
      )}>
         <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
         </div>
         <p className="text-sm space-x-1">
            <strong className='font-semibold'>
               Usuario
            </strong>
            <span>
               {user.name}
            </span>
         </p>
      </div>
   )
}