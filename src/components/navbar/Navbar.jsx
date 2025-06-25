import { ShoppingCart, Table, User } from 'lucide-react';
import { Button } from '../UI/common';
import PropTypes from 'prop-types';
import { cn } from '@/ultils/cn';
import { NavbarList } from './NavbarList';
import { Link } from 'react-router-dom';

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
   return (
      <nav
         className={cn(
            `bg-menu gradient-radial-primary`,
            'shadow-primary rounded-2xl backdrop-blur-lg p-4',
            'flex justify-between items-center gap-4',
            'sticky top-4 z-10',
            className,
         )}
      >
         <NavbarList data={listMenu} />
         <ul className='flex gap-4 items-center'>
            <User className='w-7 h-7 text-primary-foreground' />

            <ShoppingCart className='w-7 h-7 text-primary-foreground' />

            <Link to={'/reserve'}>
               <Button size={"lg"}>
                  Ordenar
                  <Table />
               </Button>
            </Link>
         </ul>
      </nav >
   )
}

Navbar.propTypes = {
   className: PropTypes.string
}