import { cn } from '@/ultils/cn';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Button } from '.';

const date = new Date();
const currentDay = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

export const DayPicker = ({
   className,
   onChange,
   name,
}) => {
   const scrollRef = useRef(null);
   const btnRight = useRef(null);

   useEffect(() => {
      const handleScroll = () => {
         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
         btnRight.current.style.display = scrollLeft + clientWidth >= scrollWidth - 1 ? 'none' : 'block';
      };
      handleScroll();
      const el = scrollRef.current;
      el.addEventListener('scroll', handleScroll);
      return () => {
         el.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const handleScrollRight = () => {
      if (scrollRef.current) {
         scrollRef.current.scrollBy({
            left: 100,
            behavior: 'smooth',
         });
      }
   };

   return (
      <div className={`relative w-full flex flex-col gap-2 ${className}`}>
         <div
            ref={scrollRef}
            className={cn(
               'pb-2 block',
               'overflow-x-auto overflow-y-hidden',
               'flex flex-nowrap gap-4',
               '[&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
               'scroll-smooth'
            )}
         >
            {Array.from({ length: lastDay - (currentDay - 1) }).map((_, i) => {
               const day = currentDay + i;
               const fullDate = new Date(currentYear, currentMonth, day);

               const weekdayName = fullDate.toLocaleDateString('es-ES', { weekday: 'long' });
               const monthName = fullDate.toLocaleDateString('es-ES', { month: 'long' });

               return (
                  <div
                     key={day}
                     className='space-y-2 text-center min-w-[60px]'
                  >
                     <span className='font-bold block capitalize text-md text-muted-foreground'>
                        {weekdayName}
                     </span>
                     <Button
                        type='button'
                        size='lg'
                        className='text-lg px-3'
                        onClick={() => onChange({ name, value: fullDate })}
                     >
                        {day}
                     </Button>
                     <span className='font-bold block capitalize text-sm text-muted-foreground'>
                        {monthName}
                     </span>
                  </div>
               );
            })}
         </div>

         <Button
            type='button'
            ref={btnRight}
            onClick={handleScrollRight}
            className='block ml-auto'
         >
            <ChevronRight />
         </Button>
      </div>
   );
};

DayPicker.propTypes = {
   className: PropTypes.string,
   onChange: PropTypes.func,
};