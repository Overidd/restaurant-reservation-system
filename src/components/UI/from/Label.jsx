import { cn } from '@/ultils/cn';
// flsex items-center gap-2
export const Label = ({
   className,
   children,
   htmlFor,
   size = 'base',
   ...props
}) => {

   const sizeVariants = {
      sm: 'text-sm',
      base: 'text-base font-medium',
      lg: 'text-lg font-semibold',
      xl: 'text-xl font-bold',
   }[size]

   return (
      <label
         htmlFor={htmlFor}
         data-slot='label'
         className={cn(
            'text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 block',
            sizeVariants,
            className
         )}
         {...props}
      >
         {children}
      </label>
   )
}