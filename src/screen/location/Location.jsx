import { Outlet } from 'react-router-dom';

import { LocationsList, MapaLoactions } from '@/components/location';
import { useLoadRestaurant } from '@/hook/restaurant';

export const LocationScreen = () => {
  const {
    restaurants,
    isLoading
  } = useLoadRestaurant()

  return (
    <div className='max-w-6xl w-[90%] mx-auto space-y-10'>

      <MapaLoactions
        className={'w-full h-[30rem]'}
        data={restaurants}
      />

      <LocationsList
        isLoading={isLoading}
        data={restaurants}
      />

      <Outlet />
    </div>
  )
}
