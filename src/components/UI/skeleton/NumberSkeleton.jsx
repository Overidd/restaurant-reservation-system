
// interface NumberSkeletonProps {
//    className?: string
//    variant?: 'integer' | 'decimal' | 'currency' | 'percentage' | 'large' | 'custom'
//    size?: 'sm' | 'md' | 'lg' | 'xl'
//    animate?: boolean
//    width?: 'auto' | 'full' | 'fit'
// }

import { cn } from '@/ultils';

export const NumberSkeleton = ({
   className,
   variant = 'integer',
   size = 'md',
   animate = true,
}) => {
   const baseClasses = cn('bg-gray-200 rounded inline-block', animate && 'animate-pulse')

   const getSizeClasses = () => {
      switch (size) {
         case 'sm':
            return 'h-3 w-4'
         case 'md':
            return 'h-5 w-8'
         case 'lg':
            return 'h-6'
         case 'xl':
            return 'h-8'
         default:
            return 'h-5'
      }
   }

   const getWidthClasses = () => {
      // Anchos automáticos basados en el tipo de número
      switch (variant) {
         case 'integer':
            return 'w-12' // ~3 dígitos
         case 'decimal':
            return 'w-16' // ~5 dígitos con decimal
         case 'currency':
            return 'w-20' // ~$1,234.56
         case 'percentage':
            return 'w-14' // ~99.9%
         case 'large':
            return 'w-24' // ~1,234,567
         case 'custom':
            return 'w-16'
         default:
            return 'w-12'
      }
   }

   const getVariantElements = () => {
      const sizeClass = getSizeClasses()
      const widthClass = getWidthClasses()

      switch (variant) {
         case 'decimal':
            return (
               <div className='flex items-center gap-0.5'>
                  <div className={cn(baseClasses, sizeClass, 'w-8')} />
                  <div className='w-1 h-1 bg-gray-200 rounded-full' />
                  <div className={cn(baseClasses, sizeClass, 'w-6')} />
               </div>
            )

         case 'currency':
            return (
               <div className='flex items-center gap-1'>
                  <div className={cn(baseClasses, sizeClass, 'w-3')} /> {/* Símbolo $ */}
                  <div className={cn(baseClasses, sizeClass, 'w-6')} />
                  <div className='w-0.5 h-3 bg-gray-200' /> {/* Coma */}
                  <div className={cn(baseClasses, sizeClass, 'w-6')} />
                  <div className='w-1 h-1 bg-gray-200 rounded-full' /> {/* Punto decimal */}
                  <div className={cn(baseClasses, sizeClass, 'w-4')} />
               </div>
            )

         case 'percentage':
            return (
               <div className='flex items-center gap-0.5'>
                  <div className={cn(baseClasses, sizeClass, 'w-8')} />
                  <div className='w-1 h-1 bg-gray-200 rounded-full' />
                  <div className={cn(baseClasses, sizeClass, 'w-4')} />
                  <div className={cn(baseClasses, sizeClass, 'w-2')} /> {/* % */}
               </div>
            )

         case 'large':
            return (
               <div className='flex items-center gap-0.5'>
                  <div className={cn(baseClasses, sizeClass, 'w-4')} />
                  <div className='w-0.5 h-3 bg-gray-200' /> {/* Coma */}
                  <div className={cn(baseClasses, sizeClass, 'w-6')} />
                  <div className='w-0.5 h-3 bg-gray-200' /> {/* Coma */}
                  <div className={cn(baseClasses, sizeClass, 'w-6')} />
               </div>
            )

         case 'integer':
         default:
            return <div className={cn(baseClasses, sizeClass, widthClass)} />
      }
   }

   return <div className={cn('inline-flex items-center', className)}>{getVariantElements()}</div>
}
