import { User } from 'lucide-react';
import { useState } from 'react';
import { NoAuthenticated } from '.';
import { UserDropdown } from '../common';
import {
   Popover,
   PopoverContent,
   PopoverTrigger
} from '../UI/common';

export const UserMenuPopover = ({
   isAuthenticated
}) => {
   const [isOpen, setIsOpen] = useState(false)

   return (
      <Popover
         open={isOpen}
         onOpenChange={setIsOpen}
      >
         <PopoverTrigger>
            <User className='w-7 h-7 text-primary-foreground cursor-pointer' />
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

