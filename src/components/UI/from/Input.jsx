import { cn } from '@/ultils/cn';
import { cva } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

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
//             isError && "!border-destructive/50",
//          )}
//          {...props}
//       />
//    )
// }

// Input.propTypes = {
//    className: PropTypes.string,
//    type: PropTypes.string
// }

export const Input = ({
   className,
   variant,
   isError,
   icon,
   placeholder,
   name,
   value,
   id,
   activeEventIcon = false,
   iconPosition = 'left',
   type = 'text',
   ...props
}) => {
   const [showPassword, setShowPassword] = useState(false);
   const isPassword = type === 'password';
   const inputType = isPassword && showPassword ? 'text' : type;

   const inputVariants = cva('', {
      variants: {
         variant: {
            crystal: 'input-style-class py-5 px-4',
         },
      },
      defaultVariants: {
         variant: 'crystal',
      },
   });

   const togglePassword = () => setShowPassword(prev => !prev);
   // activeEventIcon
   return (
      <div className="relative w-full flex items-center">
         {icon && iconPosition === 'left' && (
            <div className={cn(
               'absolute z-10 left-3 text-muted-foreground',
               !activeEventIcon && 'pointer-events-none'
            )}>
               {icon}
            </div>
         )}
         <input
            type={inputType}
            data-slot="input"
            placeholder={placeholder}
            name={name}
            value={value}
            id={id}
            className={cn(
               'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
               'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
               'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
               inputVariants({ variant }),
               icon && iconPosition === 'left' && 'pl-12',
               (icon && iconPosition === 'right') || isPassword ? 'pr-10' : '',
               isError && '!border-destructive/50',
               className
            )}
            {...props}
         />

         {/* Icono normal a la derecha si no es tipo password */}
         {icon && iconPosition === 'right' && !isPassword && (
            <div className={cn(
               'absolute right-3 text-muted-foreground',
               !activeEventIcon && 'pointer-events-none'
            )}>
               {icon}
            </div>
         )}

         {/* Icono por defecto para password */}
         {isPassword && (
            <button
               type="button"
               onClick={togglePassword}
               className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
               tabIndex={-1}
            >
               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
         )}
      </div>
   );
};

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
