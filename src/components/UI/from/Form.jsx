import { cn } from '@/ultils/cn';
import { Label } from './Label';

export const Form = ({ className, onSubmit, children, ...props }) => {
   return (
      <form
         className={cn('grid gap-4', className)}
         data-slot='form'
         onSubmit={onSubmit}
         {...props}
      >
         {children}
      </form>
   )
}

export const FormItem = ({ className, children, ...props }) => {
   return (
      <fieldset
         data-slot='form-item'
         className={cn('grid gap-2', className)}
         {...props}>
         {children}
      </fieldset>
   )
}

export const FromGroup = ({ className, children, ...props }) => {
   return (
      <section
         data-slot='form-group'
         className={cn('', className)}
         {...props}
      >
         {children}
      </section>
   )
}

export const FormLabel = ({
   className,
   htmlFor,
   isError,
   children,
   size = 'sm',
   ...props
}) => {
   return (
      <Label
         className={cn('data-[error=true]:text-destructive text-background/50', className)}
         data-slot='form-label'
         size={size}
         data-error={!!isError}
         htmlFor={htmlFor}
         {...props}
      >
         {children}
      </Label>
   )
}

export const FormDescription = ({ className, children, ...props }) => {
   return (
      <p
         data-slot='form-description'
         className={cn('text-background/40 text-sm', className)}
         {...props}
      >
         {children}
      </p>
   )
}

export const FormMessage = ({ className, error, ...props }) => {
   if (!error) {
      return null
   }

   return (
      <p
         data-slot='form-message'
         className={cn('text-destructive text-sm', className)}
         {...props}
      >
         {error}
      </p>
   )
}