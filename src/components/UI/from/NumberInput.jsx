import { cn } from '@/ultils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '.';

// interface NumberInputProps {
//    value?: number
//    onChange?: (value: number) => void
//    min?: number
//    max?: number
//    step?: number
//    size?: 'sm' | 'md' | 'lg'
//    disabled?: boolean
//    placeholder?: string
//    className?: string
//    prefix?: React.ReactNode
//    sensitivity?: number
//    integerOnly?: boolean // Nueva prop para forzar solo enteros
// }

export const NumberInput = ({
   value: controlledValue,
   name,
   onChange,
   isError = false,
   min = 0,
   max = 100,
   step = 1,
   size = 'md',
   disabled = false,
   placeholder = '0',
   axis = 'y',
   className,
   prefix,
   sensitivity = 0.1,
   integerOnly = true, // Por defecto true para solo enteros
}) => {
   const [internalValue, setInternalValue] = useState(controlledValue || min)
   const value = controlledValue !== undefined ? controlledValue : internalValue

   const isDragging = useRef(false)
   const startX = useRef(0)
   const startValue = useRef(0)

   const handleValueChange = useCallback(
      (newValue) => {
         // Redondear a número entero
         const roundedValue = Math.round(newValue)
         const clampedValue = Math.min(Math.max(roundedValue, min), max)

         if (controlledValue === undefined) {
            setInternalValue(clampedValue)
         }
         onChange?.({ name, value: clampedValue })
      },
      [min, max, controlledValue, onChange],
   )

   const handleInputChange = (e) => {
      const inputValue = e.target.value
      const newValue = Number.parseInt(inputValue, 10)

      if (!Number.isNaN(newValue)) {
         handleValueChange(newValue)
      } else if (inputValue === '') {
         // Si el input está vacío, permitir temporalmente para que el usuario pueda escribir
         if (controlledValue === undefined) {
            setInternalValue(min)
         }
         onChange?.({ name: '', value: min })
      }
   }

   const handleMouseDown = useCallback(
      (e) => {
         if (disabled) return
         isDragging.current = true
         startX.current = axis === 'y' ? e.clientY : e.clientX
         startValue.current = value
         e.preventDefault()

         // Cambiar cursor según el eje
         if (axis === 'x') {
            document.body.style.cursor = 'ew-resize'
         } else if (axis === 'y') {
            document.body.style.cursor = 'ns-resize'
         } else {
            document.body.style.cursor = 'move'
         }
      },
      [value, disabled, axis],
   )

   const handleMouseMove = useCallback(
      (e) => {
         if (!isDragging.current) return

         let delta
         if (axis === 'x') {
            delta = e.clientX - startX.current
         } else if (axis === 'y') {
            // Para el eje Y, invertir la dirección (arrastrar hacia arriba incrementa)
            delta =  e.clientY - startX.current
         } else {
            // Para 'both' o cualquier otro valor, usar ambos ejes
            const deltaX = e.clientX - startX.current
            const deltaY = startX.current - e.clientY
            delta = deltaX + deltaY
         }

         const newValue = startValue.current + delta * sensitivity * step
         handleValueChange(newValue)
      },
      [sensitivity, step, handleValueChange, axis],
   )

   const handleMouseUp = useCallback(() => {
      isDragging.current = false
      document.body.style.cursor = 'default' // Restaurar cursor
   }, [])

   useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)

      return () => {
         window.removeEventListener('mousemove', handleMouseMove)
         window.removeEventListener('mouseup', handleMouseUp)
      }
   }, [handleMouseMove, handleMouseUp])

   const sizeClasses = {
      sm: {
         container: 'h-8 text-sm',
         input: 'h-8 text-sm px-2',
         prefix: 'px-2',
      },
      md: {
         container: 'h-10',
         input: 'h-10 px-3',
         prefix: 'px-3',
      },
      lg: {
         container: 'h-12 text-lg',
         input: 'h-12 text-lg px-4',
         prefix: 'px-4',
      },
   }

   return (
      <div
         role='button'
         tabIndex={0}
         className={cn(
            'flex items-center rounded-md overflow-hidden border border-transparent style-class',
            'focus-within:border-primary hover:border-primary transition-colors duration-200 ',
            disabled
               ? 'opacity-50 cursor-not-allowed'
               : axis === 'x'
                  ? 'cursor-ew-resize'
                  : axis === 'y'
                     ? 'cursor-ns-resize'
                     : 'cursor-move',
            sizeClasses[size].container,
            isError && 'border-destructive/50',
            className,
         )}
         onMouseDown={handleMouseDown}
      >
         {prefix && <span className={cn('flex-shrink-0 text-gray-400', sizeClasses[size].prefix)}>{prefix}</span>}
         <Input
            type='number'
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            variant='outline'
            step={integerOnly ? 1 : step}
            disabled={disabled}
            placeholder={placeholder}
            onKeyDown={(e) => {
               // Prevenir entrada de punto decimal si integerOnly es true
               if (integerOnly && (e.key === '.' || e.key === ',')) {
                  e.preventDefault()
               }
            }}
            className={cn(
               'flex-grow bg-transparent border-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0',
               'placeholder:text-gray-500',
               sizeClasses[size].input,
            )}
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} // Ocultar flechas de input type='number'
         />
      </div>
   )
}
