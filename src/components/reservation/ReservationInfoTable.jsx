import { cn } from '@/ultils/cn';
import { ReservationCard } from '.';
import { Button, Card, CardContent, CardImage } from '../UI/common';
import { useReserve } from '@/hook';

export const ReservationInfoTable = ({ className }) => {
   const { getCurrentSelectedTable } = useReserve()

   const { image, name, description, chairs } = getCurrentSelectedTable()


   return (
      <ReservationCard
         className={cn(className)}
      >
         <Card className={'w-full h-[20rem] text-center'}>
            <CardImage
               zoom={true}
               className={'w-full bg-amber-400 min-h-[70%]'}
               src={image}
               alt={name ?? 'La imagen no esta disponible'}
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
               <small>
                  {chairs} personas
               </small>
            </CardContent>
         </Card>

         <section className='space-y-4'>
            <Button
               className={'w-full'}
               size={'lg'}
            >
               Reservar
            </Button>
            <Button
               className={'w-full'}
               variant={'destructive'}
               size={'lg'}
            >
               Cancelar
            </Button>
         </section>

      </ReservationCard>
   )
}
