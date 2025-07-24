import { Outlet } from 'react-router-dom';

import {
  categoryData,
  productData,
  publicityData
} from '@/data';

import {
  PromoCarousel
} from '@/components/common';
import {
  CategoryNav,
  ProductList
} from '@/components/product';
import {
  Title
} from '@/components/UI/text';


export const ProductScreen = () => {
  return (
    <div className='max-w-6xl w-[90%] mx-auto space-y-10'>
      <header className='space-y-10'>
        <PromoCarousel
          className={'w-full mx-auto select-none'}
          data={publicityData}
        />
        <Title
          className={'mx-auto'}
          primary="Tus favoritos en un solo lugar"
          secondary="La Canga"
        />
      </header>

      <main className='space-y-10'>
        <section className='flex flex-row items-center justify-between gap-4'>
          <CategoryNav
            className='w-fit md:max-w-2xl'
            data={categoryData}
          />
          {/* <ProductSearch /> */}
        </section>

        <ProductList data={productData} />
      </main>

      <Outlet />
    </div>
  )
}