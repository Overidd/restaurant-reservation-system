import { SidebarProvider } from '@/doman/context/sidebar';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { NofityReservation } from '@/components/dashboard';
import { ActionSpeedDial } from '@/components/common';

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