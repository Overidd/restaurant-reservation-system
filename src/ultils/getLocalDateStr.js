

/**
 * 
 * @param {Date} date 
 * @returns 
 */
export const getLocalDateStr = (date = null) => {
   const now = date ?? new Date();

   const year = now.getFullYear();
   const month = String(now.getMonth() + 1).padStart(2, '0');
   const day = String(now.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
}