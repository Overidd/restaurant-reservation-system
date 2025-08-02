import { cn } from '@/ultils/cn';

export const Card = ({ className, ...props }) => {
   return (
      <div
         data-slot='card'
         className={cn(
            'bg-card flex flex-col gap-6 rounded-xl border p-4 shadow-sm overflow-hidden',
            className
         )}
         {...props}
      />
   )
}

export const CardHeader = ({ className, ...props }) => {
   return (
      <div
         data-slot='card-header'
         className={cn(
            '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
            className
         )}
         {...props}
      />
   )
}

export const CardImage = ({ className, src, alt, zoom, ...props }) => {

   return (
      <figure
         data-slot='card-image'
         className={cn(
            'basis-0 overflow-hidden',
            'bg-[url("/default-image.jpg")]',
            'bg-cover bg-center bg-no-repeat',
            className)}
         {...props}
      >
         <img
            className={cn(
               'object-cover w-full h-full',
               zoom && 'hover:scale-105 transition-[scale] duration-500',
            )}
            src={src}
            alt={`of ${alt}`}
         />
      </figure>
   )
}



export const CardTitle = ({ className, ...props }) => {
   return (
      <h3
         data-slot='card-title'
         className={cn('leading-none font-semibold', className)}
         {...props}
      >
         {props.children}
      </h3>
   )
}

export const CardDescription = ({ className, ...props }) => {
   return (
      <div
         data-slot='card-description'
         className={cn('text-muted-foreground/70 text-sm', className)}
         {...props}
      />
   )
}

export const CardAction = ({ className, ...props }) => {
   return (
      <div
         data-slot='card-action'
         className={cn(
            'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
            className
         )}
         {...props}
      />
   )
}

export const CardContent = ({ className, ...props }) => {
   return (
      <div
         data-slot='card-content'
         className={cn('', className)}
         {...props}
      />
   )
}

export const CardFooter = ({ className, ...props }) => {
   return (
      <div
         data-slot='card-footer'
         className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
         {...props}
      />
   )
}

export const Separator = ({ className, ...props }) => {
   return (
      <div
         data-slot='separator'
         className={cn('h-px bg-border', className)}
         {...props}
      />
   )
}