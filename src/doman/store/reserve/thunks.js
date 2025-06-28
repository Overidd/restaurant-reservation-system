

class ReserveThunks {
   
}


export const startGetAvailableHours = ({ date }) => {
   return async (dispatch, states) => {

      try {
         console.log(dispatch, states)

         // const { data } = await calendarApi.get('/tables');
         // dispatch(setTables(data));
      } catch (error) {
         console.log(error);
      }
   }
}

export const startGetTables = ({ restaurantId }) => {
   return async (dispatch, states) => {

      try {
         console.log(dispatch, states)

         // const { data } = await calendarApi.get('/tables');
         // dispatch(setTables(data));
      } catch (error) {
         console.log(error);
      }
   }
}


export const startTempLockTable = ({
   tableId,
   restaurantId,
   date,
   hour
}) => {

   return async (dispatch, states) => {
      try {
         console.log(dispatch, states)
      } catch (error) {
         console.log(error);
      }
   }
}

export const startTempUnlockTable = ({
   tableId
}) => {
   return async (dispatch, states) => {
      try {
         console.log(dispatch, states)
      } catch (error) {
         console.log(error);
      }
   }
}