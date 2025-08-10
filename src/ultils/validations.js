import { DateDiff } from "./DateUtils";
import { validDateReservation } from "./validDateReservation";
import { validHourReservation } from "./validHourReservation";

export class Validations {
   static email(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return [emailRegex.test(value), 'Email no valido'];
   }

   static urlImage(value) {
      // eslint-disable-next-line
      const urlRegex = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
      return urlRegex.test(value)
   }

   static phone(value) {
      const phoneRegex = /^(?:\+?51)?[-.\s]?9\d{2}[-.\s]?\d{3}[-.\s]?\d{3}$/;
      return phoneRegex.test(value);
   }
}
export const validateObject = (obj) => {
   if (!obj || typeof obj !== 'object') return false;

   if (Object.keys(obj).length === 0) return false;

   return Object.values(obj).every(value => value !== undefined);
};


export const isObject = (varObj) => {
   return Object.prototype.toString.call(varObj) === '[object Object]';
}

export const isObjetError = (err) => {
   if (err instanceof Error) {
      return true;
   }
   return false;
}

export const ValidationReservation = ({
   dateStr,
   hour,
   tables,
   diners,
   idRestaurant,
   idReservation,
   idUser,
}) => {

   if (!validDateReservation(dateStr)) {
      if (!validHourReservation(hour)) {
         throw new Error('No se pueden reservar horas pasadas');
      }
      throw new Error('No se pueden reservar fechas pasadas');
   }

   if (DateDiff.isSameDate(dateStr)) {
      if (!validHourReservation(hour)) {
         throw new Error('No se pueden reservar horas pasadas');
      }
   }

   if (!idUser) {
      throw new Error('No se proporciono un usuario');
   }

   if (idRestaurant !== null && !idRestaurant) {
      throw new Error('Seleccione un restaurante');
   }

   if (idReservation !== null && !idReservation) {
      throw new Error('No se proporciono la reserva');
   }

   if (!Array.isArray(tables) || tables.length <= 0) {
      throw new Error('No se proporciono las mesas');
   }

   if (typeof diners !== 'number' || diners <= 0) {
      throw new Error('El número de comensales no es válido');
   }

}