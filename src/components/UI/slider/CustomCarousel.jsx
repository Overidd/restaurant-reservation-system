import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/UI/slider/Carousel';
import PropTypes from 'prop-types';

export const CustomCarousel = ({
   className,
   classNameItem,
   component,
   data = []
}) => {
   const ItemComponent = component;
   return (
      <Carousel
         className={`w-full ${className}`}
      >
         <CarouselContent>
            {
               data.map((value, index) => (
                  <CarouselItem
                     key={value?.id ?? new Date().getTime() + index}
                     className={`m-0 ${classNameItem}`}
                  >
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
