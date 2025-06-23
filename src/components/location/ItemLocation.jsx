import { MapPin } from 'lucide-react';
import { Button, Card, CardContent, CardFooter, CardImage } from '../UI/common';

export const ItemLocation = ({ image, name, description }) => {
   return (
      <Card className={'w-full text-center'}>
         <CardImage
            zoom={true}
            className={'w-full bg-amber-400 min-h-[70%]'}
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
               {description}
            </small>
         </CardContent>
         <CardFooter>
            <Button className={'mx-auto'}>
               Como llegar
               <MapPin />
            </Button>
         </CardFooter>
      </Card>
   )
}