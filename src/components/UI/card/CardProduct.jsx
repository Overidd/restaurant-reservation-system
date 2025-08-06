import { cn } from '@/ultils';
import { Clock, Heart, ShoppingCart, Star, Users } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button, Card, CardContent, CardFooter } from '../common';


export const CardProduct = ({
   name,
   description,
   price,
   originalPrice,
   image,
   category,
   rating = 0,
   reviewCount = 0,
   preparationTime,
   servings,
   isPopular = false,
   isNew = false,
   isOnSale = false,
   className,
   variant = 'default',
}) => {
   const [isFavorite, setIsFavorite] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleAddToCart = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
   }

   const toggleFavorite = () => {
      setIsFavorite(!isFavorite)
   }


   const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

   if (variant === 'compact') {
      return (
         <Card
            data-aos='zoom-in-up'
            className={cn(
               'group overflow-hidden hover:shadow-md transition-all duration-300',
               'flex flex-row items-center card-transition',
               className
            )}>
            <figure className='relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden'>
               <img
                  alt={name}
                  src={image || '/default-image.jpg'}
                  className='object-cover object-center transition-transform duration-300 group-hover:scale-105'
               />
            </figure>
            <CardContent className='flex-1 p-4'>
               <div className='flex justify-between items-start mb-2'>
                  <h3 className='font-semibold text-sm line-clamp-1'>
                     {name}
                  </h3>
                  <Button
                     variant='ghost'
                     size='sm'
                     onClick={toggleFavorite}
                     className='top-2 right-2 hover:bg-transparent hover:text-primary'
                  >
                     <Heart
                        strokeWidth={2}
                        fill={isFavorite ? 'currentColor' : 'none'}
                        className={cn('w-4 h-4', isFavorite && 'text-primary')}
                     />
                  </Button>
               </div>
               <p className='text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2'>
                  {description}
               </p>
               <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-1'>
                     <span className='font-bold text-primary'>
                        S/ {price}
                     </span>
                     {originalPrice && <span className='text-xs text-gray-500 line-through'>
                        S/ {originalPrice}
                     </span>}
                  </div>
                  <Button
                     size='sm'
                     onClick={handleAddToCart}
                     disabled={isLoading}
                  >
                     <ShoppingCart className='w-3 h-3' />
                  </Button>
               </div>
            </CardContent>
         </Card>
      )
   }

   return (
      <Card
         data-aos='zoom-in-up'
         className={cn(
            'group overflow-hidden card-transition',
            className,
         )}
      >
         <div className='relative'>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden'>
               <img
                  alt={name}
                  src={image || '/default-image.jpg'}
                  className='object-cover object-center transition-transform duration-300 group-hover:scale-105'
               />

               <div className='absolute top-3 left-3 flex flex-col gap-1'>
                  {isPopular && <Badge className='text-xs'>
                     Popular
                  </Badge>}
                  {isNew && <Badge className='bg-sidebar-background text-xs'>
                     Nuevo
                  </Badge>}
                  {isOnSale && discount > 0 && <Badge className='text-xs bg-destructive'>
                     -{discount}%
                  </Badge>}
               </div>

               <Button
                  variant='ghost'
                  size='sm'
                  onClick={toggleFavorite}
                  className='absolute top-2 right-2 hover:bg-transparent hover:text-primary'
               >
                  <Heart
                     strokeWidth={2}
                     fill={isFavorite ? 'currentColor' : 'none'}
                     className={cn('w-4 h-4', isFavorite && 'text-primary')}
                  />
               </Button>
            </div>

            <CardContent className='p-4'>
               <div className='flex justify-between items-start mb-2'>
                  <Badge variant='outline' className='text-xs'>
                     {category}
                  </Badge>
                  {rating > 0 && (
                     <div className='flex items-center gap-1'>
                        <Star className='w-3 h-3 -yellow-400 text-yellow-400' />
                        <span className='text-xs font-medium'>
                           {rating}
                        </span>
                     </div>
                  )}
               </div>

               <h3 className='font-semibold text-base mb-2 transition-colors line-clamp-1'>
                  {name}
               </h3>

               <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2'>
                  {description}
               </p>

               {(preparationTime || servings) && (
                  <div className='flex items-center gap-3 mb-3 text-xs text-gray-500'>
                     {preparationTime && (
                        <div className='flex items-center gap-1'>
                           <Clock className='w-3 h-3' />
                           <span>{preparationTime}</span>
                        </div>
                     )}
                     {servings && (
                        <div className='flex items-center gap-1'>
                           <Users className='w-3 h-3' />
                           <span>{servings}p</span>
                        </div>
                     )}
                  </div>
               )}
            </CardContent>

            <CardFooter className='p-4 pt-0'>
               <div className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-2'>
                     <span className='text-xl font-bold text-primary'>
                        S/ {price}
                     </span>
                     {originalPrice && originalPrice !== price && <span className='text-sm text-gray-500 line-through'>
                        S/ {originalPrice}
                     </span>}
                  </div>
                  <Button
                     onClick={handleAddToCart}
                     disabled={isLoading}
                     size='sm'
                  >
                     {isLoading ? '...' : 'Agregar'}
                  </Button>
               </div>
            </CardFooter>
         </div>
      </Card>
   )
}
