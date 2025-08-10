import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/ultils/cn';

import { Button } from '../UI/common';

export const CategoryNav = ({ className, data = [] }) => {
  const container = useRef(null);
  const btnRight = useRef(null);
  const btnLeft = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container.current;
      btnLeft.current.style.display = scrollLeft <= 0 ? 'none' : 'block';
      btnRight.current.style.display = scrollLeft + clientWidth >= scrollWidth - 1 ? 'none' : 'block';
    };

    const el = container.current;
    el.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [data.length]);

  const scrollNext = () => {
    container.current.scrollBy({ left: container.current.offsetWidth, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    container.current.scrollBy({ left: -container.current.offsetWidth, behavior: 'smooth' });
  };

  return (
    <div className={`relative bg-card shadow-xl rounded-2xl p-2 px-3 ${className}`}>
      <Button
        ref={btnLeft}
        variant='link'
        size='icon'
        onClick={scrollPrev}
        className='absolute left-0 top-1/2 -translate-y-1/2 z-10'
      >
        <ChevronLeft className='w-8 h-8 text-primary' strokeWidth={4} />
      </Button>

      <Button
        ref={btnRight}
        variant='link'
        size='icon'
        onClick={scrollNext}
        className='absolute -right-6 top-1/2 -translate-y-1/2 z-10'
      >
        <ChevronRight className='w-8 h-8 text-primary' strokeWidth={4} />
      </Button>

      <div
        className='overflow-x-auto overflow-y-hidden flex flex-nowrap justify-start gap-4 scroll-smooth w-[99%] mx-auto [&::-webkit-scrollbar]:hidden rounded-2xl'
        ref={container}
      >
        {data.map((value) => (
          <CategoryItem
            key={value.id}
            name={value.name}
            isActive={value.isActive}
          />
        ))}
      </div>
    </div>
  );
};

CategoryNav.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};


const CategoryItem = ({ name, onClick, className, isActive, ...props }) => {
  return (
    <Button
      className={cn(
        'text-md',
        `${isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {name}
    </Button>
  )
}

CategoryNav.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}