
import {
   Users,
   Utensils,
} from 'lucide-react';

import {
   useReserve
} from '@/hook';
import { cn } from '@/ultils/cn';

import { Card2 } from '../UI/card';
import {
   Card,
   CardContent,
   CardImage
} from '../UI/common';








export const ReservationInfoTable = ({ className }) => {
   const {
      getCurrentSelectedTable,
      isPending
   } = useReserve()

   const {
      description,
      chairs,
      image,
      name,
   } = getCurrentSelectedTable()

   const isOpen = !!name && !!image

   return (
      <Card2
         className={cn(
            'transition-all flex flex-col justify-between gap-4 !p-5 animate__animated',
            (!isOpen || isPending) && 'translate-x-[150%] md:-translate-y-[120%] md:translate-x-0 opacity-0 md:opacity-100 duration-0 md:duration-500 hidden md:flex',
            (isOpen && !isPending) && 'animate__fadeInUp',
            'rounded-none md:rounded-2xl opacity-100',
            className
         )}
         style={{ animationDuration: '0.5s' }}
      >
         <Card className={'block flex-1 w-full bg-transparent border-0 space-y-4'}>
            <CardImage
               zoom={true}
               className={'w-full max-h-[75%] overflow-hidden rounded-2xl'}
               src={image}
               alt={name ?? 'La imagen no esta disponible'}
            />
            <CardContent className={'grid grid-cols-2 gap-2'}>

               <h4 className='text-primary-foreground font-bold truncate-text-nowarp max-w-[90%] space-x-4'>
                  <Utensils className='inline-block align-middle' />
                  <span>{name}</span>
               </h4>

               <small className='font-bold text-primary-foreground space-x-4'>
                  <Users className='inline-block align-middle' />
                  <span>
                     {chairs}
                  </span>
               </small>

               <p className='col-span-2 font-bold text-primary-foreground/80 truncate-text-lines max-w-[90%] truncate-text-lines text-center'>
                  {description}
               </p>
            </CardContent>
         </Card>

         {/* <Button
            size={'lg'}
            className={'mx-auto w-full'}
            onClick={onClickReserve}
            disabled={isPending}
         >
            Reservar
         </Button> */}
      </Card2>
   )
}