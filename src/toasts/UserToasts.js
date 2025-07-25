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

   static updateProfile = (promise, { onSuccess, onError, onFinally } = {}) => {
      toast.promise(promise, {
         loading: 'Actualizando perfil...',
         success: 'Perfil actualizado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al actualizar perfil',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }
};