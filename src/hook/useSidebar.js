import { SidebarContext } from '@/doman/context/sidebar';
import { useContext } from 'react';

export const useSidebar = () => {
   const context = useContext(SidebarContext);
   if (!context) {
      throw new Error('useSidebar must be used within a SidebarProvider');
   }
   return context;
};