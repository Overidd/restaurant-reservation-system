import { cn } from '@/ultils';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const SlideOver = ({
   isOpen,
   // onClose,
   children,
   direction = 'topright',
   className = '',
}) => {
   const [isVisible, setIsVisible] = useState(false);
   const [isAnimating, setIsAnimating] = useState(false);
   // const modalRef = useRef(null);
   const openTimeoutRef = useRef();
   const closeTimeoutRef = useRef();

   useEffect(() => {
      if (isOpen) {
         setIsVisible(true);
         if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
         openTimeoutRef.current = setTimeout(() => setIsAnimating(true), 10);
      } else if (isVisible) {
         setIsAnimating(false);
         if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
         closeTimeoutRef.current = setTimeout(() => setIsVisible(false), 300);
      }

      return () => {
         if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
         if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      };
   }, [isOpen, isVisible]);

   // const handleKeyDown = (e) => {
   //    if (e.key === 'Escape') onClose();
   // };

   // useEffect(() => {
   //    document.addEventListener('keydown', handleKeyDown);
   //    return () => document.removeEventListener('keydown', handleKeyDown);
   // }, []);

   const getContainerClasses = () => {
      const base = 'transition-transform duration-300 ease-in-out fixed z-50 shadow-xl h-fit w-fit';
      let positionClasses = ''
      let animationClasses = ''
      switch (direction) {
         case 'top':
            positionClasses = 'mx-auto mt-8'
            animationClasses = isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            break
         case 'bottom':
            positionClasses = 'mx-auto mt-auto mb-8'
            animationClasses = isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            break
         case 'left':
            positionClasses = 'mr-auto my-auto'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            break
         case 'right':
            positionClasses = 'ml-auto my-auto mr-8'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            break
         case 'topleft':
            positionClasses = 'fixed top-2 left-2 transform'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            break
         case 'topright':
            positionClasses = 'fixed top-2 ml-auto right-2 transform'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            break
         case 'bottomleft':
            positionClasses = 'fixed bottom-0 left-0 transform'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            break
         case 'bottomright':
            positionClasses = 'fixed bottom-0 right-0 transform'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            break

         case 'center':
         default:
            positionClasses = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            animationClasses = isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            break
      }
      return `${base} ${positionClasses} ${animationClasses} ${className}`;
   };

   if (!isVisible) return null;

   return createPortal(
      <div className={cn(
         'pointer-events-none fixed inset-0 z-50',
         'pointer-events-auto',
         getContainerClasses()
      )}>
         {children}
      </div>,
      document.body
   );
};