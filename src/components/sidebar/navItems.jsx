import { CalendarCheck, Dice1, LayoutDashboard, ReceiptText, Store, Users } from 'lucide-react';

export const navItemsData = [
   {
      icon: <LayoutDashboard className='h-5 w-5' />,
      name: 'Dashboard',
      path: '/dashboard',
   },
   {
      icon: <ReceiptText className='h-5 w-5' />,
      name: 'Reservas',
      subItems: [
         {
            name: 'Calendario',
            path: '/dashboard/calendar',
            icon: <CalendarCheck className='h-4 w-4' />,
         },
         {
            name: 'Mesas',
            path: '/dashboard/tables',
            icon: <Dice1 className='h-4 w-4' />,
         },
      ],
   },
   {
      name: 'Detalle',
      icon: <Users className='h-5 w-5' />,
      path: '/dashboard/details',
   },
   {
      name: 'Tienda',
      icon: <Store className='h-5 w-5' />,
      path: '/dashboard/store',
   },
]