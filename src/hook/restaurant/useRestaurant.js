import { createRestaurantThunks, deleteRestaurantThunks, setSelectedRestaurantAction, updateRestaurantThunks } from '@/doman/store/dashboard';
import { useDispatch } from 'react-redux';

export const useRestaurant = () => {
   const dispatch = useDispatch();

   const updateRestaurant = async (data) => {
      return dispatch(updateRestaurantThunks(data));
   }

   const deleteRestaurant = async (idRestauran) => {
      return dispatch(deleteRestaurantThunks(idRestauran));
   }

   const setSelectedRestaurant = (data) => {
      dispatch(setSelectedRestaurantAction(data));
   }

   const createRestaurant = async (data) => {
      return dispatch(createRestaurantThunks(data));
   }

   return {
      updateRestaurant,
      deleteRestaurant,
      setSelectedRestaurant,
      createRestaurant
   }
}
