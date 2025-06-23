import { ShoppingCart, Table, User } from 'lucide-react';
import { Button } from '../UI/common';
import PropTypes from 'prop-types';

export const Navbar = ({ className }) => {
   return (
      <nav
         className={`flex justify-end items-center bg-menu  gradient-radial-primary gap-4 shadow-primary rounded-2xl p-4 sticky top-0 z-10 ${className}`}
      >
         <User className='w-7 h-7 text-primary-foreground' />

         <ShoppingCart className='w-7 h-7 text-primary-foreground' />

         <Button size={"lg"}>
            Ordenar
            <Table />
         </Button>
      </nav>
   )
}

Navbar.propTypes = {
   className: PropTypes.string
}
