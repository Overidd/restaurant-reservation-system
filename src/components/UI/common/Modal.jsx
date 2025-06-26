import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '.';
import { X } from 'lucide-react';

export const Modal = ({
   isOpen,
   onClose,
   children,
   direction = 'center', //  'top' | 'bottom' | 'left' | 'right' | 'center'
   preventBackdropClose = false,
   className = '',
   overlayClassName = '',
}) => {

   const [isVisible, setIsVisible] = useState(false)
   const [isAnimating, setIsAnimating] = useState(false)
   const [shouldShake, setShouldShake] = useState(false)
   const modalRef = useRef(null)

   useEffect(() => {
      if (isOpen) {
         setIsVisible(true)
         // Pequeño delay para activar la animación después de que el modal sea visible
         setTimeout(() => setIsAnimating(true), 10)
         // Prevenir scroll del body
         document.body.style.overflow = 'hidden'
      } else {
         setIsAnimating(false)
         // Delay para ocultar el modal después de la animación
         setTimeout(() => {
            setIsVisible(false)
            document.body.style.overflow = 'unset'
         }, 300)
      }

      return () => {
         document.body.style.overflow = 'unset'
      }
   }, [isOpen])

   // Manejar tecla Escape
   useEffect(() => {
      const handleEscape = (e) => {
         if (e.key === 'Escape' && isOpen && !preventBackdropClose) {
            onClose()
         }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
   }, [isOpen, onClose, preventBackdropClose])

   const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
         if (preventBackdropClose) {
            // Activar animación de shake
            setShouldShake(true)
            setTimeout(() => setShouldShake(false), 500)
         } else {
            onClose()
         }
      }
   }

   const getModalClasses = () => {
      const baseClasses = 'rounded-lg shadow-xl transform transition-all duration-300 ease-out'
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
            positionClasses = 'mr-auto my-auto ml-8'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            break
         case 'right':
            positionClasses = 'ml-auto my-auto mr-8'
            animationClasses = isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            break
         case 'center':
         default:
            positionClasses = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            animationClasses = isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            break
      }

      return `${baseClasses} ${positionClasses} ${animationClasses} ${shakeClasses} ${className}`
   }

   const getOverlayClasses = () => {
      const baseClasses =
         direction === 'center'
            ? 'fixed inset-0 bg-[#0004] bg-opacity-50 transition-opacity duration-300'
            : 'fixed inset-0 bg-[#0004] bg-opacity-50 flex transition-opacity duration-300'
      const opacityClasses = isAnimating ? 'opacity-100' : 'opacity-0'
      return `${baseClasses} ${opacityClasses} ${overlayClassName}`
   }

   if (!isVisible) return null

   return createPortal(
      <div className={getOverlayClasses()} onClick={handleBackdropClick} style={{ zIndex: 9999 }}>
         <Button
            className='absolute top-4 right-4 z-10'
            variant={'outline'}
            onClick={onClose}
            size={'icon'}
         >
            <X />
         </Button>
         <div ref={modalRef} className={getModalClasses()} onClick={(e) => e.stopPropagation()}>
            {children}
         </div>
      </div>,
      document.body,
   )
}