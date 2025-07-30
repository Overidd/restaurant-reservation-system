
import PropTypes from 'prop-types';

import { Calendar, ShoppingCart } from 'lucide-react';

import { cn } from '@/ultils';

import {
   Button
} from '../UI/common';
import { LinkCustom } from '../UI/from';
import { UserMenuPopover } from '../user';

import { useAutoCheckAuth, useIfAuthenticated, useUser } from '@/hook/auth';
import { useModalAsync, useOnAuthReserve } from '@/hook/common';
import { ReservationToast } from '@/toasts';
import { Link } from 'react-router-dom';
import { listMenuData, NavbarListResponsive } from '.';
import { DialogEnterPhone } from '../UI/dialog';

export const Navbar = ({ className }) => {
   useAutoCheckAuth()

   const {
      showAsyncModal
   } = useModalAsync();

   const {
      isRegisterPhone,
      isAuthenticated
   } = useUser()

   const {
      reserveConfirm,
      isPendingAuth,
   } = useOnAuthReserve()

   const handleReserve = async () => {
      if (!isPendingAuth) return;

      if (!isRegisterPhone) {
         const res = await showAsyncModal(({
            onConfirm,
            onCancel
         }) => (
            <DialogEnterPhone
               onCancel={onCancel}
               onConfirm={onConfirm}
            />
         ));
         if (!res) return;
      }

      ReservationToast(
         reserveConfirm()
      );
   };

   useIfAuthenticated(isAuthenticated, handleReserve);

   return (
      <nav
         className={cn(
            `bg-sidebar-background gradient-radial-primary`,
            'shadow-primary rounded-2xl md:backdrop-blur-lg p-4',
            'flex items-center gap-2 md:gap-4',
            'fixed top-4 left-0 right-0 mx-auto z-50',
            className,
         )}
      >
         <Link to={'/home'}>
            <figure className='w-[3rem] h-[3rem]'>
               <img
                  className='w-full h-full'
                  src='/logo-while.png'
                  alt='Logo de la empresa'
               />
            </figure>
         </Link>

         <NavbarListResponsive
            data={listMenuData}
         />

         <ul className='ml-auto flex gap-3 items-center select-none'>
            <ShoppingCart className='w-7 h-7 text-primary-foreground' />
            <UserMenuPopover
               isAuthenticated={isAuthenticated}
            />

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