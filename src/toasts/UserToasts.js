import { isObjetError } from "@/ultils";
import toast from "react-hot-toast";

export class UserToasts {
   static confirmReserve = (promise, { onSuccess, onError, onFinally } = {}) => {
      toast.promise(promise, {
         loading: 'Confirmando reserva...',
         success: 'Reserva confirmada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al confirmar reserva',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   };
};