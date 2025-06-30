import { cn } from '@/ultils';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card2 } from '../UI/card';
import { LinkCustom } from '../UI/from';
import { NavbarList } from './NavbarList';
import { ShoppingCart, Table, User } from 'lucide-react';
import { Authenticated, NoAuthenticated } from '../user';

import {
   Button,
   Popover,
   PopoverContent,
   PopoverTrigger
} from '../UI/common';

import {
   useAuthStore,
   useCheckAuth,
   useIfAuthenticated,
   useOnAuthReserve
} from '@/hook';

const listMenu = [
   {
      id: 1,
      name: 'Realiza tu pedido',
      path: '/product',
   },
   {
      id: 2,
      name: 'Localidades',
      path: '/location',
   },
]

export const Navbar = ({ className }) => {
   const { isAuthenticated } = useCheckAuth({ autoCheck: true })
   const { name, photoURL, logoutPermanently } = useAuthStore()
   const { reserveConfirm } = useOnAuthReserve()
   useIfAuthenticated(isAuthenticated, reserveConfirm);

   return (
      <nav
         className={cn(
            `bg-menu gradient-radial-primary`,
            'shadow-primary rounded-2xl backdrop-blur-lg p-4',
            'flex items-center gap-4',
            'sticky top-4 z-50',
            className,
         )}
      >
         <Link to={'/'}>
            <figure className='w-[3rem] h-[3rem]'>
               <img
                  className='w-full h-full'
                  src="/logo-while.png"
                  alt="Logo de la empresa"
               />
            </figure>
         </Link>
         <NavbarList data={listMenu} />

         <ul className='ml-auto flex gap-3 items-center select-none'>
            <ShoppingCart className='w-7 h-7 text-primary-foreground' />

            <Popover>
               <PopoverTrigger>
                  <User className='w-7 h-7 text-primary-foreground cursor-pointer' />
               </PopoverTrigger>
               <PopoverContent className={'mt-8 bg-transparent'}>
                  <Card2 className='flex flex-col gap-2 shadow-2xl'>
                     {
                        isAuthenticated
                           ? <Authenticated
                              name={name}
                              photoURL={photoURL}
                              onlogout={logoutPermanently}
                           />
                           : <NoAuthenticated />
                     }
                  </Card2>
               </PopoverContent>
            </Popover>

            <LinkCustom to={'reserve'}>
               <Button
                  size={"lg"}
               >
                  Ordenar
                  <Table />
               </Button>
            </LinkCustom>
         </ul>
      </nav >
   )
}

Navbar.propTypes = {
   className: PropTypes.string
}