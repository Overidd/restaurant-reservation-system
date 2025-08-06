import { Mail, Phone, Calendar, MapPin } from 'lucide-react';

export const UserDetailInfo = ({ selectUser }) => (
   <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
      <li className='flex items-center gap-2'>
         <Mail className='h-4 w-4' />
         <span>{selectUser.email}</span>
      </li>
      <li className='flex items-center gap-2'>
         <Phone className='h-4 w-4' />
         <span>{selectUser.phone || 'Sin telefono'}</span>
      </li>
      <li className='flex items-center gap-2'>
         <Calendar className='h-4 w-4' />
         <span>{selectUser.updatedAt}</span>
      </li>
      <li className='flex items-center gap-2'>
         <MapPin className='h-4 w-4' />
         <span>{selectUser.address || 'Sin direccion'}</span>
      </li>
   </ul>
);