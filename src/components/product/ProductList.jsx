import PropTypes from 'prop-types';

import { cn } from '@/ultils/cn';

import { Button } from '../UI/common';

// 'min-h-[20rem]',
// `grid grid-cols-3 auto-rows-[25rem] gap-8`,
export const ProductList = ({ className, data = [] }) => {
  return (
    <section
      className={cn(
        `grid sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] auto-rows-[25rem] gap-8`,
        className
      )}
    >

      {
        data.map((value, index) => (
          <ProductCard key={value?.id ?? new Date().getTime() + index} {...value} />
        ))
      }
    </section>
  )
}

ProductList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
}


export const ProductCard = ({ className, name, description, image, price }) => {

  return (
    <article className={cn(
      'bg-card rounded-2xl shadow-xl overflow-hidden',
      'flex flex-col justify-between gap-2',
      'pb-4 text-center',
      className
    )}>
      <figure className="basis-0 min-h-[50%] overflow-hidden">
        <img
          className="object-cover w-full h-full hover:scale-105 transition-[scale] duration-500"
          src={image}
          alt={`${name}`}
        />
      </figure>
      <p className='text-card-foreground font-bold truncate-text-nowarp max-w-[90%] mx-auto'>
        {name}
      </p>
      <small
        className="font-bold text-muted-foreground/80 truncate-text-lines max-w-[90%] mx-auto"
      >
        {description}
      </small>
      <data
        className="text-2xl font-semibold text-primary"
        itemProp="price"
        value={price}
      >
        S/ {price}
      </data>
      <Button className={'w-40 mx-auto'}>
        Agregar al carrito
      </Button>
    </article>
  )
}

ProductCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number
}
