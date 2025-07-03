import { SidebarProvider } from '@/doman/context/sidebar';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';

const Layout = () => {
   return (
      <>
         <Sidebar
            widthDesktop='w-[230px]'
            widthHover='w-[230px]'
            widthMobile='w-[80px]'
         />
         <div className='ml-[100px]'>
            <Outlet />
         </div>
      </>
   )
}

export const DashboardLayout = () => {
   return (
      <SidebarProvider>
         <Layout />
      </SidebarProvider>
   )
}