import { cn } from '@/ultils/cn';
// flsex items-center gap-2
export const Label = ({ className, children, ...props}) => {
   return (
      <label
         data-slot="label"
         className={cn(
            "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
         )}
         {...props}
      >
         {children}
      </label>
   )
}