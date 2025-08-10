import { cn } from '@/ultils';
import { CircleAlert, Image } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';


export const ObjectPreview = ({
   image,
   width,
   height,
   rotation,
   name,
   className
}) => {
   const [imageError, setImageError] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const imageRef = useRef(new window.Image())

   useEffect(() => {
      imageRef.current.crossOrigin = 'anonymous'
      imageRef.current.onload = () => {
         setImageError(false)
         setIsLoading(false)
      }
      imageRef.current.onerror = () => {
         setIsLoading(false)
         setImageError(true)
      }
      if (image) {
         setIsLoading(true)
         setImageError(false)
         imageRef.current.src = image
      }
   }, [image])

   const cellSize = 30
   const gridWidth = width > 0 ? width * cellSize : cellSize
   const gridHeight = height > 0 ? height * cellSize : cellSize

   const renderGrid = () => {
      if (width <= 0 || height <= 0) return null
      const cells = []
      for (let row = 0; row < height; row++) {
         for (let col = 0; col < width; col++) {
            cells.push(
               <div
                  key={`${row}-${col}`}
                  className={cn(
                     'border border-gray-300 bg-white/40',
                     imageError && 'border-destructive bg-destructive/40',
                  )}
                  style={{
                     position: 'absolute',
                     left: col * cellSize,
                     top: row * cellSize,
                     width: cellSize,
                     height: cellSize,
                  }}
               />,
            )
         }
      }
      return cells
   }

   return (
      <div className={cn(
         'flex flex-col items-center space-y-2 p-4 rounded-lg shadow-2xl',
         className
      )}>
         <div className='relative flex items-center justify-center min-h-[120px] min-w-[120px] p-4'>
            <div
               className='relative'
               style={{
                  width: `${gridWidth}px`,
                  height: `${gridHeight}px`,
                  transform: `rotate(${rotation || 0}deg)`,
                  transition: 'all 0.3s ease',
               }}
            >
               <div className='absolute inset-0'>
                  {renderGrid()}
               </div>

               {isLoading && (
                  <div className='absolute inset-0 flex flex-col items-center justify-center rounded'>
                     <div className='w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin' />
                  </div>
               )}

               {imageError && (
                  <div className='absolute inset-0 flex flex-col items-center justify-center rounded'>
                     <CircleAlert
                        className='w-6 h-6 text-red-400'
                        strokeWidth={3}
                     />
                     <span className='text-xs text-red-400 mt-1'>
                        Error
                     </span>
                  </div>
               )}

               {imageRef.current.src && !isLoading && !imageError && image && (
                  <img
                     src={imageRef.current.src}
                     alt={name || 'Preview'}
                     className='absolute inset-0 w-full h-full object-contain z-10'
                     style={{ transform: 'none' }}
                  />
               )}

               {!isLoading && !imageError && !image && (
                  <div className='absolute inset-0 flex flex-col items-center justify-center  rounded'>
                     <Image />
                  </div>
               )}
            </div>
         </div>

         {/* Información del objeto */}
         <div className='text-center space-y-1'>
            {name &&
               <p className='text-sm font-medium truncate max-w-[200px]'>
                  {name}
               </p>
            }
            <div className='flex space-x-4 text-xs'>
               {width > 0 && (
                  <span>
                     W: {width} {width === 1 ? 'celda' : 'celdas'}
                  </span>
               )}
               {height > 0 && (
                  <span>
                     H: {height} {height === 1 ? 'celda' : 'celdas'}
                  </span>
               )}
               {rotation > 0 && <span>R: {rotation}°</span>}
            </div>
            {/* {width > 0 && height > 0 && (
               <p className='text-xs text-blue-600 font-medium'>
                  Ocupa {width * height} {width * height === 1 ? 'celda' : 'celdas'} en total
               </p>
            )} */}
         </div>
      </div>
   )
}