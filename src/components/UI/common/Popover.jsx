import { createPortal } from 'react-dom';
import { useState, useRef, useEffect, useCallback } from 'react';

export const Popover = ({
   children,
   content,
   trigger = 'click',// 'click' | 'hover'
   placement = 'bottom', // 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
   offset = 8,
   className = '',
   contentClassName = '',
   disabled = false,
   onOpenChange,
}) => {
   const [isOpen, setIsOpen] = useState(false)
   const [position, setPosition] = useState({ top: 0, left: 0 })
   const triggerRef = useRef(null)
   const contentRef = useRef(null)
   const timeoutRef = useRef()

   const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !contentRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()
      const viewport = {
         width: window.innerWidth,
         height: window.innerHeight,
      }

      let top = 0
      let left = 0

      switch (placement) {
         case 'top':
            top = triggerRect.top - contentRect.height - offset
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
            break
         case 'top-start':
            top = triggerRect.top - contentRect.height - offset
            left = triggerRect.left
            break
         case 'top-end':
            top = triggerRect.top - contentRect.height - offset
            left = triggerRect.right - contentRect.width
            break
         case 'bottom':
            top = triggerRect.bottom + offset
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
            break
         case 'bottom-start':
            top = triggerRect.bottom + offset
            left = triggerRect.left
            break
         case 'bottom-end':
            top = triggerRect.bottom + offset
            left = triggerRect.right - contentRect.width
            break
         case 'left':
            top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
            left = triggerRect.left - contentRect.width - offset
            break
         case 'right':
            top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
            left = triggerRect.right + offset
            break
      }

      if (left < 0) left = 8
      if (left + contentRect.width > viewport.width) {
         left = viewport.width - contentRect.width - 8
      }
      if (top < 0) top = 8
      if (top + contentRect.height > viewport.height) {
         top = viewport.height - contentRect.height - 8
      }

      setPosition({ top, left })
   }, [placement, offset])

   const openPopover = useCallback(() => {
      if (disabled) return
      setIsOpen(true)
      onOpenChange?.(true)
   }, [disabled, onOpenChange])

   const closePopover = useCallback(() => {
      setIsOpen(false)
      onOpenChange?.(false)
   }, [onOpenChange])

   const handleTriggerClick = useCallback(() => {
      if (trigger === 'click') {
         if (isOpen) {
            closePopover()
         } else {
            openPopover()
         }
      }
   }, [trigger, isOpen, openPopover, closePopover])

   const handleTriggerMouseEnter = useCallback(() => {
      if (trigger === 'hover') {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
         }
         openPopover()
      }
   }, [trigger, openPopover])

   const handleTriggerMouseLeave = useCallback(() => {
      if (trigger === 'hover') {
         timeoutRef.current = setTimeout(() => {
            closePopover()
         }, 100)
      }
   }, [trigger, closePopover])

   const handleContentMouseEnter = useCallback(() => {
      if (trigger === 'hover' && timeoutRef.current) {
         clearTimeout(timeoutRef.current)
      }
   }, [trigger])

   const handleContentMouseLeave = useCallback(() => {
      if (trigger === 'hover') {
         closePopover()
      }
   }, [trigger, closePopover])

   // Handle click outside
   useEffect(() => {
      if (!isOpen || trigger !== 'click') return

      // MouseEvent
      const handleClickOutside = (event) => {
         if (
            triggerRef.current &&
            contentRef.current &&
            !triggerRef.current.contains(event.target) &&
            !contentRef.current.contains(event.target)
         ) {
            closePopover()
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [isOpen, trigger, closePopover])

   // Handle escape key
   useEffect(() => {
      if (!isOpen) return

      // KeyboardEvent
      const handleEscape = (event) => {
         if (event.key === 'Escape') {
            closePopover()
         }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
   }, [isOpen, closePopover])

   useEffect(() => {
      if (isOpen) {
         calculatePosition()
      }
   }, [isOpen, calculatePosition])

   useEffect(() => {
      // Recalculate position on scroll/resize
      if (!isOpen) return

      const handleReposition = () => {
         calculatePosition()
      }

      window.addEventListener('scroll', handleReposition, true)
      window.addEventListener('resize', handleReposition)

      return () => {
         window.removeEventListener('scroll', handleReposition, true)
         window.removeEventListener('resize', handleReposition)
      }
   }, [isOpen, calculatePosition])

   useEffect(() => {
      // Cleanup timeout on unmount
      return () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
         }
      }
   }, [])

   const popoverContent = isOpen && (
      <div
         ref={contentRef}
         className={`fixed z-50 rounded-lg shadow-lg overflow-hidden ${contentClassName}`}
         style={{
            top: position.top,
            left: position.left,
         }}
         onMouseEnter={handleContentMouseEnter}
         onMouseLeave={handleContentMouseLeave}
         role='dialog'
         aria-modal='true'
      >
         {content}
      </div>
   )

   return (
      <>
         <div
            ref={triggerRef}
            className={`inline-block ${className}`}
            onClick={handleTriggerClick}
            onMouseEnter={handleTriggerMouseEnter}
            onMouseLeave={handleTriggerMouseLeave}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleTriggerClick()
               }
            }}
         >
            {children}
         </div>
         {typeof document !== 'undefined' && createPortal(popoverContent, document.body)}
      </>
   )
}