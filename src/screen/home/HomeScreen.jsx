import { HomeHeader } from '@/components/home';
import { HomeMain } from '@/components/home/HomeMain';
import { Outlet } from 'react-router-dom';

export const HomeScreen = () => {
   return (
      <div className='overflow-hidden'>
         <HomeHeader />

         <HomeMain />

         <Outlet />
      </div>
   )
}
export default HomeScreen;