import { User } from 'lucide-react';
import { useState } from 'react';
import { NoAuthenticated } from '.';
import { UserDropdown } from '../common';
import { useUser } from '@/hook/auth';

import {
   Popover,
   PopoverContent,
   PopoverTrigger
} from '../UI/common';
import { UserCard } from '../UI/card';

export const UserMenuPopover = ({
   isAuthenticated
}) => {
   const [isOpen, setIsOpen] = useState(false)

   const {
      photoURL,
      name,
   } = useUser()

   return (
      <Popover
         open={isOpen}
         onOpenChange={setIsOpen}
      >
         <PopoverTrigger>
            {!isAuthenticated
               ? <User className='w-7 h-7 text-primary-foreground cursor-pointer' />
               : <UserCard
                  classNamePhoto={'w-7 h-7 cursor-pointer'}
                  mustShow={[]}
                  user={{
                     name,
                     photoURL
                  }}
               />
            }
         </PopoverTrigger>
         {isOpen && (
            isAuthenticated
               ? <PopoverContent
                  className='mt-8 bg-transparent'
               >
                  <UserDropdown onClick={() => setIsOpen(false)} />
               </PopoverContent>
               : <PopoverContent
                  className='mt-8 bg-transparent'
               >
                  <NoAuthenticated onClick={() => setIsOpen(false)} />
               </PopoverContent>
         )}
      </Popover>
   );
};

