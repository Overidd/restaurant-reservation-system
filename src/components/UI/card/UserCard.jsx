import { cn } from '@/ultils';
import { User } from 'lucide-react';

export const UserCard = ({
   user: {
      name = 'Name',
      lastName,
      photoURL,
      email
   },
   className,
   classNamePhoto,
   mustShow = ['name', 'lastName'],
   size = 'md' // 'sm' | 'md' | 'lg'
}) => {

   const getInitials = (name, lastName) => {
      return [name, lastName]
         .filter(Boolean)
         .map((word) => word.charAt(0).toUpperCase())
         .slice(0, 2)
         .join('')
   }

   const sizeConfig = {
      xs: {
         container: 'w-4 h-4',
         text: 'text-[10px]',
         icon: 'w-2.5 h-2.5',
      },
      sm: {
         container: 'w-6 h-6',
         text: 'text-xs',
         icon: 'w-3 h-3',
      },
      md: {
         container: 'w-8 h-8',
         text: 'text-sm',
         icon: 'w-4 h-4',
      },
      lg: {
         container: 'w-10 h-10',
         text: 'text-base',
         icon: 'w-5 h-5',
      },
      xl: {
         container: 'w-12 h-12',
         text: 'text-lg',
         icon: 'w-6 h-6',
      },
      ['2xl']: {
         container: 'w-14 h-14',
         text: 'text-xl',
         icon: 'w-7 h-7',
      },
   }

   const config = sizeConfig[size]
   return (

      <div className={cn(
         'flex items-center gap-2 text-card-foreground',
         className
      )}>
         <div
            className={cn(
               'bg-background rounded-full flex items-center justify-center overflow-hidden relative',
               config.container,
               classNamePhoto,
            )}
         >
            {photoURL ? (
               <img
                  src={photoURL}
                  alt={`${name} profile`}
                  referrerPolicy='no-referrer'
                  className='w-full h-full object-cover'
                  width={48}
                  height={48}
                  onError={(e) => {
                     e.currentTarget.style.display = 'none'
                  }}
               />
            ) : null}

            <div className={cn(
               'absolute inset-0 flex items-center justify-center', photoURL ? 'opacity-0' : 'opacity-100'
            )}>
               {name
                  ? <span className={cn('font-semibold text-primary', config.text)}>
                     {getInitials(name, lastName)}
                  </span>
                  : <User className={cn('text-primary', config.icon)} />
               }
            </div>
         </div>
         {mustShow.length > 0 &&
            <div className='flex-1 min-w-0'>
               <p className={cn('space-x-1', config.text)}>
                  <strong className='font-semibold block truncate truncate-text-nowarp w-full text-left capitalize'>
                     {mustShow.includes('name') && name}
                  </strong>
                  {email && mustShow.includes('email') &&
                     <span className='text-sm block truncate'>
                        {email}
                     </span>}
               </p>
            </div>
         }
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
         <div className='w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center shrink-0'>
            <User className='w-4 h-4 text-primary' />
         </div>

         <div className='text-sm leading-tight space-y-0.5'>
            <p className='font-semibold text-foreground'>{name}</p>

            {date && (
               <p className='text-xs text-muted-foreground'>
                  {date}
               </p>
            )}
            {code && (
               <p className='text-xs text-muted-foreground'>
                  {code}
               </p>
            )}

         </div>
      </div>
   );
}