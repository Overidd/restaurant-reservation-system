
import { cn, translateStatus } from '@/ultils'
import { cva } from 'class-variance-authority'

export const Badge = ({
   state,
   children,
   className,
   variant = 'primary',
}) => {
   const badgeVariants = cva(
      "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md",
      {
         variants: {
            variant: {
               primary:
                  "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
               secondary:
                  "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
               destructive:
                  "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
               outline:
                  "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
               none: '',
            },

         },
         defaultVariants: {
            variant: "primary",
         },
      }
   )

   const getStateClasses = (state) => {

      const stateClasses = {
         available: 'bg-table-avaible text-white',
         busy: 'bg-table-busy text-white',
         selected: 'bg-table-selected text-white',
         blocked: 'bg-table-blocked text-gray-800',
         pending: 'bg-table-pending text-white',
         confirmed: 'bg-table-confirmed text-white',
         canceled: 'bg-table-canceled text-white',
         noShow: 'bg-table-noshow text-white',
         notAvailable: 'bg-table-notAvailable text-white',
         released: 'bg-table-released text-white',
      }

      return cn(badgeVariants({ variant, className }), stateClasses[state])
   }

   return (
      <span className={getStateClasses(state)}>
         {children ?? translateStatus(state)}
      </span>
   )
}
