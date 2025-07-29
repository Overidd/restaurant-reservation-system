import { cn } from '@/ultils';
import { Check } from 'lucide-react';
import { useState } from 'react';

//  {
//   id?: string
//   checked?: boolean
//   defaultChecked?: boolean
//   onChange?: (checked: boolean) => void
//   disabled?: boolean
//   label?: string
//   className?: string
//   size?: 'sm' | 'md' | 'lg'
// }

export const Checkbox = ({
   id,
   name,
   checked,
   defaultChecked = false,
   onChange,
   disabled = false,
   className = '',
   size = 'md',
}) => {
   const [internalChecked, setInternalChecked] = useState(defaultChecked);

   // Determinar si es controlado o no controlado
   const isControlled = checked !== undefined;
   const checkedValue = isControlled ? checked : internalChecked;

   const handleChange = () => {
      if (disabled) return;

      const newChecked = !checkedValue;

      if (!isControlled) {
         setInternalChecked(newChecked);
      }

      onChange?.({ name: name, value: newChecked });
   };

   const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
         e.preventDefault();
         handleChange();
      }
   };

   // Tamaños del checkbox
   const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
   };

   // Tamaños del icono
   const iconSizes = {
      sm: 12,
      md: 16,
      lg: 20,
   };

   return (
      <div
         id={id}
         role='checkbox'
         aria-checked={checkedValue}
         aria-disabled={disabled}
         tabIndex={disabled ? -1 : 0}
         className={cn(
            sizeClasses[size],
            'border-2 rounded flex items-center justify-center cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            checkedValue
               ? 'bg-primary border-primary text-primary-foreground'
               : 'bg-background border-input hover:border-accent',
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm',
            className
         )}
         onClick={handleChange}
         onKeyDown={handleKeyDown}
      >
         {checkedValue && (
            <Check size={iconSizes[size]} className='transition-opacity duration-150' />
         )}
      </div>
   );
};