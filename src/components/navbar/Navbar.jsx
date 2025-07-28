
import PropTypes from 'prop-types';

import { Calendar, ShoppingCart, User } from 'lucide-react';

import { cn } from '@/ultils';

import { UserDropdown } from '../common';
import {
   Button,
   Popover,
   PopoverContent,
   PopoverTrigger
} from '../UI/common';
import { LinkCustom } from '../UI/from';
import { NoAuthenticated } from '../user';

import { useOnAuthReserve } from '@/hook';
import { useAutoCheckAuth, useIfAuthenticated, useUser } from '@/hook/auth';
import { ReservationToast } from '@/toasts';
import { listMenuData, NavbarListResponsive } from '.';


export const Navbar = ({ className }) => {
   useAutoCheckAuth()

   const {
      isAuthenticated
   } = useUser()

   const {
      reserveConfirm,
      isPendingAuth,
   } = useOnAuthReserve()

   const handleReserve = () => {
      if (!isPendingAuth) return;
      ReservationToast(reserveConfirm());
   };

   useIfAuthenticated(isAuthenticated, handleReserve);

   return (
      <nav
         className={cn(
            `bg-sidebar-background gradient-radial-primary`,
            'shadow-primary rounded-2xl md:backdrop-blur-lg p-4',
            'flex items-center gap-2 md:gap-4',
            'sticky top-4 z-50',
            className,
         )}
      >
         {/* <Link to={'/'}> */}
         <figure className='w-[3rem] h-[3rem]'>
            <img
               className='w-full h-full'
               src='/logo-while.png'
               alt='Logo de la empresa'
            />
         </figure>
         {/* </Link> */}

         <NavbarListResponsive
            data={listMenuData}
         />

         <ul className='ml-auto flex gap-3 items-center select-none'>
            <ShoppingCart className='w-7 h-7 text-primary-foreground' />

            <Popover>
               <PopoverTrigger>
                  <User className='w-7 h-7 text-primary-foreground cursor-pointer' />
               </PopoverTrigger>
               <PopoverContent className={'mt-8 bg-transparent'}>
                  {
                     isAuthenticated
                        ? <UserDropdown />
                        : <NoAuthenticated />
                  }
               </PopoverContent>
            </Popover>

            <LinkCustom to={'reserve'}>
               <Button
                  size={'lg'}
               >
                  Reservar
                  <Calendar />
               </Button>
            </LinkCustom>
         </ul>
      </nav >
   )
}

Navbar.propTypes = {
   className: PropTypes.string
}