import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { NavbarList } from '../navbar/NavbarList';


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

export const Footer = ({ className }) => {
   return (
      <footer
         className={cn(
            'w-full p-5 grid md:grid-cols-2 gap-4',
            'bg-[#945125] text-white',
            className
         )}
      >
         <figure className='w-1/7'>
            <img
               className='w-full h-full'
               src="./logo-while.png"
               alt="Logo de la empresa"
            />
         </figure>

         <NavbarList
            className='self-center justify-self-end flex flex-col gap-4'
            data={listMenu}
         />

         <p>
            La Canga cuenta con más de 28 años llevando felicidad a las familias sanmartinenses a través de nuestro sabor y pasión por la comida. Nuestro restaurante, orgulloso de sus raíces, fusiona ingredientes locales de la más alta calidad con técnicas perfeccionadas a lo largo del tiempo, creando un sabor inolvidable que ha conquistado el paladar de muchos en la región.
         </p>

         <small className='md:col-span-2 opacity-65'>
            Derechos de autor © lacangaperu 2025
         </small>

      </footer>
   )
}

Footer.propTypes = {
   className: PropTypes.string
}
