import { cn } from '@/ultils/cn';
import { cva } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

// export const Input = ({ className, type, variant, isError, ...props }) => {

//    const inputVariants = cva(
//       '',
//       {
//          variants: {
//             variant: {
//                crystal: 'input-style-class py-5 px-4',
//             },
//             defaultVariants: {
//                variant: 'default',
//                size: 'default',
//             },
//          }
//       })

//    return (
//       <input
//          type={type}
//          data-slot='input'
//          className={cn(
//             'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
//             'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
//             'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
//             inputVariants({ variant, className }),
//             isError && '!border-destructive/50',
//          )}
//          {...props}
//       />
//    )
// }

// Input.propTypes = {
//    className: PropTypes.string,
//    type: PropTypes.string
// }

export const Input = forwardRef(({
   className,
   variant,
   icon,
   placeholder,
   name,
   value,
   id,
   isError = false,
   autoFocus = false,
   activeEventIcon = false,
   iconPosition = 'left',
   type = 'text',
   size = 'base',
   ...props
}, ref) => {
   const [showPassword, setShowPassword] = useState(false);
   const isPassword = type === 'password';
   const inputType = isPassword && showPassword ? 'text' : type;

   const inputVariants = cva('', {
      variants: {
         variant: {
            crystal: 'input-style-class py-5 px-4',
         },
         size: {
            sm: 'h-7 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 py-4 text-sm',
            base: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 py-5 text-sm',
            lg: 'h-12 rounded-md px-4 text-base',
            xl: 'h-14 rounded-md px-4 has-[>svg]:px-5 text-lg',
            icon: 'size-10 text-xl',
         }
      },
      defaultVariants: {
         variant: 'crystal',
         size: 'base',
      },
   });

   const togglePassword = () => setShowPassword(prev => !prev);
   // activeEventIcon
   return (
      <div className='relative w-full flex items-center'>
         {icon && iconPosition === 'left' && (
            <div className={cn(
               'absolute z-10 left-3 text-muted-foreground',
               !activeEventIcon && 'pointer-events-none'
            )}>
               {icon}
            </div>
         )}
         <input
            autoFocus={autoFocus}
            type={inputType}
            data-slot='input'
            placeholder={placeholder}
            ref={ref}
            name={name}
            value={value}
            id={id}
            className={cn(
               'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
               'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
               inputVariants({ variant, size }),
               icon && iconPosition === 'left' && 'pl-12',
               (icon && iconPosition === 'right') || isPassword ? 'pr-10' : '',
               isError && '!border-destructive',
               !isError && 'focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[1px]',
               className
            )}
            {...props}
         />

         {icon && iconPosition === 'right' && !isPassword && (
            <div className={cn(
               'absolute right-3 text-muted-foreground',
               !activeEventIcon && 'pointer-events-none'
            )}>
               {icon}
            </div>
         )}

         {isPassword && (
            <button
               type='button'
               onClick={togglePassword}
               className='absolute right-3 text-muted-foreground hover:text-foreground transition-colors'
               tabIndex={-1}
            >
               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
         )}
      </div>
   );
});

Input.displayName = 'Input';

Input.propTypes = {
   className: PropTypes.string,
   placeholder: PropTypes.string,
   id: PropTypes.string,
   type: PropTypes.string,
   name: PropTypes.string,
   value: PropTypes.string,
   variant: PropTypes.string,
   isError: PropTypes.bool,
   icon: PropTypes.node,
   iconPosition: PropTypes.oneOf(['left', 'right']),
};
