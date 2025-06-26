import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { cn } from '@/ultils/cn';
import { Button } from '.';

const date = new Date();
const currentDay = date.getDate();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const DayPicker = ({ className, onChange }) => {
   const scrollRef = useRef(null);
   const btnRight = useRef(null);

   useEffect(() => {
      const handleScroll = () => {
         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
         btnRight.current.style.display = scrollLeft + clientWidth >= scrollWidth - 1 ? 'none' : 'block';
      }
      handleScroll();
      const el = scrollRef.current;
      el.addEventListener('scroll', handleScroll);

      return () => {
         el.removeEventListener('scroll', handleScroll);
      }
   }, [])


   const handleScrollRight = () => {
      if (scrollRef.current) {
         scrollRef.current.scrollBy({
            left: 100,
            behavior: 'smooth'
         });
      }
   };

   return (
      <div className={`relative w-fit flex flex-col gap-2 ${className}`}>
         <div
            ref={scrollRef}
            className={cn(
               'pb-2 block',
               'overflow-x-auto overflow-y-hidden',
               'flex flex-nowrap gap-4',
               '[&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
               'scroll-smooth',
            )}
         >
            {Array.from({ length: lastDay - currentDay }).map((_, i) => {
               const day = currentDay + i + 1;
               return (
                  <Button
                     type="button"
                     key={day}
                     size="lg"
                     className="text-lg px-3"
                     onClick={() => onChange(day)}
                  >
                     {day}
                  </Button>
               );
            })}
         </div>

         <Button
            type="button"
            ref={btnRight}
            onClick={handleScrollRight}
            className="block ml-auto"
         >
            <ChevronRight />
         </Button>
      </div>
   );
};

DayPicker.propTypes = {
   className: PropTypes.string,
};
