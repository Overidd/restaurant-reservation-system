import { cn } from '@/ultils'
import { Check, Minus } from 'lucide-react'
import { useState } from 'react'


export const Checkbox = ({
   id,
   name,
   checked,
   defaultChecked = false,
   onChange,
   disabled = false,
   className = '',
   size = 'md',
   indeterminate = false,
   required = false,
   'aria-label': ariaLabel,
   'aria-describedby': ariaDescribedBy,
   ...props
}) => {
   const [internalChecked, setInternalChecked] = useState(defaultChecked)

   const isControlled = checked !== undefined
   const checkedValue = isControlled ? checked : internalChecked

   const handleChange = (event) => {
      if (disabled) return

      const newChecked = event.target.checked

      if (!isControlled) {
         setInternalChecked(newChecked)
      }

      onChange?.({ name, value: newChecked })
   }

   const handleKeyDown = (event) => {
      if (event.key === ' ') {
         event.preventDefault()
         if (!disabled) {
            const syntheticEvent = {
               target: { checked: !checkedValue },
            }
            handleChange(syntheticEvent)
         }
      }
   }

   const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
   }

   const iconSizes = {
      sm: 12,
      md: 16,
      lg: 20,
   }

   return (
      <div
         className={cn(
            sizeClasses[size],
            'border-2 rounded flex items-center justify-center transition-all duration-200 relative',
            'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            checkedValue || indeterminate
               ? 'bg-primary border-primary text-primary-foreground'
               : 'bg-background border-input hover:border-muted-foreground',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm',
            className,
         )}
      >
         <input
            id={id}
            name={name}
            type='checkbox'
            checked={checkedValue}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-checked={indeterminate ? 'mixed' : checkedValue}
            className='w-[120%] h-[120%] absolute opacity-0'
            {...props}
         />
         {indeterminate ? (
            <Minus size={iconSizes[size]} className='transition-opacity duration-150' />
         ) : checkedValue ? (
            <Check size={iconSizes[size]} className='transition-opacity duration-150' />
         ) : null}
      </div>
   )
}
