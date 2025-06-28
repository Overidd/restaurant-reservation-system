


/**
 * 
 * @param {string} hourStr ejm: 14:30
 * @returns 
 */
export const formatHourLabel = (hourStr) => {
   const [h, m] = hourStr.split(':').map(Number);
   const date = new Date();
   date.setHours(h, m, 0);
   return date.toLocaleTimeString('es-PE', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
   });
}