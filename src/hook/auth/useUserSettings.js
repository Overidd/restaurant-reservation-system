import { userSettingProvider } from '@/doman/services';
import { updateProfileAction } from '@/doman/store/auth';
import { useDispatch } from 'react-redux';

export const useUserSettings = () => {
   const dispatch = useDispatch()

   const updateReservation = async (data) => {
      if (!data) return;
      const { reservation, ok, errorMessage } = await userSettingProvider.updateReservation(data);
      if (!ok) {
         throw errorMessage
      }

      return reservation
   }

   const updateProfile = async (data) => {
      if (!data) {
         throw new Error('Error Inesperado');
      }
      const { user, ok, errorMessage } = await userSettingProvider.updateProfile(data);
      if (!ok) {
         throw errorMessage
      }

      dispatch(updateProfileAction(user))
      return user

   }

   const cancelReservation = async (id) => {
      if (!id || typeof id !== 'string') {
         throw new Error('Error Inesperado');
      }
      const { reservation, ok, errorMessage } = await userSettingProvider.cancelReservation(id);

      if (!ok) {
         throw errorMessage
      }
      return reservation
   }

   return {
      // State

      // Funciones
      updateProfile,
      cancelReservation,
      updateReservation
   }
}