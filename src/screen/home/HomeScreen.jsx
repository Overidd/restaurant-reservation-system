import { HomeHeader } from '@/components/home';
import { HomeMain } from '@/components/home/HomeMain';
import { Outlet } from 'react-router-dom';

export const HomeScreen = () => {
   return (
      <>
         <HomeHeader />

         <HomeMain />

         <Outlet />
      </>
   )
}
export default HomeScreen;