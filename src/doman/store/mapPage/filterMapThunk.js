import { dasboardServiceProvider } from '@/doman/services';
import {
   messageErrorActionFilter,
   setHoursAction,
   setRestaurantsAction
} from './filterMapSlice';

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

export const loadDataFiltersThunks = () => {
   return async (dispatch) => {
      const [resRestaurants] = await Promise.all([
         dasboardServiceProvider.getRestaurantsActive(),
         // dasboardServiceProvider.getAllHours(),
      ]);

      if (resRestaurants.ok) {
         dispatch(setRestaurantsAction(resRestaurants.restaurants));
      } else {
         dispatch(messageErrorActionFilter(resRestaurants.errorMessage));
      }

      // if (resHours.ok) {
      //    dispatch(setHoursAction(resHours.hours));
      // } else {
      //    dispatch(messageErrorActionFilter(resHours.errorMessage));
      // }
   };
};
