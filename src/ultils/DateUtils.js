export class DateParser {

   /**
    * 
    * @param {string} dateStr 2025-06-28
    * @returns {Date}
    */
   static fromString(dateStr) {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
   }

   static toDate(dateStr) {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
   }


   /**
    * 
    * @param {Date} date 
    * @returns {string}
    */
   static toString(date) {
      const now = date ?? new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   }

   /**
   * 
   * @param {String} dateStr "2025-06-28"
   * @param {String} timeStr "23:24"
   * @returns 
   */
   static fromDateAndTime(dateStr, timeStr) { //createDateFromString
      if (!dateStr || !timeStr) return null;
      const [year, month, day] = dateStr.split('-').map(Number);
      const [hour, minute] = timeStr.split(':').map(Number);
      return new Date(year, month - 1, day, hour, minute);
   }

   static getNameMonth(fechaStr) {
      if (!fechaStr) return null;

      const meses = [
         'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
         'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];

      const fecha = new Date(fechaStr);
      const indiceMes = fecha.getMonth();

      return meses[indiceMes];
   }
}

export class DateDiff {

   /**
    * 
    * @param {Date} dateNow 
    * @param {Date} dateFuture 
    * @returns {string} retornar minutos
    */
   static inMinutes(dateNow, dateFuture) {
      const diffInMs = dateFuture.getTime() - dateNow.getTime();
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
}

export class DateFormat {
   static toYYYYMMDD(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   }

   static weekYearMonthDay(dateStr) {
      return new Date(dateStr).toLocaleDateString('es-ES', {
         weekday: 'short',
         year: 'numeric',
         month: 'short',
         day: 'numeric',
      })
   }
}