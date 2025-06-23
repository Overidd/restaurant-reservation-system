import PropTypes from 'prop-types';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/UI/slider/Carousel';

export function CustomCarousel({ className, component, data = [] }) {
   const ItemComponent = component;
   return (
      <Carousel className={`w-full max-w-xs ${className}`}>
         <CarouselContent>
            {
               data.map((value, index) => (
                  <CarouselItem key={value?.id ?? new Date().getTime() + index} className={'m-0'}>
                     <ItemComponent {...value} />
                  </CarouselItem>
               ))
            }
         </CarouselContent>
         <CarouselPrevious />
         <CarouselNext />
      </Carousel>
   )
}

CustomCarousel.propTypes = {
   className: PropTypes.string,
   component: PropTypes.node,
   data: PropTypes.array,
}
