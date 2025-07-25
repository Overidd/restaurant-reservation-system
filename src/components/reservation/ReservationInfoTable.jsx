
import {
   Users,
   Utensils,
} from 'lucide-react';

import {
   useModalAuth,
   useModalReserve,
   useReserve
} from '@/hook';
import { cn } from '@/ultils/cn';

import { Card2 } from '../UI/card';
import {
   Button,
   Card,
   CardContent,
   CardImage
} from '../UI/common';

import { useUser } from '@/hook/auth';


import { ReservationToast } from '@/toasts';





export const ReservationInfoTable = ({ className }) => {
   const { isAuthenticated } = useUser()

   const {
      getCurrentSelectedTable,
      existSelectedTable,
      reserveConfirm,
      reservePendingAuth,
      reservePending,
      isPending
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

   const {
      closeModal
   } = useModalReserve()

   const isOpen = existSelectedTable();

   const onClickReserve = async () => {
      if (!isAuthenticated) {
         reservePendingAuth();
         openModal('login');
         return;
      }

      reservePending()

      ReservationToast(reserveConfirm(), {
         onSuccess: () => {
            window.requestAnimationFrame(() => {
               closeModal();
            })
         }
      });
   }

   return (
      <Card2
         className={cn(
            'transition-all flex flex-col justify-between gap-4 !p-5 animate__animated',
            (!isOpen || isPending) && 'translate-x-[150%] md:translate-y-full md:translate-x-0 opacity-0 md:opacity-100 duration-0 md:duration-500 hidden md:flex',
            (isOpen && !isPending) && 'animate__fadeInUp',
            'rounded-none md:rounded-2xl opacity-100',
            className
         )}
         style={{ animationDuration: '0.5s' }}
      >
         <Card className={'block flex-1 w-full bg-transparent border-0 space-y-4'}>
            <CardImage
               zoom={true}
               className={'w-full overflow-hidden rounded-2xl'}
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

               <p className="font-bold text-primary-foreground/80 truncate-text-lines max-w-[90%]">
                  {description}
               </p>
            </CardContent>
         </Card>

         <Button
            size={'lg'}
            className={'mx-auto w-full'}
            onClick={onClickReserve}
            disabled={isPending}
         >
            Reservar
         </Button>
      </Card2>
   )
}