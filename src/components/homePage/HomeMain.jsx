import { authenticFlavorsData, featuredProductsData } from '@/data';
import { cn } from '@/ultils';
import { AsideRestaurant, AuthenticFlavors } from '.';
import { CardProduct } from '../UI/card';
import { CustomCarousel } from '../UI/slider';
import { Title } from '../UI/text';


export const HomeMain = () => {
  return (
    <main className={cn(
      'max-w-6xl w-[90%] mx-auto mt-20 space-y-24'
    )}>
      <Title
        className={'mb-5'}
        primary={'Nuevos sabores auténticos'}
      />

      <section className='grid md:grid-cols-2 gap-5 w-full'>
        <p className='place-content-center text-balance'>
          La Canga se ha convertido en un verdadero ícono culinario de la región San Martín. Nuestra pasión por la cocina y el orgullo por nuestras raíces amazónicas nos han llevado a conquistar el corazón – y el paladar – de miles de familias sanmartinenses.
        </p>
        {authenticFlavorsData.map((item) => (
          <AuthenticFlavors
            key={item.id}
            {...item}
          />
        ))}
      </section>

      <AsideRestaurant />

      <Title
        className={'mb-5'}
        primary={'Nuestros platos destacados'}
      />

      <FeaturedProducts />

    </main>
  )
}


export const FeaturedProducts = () => {

  return (
    <section className='overflow-hidden'>
      <CustomCarousel
        classNameItem={'md:basis-1/3'}
        component={CardProduct}
        data={featuredProductsData}
      />
    </section>
  )
}
