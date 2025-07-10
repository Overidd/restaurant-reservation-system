import toast from 'react-hot-toast';

export class UserSettingToasts {

   static cancelReservation = (promese, { onSuccess, onError }) => {
      toast.promise(promese, {
         loading: 'Cancelando Reserva',
         success: 'Reserva Cancelada',
         error: 'Error al cancelar reserva'
      })
         .then((data) => onSuccess && onSuccess(data))
         .catch((err) => onError && onError(err));
   }

}