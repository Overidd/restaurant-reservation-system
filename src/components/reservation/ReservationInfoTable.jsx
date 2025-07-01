import toast from 'react-hot-toast';
import { cn } from '@/ultils/cn';
import { Card2 } from '../UI/card';

import {
   useCheckAuth,
   useModalAuth,
   useModalReserve,
   useReserve
} from '@/hook';

import {
   Users,
   Utensils,
   X,
   XCircle
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
      reservePending();

      if (!isAuthenticated) {
         openModal('login');
         return;
      }

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

export const ReservaSuccess = ({ t, code }) => {
   return (
      <div className='flex items-start justify-between gap-4 p-2'>
         <div>
            <p className='font-semibold text-lg'>¡Reserva confirmada! 🎉</p>
            <p className='text-sm mt-1'>Tu código de reserva es:</p>
            <p className='font-bold text-md mt-1'>{code}</p>
         </div>
         <Button onClick={() => toast.dismiss(t.id)} >
            <X size={18} />
         </Button>
      </div>
   )
}

export const ReservaRejected = ({ t, message }) => {
   return (
      <div className='flex items-start justify-between gap-4 p-2'>
         <div>
            <p className='font-semibold text-lg flex items-center gap-1'>
               <XCircle size={18} className='text-red-500' />
               Error en la reserva
            </p>
            <p className='text-sm mt-1'>{message}</p>
         </div>
         <Button onClick={() => toast.dismiss(t.id)} >
            <XCircle size={18} />
         </Button>
      </div>
   )
}