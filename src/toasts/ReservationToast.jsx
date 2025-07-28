import { toast } from 'react-hot-toast';

import {
   ReservaRejected,
   ReservaSuccess
} from '@/components/reservation';
import { isObjetError } from '@/ultils';

export const ReservationToast = (promise, { onSuccess, onError, onFinally } = {}) =>
   toast.promise(promise, {
      loading: 'Confirmando reserva...',
      success: 'Reserva exitosa 🎉',
      error: (err) => isObjetError(err) ? err?.message : err || 'Error al realizar la reserva',
   },
      {
         style: {
            minWidth: '250px',
         },
      }
   )
      .then((data) => {
         toast((t) => {
            onSuccess && onSuccess(data);
            return <ReservaSuccess t={t} code={data?.code || '---'} {...data} />
         }, {
            duration: Infinity,
         });
      })
      .catch((err) => {
         toast((t) => {
            onError && onError(err);
            return <ReservaRejected t={t} message={err.message || 'Ocurrio un error inesperado'} />
         }, {
            duration: 6000,
         });
      })
      .finally(() => onFinally && onFinally());