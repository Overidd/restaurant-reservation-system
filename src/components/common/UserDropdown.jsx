import { useAuthStore } from '@/hook';
import { useModalUser } from '@/hook/modals';
import { CalendarCheck, CircleAlert, CircleUser, LayoutDashboard, LogOut } from 'lucide-react';
import { Link } from 'react-router';
import { Card2 } from '../UI/card';
import { DropdownItem } from '../UI/dropdown';

export const UserDropdown = () => {
   // const [isOpen, setIsOpen] = useState(false);
   const { name, email, photoURL, logout, isRoleAdmin } = useAuthStore();
   const { openModal } = useModalUser()

   // function toggleDropdown() {
   //    setIsOpen(!isOpen);
   // }

   // function closeDropdown() {
   //    setIsOpen(false);
   // }
   return (
      <Card2 className="relative">
         <button
            // onClick={toggleDropdown}
            className="flex items-center dark:text-gray-400"
         >
            <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
               <img
                  src={photoURL || '/icon/iconUser.png'}
                  alt="User"
               />
            </span>

            <div className='text-left'>
               <span className="block font-medium text-theme-sm">
                  {name}
               </span>
               <span className="mt-0.5 block text-theme-xs">
                  {email}
               </span>
            </div>

         </button>

         <ul className="flex flex-col gap-1 pt-4 pb-3">
            <li>
               <DropdownItem
                  // onItemClick={closeDropdown}
                  // tag="a"
                  // href="/profile"
                  onClick={() => openModal('profile')}
                  className="flex items-center gap-3 px-3 py-2 font-medium"
               >
                  <CircleUser />
                  Editar Perfil
               </DropdownItem>
            </li>

            <li>
               <DropdownItem
                  // tag="a"
                  onClick={() => openModal('reservations')}
                  className="flex items-center gap-3 px-3 py-2 font-medium"
               >
                  <CalendarCheck />
                  Tus reservas
               </DropdownItem>
            </li>

            <li>
               <DropdownItem
                  // onItemClick={closeDropdown}
                  // tag="a"
                  // href="/profile"
                  // onClick={() => openModal('support')}
                  className="flex items-center gap-3 px-3 py-2 font-medium"
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
                     tag="a"
                     href="/dashboard"
                     className="flex items-center gap-3 px-3 py-2 font-medium"
                  >
                     <LayoutDashboard />
                     Ir al panel
                  </DropdownItem>
               </li>
            }
         </ul>

         <Link
            to="/signin"
            className="flex items-center gap-3 px-3 py-2 mt-3 font-medium"
            onClick={logout}
         >
            <LogOut className='rotate-180' />
            Cerrar Sesión
         </Link>
      </Card2>
   );
}