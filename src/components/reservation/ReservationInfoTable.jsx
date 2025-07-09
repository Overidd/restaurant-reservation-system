import toast from 'react-hot-toast';

import {
   Users,
   Utensils,
} from 'lucide-react';

import {
   useCheckAuth,
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

import {
   ReservaRejected,
   ReservaSuccess
} from '.';





export const ReservationInfoTable = ({ className }) => {
   const {
      isAuthenticated
   } = useCheckAuth({ autoCheck: false })

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

   const isActive = existSelectedTable();

   const onClickReserve = async () => {
      if (!isAuthenticated) {
         reservePendingAuth();
         openModal('login');
         return;
      }

      reservePending()

      toast.promise(
         reserveConfirm(),
         {
            loading: 'Confirmando reserva...',
            success: 'Reserva exitosa 🎉',
            error: (err) => err.message || 'Error al realizar la reserva'
         },
         {
            style: {
               minWidth: '250px'
            }
         })
         .then((data) => {
            toast((t) => (
               <ReservaSuccess t={t} code={data.code} />
            ), { duration: Infinity })

            closeModal()
         })
         .catch((err) => {
            toast((t) => (
               <ReservaRejected t={t} message={err.message || 'Ocurrió un error inesperado'} />
            ), { duration: 6000 })

            // reserveResetSelectTables();
         })
   }

   return (
      <Card2
         className={cn(
            'transition-all flex flex-col justify-between gap-4',
            (!isActive || isPending) && 'translate-y-full',
            (isActive && !isPending) && 'animate__animated animate__fadeInUp',
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
               disabled={isPending}
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