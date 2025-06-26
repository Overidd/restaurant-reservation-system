import PropTypes from 'prop-types';
import { cn } from '@/ultils/cn';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../UI/common';
import { NavbarList } from './NavbarList';
import { ShoppingCart, Table, User } from 'lucide-react';

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
   const navigate = useNavigate();
   const location = useLocation();

   const openModalReserve = () => {
      navigate(`${location.pathname}/reserve`, { state: { background: location } });
   };

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

         <ul className='ml-auto flex gap-2 items-center'>
            <User className='w-7 h-7 text-primary-foreground' />

            <ShoppingCart className='w-7 h-7 text-primary-foreground' />

            <Button
               onClick={openModalReserve}
               size={"lg"}
            >
               Ordenar
               <Table />
            </Button>
         </ul>
      </nav >
   )
}

Navbar.propTypes = {
   className: PropTypes.string
}