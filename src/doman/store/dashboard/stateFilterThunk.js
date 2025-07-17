import { dasboardServiceProvider } from '@/doman/services';
import {
   messageErrorActionFilter,
   setHoursAction,
   setRestaurantsAction
} from './stateFilterRestaurantSlice';

export const loadRestaurantsThunks = () => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.getRestaurants();

      if (!res.ok) {
         dispatch(messageErrorActionFilter(res.errorMessage));
         return;
      };

      dispatch(setRestaurantsAction(res.restaurants));
   }
}

export const loadHoursThunks = () => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.getAllHours();

      if (!res.ok) {
         dispatch(messageErrorActionFilter(res.errorMessage));
         return;
      };

      dispatch(setHoursAction(res.hours));
   }
}