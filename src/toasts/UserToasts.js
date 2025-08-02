import { isObjetError } from '@/ultils';
import toast from 'react-hot-toast';

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

   static login = (promise, { onSuccess, onError, onFinally } = {}) => {
      toast.promise(promise, {
         loading: 'Iniciando sesión...',
         success: 'Sesión iniciada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al iniciar sesión',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static register = (promise, { onSuccess, onError, onFinally } = {}) => {
      toast.promise(promise, {
         loading: 'Registrando usuario...',
         success: 'Usuario registrado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al registrar usuario',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static logout = (promise, { onSuccess, onError, onFinally } = {}) => {
      toast.promise(promise, {
         loading: 'Cerrando sesión...',
         success: 'Sesión cerrada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al cerrar sesión',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static recoverPassword = (promise, { onSuccess, onError, onFinally } = {}) => {
      toast.promise(promise, {
         loading: 'Everificando correo...',
         success: 'Se envió un correo para recuperar contraseña.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al recuperar contraseña',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }
};