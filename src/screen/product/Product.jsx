import { publicityData } from '@/data';
import { PromoCarousel } from '@/components/common';
import { Title } from '@/components/UI/text';
import { CategoryNav, ProductList, ProductSearch } from '@/components/product';

export const ProductScreen = () => {
  return (
    <div className='max-w-6xl w-[90%] mx-auto'>
      <header>
        <PromoCarousel data={publicityData} />
        <Title
          primary="Tus favoritos en un solo lugar"
          secondary="Mikuy Mikuy"
        />
      </header>

      <main>
        <section>
          <CategoryNav />
          <ProductSearch />
        </section>

        <ProductList />
      </main>

    </div>
  )
}
