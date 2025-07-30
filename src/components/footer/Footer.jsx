import { cn } from '@/ultils/cn';
import PropTypes from 'prop-types';
import { listMenuData } from '../navbar';
import { NavbarList } from '../navbar/NavbarList';

export const Footer = ({ className }) => {
   return (
      <footer
         className={cn(
            'bg-[#945125] text-white',
            'w-full py-10 mt-auto',
         )}
         >
         <div className={cn(
            'px-4 grid grid-cols-1 md:grid-cols-3 gap-8',
            className,
         )}>

            {/* Logo y descripción */}
            <div className='flex flex-col gap-4'>
               <figure className='w-20 h-20'>
                  <img
                     src="/logo-while.png"
                     alt="Logo de la empresa"
                     className='w-full h-full object-contain'
                  />
               </figure>

               <p className='text-sm leading-relaxed opacity-90'>
                  La Canga cuenta con más de 28 años llevando felicidad a las familias sanmartinenses a través de nuestro sabor y pasión por la comida.
               </p>
            </div>

            {/* Menú de navegación */}
            <div className='md:col-span-1'>
               <h4 className='text-lg font-semibold mb-4'>Enlaces útiles</h4>
               <NavbarList
                  className='flex flex-col items-start gap-2'
                  data={listMenuData}
               />
            </div>

            {/* Descripción extendida */}
            <div className='md:col-span-1'>
               <h4 className='text-lg font-semibold mb-4'>Nuestra historia</h4>
               <p className='text-sm leading-relaxed opacity-90'>
                  Nuestro restaurante, orgulloso de sus raíces, fusiona ingredientes locales de la más alta calidad con técnicas perfeccionadas a lo largo del tiempo. Creamos un sabor inolvidable que ha conquistado el paladar de muchos en la región.
               </p>
            </div>

            {/* Línea divisoria + copyright */}
            <div className='md:col-span-3 border-t border-white/30 pt-6 text-center text-xs opacity-70'>
               © 2025 La Canga Perú. Todos los derechos reservados.
            </div>
         </div>
      </footer>
   );
}

Footer.propTypes = {
   className: PropTypes.string
}
