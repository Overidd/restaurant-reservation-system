import { cn } from '@/ultils'
import { Clock, Edit, ExternalLink, Grid3X3, MapPin, Trash2 } from 'lucide-react'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Separator } from '../UI/common'

export const RestaurantList = ({
   onEdit,
   onDelete,
   className,
   restaurants = []
}) => {
   return (
      <div className={cn(
         'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
         className
      )}>
         {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className='overflow-hidden'>
               <div className='relative'>
                  <image
                     src={restaurant.image || '/placeholder.svg'}
                     alt={restaurant.name}
                     width={400}
                     height={200}
                     className='w-full h-48 object-cover'
                  />
                  <div className='absolute top-2 right-2'>
                     <Badge variant={restaurant.status ? 'default' : 'secondary'}>
                        {restaurant.status ? 'Activa' : 'Inactiva'}
                     </Badge>
                  </div>
               </div>

               <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                     <span className='truncate'>{restaurant.name}</span>
                     <div className='flex gap-1'>
                        <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => onEdit(restaurant)}>
                           <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                           variant='ghost'
                           size='icon'
                           className='h-8 w-8 text-destructive hover:text-destructive'
                           onClick={() => onDelete(restaurant.id)}
                        >
                           <Trash2 className='h-4 w-4' />
                        </Button>
                     </div>
                  </CardTitle>
               </CardHeader>

               <CardContent className='space-y-3'>
                  <div className='flex items-start gap-2'>
                     <MapPin className='h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0' />
                     <p className='text-sm text-muted-foreground'>{restaurant.description}</p>
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
                        {restaurant.hours.slice(0, 3).map((hour) => (
                           <Badge key={hour.id} variant='outline' className='text-xs'>
                              {hour.hour}
                           </Badge>
                        ))}
                        {restaurant.hours.length > 3 && (
                           <Badge variant='outline' className='text-xs'>
                              +{restaurant.hours.length - 3}
                           </Badge>
                        )}
                     </div>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between'>
                     <div className='text-xs text-muted-foreground'>
                        <p>Creado: {restaurant.createdAt.split(',')[0]}</p>
                        <p>Actualizado: {restaurant.updatedAt.split(',')[0]}</p>
                     </div>

                     {restaurant.linkMap && (
                        <Button variant='outline' size='sm' asChild>
                           <a href={restaurant.linkMap} target='_blank' rel='noopener noreferrer'>
                              <ExternalLink className='h-4 w-4 mr-1' />
                              Mapa
                           </a>
                        </Button>
                     )}
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
   )
}
