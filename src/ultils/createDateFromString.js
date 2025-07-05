
/**
 * 
 * @param {String} dateStr "2025-06-28"
 * @param {String} timeStr "23:24"
 * @returns 
 */
export const createDateFromString = (dateStr, timeStr) => {
   if (!dateStr || !timeStr) return null;

   const [year, month, day] = dateStr.split('-').map(Number);
   const [hour, minute] = timeStr.split(':').map(Number);

   return new Date(year, month - 1, day, hour, minute);
}
