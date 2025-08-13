import { cn } from '@/ultils';
import { Cuboid } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ResourceObject = ({
   object,
   isCursorPreview = false,
   highlighted = false,
   hasConflict = false,
   onClick,
   ...Props
}) => {

   const [isLoading, setIsLoading] = useState(true)
   const [hasError, setHasError] = useState(false)
   const [imageSrc, setImageSrc] = useState(null)

   useEffect(() => {
      if (!object?.image) {
         setHasError(true)
         setIsLoading(false)
         return
      }

      setIsLoading(true)
      setHasError(false)

      const img = new window.Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
         setImageSrc(object.image)
         setIsLoading(false)
         setHasError(false)
      }

      img.onerror = () => {
         setIsLoading(false)
         setHasError(true)
         setImageSrc(null)
      }

      img.src = object.image
   }, [object?.image])

   return (
      <div
         tabIndex={0}
         role='button'
         className={cn(
            'relative w-full h-full overflow-hidden rounded-xl',
            highlighted && 'transition-shadow rounded-2xl shadow-lg bg-background',
            isCursorPreview && 'opacity-60 pointer-events-none',
            hasConflict && 'bg-red-500/30',
         )}
         style={{
            transform: `rotate(${object.rotation || 0}deg)`,
         }}
         onClick={onClick}
         onKeyDown={(e) => e.key === 'Enter' && onClick()}
         {...Props}
      >
         {isLoading && (
            <div className={cn('animate-pulse rounded-lg flex items-center justify-center')} />
         )}

         {hasError && !isLoading && (
            <div className='absolute inset-0 flex items-center justify-center rounded-lg'>
               {/* <Image /> */}
               <Cuboid />
            </div>
         )}

         {imageSrc && !isLoading && !hasError && (
            // <img
            //    src={imageSrc || '/placeholder.svg'}
            //    alt={object.alt || 'Objeto del restaurante'}
            //    className='w-full h-full object-cover object-center transition-opacity duration-300'
            //    style={{ opacity: isLoading ? 0 : 1 }}
            // />
            <div
               style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
               }}
            />
         )}
      </div>
   )
}