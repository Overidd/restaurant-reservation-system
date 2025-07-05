

/**
 * 
 * @param {Date} dateNow 
 * @param {Date} dateFuture 
 * @returns 
 */
export const getTimeDifference = (dateNow, dateFuture) => {
   const diffInMs = dateFuture - dateNow;

   if (diffInMs <= 0) return -1;

   const totalMinutes = Math.floor(diffInMs / 1000 / 60);

   if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes}m`;
   } else {
      return `${totalMinutes}m`;
   }
}