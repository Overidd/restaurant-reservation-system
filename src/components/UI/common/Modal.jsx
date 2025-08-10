import { cn } from '@/ultils';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '.';

export const Modal = ({
   isOpen,
   onClose,
   children,
   className = '',
   overlayClassName = '',
   direction = 'center',
   showBtnClose = true,
   isActiveOverflow = true,
   preventBackdropClose = false,
}) => {
   const [isVisible, setIsVisible] = useState(false)
   const [isAnimating, setIsAnimating] = useState(false)
   const [shouldShake, setShouldShake] = useState(false)
   const modalRef = useRef(null)

   const closeTimeoutRef = useRef()
   const openTimeoutRef = useRef()

   const handleClose = () => {
      if (!isAnimating) return;

      setIsAnimating(false)

      if (openTimeoutRef.current) {
         clearTimeout(openTimeoutRef.current)
         openTimeoutRef.current = null
      }

      closeTimeoutRef.current = setTimeout(() => { // Espera la animación antes de cerrar
         setIsVisible(false)
         if (isActiveOverflow) document.body.style.overflow = 'unset';
         onClose()
      }, 300)
   }

   useEffect(() => {
      if (isOpen) {
         setIsVisible(true)

         if (closeTimeoutRef.current) { // Cancelar cualquier timeout de cierre pendiente
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
         }

         openTimeoutRef.current = setTimeout(() => {
            setIsAnimating(true)
         }, 10)
         if (isActiveOverflow) document.body.style.overflow = 'hidden';
      } else if (isVisible) {
         setIsAnimating(false)

         if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current)
            openTimeoutRef.current = null
         }
         closeTimeoutRef.current = setTimeout(() => {
            setIsVisible(false)
            if (isActiveOverflow) document.body.style.overflow = 'unset';

         }, 300)
      }

      return () => {
         if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
         if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)

         if (isVisible && isActiveOverflow) {
            document.body.style.overflow = 'unset'
         }
      }
   }, [isOpen, isVisible])

   useEffect(() => {
      const handleEscape = (e) => {
         if (e.key === 'Escape' && isOpen && !preventBackdropClose) {
            handleClose()
         }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
   }, [isOpen, preventBackdropClose, isAnimating])

   const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
         if (preventBackdropClose) {
            // Activar animación de shake
            setShouldShake(true)
            setTimeout(() => setShouldShake(false), 500)
         } else {
            handleClose()
         }
      }
   }

   const getModalClasses = () => {
      const baseClasses = 'transform transition-all duration-300 ease-out'
      const shakeClasses = shouldShake ? 'animate__animated animate__headShake' : ''

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
            positionClasses = 'fixed top-0 left-0 transform'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            break
         case 'topright':
            positionClasses = 'fixed top-4 right-4 transform'
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
            positionClasses = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            animationClasses = isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            break
         default:
            positionClasses = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            animationClasses = isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            break
      }

      return `${baseClasses} ${positionClasses} ${animationClasses} ${shakeClasses} ${className}`
   }

   const getOverlayClasses = () => {
      const baseClasses = 'fixed inset-0 bg-backdrop-modal bg-opacity-50 backdrop-blur-lg transition-opacity duration-300'
      const opacityClasses = isAnimating ? 'opacity-100' : 'opacity-0'
      return `${baseClasses} ${opacityClasses} ${overlayClassName}`
   }

   if (!isVisible) return null;

   return createPortal(
      <div
         role='presentation'
         tabIndex={-1}
         className={getOverlayClasses()}
         onClick={handleBackdropClick}
         style={{ zIndex: 50 }}
         onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
               handleBackdropClick(e);
            }
         }}
      >

         <div
            ref={modalRef}
            className={cn(
               'w-[90%] md:w-auto max-h-full overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
               getModalClasses(),
            )}
         // onClick={(e) => e.stopPropagation()}
         >
            {showBtnClose &&
               <Button
                  className='absolute -top-1 -right-1 md:top-1 md:right-1 z-10 text-primary-foreground/90 hover:bg-transparent hover:text-primary-foreground'
                  onClick={handleBackdropClick}
                  variant={'ghost'}
               >
                  <X
                     className='h-5 w-5'
                     strokeWidth={3}
                  />
               </Button>
            }
            {children}
         </div>
      </div>,
      document.body,
   )
}