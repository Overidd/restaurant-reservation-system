import { Outlet } from 'react-router-dom';

import { SidebarProvider } from '@/doman/context/sidebar';

import { ActionSpeedDial } from '@/components/common';
import { Sidebar } from '@/components/sidebar';
import { CreateReservationsModal } from '@/screen/dashboard';

const Layout = () => {
   return (
      <div className='md:grid grid-cols-[auto_1fr_auto] grid-rows-1'>
         <Sidebar
            widthDesktop='w-[14rem]'
            widthHover='w-[14rem]'
            widthMobile='w-[5rem]'
         />

         <div className='w-full'>
            <Outlet />
         </div>

         <CreateReservationsModal
            className={'md:w-[35rem]'}
         />

         {/* <NofityReservation /> */}
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