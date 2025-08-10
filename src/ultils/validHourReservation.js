

export const validHourReservation = (hour) => {
   if (!hour) return false;
   const [h, m] = hour.split(':').map(Number);

   if (h < 0 || h > 23) return false;

   const now = new Date();
   const currentMinutes = now.getHours() * 60 + now.getMinutes();

   return h * 60 + m > currentMinutes;
}
