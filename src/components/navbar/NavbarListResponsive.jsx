import { cn } from '@/ultils';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card2 } from '../UI/card';
import { Button } from '../UI/common';
import { NavbarList } from './NavbarList';

export const NavbarListResponsive = ({ data }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
      if (isMenuOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }
   }, [isMenuOpen]);

   return (
      <>
         <div className='hidden md:block'>
            <NavbarList
               data={data}
               isMobile={false}
            />
         </div>

         {isMenuOpen && (
            <Card2
               onClick={() => setIsMenuOpen(false)}
               className={cn(
                  'fixed top-0 left-0 z-50 w-screen h-screen md:hidden',
                  'bg-sidebar-background rounded-none'
               )}
            >
               <div className='px-2 pt-2 pb-3 space-y-1'>
                  <NavbarList
                     data={data}
                     isMobile={true}
                     onItemClick={() => setIsMenuOpen(false)}
                  />
               </div>
            </Card2>
         )}

         <Button
            className='md:hidden text-accent-foreground'
            variant='ghost'
            size='icon'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
         >
            {!isMenuOpen && <Menu className='h-12 w-12' />}
         </Button>
      </>
   );
};
