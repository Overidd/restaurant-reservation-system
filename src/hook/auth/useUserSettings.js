import { userSettingProvider } from '@/doman/services';
import { updateProfileAction } from '@/doman/store/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const useUserSettings = () => {
   const dispatch = useDispatch();

   const [loading, setLoading] = useState({
      updateProfile: false,
      cancelReservation: false,
      updateReservation: false,
   });

   const updatePhone = async (data) => {
      if (!data) return;

      setLoading(prev => ({ ...prev, updateProfile: true }));

      const { user } = await userSettingProvider.updateProfile(data);

      setLoading(prev => ({ ...prev, updateProfile: false }));
      dispatch(updateProfileAction(user));

   };

   const updateReservation = async (data) => {
      if (!data) return;

      setLoading(prev => ({ ...prev, updateReservation: true }));

      const { reservation, ok, errorMessage } = await userSettingProvider.updateReservation(data);

      setLoading(prev => ({ ...prev, updateReservation: false }));

      if (!ok) throw errorMessage;
      return reservation;
   };

   const updateProfile = async (data) => {
      if (!data) throw new Error('Error Inesperado');

      setLoading(prev => ({ ...prev, updateProfile: true }));

      const { user, ok, errorMessage } = await userSettingProvider.updateProfile(data);

      setLoading(prev => ({ ...prev, updateProfile: false }));

      if (!ok) throw errorMessage;

      dispatch(updateProfileAction(user));
      return user;
   };

   const cancelReservation = async (id) => {
      if (!id || typeof id !== 'string') throw new Error('Error Inesperado');

      setLoading(prev => ({ ...prev, cancelReservation: true }));

      const { reservation, ok, errorMessage } = await userSettingProvider.cancelReservation(id);

      setLoading(prev => ({ ...prev, cancelReservation: false }));

      if (!ok) throw errorMessage;
      return reservation;
   };

   return {
      loading: {
         updateProfile: loading.updateProfile,
         cancelReservation: loading.cancelReservation,
         updateReservation: loading.updateReservation
      },
      updateProfile,
      cancelReservation,
      updateReservation,
      updatePhone
   };
};
