import { MapPin } from 'lucide-react';
import { Button, Card, CardContent, CardFooter, CardImage } from '../UI/common';

export const ItemLocation = ({
   image,
   name,
   description,
   linkMap,
   address
}) => {
   return (
      <Card className={'w-full text-center'}>
         <CardImage
            zoom={true}
            className={'w-full rounded-2xl bg-amber-400 min-h-[70%]'}
            src={image}
            alt={name}
         />
         <CardContent className={'space-y-4'}>
            <p className='text-card-foreground font-bold truncate-text-nowarp max-w-[90%] mx-auto'>
               {name}
            </p>
            <small
               className="font-bold text-muted-foreground/80 truncate-text-lines max-w-[90%] mx-auto"
            >
               {address}
            </small>
         </CardContent>
         <CardFooter>
            <a
               className={'mx-auto'}
               href={linkMap}
               target='_blank'
               rel="noreferrer"
            >
               <Button>
                  Como llegar
                  <MapPin />
               </Button>
            </a>
         </CardFooter>
      </Card>
   )
}