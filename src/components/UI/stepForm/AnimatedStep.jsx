import { useEffect, useRef, useState } from 'react';
import { cn } from '@/ultils/cn';

export const AnimatedStep = ({
   isActive,
   children,
   className,
}) => {

   const [shouldRender, setShouldRender] = useState(isActive);
   const stepRef = useRef(null);

   useEffect(() => {
      if (isActive) {
         setShouldRender(true);
      } else {
         const timer = setTimeout(() => setShouldRender(false), 300);
         return () => clearTimeout(timer);
      }
   }, [isActive]);

   useEffect(() => {
      if (isActive && stepRef.current) {
         const focusableElement = stepRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
         if (focusableElement) {
            focusableElement.focus();
         }
      }
   }, [isActive]);

   if (!shouldRender) {
      return null;
   }

   const baseClasses =
      ' top-0 left-0 animate-in fade-in zoom-in-90 ease-in-out transition-all';
   const visibilityClasses = isActive ? 'opacity-100' : 'opacity-0 absolute';
   const transformClasses = cn('animate__animated', isActive ? {} : {
      // 'opacity-0': direction === 'forward' || index < currentIndex,
      // ' opacity-0': direction === 'backward' || index > currentIndex,
   });

   return (
      <div
         ref={stepRef}
         // aria-hidden={!isActive}
         className={cn(
            baseClasses,
            visibilityClasses,
            transformClasses,
            className
         )}
      >
         {children}
      </div>
   );
}