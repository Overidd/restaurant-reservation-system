import { HomeHeader } from '@/components/homePage';
import { HomeMain } from '@/components/homePage/HomeMain';
import { Outlet } from 'react-router-dom';

export const HomePage = () => {
   return (
      <div className='overflow-hidden'>
         <HomeHeader />

         <HomeMain />

         <Outlet />
      </div>
   )
}
export default HomePage;