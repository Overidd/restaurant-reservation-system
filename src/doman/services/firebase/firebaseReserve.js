import { getAuth } from 'firebase/auth';
import {
   collection,
   doc,
   getDoc,
   getDocs,
   query,
   serverTimestamp,
   setDoc,
   where,
} from 'firebase/firestore/lite';

import { DateParser, typeStatusTable } from '@/ultils';

import { FirebaseDB } from './config';


const firebaseErrorMessages = {
   'auth/invalid-email': 'El correo electrónico no es válido.',
   'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
   'auth/user-not-found': 'No se encontró una cuenta con este correo.',
   'auth/wrong-password': 'La contraseña es incorrecta.',
   'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde.',
   'auth/network-request-failed': 'Error de red. Verifica tu conexión.',
   'auth/invalid-credential': 'Credenciales inválidas.',
   'auth/email-already-in-use': 'El correo ya esta en uso.',
};

export class FirebaseReserveService {
   constructor() {
      this.MINUTES_tolerance = 15 * 60 * 1000;
   }


   isValidReservationDate(dateStr) {
      const inputDate = new Date(dateStr);
      const now = new Date();

      const normalizeDate = (date) =>
         new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const today = normalizeDate(now);
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const target = normalizeDate(inputDate);

      return target >= yesterday;
   }

   /**
    * 
    * @param {{ dateStr: string, idRestaurant: string }} param0 date -> 2025-06-28 
    * @returns {Promise<Array<{hour: string, tablesAvailable: number}>>}
    */
   async getAvailableTimes({ dateStr, idRestaurant }) {
      let allowedHours = await getDocs(collection(FirebaseDB, 'allowedhour'));
      allowedHours = allowedHours.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
      }));

      // 2. Ignorar horas pasadas si la fecha es hoy
      const now = new Date();

      if (!this.isValidReservationDate(dateStr)) {
         throw new Error('No se pueden reservar fechas pasadas');
      }
      if (dateStr === DateParser.toString()) {
         const currentMinutes = now.getHours() * 60 + now.getMinutes();

         allowedHours = allowedHours.filter(({ hour }) => {
            const [h, m] = hour.split(':').map(Number);
            const totalMinutes = h * 60 + m;
            return totalMinutes > currentMinutes;
         });
      }

      // 3. Obtener horas bloqueadas manualmente
      const unavailableSnap = await getDocs(query(
         collection(FirebaseDB, 'unavailableSlots'),
         where('idRestaurant', '==', idRestaurant),
         where('date', '==', dateStr)
      ));

      // 5. Obtener todas las reservas confirmadas para esa fecha
      const reservationSnap = await getDocs(query(
         collection(FirebaseDB, 'reservations'),
         where('idRestaurant', '==', idRestaurant),
         where('status', 'in', ['confirmed', 'pending']),
         where('date', '==', dateStr)
      ));

      const unavailableHours = new Set(unavailableSnap.docs.map(doc => doc.data().hour));

      const hourCounts = new Map();
      reservationSnap.docs.forEach((doc) => {
         const data = doc.data();
         data.idTables.forEach(() => {
            hourCounts.set(data.hour, (hourCounts.get(data.hour) || 0) + 1);
         })
      });

      // 7. Filtrar las horas disponibles
      const availableHours = allowedHours.filter(({ hour, tablesAvailable }) => {
         const reservedCount = hourCounts.get(hour) || 0;
         const isBlocked = unavailableHours.has(hour);
         return reservedCount < tablesAvailable && !isBlocked;
      });

      return availableHours.map((item) => ({
         ...item,
         tablesAvailable: item.tablesAvailable - (hourCounts.get(item.hour) || 0)
      }));
   }


   /**
    * 
    * @param {{ dateStr: string, idRestaurant: string, hour: string }} param0 
    * @returns 
    */
   async getTables({ dateStr, idRestaurant, hour, diners }) {
      if (!idRestaurant) {
         throw new Error('No se proporciono el id del restaurante');
      }

      if (!dateStr) {
         throw new Error('No se proporciono la fecha');
      }

      const tables = await getDocs(query(
         collection(FirebaseDB, `restaurants/${idRestaurant}/tables`),
         where('isReservable', '==', true)
      ))

      const reservations = await getDocs(query(
         collection(FirebaseDB, 'reservations'),
         where('idRestaurant', '==', idRestaurant),
         where('date', '==', dateStr),
         where('status', 'in', ['confirmed', 'pending']),
         where('hour', '==', hour),
      ));

      const reservedTablesIds = new Set();
      reservations.forEach(doc => {
         const data = doc.data();

         if (data.idTables && Array.isArray(data.idTables)) {
            data.idTables.forEach(id => reservedTablesIds.add(Number(id)));
            return;
         }
         reservedTablesIds.add(Number(doc.id));
      });

      const assignStatus = ({ id, dinersTable }) => {
         switch (true) {
            case reservedTablesIds.has(id):
               return typeStatusTable.BUSY;
            case dinersTable > diners:
               return typeStatusTable.NOTAVAILABLE;
            default:
               return typeStatusTable.AVAILABLE;
         }
      }

      // Debemos obtener el restaurante y sus mesas corespodientes
      // Obtener las reservas en esa fecha
      // Construir la información de las mesas, si esta reservada o no, En cuanto tiempo se va desocupar
      return tables.docs.map((doc) => {
         const data = doc.data();
         return {
            id: doc.id,
            ...data,
            size: data.type,
            status: assignStatus({ id: doc.id, dinersTable: data.chairs }),
            idRestaurant: data.idRestaurant?.id ?? null,
            createdAt: data.createdAt.toDate().toISOString(),
         }
      });
   }

   async getRestaurant({ idRestaurant }) {
      if (!idRestaurant) {
         throw new Error('No se proporcionó el id del restaurante');
      }

      const restaurantSnap = await getDoc(doc(FirebaseDB, 'restaurants', idRestaurant));

      if (!restaurantSnap.exists()) {
         throw new Error('Restaurante no encontrado');
      }

      const data = restaurantSnap.data();

      return {
         id: restaurantSnap.id,
         ...data,
         idLocation: data.idLocation?.id ?? null,
         createdAt: data.createdAt?.toDate().toISOString() ?? null,
         updatedAt: data.updatedAt?.toDate().toISOString() ?? null
      };
   }

   async getAllocation() {
      const locations = await getDocs(collection(FirebaseDB, 'locations'));
      return locations.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
      }));
   }

   async reserveTable({
      dateStr,
      hour,
      reason,
      diners,
      idRestaurant,
      idTables = [],
   }) {
      try {
         const auth = getAuth();
         const user = auth.currentUser;
         console.log(hour, dateStr, idTables);

         if (!user) {
            throw new Error('Usuario no autenticado');
         }

         // TODO faltaria validar si la mesa fue bloqueada

         // Buscar todas las reservas confirmadas para ese restaurante, fecha y hora
         const reservations = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('idRestaurant', '==', idRestaurant),
            where('date', '==', dateStr),
            where('hour', '==', hour),
            where('status', 'in', ['confirmed', 'pending'])
         ));

         // Verificamos si alguna mesa ya está reservada
         const reservedTables = new Set();
         const existingCodes = new Set();

         reservations.forEach(doc => {
            const data = doc.data();
            if (data.idTables && Array.isArray(data.idTables)) {
               data.idTables.forEach(id => reservedTables.add(Number(id)));
            }
            if (data.code) {
               existingCodes.add(data.code);
            }
         });

         for (const idTable of idTables) {
            if (reservedTables.has(Number(idTable))) {
               throw new Error(`La mesa ${idTable} ya fue reservada en esta hora.`);
            }
         }

         let newCode = 'RESERVE-';

         do {
            newCode += Math.random().toString(36).substring(2, 8).toUpperCase();

         } while (existingCodes.has(newCode));

         const { uid, email, displayName } = user;

         const reservationRef = doc(collection(FirebaseDB, 'reservations'));

         const timestamp = DateParser.fromDateAndTime(dateStr, hour).getTime() + this.MINUTES_tolerance;

         const reservationData = {
            idUser: uid,
            idRestaurant,
            diners,
            reason,
            hour,
            comment: '',
            idTables,
            date: dateStr,
            code: newCode,
            status: 'pending',
            timestamp: timestamp,
            createdAt: serverTimestamp(),
            name: displayName || 'No Name',
            email: email || 'No Email',
         };

         await setDoc(reservationRef, reservationData);

         const userRef = doc(FirebaseDB, 'users', uid);

         const historyReservationsRef = doc(collection(userRef, 'historyReservations'), reservationRef.id);

         await setDoc(historyReservationsRef, reservationData);

         await this.sendEmail(email, newCode);

         return {
            ok: true,
            code: newCode,
         };

      } catch (error) {
         const code = error.code || 'default';
         return {
            ok: false,
            errorMessage: firebaseErrorMessages[code] || error.message || 'Error desconocido',
         };
      }
   }

   async getAllReservations() {
      try {
         const auth = getAuth();
         const user = auth.currentUser;

         if (!user) {
            throw new Error('Usuario no autenticado');
         }

         const reservations = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('idUser', '==', user.uid),
            // orderBy('timestamp', 'desc')
         ));

         let restaurants = await getDocs(collection(FirebaseDB, 'restaurants'));
         restaurants = restaurants.docs.map(doc => ({ id: doc.id, ...doc.data() }));

         return {
            ok: true,
            reservations: reservations.docs.map(doc => {
               const data = doc.data();
               const restaurant = restaurants.find(restaurant => restaurant.id === data.idRestaurant);
               return {
                  id: doc.id,
                  ...doc.data(),
                  createdAt: doc.data().createdAt.toDate().toISOString(),
                  restaurantName: restaurant ? restaurant.name : 'Restaurante desconocido',
               }
            })
         }
         // restaurantName

      } catch (error) {
         const code = error.code || 'default';
         return {
            ok: false,
            errorMessage: firebaseErrorMessages[code] || error.message || 'Error desconocido',
         };
      }
   }

   async sendEmail(to, code) {
      if (import.meta.env.VITE_ACTIVAR_ENVIO_CORREO !== 'true') return;

      const res = await fetch(`${import.meta.env.VITE_API_URL_SEND_EMAIL}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            to,
            subject: 'Filicidades su reserva fue confirmada',
            message: `Tu codigo de reserva es: ${code}`
         }),
      });

      console.log(await res.json());
   };
}