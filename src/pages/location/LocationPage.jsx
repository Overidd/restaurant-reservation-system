import { Outlet } from 'react-router-dom';

import { LocationsList, MapaLoactions } from '@/components/locationPage';
import { useLoadRestaurantActive } from '@/hook/locationPage';

export const LocationScreen = () => {
  const {
    isLoading,
    restaurants
  } = useLoadRestaurantActive();

  return (
    <div className='mt-40 max-w-6xl w-[90%] mx-auto space-y-10'>

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

export default LocationScreen;