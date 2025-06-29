import PropTypes from 'prop-types';
import { cn } from '@/ultils';
import { Link } from 'react-router-dom';
import { ShoppingCart, Table, User } from 'lucide-react';
import { Button, Popover } from '../UI/common';
import { NavbarList } from './NavbarList';
import { LinkCustom } from '../UI/from';
import { Card2 } from '../UI/card';
import { useAuthStore, useCheckAuth } from '@/hook';
import { Authenticated, NoAuthenticated } from '../user';

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
   const { isAuthenticated } = useCheckAuth()
   const { name, photoURL, logoutPermanently } = useAuthStore()

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

            <Popover
               trigger='click'
               placement='bottom'
               contentClassName='z-50 mt-6'
               content={
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
               }
            >
               <User className='w-7 h-7 text-primary-foreground cursor-pointer' />
            </Popover>

            <LinkCustom to={'/reserve'}>
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