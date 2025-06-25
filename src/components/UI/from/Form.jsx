import { cn } from '@/ultils/cn';
import { Label } from './Label';

export const Form = ({ className, onSubmit, children, ...props }) => {
   return (
      <form
         className={cn('grid gap-4', className)}
         data-slot="form"
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

export const FormLabel = ({ className, formItemId, isError, children, ...props }) => {
   return (
      <Label
         className={cn("data-[error=true]:text-destructive", className)}
         data-slot="form-label"
         data-error={!!isError}
         htmlFor={formItemId}
         {...props}
      >
         {children}
      </Label>
   )
}

export const FormDescription = ({ className, children, ...props }) => {
   return (
      <p
         data-slot="form-description"
         className={cn("text-muted-foreground text-sm", className)}
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
         data-slot="form-message"
         className={cn("text-destructive text-sm", className)}
         {...props}
      >
         {error}
      </p>
   )
}