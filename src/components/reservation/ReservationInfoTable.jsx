import { cn } from '@/ultils/cn';
import { useReserve } from '@/hook';
import { ReservationCard } from '.';
import {
   Button,
   Card,
   CardContent,
   CardImage
} from '../UI/common';

export const ReservationInfoTable = ({ className }) => {
   const { getCurrentSelectedTable, existSelectedTable } = useReserve()
   const { image, name, description, chairs } = getCurrentSelectedTable()
   const isActive = existSelectedTable();

   return (
      <ReservationCard
         className={cn(
            'transition-all flex flex-col justify-between gap-4',
            !isActive && 'translate-y-full',
            isActive && 'animate__animated animate__fadeInUp',
            className
         )}
         style={{ animationDuration: '0.5s' }}
      >
         <Card className={'block flex-1 w-full text-center bg-transparent border-0 space-y-4'}>
            <CardImage
               zoom={true}
               className={'w-full min-h-[60%] overflow-hidden rounded-2xl'}
               src={image}
               alt={name ?? 'La imagen no esta disponible'}
            />
            <CardContent className={'space-y-4'}>
               <p className='text-primary-foreground font-bold truncate-text-nowarp max-w-[90%] mx-auto'>
                  {name}
               </p>
               <small
                  className="font-bold text-primary-foreground/80 truncate-text-lines max-w-[90%] mx-auto"
               >
                  {description}
               </small>
               <small className='font-bold text-primary-foreground/80'>
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