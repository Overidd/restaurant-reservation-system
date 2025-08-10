import { userSettingProvider } from '@/doman/services';
import { updateUserDetailAction } from '@/doman/store/userDetailsPage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export const useUserDetail = () => {
   const dispatch = useDispatch();

   const [loading, setLoading] = useState({
      updateProfile: false,
   });

   const updateProfile = async (data) => {
      if (!data) throw new Error('Error Inesperado');

      setLoading(prev => ({ ...prev, updateProfile: true }));

      const { user, ok, errorMessage } = await userSettingProvider.updateProfile(data);

      setLoading(prev => ({ ...prev, updateProfile: false }));

      if (!ok) throw errorMessage;

      dispatch(updateUserDetailAction(user));
      return user;
   }

   return {
      loading,
      updateProfile,
   }
}
