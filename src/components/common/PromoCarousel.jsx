import PropTypes from 'prop-types';
import { CustomCarousel } from '../UI/slider';

export const PromoCarousel = ({ data = [], className }) => {
  return (
    <>
      <CustomCarousel
        className={`rounded-3xl overflow-hidden min-w-2xl max-h-[20rem] ${className}`}
        component={PromoItem}
        data={data}
      />

    </>
  )
}
const PromoItem = ({ image, title, description }) => {
  return (
    <figure className='w-full h-fulls border-red-500'>
      <img
        className='w-full h-full object-cover'
        src={image}
        alt={title}
      />
      <figcaption className='hidden'>
        {description}
      </figcaption>
    </figure>
  )
}


PromoCarousel.propTypes = {
  data: PropTypes.array
}
