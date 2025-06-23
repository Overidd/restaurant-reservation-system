import { ShoppingCart, Table, User } from 'lucide-react';
import { Button } from '../UI/common';
import PropTypes from 'prop-types';
import { cn } from '@/ultils/cn';

export const Navbar = ({ className }) => {
   return (
      <nav
         className={cn(
            `bg-menu gradient-radial-primary`,
            'shadow-primary rounded-2xl backdrop-blur-lg p-4',
            'flex justify-end items-center gap-4',
            'sticky top-0 z-10',
            className,
         )}
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
