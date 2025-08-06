import { useAuthStore, useUser } from '@/hook/auth';
import { useModalUser } from '@/hook/modals';
import { UserToasts } from '@/toasts/UserToasts';
import { cn } from '@/ultils';
import { CalendarCheck, CircleAlert, CircleUser, LayoutDashboard, LogOut } from 'lucide-react';
import { Link } from 'react-router';
import { Card2, UserCard } from '../UI/card';
import { DropdownItem } from '../UI/dropdown';

export const UserDropdown = ({
   className,
   onClick,
}) => {
   const {
      logoutPermanently
   } = useAuthStore();

   const {
      photoURL,
      name,
      email,
      isRoleAdmin
   } = useUser()

   const {
      openModal
   } = useModalUser()

   const handleLogout = () => {
      UserToasts.logout(logoutPermanently())
   }

   return (
      <Card2
         onClick={onClick}
         className={cn(
            'relative',
            className
         )}
      >
         <UserCard
            size='lg'
            className={'text-accent-foreground'}
            user={{
               photoURL,
               name,
               email
            }}
            mustShow={['name', 'email']}
         />

         <ul className='flex flex-col gap-1 pt-4 pb-3'>
            <li>
               <DropdownItem
                  onClick={() => openModal('profile')}
                  className='flex items-center gap-3 px-3 py-2 font-medium'
               >
                  <CircleUser />
                  Editar Perfil
               </DropdownItem>
            </li>

            <li>
               <DropdownItem
                  onClick={() => openModal('reservationsActive')}
                  className='flex items-center gap-3 px-3 py-2 font-medium'
               >
                  <CalendarCheck />
                  Tus reservas Activas
               </DropdownItem>
            </li>

            <li>
               <DropdownItem
                  onClick={() => openModal('reservationsaCancel')}
                  className='flex items-center gap-3 px-3 py-2 font-medium'
               >
                  <CalendarCheck />
                  Tus reservas Canceladas
               </DropdownItem>
            </li>

            <li>
               <DropdownItem
                  // onItemClick={closeDropdown}
                  // tag='a'
                  // href='/profile'
                  // onClick={() => openModal('support')}
                  className='flex items-center gap-3 px-3 py-2 font-medium'
               >
                  <CircleAlert />
                  Soporte
               </DropdownItem>
            </li>
            {
               isRoleAdmin &&
               <li>
                  <DropdownItem
                     // onItemClick={closeDropdown}
                     tag='a'
                     href='/dashboard'
                     className='flex items-center gap-3 px-3 py-2 font-medium'
                  >
                     <LayoutDashboard />
                     Ir al panel
                  </DropdownItem>
               </li>
            }
         </ul>

         <Link
            className='flex items-center gap-3 px-3 py-2 mt-3 font-medium transition-all hover:-translate-x-1'
            onClick={handleLogout}
         >
            <LogOut className='rotate-180' />
            Cerrar Sesión
         </Link>
      </Card2>
   );
}