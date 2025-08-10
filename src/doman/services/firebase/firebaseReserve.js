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

import { DateParser, typeStatusTable, ValidationReservation, validDateReservation } from '@/ultils';

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

   /**
    * @param {{ dateStr: string, idRestaurant: string, diners: number,isValidateHourCurrent: boolean,isValidateDatePassed: boolean }} param0 
    */
   async getAvailableHours({ dateStr, idRestaurant, diners, isValidateHourCurrent = true, isValidateDatePassed = true }) {
      try {

         if (isValidateDatePassed && !validDateReservation(dateStr)) {
            throw new Error('No se pueden reservar fechas pasadas');
         }
         const restaurantSnap = await getDoc(doc(FirebaseDB, 'restaurants', idRestaurant));
         const restaurantData = restaurantSnap.data();

         if (!restaurantData) throw new Error('Restaurante no encontrado');

         const tablesSnap = await getDocs(query(
            collection(FirebaseDB, `restaurants/${idRestaurant}/tables`),
            where('isBlocked', '==', false)
         ));
         const allTables = tablesSnap.docs.map(doc => doc.data());
         const totalTables = allTables.length;

         let allowedHours = restaurantData.hours?.map(hour => ({
            ...hour,
            tablesAvailable: totalTables
         })) ?? [];

         if (dateStr === DateParser.toString() && isValidateHourCurrent === true) {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            allowedHours = allowedHours.filter(({ name }) => {
               const [h, m] = name.split(':').map(Number);
               return h * 60 + m > currentMinutes;
            });
         }

         const [unavailableSnap, reservationSnap] = await Promise.all([
            getDocs(query(
               collection(FirebaseDB, 'unavailableSlots'),
               where('idRestaurant', '==', idRestaurant),
               where('dateStr', '==', dateStr)
            )),
            getDocs(query(
               collection(FirebaseDB, 'reservations'),
               where('idRestaurant', '==', idRestaurant),
               where('status', 'in', ['confirmed', 'pending']),
               where('dateStr', '==', dateStr)
            ))
         ]);

         const unavailableHours = new Set(unavailableSnap.docs.map(doc => doc.data().hour));

         const tableAvailabilityMap = new Map();
         const hourReservationCount = new Map();

         allowedHours.forEach(({ name }) => {
            tableAvailabilityMap.set(name, [...allTables]);
         });

         reservationSnap.docs.forEach((doc) => {
            const { hour, tables } = doc.data();

            if (tableAvailabilityMap.has(hour)) {
               const currentTables = tableAvailabilityMap.get(hour);

               const updatedTables = currentTables.filter(table =>
                  !tables.some(reserved => reserved.id === table.id)
               );

               // TODO: OJO
               const validTables = updatedTables.filter(table => Number(diners) <= Number(table.chairs));

               tableAvailabilityMap.set(hour, validTables);
            }

            hourReservationCount.set(hour, (hourReservationCount.get(hour) || 0) + 1);
         });

         const availableHours = allowedHours
            .filter(({ name, tablesAvailable }) => {
               const isBlocked = unavailableHours.has(name);
               const reservedCount = hourReservationCount.get(name) || 0;
               const tablesRemaining = tableAvailabilityMap.get(name)?.length || 0;
               return !isBlocked && reservedCount < tablesAvailable && tablesRemaining > 0;
            })
            .map((hour) => {
               const reservedCount = hourReservationCount.get(hour.name) || 0;

               const remainingTables = tableAvailabilityMap.get(hour.name)?.length === totalTables ? tableAvailabilityMap.get(hour.name).filter(table => Number(diners) < Number(table.chairs)).length : tableAvailabilityMap.get(hour.name)?.length;

               return {
                  ...hour,
                  tablesAvailable: (totalTables - remainingTables) - reservedCount
               };
            })
            .sort((a, b) => a.name.localeCompare(b.name));

         return {
            ok: true,
            availableHours
         };

      } catch (error) {
         return {
            ok: false,
            messageError: error.message || 'Error al obtener las horas disponibles'
         };
      }
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

      const [tables, reservations, blockTempTables] = await Promise.all([
         getDocs(query(
            collection(FirebaseDB, `restaurants/${idRestaurant}/tables`),
            where('isBlocked', '==', false),
         )),
         getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('idRestaurant', '==', idRestaurant),
            where('dateStr', '==', dateStr),
            where('status', 'in', ['confirmed', 'pending']),
            where('hour', '==', hour),
         )),
         getDocs(query(
            collection(FirebaseDB, 'blockTempTable'),
            where('idRestaurant', '==', idRestaurant),
            where('hour', '==', hour),
            where('dateStr', '==', dateStr),
         ))
      ]);

      const reservedTablesIds = new Set();
      reservations.forEach(doc => {
         const data = doc.data();

         if (data.tables && Array.isArray(data.tables)) {
            data.tables.forEach(({ id }) => reservedTablesIds.add(id));
            return;
         }
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

      const blockTempTablesSet = new Set(blockTempTables.docs.map(doc => doc.data().idTable));

      return tables.docs.map((doc) => {
         const data = doc.data();
         return {
            id: doc.id,
            ...data,
            size: data.size,
            status: assignStatus({ id: doc.id, dinersTable: data.chairs }),
            idRestaurant: data.idRestaurant?.id ?? null,
            createdAt: data.createdAt?.toDate()?.toISOString(),
            updatedAt: data.updatedAt?.toDate()?.toISOString(),
         }
      }).filter((item) => !blockTempTablesSet.has(item.id));
   }

   async getObject({ idRestaurant }) {
      if (!idRestaurant) {
         throw new Error('No se proporcionó el id del restaurante');
      }

      try {
         const objectsSnap = await getDocs(collection(FirebaseDB, `restaurants/${idRestaurant}/objects`));

         return objectsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate()?.toISOString(),
            updatedAt: doc.data()?.updatedAt?.toDate()?.toISOString(),
         }));

      } catch (error) {

         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener los objetos'
         }
      }
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

   async getAllRestaurants() {
      const restaurants = await getDocs(query(
         collection(FirebaseDB, 'restaurants'),
         where('status', '==', true)
      ));
      return restaurants.docs.map(doc => ({
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
      tables = [],
   }) {
      try {
         const auth = getAuth();
         const user = auth.currentUser;

         ValidationReservation({
            dateStr,
            hour,
            tables,
            diners,
            idRestaurant,
            idUser: user.uid,
            idReservation: null,
         })

         const [userSnap, restaurant] = await Promise.all([
            getDoc(doc(FirebaseDB, 'users', user.uid)),
            getDoc(doc(FirebaseDB, 'restaurants', idRestaurant))
         ]);

         if (!userSnap.exists()) {
            throw new Error('El usuario no existe');
         }

         if (!restaurant.exists()) {
            throw new Error('El restaurante no existe');
         }

         if (restaurant.data().status === false) {
            throw new Error('El restaurante se encuentra cerrado');
         }

         const querySnapshot = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('idRestaurant', '==', idRestaurant),
            where('dateStr', '==', dateStr),
            where('hour', '==', hour),
            where('idUser', '==', user.uid),
            where('status', 'in', ['confirmed', 'pending'])
         ));

         if (!querySnapshot.empty) {
            throw new Error('Ya realizaste una reserva en hora la ' + hour);
         }

         const reservations = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('idRestaurant', '==', idRestaurant),
            where('dateStr', '==', dateStr),
            where('hour', '==', hour),
            where('status', 'in', ['confirmed', 'pending'])
         ));

         const reservedTables = new Set();
         const existingCodes = new Set();

         reservations.forEach(doc => {
            const data = doc.data();
            if (data.tables && Array.isArray(data.tables)) {
               data.tables.forEach(({ id }) => reservedTables.add(id));
            }
            if (data.code) {
               existingCodes.add(data.code);
            }
         });

         for (const table of tables) {
            if (reservedTables.has(table.id)) {
               throw new Error(`La mesa ${table.name} ya fue reservada en esta hora.`);
            }
         }

         let newCode = 'RESERVA-';

         do {
            newCode += Math.random().toString(36).substring(2, 8).toUpperCase();

         } while (existingCodes.has(newCode));

         const { uid, email, displayName } = user;

         const reservationRef = doc(collection(FirebaseDB, 'reservations'));

         const timestamp = DateParser.fromDateAndTime(dateStr, hour).getTime() + this.MINUTES_tolerance;

         const reservationData = {
            ion: reservationRef.id,
            idUser: uid,
            idRestaurant,
            restaurantName: restaurant.data().name,
            diners,
            reason,
            hour,
            comment: '',
            tables,
            dateStr: dateStr,
            code: newCode,
            status: 'pending',
            start: new Date().getTime(),
            end: timestamp,
            timestamp: timestamp,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            name: userSnap.data().name || displayName || 'No Name',
            phone: userSnap.data().phone || 'No Phone',
            email: userSnap.data().email || 'No Email',
         };

         await setDoc(reservationRef, reservationData);

         const userRef = doc(FirebaseDB, 'users', uid);

         const historyReservationsRef = doc(collection(userRef, 'historyReservations'), reservationRef.id);

         await setDoc(historyReservationsRef, reservationData);

         await this.sendEmail(email, newCode);

         return {
            ok: true,
            code: newCode,
            hour: hour,
            dateStr: dateStr
         };

      } catch (error) {
         console.error(error);
         const code = error.code || 'default';
         return {
            ok: false,
            errorMessage: firebaseErrorMessages[code] || String(error.message) || 'Error desconocido',
         };
      }
   }

   async getAllReservationsByUser({
      loadFilters = [] // all, canceled
   }) {
      try {
         const auth = getAuth();
         const user = auth.currentUser;

         if (!user) {
            throw new Error('Usuario no autenticado');
         }

         const q = [where('idUser', '==', user.uid)]
         if (loadFilters.length > 0) q.push(where('status', 'in', loadFilters))

         const reservations = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            ...q
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
            }).sort((a, b) => new Date(a.dateStr) - new Date(b.dateStr))
               .sort((a) => a.status === typeStatusTable.PENDING ? -1 : 1)
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