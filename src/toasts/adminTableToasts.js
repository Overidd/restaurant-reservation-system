import { isObjetError } from '@/ultils';
import { toast } from 'react-hot-toast';

export class AdminTableToasts {
   static cancelFullReservation(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Cancelando reserva...',
         success: 'Reserva cancelada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al cancelar reserva.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static updateReservation(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Actualizando reserva...',
         success: 'Reserva actualizada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al actualizar reserva.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async cancelATablesReservation(promise, { onSuccess, onError, onFinally } = {}) {
      return toast
         .promise(promise, {
            loading: 'Cancelando mesas...',
            success: 'Mesas canceladas correctamente.',
            error: (err) => isObjetError(err) ? err?.message : err || 'Error al cancelar mesas.',
         })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static confirmReserve(promise) {
      return toast.promise(promise, {
         loading: 'Confirmando reserva...',
         success: 'Reserva confirmada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al confirmar reserva.',
      });
   }

   static releaseReserve(promise) {
      return toast.promise(promise, {
         loading: 'Liberar reserva...',
         success: 'Reserva liberada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al liberar reserva.',
      });
   }

   static async createCategory(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Creando categoria...',
         success: 'Categoria creada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al crear categoria.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async updateCategory(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Actualizando categoria...',
         success: 'Categoria actualizada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al actualizar categoria.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async deleteCategory(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Eliminando categoria...',
         success: 'Categoria eliminada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al eliminar categoria.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async createObject(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Creando objeto...',
         success: 'Objeto creado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al crear objeto.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async createTable(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Creando mesa...',
         success: 'Mesa creada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al crear mesa.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async updateTable(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Actualizando mesa...',
         success: 'Mesa actualizada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al actualizar mesa.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async updateObject(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Actualizando objeto...',
         success: 'Objeto actualizado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al actualizar objeto.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async deleteObject(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Eliminando objeto...',
         success: 'Objeto eliminado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al eliminar objeto.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async updateDimension(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Actualizando la nueva dimensiones...',
         success: 'Dimensiones actualizado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al actualizar la nueva dimension.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async deleteTable(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Eliminando mesa...',
         success: 'Mesa eliminada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al eliminar mesa.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async createRestaurant(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Creando restaurante...',
         success: 'Restaurante creado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al crear restaurante.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async updateRestaurant(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Actualizando restaurante...',
         success: 'Restaurante actualizado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al actualizar restaurante.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async deleteRestaurant(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Eliminando restaurante...',
         success: 'Restaurante eliminado correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al eliminar restaurante.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async blockTempTable(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Bloqueando mesa...',
         success: 'Mesa bloqueada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al bloquear mesa.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }

   static async unblockTempTable(promise, { onSuccess, onError, onFinally } = {}) {
      return toast.promise(promise, {
         loading: 'Desbloqueando mesa...',
         success: 'Mesa desbloqueada correctamente.',
         error: (err) => isObjetError(err) ? err?.message : err || 'Error al desbloquear mesa.',
      })
         .then(() => onSuccess?.())
         .catch((err) => onError?.(err))
         .finally(() => onFinally?.());
   }
}