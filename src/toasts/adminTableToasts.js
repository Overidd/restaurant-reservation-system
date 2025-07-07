import { toast } from 'react-hot-toast';

export const adminTableToasts = {

   cancelFullReservation: (promise) =>
      toast.promise(promise, {
         loading: 'Cancelando reserva...',
         success: 'Reserva cancelada correctamente.',
         error: (err) => err?.message || 'Error al cancelar reserva.',
      }),

   cancelATablesReservation: (promise, { onSuccess, onError }) =>
      toast.promise(promise, {
         loading: 'Cancelando mesas...',
         success: 'Mesas canceladas correctamente.',
         error: (err) => err?.message || 'Error al cancelar mesas.',
      })
         .then(() => onSuccess && onSuccess())
         .catch((err) => onError && onError(err)),

   deleteTable: (promise) =>
      toast.promise(promise, {
         loading: 'Eliminando mesa...',
         success: 'Mesa eliminada correctamente.',
         error: (err) => err?.message || 'Error al eliminar mesa.',
      }),

   confirmReserve: (promise) =>
      toast.promise(promise, {
         loading: 'Confirmando reserva...',
         success: 'Reserva confirmada correctamente.',
         error: (err) => err?.message || 'Error al confirmar reserva.',
      }),

   releaseReserve: (promise) =>
      toast.promise(promise, {
         loading: 'Liberar reserva...',
         success: 'Reserva liberada correctamente.',
         error: (err) => err?.message || 'Error al liberar reserva.',
      }),
};