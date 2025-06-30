import { cn } from '@/ultils/cn';
import { useCheckAuth, useModalAuth, useModalReserve, useReserve } from '@/hook';
import { Card2 } from '../UI/card';

import {
   Users,
   Utensils
} from 'lucide-react';

import {
   Button,
   Card,
   CardContent,
   CardImage
} from '../UI/common';

export const ReservationInfoTable = ({ className }) => {
   const {
      isAuthenticated
   } = useCheckAuth({ autoCheck: false })

   const {
      getCurrentSelectedTable,
      existSelectedTable,
      reserveConfirm,
      reservePending,
   } = useReserve()

   const {
      description,
      chairs,
      image,
      name,
   } = getCurrentSelectedTable()

   const {
      openModal
   } = useModalAuth()

   const { closeModal } = useModalReserve()

   const isActive = existSelectedTable();

   const onClickReserve = () => {
      if (!isAuthenticated) {
         reservePending();
         openModal('login');
         return;
      }
      reserveConfirm();
      closeModal();
   }

   return (
      <Card2
         className={cn(
            'transition-all flex flex-col justify-between gap-4',
            !isActive && 'translate-y-full',
            isActive && 'animate__animated animate__fadeInUp',
            className
         )}
         style={{ animationDuration: '0.5s' }}
      >
         <Card className={'block flex-1 w-full bg-transparent border-0 space-y-4'}>
            <CardImage
               zoom={true}
               className={'w-full min-h-[60%] overflow-hidden rounded-2xl'}
               src={image}
               alt={name ?? 'La imagen no esta disponible'}
            />
            <CardContent className={'flex flex-col gap-4'}>

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

               {/* <small className='font-bold text-primary-foreground space-x-4'>
                  <Locate className='inline-block align-middle' />
                  <span>
                     {zone}
                  </span>
               </small> */}

               <p className="font-bold text-primary-foreground/80 truncate-text-lines max-w-[90%]">
                  {description}
               </p>
            </CardContent>
         </Card>

         <section className='space-y-4'>
            <Button
               size={'lg'}
               onClick={onClickReserve}
               className={'w-full'}
            >
               Reservar
            </Button>

            <Button
               size={'lg'}
               variant={'destructive'}
               className={'w-full'}
            >
               Cancelar
            </Button>
         </section>
      </Card2>
   )
}