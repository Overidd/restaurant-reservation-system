import { toast } from 'react-hot-toast';

export class AdminTableToasts {
   static cancelFullReservation(promise) {
      return toast.promise(promise, {
         loading: 'Cancelando reserva...',
         success: 'Reserva cancelada correctamente.',
         error: (err) => err?.message || 'Error al cancelar reserva.',
      });
   }

   static cancelATablesReservation(promise, { onSuccess, onError }) {
      return toast
         .promise(promise, {
            loading: 'Cancelando mesas...',
            success: 'Mesas canceladas correctamente.',
            error: (err) => err?.message || 'Error al cancelar mesas.',
         })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err));
   }

   static deleteTable(promise) {
      return toast.promise(promise, {
         loading: 'Eliminando mesa...',
         success: 'Mesa eliminada correctamente.',
         error: (err) => err?.message || 'Error al eliminar mesa.',
      });
   }

   static confirmReserve(promise) {
      return toast.promise(promise, {
         loading: 'Confirmando reserva...',
         success: 'Reserva confirmada correctamente.',
         error: (err) => err?.message || 'Error al confirmar reserva.',
      });
   }

   static releaseReserve(promise) {
      return toast.promise(promise, {
         loading: 'Liberar reserva...',
         success: 'Reserva liberada correctamente.',
         error: (err) => err?.message || 'Error al liberar reserva.',
      });
   }
}