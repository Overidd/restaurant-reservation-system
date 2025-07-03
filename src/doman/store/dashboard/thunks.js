import { dasboardServiceProvider } from '@/doman/services';
import { deleteTableAction, loaddingAction, messageErrorAction, setHoursAction, setRestaurantsAction, setTablesAction, typeLoading } from '.';


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
      dispatch(loaddingAction(typeLoading.TABLES));

      const res = await dasboardServiceProvider.getTables(data);

      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));

         return;
      };

      dispatch(setTablesAction(res.tables));
   }
}


export const deleteTableThunks = (idTable) => {
   return async (dispatch) => {
      const res = await dasboardServiceProvider.deleteTable(idTable);
      if (!res.ok) {
         dispatch(messageErrorAction(res.errorMessage));
         return;
      }

      dispatch(deleteTableAction(idTable));
   }
}