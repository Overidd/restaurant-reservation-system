import {
   collection,
   getDocs,
   getDoc,
   query,
   where,
   doc
} from 'firebase/firestore/lite';
import { FirebaseDB } from './config';

export class FirebaseService {
   constructor() { }

   /**
    * 
    * @param {{ date: string, restaurantId: string }} param0 date -> 2025-06-28 
    * @returns {Promise<Array<{hour: string, tablesAvailable: number}>>}
    */
   async getAvailableHours({ date, restaurantId }) {
      let allowedHours = await getDocs(collection(FirebaseDB, 'allowedhour'));

      // 2. Ignorar horas pasadas si la fecha es hoy
      const today = new Date().toISOString().split('T')[0];
      const now = new Date();

      if (new Date(date) < now) {
         throw new Error('No se pueden reservar fechas pasadas');
      }

      if (date === today) {
         const currentMinutes = now.getHours() * 60 + now.getMinutes();

         allowedHours = allowedHours.docs.filter(({ hour }) => {
            const [h, m] = hour.split(':').map(Number);
            const totalMinutes = h * 60 + m;
            return totalMinutes > currentMinutes;
         });
      }

      // 3. Obtener horas bloqueadas manualmente
      const unavailableSnap = await getDocs(query(
         collection(FirebaseDB, 'unavailableSlots'),
         where('idRestaurant', '==', restaurantId),
         where('date', '==', date)
      ));

      const unavailableHours = new Set(unavailableSnap.docs.map(doc => doc.data().hour));

      // 5. Obtener todas las reservas confirmadas para esa fecha
      const reservationSnap = await getDocs(query(
         collection(FirebaseDB, 'reservations'),
         where('idRestaurant', '==', restaurantId),
         where('status', '==', 'confirmed'),
         where('date', '==', date)
      ));

      // 6. Contar cuántas reservas hay por hora
      const hourCounts = new Map();
      reservationSnap.docs.forEach((doc) => {
         const hour = doc.data().hour;
         hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
      });

      // 7. Filtrar las horas disponibles
      const availableHours = allowedHours.filter(({ hour, tablesAvailable }) => {
         const reservedCount = hourCounts.get(hour) || 0;
         const isBlocked = unavailableHours.has(hour);
         return reservedCount < tablesAvailable && !isBlocked;
      });

      return availableHours;
   }

   /**
    * 
    * @param {{ id: string, idRestaurant: string, name: string, description: string, chairs: number, image: string, isReservable: boolean, type: string, positionX: number, positionY: number, rotation: string, zone: string, createdAt: string, status: string }} param0 
    * @returns 
    */

   async getTables({ date, restaurantId }) {
      if (!restaurantId) {
         throw new Error('No se proporciono el id del restaurante');
      }

      if (!date) {
         throw new Error('No se proporciono la fecha');
      }

      const tables = await getDocs(query(
         collection(FirebaseDB, 'restaurants/tables'),
         where('idRestaurant', '==', restaurantId),
         where('isReservable', '==', true)
      ))

      const reservations = await getDocs(query(
         collection(FirebaseDB, 'reservations'),
         where('idRestaurant', '==', restaurantId),
         where('date', '==', date),
         where('status', '==', 'confirmed')
         // where('hour', '==', hour),
      ));

      const reservedTablesIds = new Set(reservations.docs.map(doc => doc.data().idTable));


      // Debemos obtener el restaurante y sus mesas corespodientes
      // Obtener las reservas en esa fecha
      // Construir la información de las mesas, si esta reservada o no, En cuanto tiempo se va desocupar
      return tables.docs.map(({ id, ...rest }) => ({
         id,
         ...rest,
         isReserved: reservedTablesIds.has(id)
      }));
   }

   async getRestaurant({ restaurantId }) {
      if (!restaurantId) {
         throw new Error('No se proporciono el id del restaurante');
      }

      const restaurant = await getDoc(doc(FirebaseDB, 'restaurants', restaurantId));
      return restaurant.data();
   }
}