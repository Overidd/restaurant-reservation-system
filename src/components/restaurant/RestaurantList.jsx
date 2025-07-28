import { cn } from '@/ultils';
import { Clock, Edit, ExternalLink, Grid3X3, MapPin } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Separator } from '../UI/common';
import { CardSkeleton } from '../UI/skeleton';

export const RestaurantList = ({
   openModalEdit,
   className,
   restaurants = [],
   isLoading = false
}) => {

   return (
      <div className={cn(
         'grid grid-cols-[repeat(auto-fill,minmax(18rem,20rem))] gap-6',
         className
      )}>
         {isLoading && Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton
               key={index}
               variant='product'
            />
         ))}

         {!isLoading && restaurants.map((restaurant) => (
            <RestaurantItem
               key={restaurant.id}
               restaurant={restaurant}
               openModalEdit={openModalEdit}
            />
         ))}
      </div>
   )
}

export const RestaurantItem = ({
   restaurant,
   openModalEdit
}) => {

   return (
      <Card
         key={restaurant.id}
         className={cn(
            'overflow-hidden gap-8',
            'transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer'
         )}
      >
         <div className='relative rounded-lg overflow-hidden'>
            <img
               src={restaurant.image || '/default-image.jpg'}
               alt={restaurant.name}
               width={400}
               height={200}
               className='w-full h-48 object-cover'
            />
            <div className='absolute top-2 right-2'>
               <Badge
                  className={cn(
                     !restaurant.status && 'bg-red-400'
                  )}
               >
                  {restaurant.status
                     ? 'Activa'
                     : 'Inactiva'
                  }
               </Badge>
            </div>
         </div>

         <CardHeader>
            <CardTitle className='flex items-center justify-between'>
               <span className='truncate'>{restaurant.name}</span>
            </CardTitle>
         </CardHeader>

         <CardContent className='space-y-3'>
            <div className='flex items-start gap-2'>
               <MapPin className='h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0' />
               <p className='text-sm text-muted-foreground'>
                  {restaurant.address}
               </p>
            </div>

            <div className='flex items-center gap-4 text-sm'>
               <div className='flex items-center gap-1'>
                  <Grid3X3 className='h-4 w-4 text-muted-foreground' />
                  <span>
                     {restaurant.rows} × {restaurant.columns} mesas
                  </span>
               </div>
            </div>

            <div className='flex items-center gap-2'>
               <Clock className='h-4 w-4 text-muted-foreground' />
               <div className='flex flex-wrap gap-1'>
                  {restaurant?.hours?.slice(0, 3).map((hour) => (
                     <Badge
                        key={hour.id}
                        variant='outline'
                        className='text-xs'
                     >
                        {hour.name}
                     </Badge>
                  ))}
                  {restaurant?.hours?.length > 3 && (
                     <Badge
                        variant='outline'
                        className='text-xs'
                     >
                        +{restaurant.hours.length - 3}
                     </Badge>
                  )}
               </div>
            </div>

            <Separator />

            <div className='flex items-center justify-between'>
               {restaurant.linkMap && (
                  <Button
                     variant='outline'
                     size='sm'
                  >
                     <a
                        href={restaurant.linkMap}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={'flex items-center'}
                     >
                        <ExternalLink className='h-4 w-4 mr-1' />
                        Mapa
                     </a>
                  </Button>
               )}
               <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => openModalEdit(restaurant)}
               >
                  <Edit className='h-4 w-4' />
               </Button>
            </div>

         </CardContent>
      </Card>
   )
}