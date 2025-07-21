import { Outlet } from 'react-router-dom';

import { SidebarProvider } from '@/doman/context/sidebar';

import { ActionSpeedDial } from '@/components/common';
import { NofityReservation } from '@/components/mapScreen';
import { Sidebar } from '@/components/sidebar';
import { CreateReservationsModal } from '@/screen/dashboard';

const Layout = () => {
   return (
      <div className='grid grid-cols-[1fr_auto] grid-rows-1 relative'>
         <Sidebar
            widthDesktop='w-[230px]'
            widthHover='w-[230px]'
            widthMobile='w-[80px]'
         />

         <div className='ml-[100px]'>
            <Outlet />
         </div>

         <CreateReservationsModal
            className={'w-[35rem]'}
         />
         
         <NofityReservation />
         <ActionSpeedDial />
      </div>
   )
}

export const DashboardLayout = () => {
   return (
      <SidebarProvider>
         <Layout />
      </SidebarProvider>
   )
}