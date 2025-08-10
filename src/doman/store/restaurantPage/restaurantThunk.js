import { dasboardServiceProvider } from '@/doman/services';
import { addRestaurantAction, loaddingRestaurants, messageErrorRestauranAction, removeRestaurantAction, setLoadRestaurantsAction, updateRestaurantAction } from './restaurantSlice';



export const getAllRestaurantsThunk = () => {
   return async (dispatch) => {
      dispatch(loaddingRestaurants())

      const res = await dasboardServiceProvider.getRestaurants()

      if (!res.ok) {
         dispatch(messageErrorRestauranAction(res.errorMessage))
         return;
      }

      dispatch(setLoadRestaurantsAction(res.restaurants))
   }
}

export const updateRestaurantThunks = (data) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.updateRestaurant(data);
      if (!res.ok) {
         dispatch(messageErrorRestauranAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(updateRestaurantAction(res.restaurant));
   }
}

export const deleteRestaurantThunks = (id) => {
   return async (dispatch) => {
      if (!id) return;
      const res = await dasboardServiceProvider.deleteRestaurant(id);
      if (!res.ok) {
         dispatch(messageErrorRestauranAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(removeRestaurantAction(id));
   }
}

export const createRestaurantThunks = (data) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.createRestaurant(data);
      if (!res.ok) {
         dispatch(messageErrorRestauranAction(res.errorMessage));
         throw res.errorMessage
      }

      dispatch(addRestaurantAction(res.restaurant));
   }
}