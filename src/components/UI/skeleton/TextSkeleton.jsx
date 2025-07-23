
// interface TextSkeletonProps {
//    className?: string
//    lines?: number
//    variant?: 'default' | 'paragraph' | 'title' | 'subtitle'
//    animate?: boolean
// }

import { cn } from '@/ultils';

export const TextSkeleton = ({ className, lines = 1, variant = 'default', animate = true }) => {
   const baseClasses = cn('bg-gray-200 rounded', animate && 'animate-pulse', className)

   const getVariantClasses = (lineIndex, totalLines) => {
      switch (variant) {
         case 'title':
            return 'h-8 w-3/4'
         case 'subtitle':
            return 'h-6 w-2/3'
         case 'paragraph':
            if (lineIndex === totalLines - 1) {
               return 'h-4 w-2/3' // Última línea más corta
            }
            return 'h-4 w-full'
         default:
            return 'h-4 w-full'
      }
   }

   if (lines === 1) {
      return <div className={cn(baseClasses, getVariantClasses(0, 1))} />
   }

   return (
      <div className='space-y-2'>
         {Array.from({ length: lines }).map((_, index) => (
            <div key={index} className={cn(baseClasses, getVariantClasses(index, lines))} />
         ))}
      </div>
   )
}
