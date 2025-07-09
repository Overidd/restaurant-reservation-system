import { Outlet } from 'react-router-dom';

import { locationData } from '@/data';

import { ListLocations, MapaLoactions } from '@/components/location';

export const LocationScreen = () => {
  return (
    <div className='max-w-6xl w-[90%] mx-auto space-y-10'>

      {/* <section> */}
      <MapaLoactions
        className={'w-full h-[30rem]'}
        data={locationData}
      />
      {/* </section> */}

      {/* <section> */}
      <ListLocations data={locationData} />
      {/* </section> */}
      <Outlet />
    </div>
  )
}
