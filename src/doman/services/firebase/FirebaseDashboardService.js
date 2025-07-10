
import {
   collection,
   doc,
   getDoc,
   getDocs,
   limit,
   onSnapshot,
   orderBy,
   query,
   serverTimestamp,
   setDoc,
   updateDoc,
   where,
} from 'firebase/firestore';

import { DateParser, generateCode, typeStatusTable } from '@/ultils';

import { FirebaseDB } from './config';

export class FirebaseDashboardService {
   constructor() {
      this.MINUTES_TOLERANCE = 15 * 60 * 1000;
   }

   async getAllHours() {
      try {
         const hours = await getDocs(collection(FirebaseDB, 'allowedhour'));

         const resul = hours.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
         }));

         return {
            ok: true,
            hours: resul
         }
      } catch (error) {
         return {
            ok: false,
            errorMessage: error || 'Error al obtener las horas'
         }
      }
   }

   async getRestaurants() {
      try {
         const restaurants = await getDocs(collection(FirebaseDB, 'restaurants'));

         const resul = restaurants.docs.map(doc => {
            const data = doc.data();
            return {
               id: doc.id,
               ...data,
               idLocation: data.idLocation?.id ?? null,
               createdAt: data.createdAt?.toDate().toISOString() ?? null,
               updatedAt: data.updatedAt?.toDate().toISOString() ?? null
            }
         });

         return {
            ok: true,
            restaurants: resul
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error || 'Error al obtener los restaurantes'
         }
      }
   }

   async getTables({ dateStr, idRestaurant, hour }) {
      if (!dateStr || !idRestaurant || !hour) return;

      try {

         if (!idRestaurant) {
            throw new Error('No se proporciono el id del restaurante');
         }

         if (!dateStr) {
            throw new Error('No se proporciono la fecha');
         }

         const tables = await getDocs(query(
            collection(FirebaseDB, `restaurants/${idRestaurant}/tables`),
         ));

         const reservations = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('idRestaurant', '==', idRestaurant),
            where('date', '==', dateStr),
            where('status', 'in', ['pending', 'confirmed']),
            where('hour', '==', hour),
         ));

         const tableInfoMap = new Map();

         reservations.forEach(doc => {
            const data = doc.data();

            const info = {
               status: data?.status ?? null,
               reservation: {
                  code: data?.code ?? null,
                  idReservation: doc.id,
                  timestamp: data?.timestamp ?? null,
                  relatedTables: data?.idTables ?
                     data.idTables.map(id => {
                        const table = tables.docs.find(doc => doc.id == id);
                        if (!table) return {
                           id: id,
                           name: 'Not Name',
                        };
                        return {
                           id: id,
                           name: table.data().name
                        }
                     })
                     : [],
               },
               user: {
                  name: data.clientName,
                  email: data.clientEmail,
                  idUser: data?.idUser ?? null,
               },
            };

            if (data.idTables && Array.isArray(data.idTables)) {
               data.idTables.forEach(id => {
                  tableInfoMap.set(String(id), info);
               });
               return;
            }

            tableInfoMap.set(String(doc.idTables), info);
         });

         const resul = tables.docs.map((doc) => {
            const data = doc.data();
            const reservation = tableInfoMap.get(String(doc.id));

            return {
               id: doc.id,
               ...data,
               idRestaurant: data.idRestaurant?.id ?? null,
               status: reservation?.status ?? typeStatusTable.AVAILABLE, // Pendiente, Confirmada
               chairs: Number(data.chairs),
               hasReservar: reservation ? true : false,
               reservation: reservation?.reservation ?? null,
               user: reservation?.user ?? null,
               createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
            };
         });

         // status: reservation?.status ?? typeStatusTable.AVAILABLE, // Pendiente, Confirmada
         //       chairs: Number(data.chairs),
         //       createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
         //       hasReservar: reservation ? true : false,
         //       user: reservation?.user ?? null,
         //       timestamp: reservation?.timestamp ?? null,
         //       idReservation: reservation?.idReservation ?? null,
         //       relatedTables: reservation?.relatedTables ?? [],

         return {
            ok: true,
            tables: resul
         }
      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las mesas'
         }
      }
   }

   async cancelFullReservation({ idReservation }) {
      try {
         if (!idReservation) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservationRef = doc(FirebaseDB, 'reservations', idReservation);
         await updateDoc(reservationRef, {
            status: typeStatusTable.CANCELED,
            updatedAt: serverTimestamp()
         });

         return {
            ok: true
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al cancelar la reserva'
         }
      }
   }

   async cancelATablesReservation({ idReservation, idTables }) {
      try {
         if (!idReservation || Array.isArray(idTables).length <= 0) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservation = await getDoc(doc(FirebaseDB, 'reservations', idReservation));

         const reservationRef = doc(FirebaseDB, 'reservations', idReservation);

         await updateDoc(reservationRef, {
            idTables: reservation.data().idTables.filter(id => !idTables.includes(id)),
            updatedAt: serverTimestamp()
         });

         return {
            ok: true
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al cancelar la reserva'
         }
      }
   }

   async registerClientnoShow({ idReservation, user: { name, email, idUser } }) {
      try {
         if (!idReservation) {
            throw new Error('No se proporciono el id de la reserva');
         }

         if (!idUser) {
            throw new Error('No se proporciono el id del usuario');
         }

         const reservationNoShowRef = doc(FirebaseDB, 'reservations', idReservation);

         await updateDoc(reservationNoShowRef, {
            clientName: name,
            clientEmail: email,
            idReservation: idReservation,
            idUser: idUser ?? null,
            updatedAt: serverTimestamp()
         });

         return {
            ok: true
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al cancelar la reserva'
         }
      }
   }

   /**
    * 
    * @param {{ tables: Array<string>, idRestaurant: string, dateStr: string, hour: string, email: string, idUser: string, phone: string, name: string, diners: number}} param0 
    * @returns 
    */
   async reserveTable({
      idRestaurant,
      idTables,
      dateStr,
      hour,
      idUser,
      email,
      phone,
      name,
      diners,
      reason,
      comment,
   }) {
      try {
         if (!idRestaurant || Array.isArray(idTables).length <= 0) {
            throw new Error('No se proporciono el id de la reserva');
         }

         if (typeof diners !== 'number' || diners <= 0) {
            throw new Error('El número de comensales no es válido');
         }

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

         const newCode = generateCode({
            prefix: 'RESERVE-',
            existingCodesSet: existingCodes,
            length: 8
         });

         const reservationRef = doc(collection(FirebaseDB, 'reservations'));

         const timestamp = DateParser.fromDateAndTime(dateStr, hour).getTime() + this.MINUTES_TOLERANCE;

         const reservationData = {
            idUser: idUser ?? null,
            idRestaurant,
            diners: diners ?? 1,
            reason: reason ?? 'Sin motivo',
            hour,
            comment: comment ?? 'Reserva por el panel de administrador',
            idTables: Array.isArray(idTables) ? idTables : [idTables],
            date: dateStr,
            code: newCode,
            status: 'pending',
            timestamp: timestamp,
            clientName: name || 'No Name',
            clientEmail: email || 'No Email',
            clientPhone: phone || 'No Phone',
            createdAt: serverTimestamp(),
         };

         await setDoc(reservationRef, reservationData);

         return {
            ok: true,
            code: newCode,
            reservation: {
               code: newCode,
               idReservation: reservationRef.id,
               timestamp: timestamp,
               relatedTables: idTables.map(id => ({
                  id,
                  name: idTables.find(t => t.id === id)?.name ?? 'Sin nombre'
               }))
            },
            user: {
               name,
               email,
               phone
            }
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error?.message || String(error) || 'Error al cancelar la reserva'
         }
      }
   }


   async confirmReservation({ idReservation }) {
      try {
         if (!idReservation) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservationRef = doc(FirebaseDB, 'reservations', idReservation);
         await updateDoc(reservationRef, {
            status: typeStatusTable.CONFIRMED,
            updatedAt: serverTimestamp()
         });

         return {
            ok: true
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al confirmar la reserva'
         }
      }
   }

   async releaseReservation({ idReservation }) {
      try {
         if (!idReservation) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservationRef = doc(FirebaseDB, 'reservations', idReservation);
         await updateDoc(reservationRef, {
            status: typeStatusTable.RELEASED,
            updatedAt: serverTimestamp()
         });

         return {
            ok: true
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al confirmar la reserva'
         }
      }
   }

   listenReservationsAddedAndModified({ dateStr, idRestaurant, hour, onAdd, onModify }) {
      if (import.meta.env.VITE_ACTIVE_LISTENERS !== 'true') {
         console.log('NO debería estar escuchando');
         return;
      }

      console.trace('ACTIVANDO LISTENER'); 

      const q = query(
         collection(FirebaseDB, 'reservations'),
         where('idRestaurant', '==', idRestaurant),
         where('date', '==', dateStr),
         where('status', 'in', ['pending', 'confirmed']), // TODO: faltaria agregar el status canceled y released
         where('hour', '==', hour),
         orderBy('createdAt', 'desc'),
         limit(1)
      );

      let isInitial = true;
      const startedAt = Date.now();

      const unsubscribe = onSnapshot(q, (snapshot) => {
         snapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const createdAt = data.createdAt?.toDate?.().getTime?.() ?? 0;

            const reservation = {
               id: change.doc.id,
               ...data,
               createdAt: data.createdAt?.toDate?.().toISOString() ?? null
            };

            if (isInitial && ['modified', 'added'].includes(change.type)) return;

            if (change.type === 'added' && createdAt > startedAt) {
               onAdd?.(reservation);
            }

            if (change.type === 'modified') {
               onModify?.(reservation);
            }
         });

         if (isInitial) isInitial = false;
      });
      return unsubscribe;
   }
}



// status: isReserved
//  ? typeStatusTable.BUSY
//  : data.isReservable
//     ? typeStatusTable.AVAILABLE
//     : typeStatusTable.BLOCKED,