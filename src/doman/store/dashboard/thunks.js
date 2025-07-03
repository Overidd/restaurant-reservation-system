import { dasboardServiceProvider } from '@/doman/services';
import { loaddingAction, messageErrorAction, setHoursAction, setRestaurantsAction, setTablesAction } from '.';


export const loadRestaurantsThunks = () => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.getRestaurants();

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      };

      dispatch(setRestaurantsAction(res.restaurants));
   }
}

export const loadHoursThunks = () => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.getAllHours();

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      };

      dispatch(setHoursAction(res.hours));
   }
}

/**
 * @param {{ idRestaurant: string, dateStr: string, hour: string }} data 
 * @returns 
 */
export const loadTablesThunks = (data) => {
   return async (dispatch) => {

      console.log(data)
      dispatch(loaddingAction());

      const res = await dasboardServiceProvider.getTables(data);

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      };

      dispatch(setTablesAction(res.tables));
   }
}

