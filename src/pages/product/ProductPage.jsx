import { Outlet } from 'react-router-dom';

import {
   publicityData
} from '@/data';

import {
   PromoCarousel
} from '@/components/common';
import {
   ProductsGrid
} from '@/components/productPage';
import {
   Title
} from '@/components/UI/text';


export const ProductScreen = () => {
   return (
      <div className='mt-40 max-w-6xl w-[90%] mx-auto space-y-10'>
         <header className='space-y-10'>
            <PromoCarousel
               className={'w-full mx-auto h-[9.5rem] md:h-[24rem] select-none'}
               data={publicityData}
            />
            <Title
               className={'mx-auto'}
               primary="Tus favoritos en un solo lugar"
            />
         </header>

         <ProductsGrid />

         <Outlet />
      </div>
   )
}

export default ProductScreen;