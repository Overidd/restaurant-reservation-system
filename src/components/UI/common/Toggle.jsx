import { cn } from '@/ultils'
import { cva } from 'class-variance-authority'
import { forwardRef, useState } from 'react'

const toggleVariants = cva(
   "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:opacity-100 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap cursor-pointer",
   {
      variants: {
         variant: {
            default:
               'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
            destructive:
               'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline:
               'border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary:
               'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
            ghost:
               'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            crystal: 'input-style-class p-1',
         },
         size: {
            default: 'h-9 px-2 min-w-9',
            sm: 'h-8 px-1.5 min-w-8',
            lg: 'h-10 px-2.5 min-w-10',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   },
)

// export interface ToggleProps
//    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//    VariantProps<typeof toggleVariants> {
//    pressed?: boolean
//    onPressedChange?: (pressed: boolean) => void
// }

export const Toggle = forwardRef(({
   className,
   variant,
   size,
   name,
   pressed: controlledPressed,
   onPressedChange,
   onClick,
   children,
   disabled,
   ...props
}, ref) => {

   const [internalPressed, setInternalPressed] = useState(false)

   const isPressed = controlledPressed !== undefined ? controlledPressed : internalPressed

   const handleClick = (event) => {
      const newPressed = !isPressed

      if (controlledPressed === undefined) {
         setInternalPressed(newPressed)
      }

      onPressedChange?.(newPressed)
      onClick?.(event)
   }

   return (
      <button
         ref={ref}
         name={name}
         className={cn(toggleVariants({ variant, size, className }))}
         data-state={isPressed ? 'on' : 'off'}
         aria-pressed={isPressed}
         disabled={disabled}
         onClick={handleClick}
         {...props}
      >
         {children}
      </button>
   )
},
)
Toggle.displayName = 'Toggle'

