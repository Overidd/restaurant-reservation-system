import { cn } from '@/ultils';

// interface CardSkeletonProps {
//    className?: string
//    variant?: 'basic' | 'product' | 'profile' | 'article' | 'stats' | 'notification' | 'custom'
//    size?: 'sm' | 'md' | 'lg'
//    animate?: boolean
//    showImage?: boolean
//    showAvatar?: boolean
//    showActions?: boolean
//    contentLines?: number
// }


export const CardSkeleton = ({
   className,
   variant = 'basic',
   size = 'md',
   animate = true,
   showImage,
   showAvatar,
   showActions,
   contentLines,
}) => {
   const baseClasses = cn('bg-card border rounded-lg overflow-hidden', className)
   const skeletonClasses = cn('bg-gray-300 rounded', animate && 'animate-pulse')

   const getSizeClasses = () => {
      switch (size) {
         case 'sm':
            return 'p-3'
         case 'md':
            return 'p-4'
         case 'lg':
            return 'p-6'
         default:
            return 'p-4'
      }
   }

   const getImageHeight = () => {
      switch (size) {
         case 'sm':
            return 'h-32'
         case 'md':
            return 'h-40'
         case 'lg':
            return 'h-48'
         default:
            return 'h-40'
      }
   }

   const renderBasicCard = () => (
      <div className={cn(baseClasses, getSizeClasses())}>
         <div className='space-y-3'>
            {/* Título */}
            <div className={cn(skeletonClasses, 'h-5 w-3/4')} />

            {/* Contenido */}
            <div className='space-y-2'>
               {Array.from({ length: contentLines || 3 }).map((_, index) => (
                  <div
                     key={index}
                     className={cn(skeletonClasses, 'h-4', index === (contentLines || 3) - 1 ? 'w-2/3' : 'w-full')}
                  />
               ))}
            </div>

            {/* Acciones */}
            {showActions !== false && (
               <div className='flex gap-2 pt-2'>
                  <div className={cn(skeletonClasses, 'h-8 w-20')} />
                  <div className={cn(skeletonClasses, 'h-8 w-16')} />
               </div>
            )}
         </div>
      </div>
   )

   const renderProductCard = () => (
      <div className={baseClasses}>
         {/* Imagen del producto */}
         <div className={cn(skeletonClasses, getImageHeight(), 'w-full')} />

         <div className={getSizeClasses()}>
            <div className='space-y-3'>
               {/* Título del producto */}
               <div className={cn(skeletonClasses, 'h-5 w-4/5')} />

               {/* Precio */}
               <div className='flex items-center gap-2'>
                  <div className={cn(skeletonClasses, 'h-6 w-20')} />
                  <div className={cn(skeletonClasses, 'h-4 w-16 opacity-60')} />
               </div>

               {/* Descripción */}
               <div className='space-y-2'>
                  {Array.from({ length: 2 }).map((_, index) => (
                     <div key={index} className={cn(skeletonClasses, 'h-4', index === 1 ? 'w-3/4' : 'w-full')} />
                  ))}
               </div>

               {/* Rating */}
               <div className='flex items-center gap-2'>
                  <div className='flex gap-1'>
                     {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className={cn(skeletonClasses, 'h-4 w-4')} />
                     ))}
                  </div>
                  <div className={cn(skeletonClasses, 'h-4 w-12')} />
               </div>

               {/* Botón */}
               <div className={cn(skeletonClasses, 'h-10 w-full mt-4')} />
            </div>
         </div>
      </div>
   )

   const renderProfileCard = () => (
      <div className={cn(baseClasses, getSizeClasses())}>
         <div className='space-y-4'>
            {/* Avatar y nombre */}
            <div className='flex items-center gap-3'>
               <div className={cn(skeletonClasses, 'h-12 w-12 rounded-full')} />
               <div className='space-y-2'>
                  <div className={cn(skeletonClasses, 'h-5 w-32')} />
                  <div className={cn(skeletonClasses, 'h-4 w-24')} />
               </div>
            </div>

            {/* Bio */}
            <div className='space-y-2'>
               {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className={cn(skeletonClasses, 'h-4', index === 1 ? 'w-4/5' : 'w-full')} />
               ))}
            </div>

            {/* Stats */}
            <div className='flex justify-between pt-2 border-t'>
               {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className='text-center space-y-1'>
                     <div className={cn(skeletonClasses, 'h-5 w-8 mx-auto')} />
                     <div className={cn(skeletonClasses, 'h-3 w-12')} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   )

   const renderArticleCard = () => (
      <div className={baseClasses}>
         {/* Imagen del artículo */}
         <div className={cn(skeletonClasses, getImageHeight(), 'w-full')} />

         <div className={getSizeClasses()}>
            <div className='space-y-3'>
               {/* Categoría */}
               <div className={cn(skeletonClasses, 'h-4 w-20')} />

               {/* Título */}
               <div className='space-y-2'>
                  <div className={cn(skeletonClasses, 'h-6 w-full')} />
                  <div className={cn(skeletonClasses, 'h-6 w-3/4')} />
               </div>

               {/* Descripción */}
               <div className='space-y-2'>
                  {Array.from({ length: 3 }).map((_, index) => (
                     <div key={index} className={cn(skeletonClasses, 'h-4', index === 2 ? 'w-2/3' : 'w-full')} />
                  ))}
               </div>

               {/* Metadata */}
               <div className='flex items-center justify-between pt-3 border-t'>
                  <div className='flex items-center gap-2'>
                     <div className={cn(skeletonClasses, 'h-6 w-6 rounded-full')} />
                     <div className={cn(skeletonClasses, 'h-4 w-20')} />
                  </div>
                  <div className={cn(skeletonClasses, 'h-4 w-16')} />
               </div>
            </div>
         </div>
      </div>
   )

   const renderStatsCard = () => (
      <div className={cn(baseClasses, getSizeClasses())}>
         <div className='space-y-4'>
            {/* Header con icono */}
            <div className='flex items-center justify-between'>
               <div className={cn(skeletonClasses, 'h-5 w-24')} />
               <div className={cn(skeletonClasses, 'h-8 w-8 rounded')} />
            </div>

            {/* Número principal */}
            <div className={cn(skeletonClasses, 'h-8 w-20')} />

            {/* Cambio/tendencia */}
            <div className='flex items-center gap-2'>
               <div className={cn(skeletonClasses, 'h-4 w-4')} />
               <div className={cn(skeletonClasses, 'h-4 w-16')} />
               <div className={cn(skeletonClasses, 'h-4 w-20')} />
            </div>
         </div>
      </div>
   )

   const renderNotificationCard = () => (
      <div className={cn(baseClasses, getSizeClasses())}>
         <div className='flex gap-3'>
            {/* Avatar/Icono */}
            <div className={cn(skeletonClasses, 'h-10 w-10 rounded-full flex-shrink-0')} />

            <div className='flex-1 space-y-2'>
               {/* Título */}
               <div className={cn(skeletonClasses, 'h-4 w-3/4')} />

               {/* Contenido */}
               <div className='space-y-1'>
                  <div className={cn(skeletonClasses, 'h-3 w-full')} />
                  <div className={cn(skeletonClasses, 'h-3 w-2/3')} />
               </div>

               {/* Tiempo */}
               <div className={cn(skeletonClasses, 'h-3 w-16')} />
            </div>

            {/* Indicador */}
            <div className={cn(skeletonClasses, 'h-2 w-2 rounded-full flex-shrink-0')} />
         </div>
      </div>
   )

   const renderBasicLineCard = () => (
      // <div className={cn(baseClasses, getSizeClasses())}>
      <div className={cn(skeletonClasses, 'w-full', className)} />
      // </div>
   )

   switch (variant) {
      case 'product':
         return renderProductCard()
      case 'profile':
         return renderProfileCard()
      case 'article':
         return renderArticleCard()
      case 'stats':
         return renderStatsCard()
      case 'notification':
         return renderNotificationCard()
      case 'line':
         return renderBasicLineCard()
      default:
         return renderBasicCard()
   }
}
