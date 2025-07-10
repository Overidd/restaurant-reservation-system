import { userSettingProvider } from '@/doman/services';

export const useUserSettings = () => {

   const editProfile = async () => {

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
      editProfile,
      cancelReservation
   }
}