import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   orderBy,
   query,
   serverTimestamp,
   setDoc,
   updateDoc,
   where,
} from 'firebase/firestore/lite';

import { DateFormat, DateParser, generateCode, typeResource, typeStatusTable } from '@/ultils';

import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
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
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toISOString(),
            updatedAt: doc.data()?.updatedAt?.toDate()?.toISOString(),
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

   async getRestaurantsActive() {
      try {
         const restaurantRef = collection(FirebaseDB, 'restaurants');
         const restaurants = await getDocs(query(
            restaurantRef,
            where('status', '==', true),
            query(orderBy('createdAt', 'desc'))
         ));

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

   async getRestaurants() {
      try {
         const restaurantRef = collection(FirebaseDB, 'restaurants');
         const restaurants = await getDocs(query(
            restaurantRef,
         ));

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

   async updateRestaurant({
      idRestaurant,
      name,
      description,
      address,
      image,
      rows,
      columns,
      status,
      latitud,
      longitud,
      linkMap,
      hours = []
   }) {
      try {

         if (!idRestaurant) {
            throw new Error('No se proporciono el id del restaurante');
         }
         const restaurant = await getDoc(doc(FirebaseDB, 'restaurants', idRestaurant));

         if (!restaurant.exists()) {
            throw new Error('No se encontro el restaurante');
         }

         const data = restaurant.data();

         const dataUpdate = {
            name: name ?? data.name,
            description: description ?? data.description,
            image: image ?? data.image,
            rows: rows ?? data.rows,
            columns: columns ?? data.columns,
            status: status ?? data.status,
            latitud: latitud ?? data.latitud,
            longitud: longitud ?? data.longitud,
            linkMap: linkMap ?? data.linkMap,
            hours: hours ?? data.hours,
            address: address ?? data.address ?? '',
            updatedAt: serverTimestamp()
         }

         await updateDoc(doc(FirebaseDB, 'restaurants', idRestaurant), dataUpdate);

         return {
            ok: true,
            restaurant: {
               id: idRestaurant,
               ...dataUpdate,
               createdAt: data.createdAt.toDate().toISOString(),
               updatedAt: new Date().toISOString()
            }
         }
      } catch (error) {
         return {
            ok: false,
            errorMessage: String(error.message) || 'Error al actualizar el restaurante'
         }
      }
   }

   deleteRestaurant = async (id) => {
      try {
         if (!id) return;
         await deleteDoc(doc(FirebaseDB, 'restaurants', id));
         return {
            ok: true
         }
      } catch (error) {
         return {
            ok: false,
            errorMessage: String(error.message) || 'Error al eliminar el restaurante'
         }
      }
   }

   async createRestaurant({
      name,
      description,
      image,
      rows,
      columns,
      address,
      status,
      latitud,
      longitud,
      linkMap,
      hours
   }) {
      try {
         const data = {
            name,
            description,
            image,
            rows,
            columns,
            status,
            latitud,
            longitud,
            linkMap,
            hours,
            address: address ?? data.address ?? '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
         }
         const restaurantRef = await addDoc(collection(FirebaseDB, 'restaurants'), data);

         return {
            ok: true,
            restaurant: {
               id: restaurantRef.id,
               ...data,
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString()
            }
         }
      } catch (error) {
         console.log(error);
         return {
            ok: false,
            errorMessage: String(error.message) || 'Error al crear el restaurante'
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

         const [tables, reservations, blockTempTables] = await Promise.all([
            getDocs(query(
               collection(FirebaseDB, `restaurants/${idRestaurant}/tables`),
            )),
            getDocs(query(
               collection(FirebaseDB, 'reservations'),
               where('idRestaurant', '==', idRestaurant),
               where('dateStr', '==', dateStr),
               where('status', 'in', ['pending', 'confirmed']),
               where('hour', '==', hour),
            )),
            getDocs(query(
               collection(FirebaseDB, 'blockTempTable'),
               where('idRestaurant', '==', idRestaurant),
               where('hour', '==', hour),
               where('dateStr', '==', dateStr),
            ))
         ]);

         const tableInfoMap = new Map();

         reservations.forEach(doc => {
            const data = doc.data();

            const info = {
               status: data?.status ?? null,
               reservation: {
                  code: data?.code ?? null,
                  idReservation: doc.id,
                  timestamp: data?.timestamp ?? null,
                  relatedTables: data?.tables ?? [],
               },
               user: {
                  name: data.name ?? null,
                  email: data.email ?? null,
                  idUser: data?.idUser ?? null,
               },
            };

            if (data.tables && Array.isArray(data.tables)) {
               data.tables.forEach(({ id }) => {
                  tableInfoMap.set(String(id), info);
               });
               return;
            }
         });

         const blockTempTablesSet = new Set(blockTempTables.docs.map(doc => doc.data().idTable));

         const resul = tables.docs.map((doc) => {
            const data = doc.data();
            const reservation = tableInfoMap.get(String(doc.id));

            return {
               id: doc.id,
               ...data,
               type: typeResource.TABLE,
               idRestaurant: data.idRestaurant?.id ?? null,
               status: data.isBlocked
                  ? typeStatusTable.BLOCKED
                  : blockTempTablesSet.has(doc.id)
                     ? typeStatusTable.BLOCKED
                     : reservation?.status ?? typeStatusTable.AVAILABLE,
               chairs: Number(data.chairs),
               hasReservar: reservation ? true : false,
               reservation: reservation?.reservation ?? null,
               user: reservation?.user ?? null,
               createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
               updatedAt: data.updatedAt?.toDate?.().toISOString?.() ?? null
            };
         });

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

   async getByStateReservations(states) {
      try {
         if (!states || Array.isArray(states).length <= 0) {
            throw new Error('No se proporciono los estados de las reservas');
         };

         const reservations = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('status', 'in', states),
         ));

         return {
            ok: true,
            reservations: reservations.docs.map(doc => {
               const data = doc.data();
               return {
                  id: doc.id,
                  ...data,
                  start: data.start,
                  end: data.end,
                  tables: data.tables,
                  createdAt: data?.createdAt?.toDate()?.toISOString(),
                  updatedAt: data?.updatedAt?.toDate()?.toISOString(),
               }
            })
         }
      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las reservas'
         }
      }
   }

   async getObjects({ dateStr, idRestaurant, hour }) {
      if (!dateStr || !idRestaurant || !hour) return;

      try {
         if (!idRestaurant) {
            throw new Error('No se proporciono el id del restaurante');
         }

         if (!dateStr) {
            throw new Error('No se proporciono la fecha');
         }

         const objects = await getDocs(query(
            collection(FirebaseDB, `restaurants/${idRestaurant}/objects`),
         ));

         const objectMap = objects.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate()?.toISOString(),
            updatedAt: doc.data()?.updatedAt?.toDate()?.toISOString(),
         }));

         return {
            ok: true,
            objects: objectMap
         }
      }

      catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener los objetos'
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

   async cancelATablesReservation({ idReservation, tables }) {
      try {
         if (!idReservation || Array.isArray(tables).length <= 0) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservation = await getDoc(doc(FirebaseDB, 'reservations', idReservation));

         const reservationRef = doc(FirebaseDB, 'reservations', idReservation);

         const data = reservation.data();
         const updateTables = data.tables?.filter(({ id }) => {
            return !tables?.find((table) => table.id === id)
         });

         await updateDoc(reservationRef, {
            tables: updateTables,
            updatedAt: serverTimestamp()
         });

         return {
            ok: true
         }
         // Cannot read properties of undefined (reading 'filter')

      } catch (error) {
         console.error(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al cancelar la reserva'
         }
      }
   }

   async registerClientnoShow({ idReservation, idRestaurant, idUser }) {
      try {
         if (!idReservation) {
            throw new Error('No se proporciono el id de la reserva');
         }

         if (!idUser) {
            throw new Error('No se proporciono el id del usuario');
         }
         const noShow = await getDocs(query(
            collection(FirebaseDB, 'noShow'),
            where('reservation', '==', idReservation),
            where('idRestaurant', '==', idRestaurant),
            where('idUser', '==', idUser),
         ))

         if (noShow.docs.length > 0) {
            throw new Error('El usuario ya se encuentra registrado como no show');
         }

         await addDoc(collection(FirebaseDB, 'noShow'), {
            reservation: idReservation,
            idRestaurant,
            idUser,
         })

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
      tables,
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
         if (!idRestaurant || Array.isArray(tables).length <= 0) {
            throw new Error('No se proporciono el id de la reserva');
         }

         if (typeof diners !== 'number' || diners <= 0) {
            throw new Error('El número de comensales no es válido');
         }

         const reservations = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('idRestaurant', '==', idRestaurant),
            where('dateStr', '==', dateStr),
            where('hour', '==', hour),
            where('status', 'in', ['confirmed', 'pending'])
         ));

         // Verificamos si alguna mesa ya está reservada
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
            tables: tables.map(t => ({ id: t.id, name: t.name })),
            dateStr: dateStr,
            code: newCode,
            status: typeStatusTable.PENDING,
            start: new Date().getTime(),
            end: timestamp,
            timestamp: timestamp,
            name: name || null,
            email: email || null,
            phone: phone || null,
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
               relatedTables: tables.map(t => ({ id: t.id, name: t.name }))
            },
            user: {
               name,
               email,
               phone
            },
            reservationData: {
               ...reservationData,
               createdAt: null
            }

         }

      } catch (error) {
         console.log(error);
         return {
            ok: false,
            errorMessage: error?.message || String(error) || 'Error al cancelar la reserva'
         }
      }
   }

   async updateReservation({
      idReservation,
      idRestaurant,
      tables,
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
         if (!idReservation) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservationRef = doc(FirebaseDB, 'reservations', idReservation);

         const data = {
            idUser: idUser ?? null,
            idRestaurant,
            diners: diners ?? 1,
            reason: reason ?? 'Sin motivo',
            hour,
            comment: comment ?? 'Reserva por el panel de administrador',
            tables: tables.map(t => ({ id: t.id, name: t.name })),
            dateStr: dateStr,
            status: typeStatusTable.PENDING,
            name: name || null,
            email: email || null,
            phone: phone || null,
            updatedAt: serverTimestamp()
         }

         await updateDoc(reservationRef, data);

         return {
            ok: true,
            reservationData: {
               ...data,
               id: idReservation,
               updatedAt: null
            }
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al cancelar la reserva'
         }
      }
   }

   async blockTempTable({
      idRestaurant,
      idTable,
      hour,
      dateStr
   }) {
      try {
         const data = {
            idTable,
            idRestaurant,
            hour,
            dateStr,
            status: typeStatusTable.BLOCKED,
            updatedAt: serverTimestamp()
         }

         await addDoc(collection(FirebaseDB, 'blockTempTable'), data)

         return {
            ok: true
         }
      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al bloquear la mesa temporal'
         }
      }
   }

   async unblockTempTable({
      idTable,
      idRestaurant,
      hour,
      dateStr
   }) {
      try {
         const table = await getDoc(doc(FirebaseDB, 'restaurants', idRestaurant, 'tables', idTable));

         if (!table.exists()) {
            throw new Error('La mesa no existe');
         }

         const q = query(collection(FirebaseDB, 'blockTempTable'), where('idTable', '==', idTable),
            where('idRestaurant', '==', idRestaurant),
            where('hour', '==', hour),
            where('dateStr', '==', dateStr)
         );

         const querySnapshot = await getDocs(q);
         await updateDoc(doc(FirebaseDB, 'restaurants', idRestaurant, 'tables', idTable), {
            isBlocked: false
         });

         const promises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
         await Promise.all(promises);


         return {
            ok: true
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al desbloquear la mesa temporal'
         }
      }
   }

   // filter {
   //    request: 'all' | 'restaurant',
   //    idRestaurant
   // }
   async getDashboardData({ request, idRestaurant }) { // filterRestaurant, all, idRestaurant
      try {
         if (!request) request = 'all';

         const reservationQuery = [collection(FirebaseDB, 'reservations')];
         if (request !== 'all') {
            reservationQuery.push(where('idRestaurant', '==', idRestaurant));
         }

         const noShowsQuery = [collection(FirebaseDB, 'noShow')];
         if (request !== 'all') {
            noShowsQuery.push(where('idRestaurant', '==', idRestaurant));
         }

         const [reservationsData, noShowsData, allClientsSnap] = await Promise.all([
            getDocs(query(...reservationQuery)),
            getDocs(query(...noShowsQuery)),
            getDocs(collection(FirebaseDB, 'users'))
         ]);

         const totalReservations = reservationsData.docs.map(doc => doc.data());
         const confirmedCount = totalReservations.filter(d => d.status === typeStatusTable.CONFIRMED).length;
         const pendingCount = totalReservations.filter(d => d.status === typeStatusTable.PENDING).length;
         const canceledCount = totalReservations.filter(d => d.status === typeStatusTable.CANCELED).length;
         const releasedCount = totalReservations.filter(d => d.status === typeStatusTable.RELEASED).length;
         const noShowReservations = noShowsData.docs.map(doc => doc.data());

         const trendsMap = new Map();
         const clientsMap = new Map();
         const problematicClientsMap = new Map();

         totalReservations.forEach(reservation => {
            const { dateStr, status, idUser } = reservation;

            const month = DateParser.getNameMonth(dateStr);
            const trend = trendsMap.get(month) ?? { month, total: 0, confirmed: 0, released: 0, pending: 0, canceled: 0, noShow: 0 };
            trend.total++;
            trend[status.toLowerCase()]++;
            trendsMap.set(month, trend);

            if (!idUser) return;

            const client = clientsMap.get(idUser) ?? {
               idUser,
               name: reservation.name,
               email: reservation.email,
               phone: reservation.phone,
               dataStr: dateStr,
               diners: reservation.diners,
               total: 0,
               confirmed: 0,
               released: 0,
               pending: 0,
               canceled: 0,
               noShow: 0,
            };
            client.total++;
            client[status]++;
            clientsMap.set(idUser, client);
         });


         noShowReservations.forEach(noShow => {
            if (problematicClientsMap.has(noShow.idUser)) {
               const data = problematicClientsMap.get(noShow.idUser);
               data.noShow += 1;
               problematicClientsMap.set(noShow.idUser, data);
            } else {
               problematicClientsMap.set(noShow.idUser, {
                  noShow: 1
               });
            }
         })

         noShowReservations.forEach(noShow => {
            if (clientsMap.has(noShow.idUser)) {
               const data = clientsMap.get(noShow.idUser);
               data.noShow += 1;
               data.lastNoShowDate = noShow.dateStr;
               clientsMap.set(noShow.idUser, data);
            }
         });

         const growthRateClients = await this.getClientGrowthRate({ allClientsSnap })

         const metrics = {
            total: totalReservations.length,
            confirmed: confirmedCount,
            pending: pendingCount,
            canceled: canceledCount,
            released: releasedCount,
            noShow: noShowReservations.length,
         }

         const trends = Array.from(trendsMap.values());

         const topClients = Array.from(clientsMap.values())
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);


         const problematicClients = Array.from(clientsMap.values())
            .filter(c => c.noShow > 0)
            .sort((a, b) => b.noShow - a.noShow)
            .slice(0, 5);

         const topClientAnalysis = Array.from(clientsMap.values())
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);

         return {
            ok: true,
            metrics,
            trends,
            topClients,
            problematicClients,
            topClientAnalysis,
            growthRateClients,
            clientReservations: Array.from(clientsMap.values()) // TODO: 
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener los datos del dashboard'
         }
      }
   }

   async getClientGrowthRate({
      allClientsSnap,
   }) {
      const now = new Date();
      const startOfCurrentMonth = startOfMonth(now);
      const startOfLastMonth = startOfMonth(subMonths(now, 1));
      const endOfLastMonth = endOfMonth(subMonths(now, 1));

      const allClients = allClientsSnap.docs.map(doc => doc.data());

      const clientsThisMonth = allClients.filter(client => {
         const createdAt = client.createdAt?.toDate?.();
         return createdAt && createdAt >= startOfCurrentMonth;
      });

      const clientsLastMonth = allClients.filter(client => {
         const createdAt = client.createdAt?.toDate?.();
         return createdAt && createdAt >= startOfLastMonth && createdAt <= endOfLastMonth;
      });

      const thisMonthCount = clientsThisMonth.length;
      const lastMonthCount = clientsLastMonth.length;

      const growthRate =
         lastMonthCount > 0
            ? Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100)
            : thisMonthCount > 0
               ? 100
               : 0;

      return {
         totalClients: allClients.length,
         newClientsThisMonth: thisMonthCount,
         growthRate,
      };
   };

   async getAllUsers() {
      try {
         const usersSnap = await getDocs(collection(FirebaseDB, 'users'));
         const users = await Promise.all(usersSnap.docs.map(async doc => {
            const idUser = doc.id;
            const reservations = await this.getReservationForUser(idUser);
            return {
               id: idUser,
               ...doc.data(),
               ...reservations,
               createdAt: doc.data().createdAt?.toDate()?.toISOString() ?? null,
               updatedAt: doc.data().updatedAt?.toDate()?.toISOString() ?? null,
            };
         }));

         return {
            ok: true,
            users
         };
      } catch (error) {
         console.log(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener los usuarios'
         };
      }
   }

   async getReservationForUser(idUser) {
      const reservationsSnap = await getDocs(query(
         collection(FirebaseDB, 'reservations'),
         where('idUser', '==', idUser),
         orderBy('createdAt', 'desc')
      ));

      const reservations = reservationsSnap.docs.map(doc => ({
         id: doc.id,
         ...doc.data(),
         createdAt: doc.data().createdAt?.toDate()?.toISOString() ?? null,
         updatedAt: doc.data().updatedAt?.toDate()?.toISOString() ?? null,
      }));

      const total = reservations.length;
      const confirmed = reservations.filter(reservation => reservation.status === typeStatusTable.CONFIRMED).length;
      const pending = reservations.filter(reservation => reservation.status === typeStatusTable.PENDING).length;
      const canceled = reservations.filter(reservation => reservation.status === typeStatusTable.CANCELED).length;
      const released = reservations.filter(reservation => reservation.status === typeStatusTable.RELEASED).length;

      return {
         ok: true,
         metrics: {
            total,
            confirmed,
            pending,
            canceled,
            released,
         },
         reservations
      }
   }


   async getByIdUserReservations({ idUser }) {
      try {
         if (!idUser) {
            throw new Error('No se proporciono el id del usuario');
         }
         const reservationsSnap = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('idUser', '==', idUser),
            orderBy('createdAt', 'desc')
         ));

         const reservations = reservationsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()?.toISOString() ?? null,
            updatedAt: doc.data().updatedAt?.toDate()?.toISOString() ?? null,
         }));

         return {
            ok: true,
            reservations
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las reservas del usuario'
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

   async getAllObjectCategories() {
      try {
         const categories = await getDocs(collection(FirebaseDB, 'categories'));
         const categorys = categories.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toISOString(),
            updatedAt: doc.data()?.updatedAt?.toDate()?.toISOString(),
         }));
         return {
            ok: true,
            categorys
         }
      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las categorias'
         }
      }
   }

   async createObjectCategory(name) {
      try {
         const q = query(collection(FirebaseDB, 'categories'), where('name', '==', name));
         const querySnapshot = await getDocs(q);

         if (!querySnapshot.empty) {
            return {
               ok: false,
               errorMessage: 'Ya existe una categoría con ese nombre.'
            };
         }

         // Crear nueva categoría
         const categoryRef = doc(collection(FirebaseDB, 'categories'));
         await setDoc(categoryRef, {
            name,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
         });

         return {
            ok: true,
            newCategory: {
               id: categoryRef.id,
               name
            }
         };

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al crear la categoría.'
         };
      }
   };

   async updateObjectCategory({ idCategory, name }) {
      try {
         if (!idCategory) {
            throw new Error('No se proporciono el id de la categoria');
         }

         const categoryRef = doc(FirebaseDB, 'categories', idCategory);
         const category = await getDoc(categoryRef);

         if (!category.exists()) {
            throw new Error('No se encontro la categoria');
         }

         await updateDoc(categoryRef, {
            name: name ?? category.data().name,
            updatedAt: serverTimestamp()
         });

         return {
            ok: true,
            updatedCategory: {
               id: categoryRef.id,
               name: name ?? category.data().name
            }
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al actualizar la categoria'
         }
      }
   }

   async deleteObjectCategory({ idCategory }) {
      try {
         if (!idCategory) {
            throw new Error('No se proporciono el id de la categoria');
         }

         const objects = await getDocs(collection(FirebaseDB, `categories/${idCategory}/objects`));

         if (objects.size >= 1) {
            throw new Error('No se puede eliminar una categoria con objetos asociados');
         }

         const categoryRef = doc(FirebaseDB, 'categories', idCategory);
         const category = await getDoc(categoryRef);

         if (!category.exists()) {
            throw new Error('No se encontro la categoria');
         }

         await deleteDoc(categoryRef);

         return {
            ok: true
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las categorias'
         }
      }
   }

   async getObjectsByCategoryId(idCategory) {
      try {

         if (!idCategory) {
            throw new Error('No se proporciono el id de la categoria');
         }

         const objectsDocs = await getDocs(collection(FirebaseDB, `categories/${idCategory}/objects`),);

         const objects = objectsDocs.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toISOString(),
            updatedAt: doc.data()?.updatedAt?.toDate()?.toISOString(),
         }));

         return {
            ok: true,
            objects
         }
      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las categorias'
         }
      }

   }

   async createObjectInCategory({ idCategory, rotation, name, width, height, image }) {
      if (!idCategory) {
         throw new Error('No se proporciono el id de la categoria');
      }

      try {
         const q = query(collection(FirebaseDB, `categories/${idCategory}/objects`), where('name', '==', name));
         const querySnapshot = await getDocs(q);

         if (!querySnapshot.empty) {
            return {
               ok: false,
               errorMessage: 'Ya existe un objeto con ese nombre.'
            };
         }

         const objectRef = doc(collection(FirebaseDB, `categories/${idCategory}/objects`));

         const data = {
            name,
            width,
            height,
            image,
            idCategory,
            rotation,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
         }

         await setDoc(objectRef, data);
         return {
            ok: true,
            newObject: {
               id: objectRef.id,
               ...data,
               createdAt: DateFormat.toYYYYMMDD(new Date()),
               updatedAt: DateFormat.toYYYYMMDD(new Date()),
            }
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las categorias'
         }
      }
   }

   async updateObjectInCategory({ idCategory, idObject, rotation, name, width, height, image }) {
      try {
         if (!idCategory || !idObject) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const objectRef = doc(FirebaseDB, `categories/${idCategory}/objects/${idObject}`);
         const object = await getDoc(objectRef);

         if (!object.exists()) {
            throw new Error('No se encontro el objeto');
         }
         const objectData = object.data();

         const data = {
            name: name ?? objectData?.name,
            width: width ?? objectData?.width,
            height: height ?? objectData?.height,
            rotation: rotation ?? objectData?.rotation,
            image: image ?? objectData?.image,
            updatedAt: serverTimestamp()
         }

         await updateDoc(objectRef, data);
         return {
            ok: true,
            updatedObject: {
               id: objectRef.id,
               ...data,
               createdAt: objectData.createdAt.toDate().toISOString(),
               updatedAt: DateFormat.toYYYYMMDD(new Date()),
            }
         }

      } catch (error) {
         console.error(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las categorias'
         }
      }
   }

   async deleteObjectInCategory({ idCategory, idObject }) {
      try {
         if (!idCategory || !idObject) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const objectRef = doc(FirebaseDB, `categories/${idCategory}/objects/${idObject}`);
         await deleteDoc(objectRef);
         return {
            ok: true
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener las categorias'
         }
      }
   }

   async updateDimensionMap({ id, columns, rows }) {
      try {
         if (!id) {
            throw new Error('No se proporciono el id del restaurante');
         }

         const restaurantRef = doc(FirebaseDB, 'restaurants', id);
         const restaurant = await getDoc(restaurantRef);

         if (!restaurant.exists()) {
            throw new Error('No se encontro el restaurante');
         }
         const restaurantData = restaurant.data();

         const data = {
            columns: columns ?? restaurantData?.columns,
            rows: rows ?? restaurantData?.rows,
            updatedAt: serverTimestamp()
         }

         await updateDoc(restaurantRef, data);

         return {
            ok: true,
         }

      } catch (error) {
         console.error(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al actualizar las dimensiones'
         }
      }
   }

   async deleteTable({ idTable, idRestaurant }) {
      try {
         const tableRef = doc(FirebaseDB, `restaurants/${idRestaurant}/tables/${idTable}`);


         await deleteDoc(tableRef);

         return {
            ok: true
         }

      } catch (error) {
         console.error(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al eliminar la mesa'
         }
      }
   }

   async updateTable({
      type,
      image,
      size,
      chairs,
      positionX,
      positionY,
      width,
      height,
      rotation,
      zone,
      description,
      name,
      idRestaurant,
      isBlocked,
      idTable
   }) {
      try {
         if (!idRestaurant || !idTable) {
            throw new Error('Error al actualizar la mesa');
         }

         const tableRef = doc(FirebaseDB, `restaurants/${idRestaurant}/tables/${idTable}`);
         const table = await getDoc(tableRef);

         if (!table.exists()) {
            throw new Error('No se encontro la mesa');
         }
         const tableData = table.data();

         const data = {
            type: type ?? tableData?.type,
            image: image ?? tableData?.image,
            size: size ?? tableData?.size,
            chairs: Number(chairs ?? tableData?.chairs),
            positionX: positionX ?? tableData?.positionX,
            positionY: positionY ?? tableData?.positionY,
            width: width ?? tableData?.width,
            height: height ?? tableData?.height,
            rotation: rotation ?? tableData?.rotation,
            zone: zone ?? tableData?.zone,
            description: description ?? tableData?.description,
            name: name ?? tableData?.name,
            isBlocked: isBlocked ?? tableData?.isBlocked,
            updatedAt: serverTimestamp()
         }

         await updateDoc(tableRef, data);
         return {
            ok: true,
            table: {
               id: tableRef.id,
               ...data,
               status: isBlocked ? typeStatusTable.BLOCKED : tableData.status ?? typeStatusTable.AVAILABLE,
               createdAt: tableData.createdAt?.toDate()?.toISOString() ?? null,
               updatedAt: DateFormat.toYYYYMMDD(new Date()),
            }
         }

      } catch (error) {
         console.error(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al actualizar la mesa'
         }
      }

   }

   async deleteObject({ idObject, idRestaurant }) {
      try {
         const objectRef = doc(FirebaseDB, `restaurants/${idRestaurant}/objects/${idObject}`);


         await deleteDoc(objectRef);

         return {
            ok: true
         }

      } catch (error) {
         console.error(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al eliminar el objeto'
         }
      }
   }

   async createObject({
      idRestaurant,
      idCategory,
      name,
      width,
      height,
      positionX,
      positionY,
      rotation,
      image,
      type,
   }) {
      try {
         if (!idCategory || !idRestaurant) {
            throw new Error('No se proporcionó el id de la categoría o restaurante');
         }

         const objectsRef = collection(FirebaseDB, `restaurants/${idRestaurant}/objects`);
         const querySnapshot = await getDocs(
            query(objectsRef, where('positionX', '==', positionX), where('positionY', '==', positionY))
         );

         if (!querySnapshot.empty) {
            throw new Error('Ya existe un objeto en esa posición');
         }

         const objectRef = doc(objectsRef);
         const data = {
            name,
            width,
            height,
            positionX,
            positionY,
            rotation,
            image,
            type,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
         };

         await setDoc(objectRef, data);
         return {
            ok: true,
            object: {
               id: objectRef.id,
               ...data,
               createdAt: DateFormat.toYYYYMMDD(new Date()),
               updatedAt: DateFormat.toYYYYMMDD(new Date()),

            }
         };

      } catch (error) {
         console.error(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al crear el objeto'
         };
      }
   }

   async createTable({
      type,
      image,
      size,
      chairs,
      positionX,
      positionY,
      width,
      height,
      rotation,
      zone,
      description,
      name,
      idRestaurant,
      isBlocked,
   }) {
      try {
         if (!idRestaurant || positionX == null || positionY == null) {
            throw new Error('No se proporcionaron los datos necesarios de la mesa');
         }

         const tablesRef = collection(FirebaseDB, `restaurants/${idRestaurant}/tables`);
         const querySnapshot = await getDocs(
            query(tablesRef, where('positionX', '==', positionX), where('positionY', '==', positionY))
         );

         if (!querySnapshot.empty) {
            throw new Error('Ya existe una mesa en esa posición');
         }

         const tableRef = doc(tablesRef);
         const data = {
            type,
            image,
            size,
            chairs,
            positionX,
            positionY,
            width,
            height,
            rotation,
            zone,
            description,
            name,
            isBlocked,
            idRestaurant,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
         };

         await setDoc(tableRef, data);
         return {
            ok: true,
            table: {
               id: tableRef.id,
               ...data,
               idRestaurant,
               createdAt: DateFormat.toYYYYMMDD(new Date()),
               updatedAt: DateFormat.toYYYYMMDD(new Date()),
            }
         };

      } catch (error) {
         console.error(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al crear la mesa'
         };
      }
   }


   // listenReservationsAddedAndModified({ dateStr, idRestaurant, hour, onAdd, onModify }) {
   //    if (import.meta.env.VITE_ACTIVE_LISTENERS !== 'true') {
   //       console.log('NO debería estar escuchando');
   //       return;
   //    }

   //    console.trace('ACTIVANDO LISTENER');

   //    const q = query(
   //       collection(FirebaseDB, 'reservations'),
   //       where('idRestaurant', '==', idRestaurant),
   //       where('date', '==', dateStr),
   //       where('status', 'in', ['pending', 'confirmed']), // TODO: faltaria agregar el status canceled y released
   //       where('hour', '==', hour),
   //       orderBy('createdAt', 'desc'),
   //       limit(1)
   //    );



   //    let isInitial = true;
   //    const startedAt = Date.now();

   //    const unsubscribe = onSnapshot(q, (snapshot) => {
   //       snapshot.docChanges().forEach((change) => {
   //          const data = change.doc.data();
   //          const createdAt = data.createdAt?.toDate?.().getTime?.() ?? 0;

   //          const reservation = {
   //             id: change.doc.id,
   //             ...data,
   //             createdAt: data.createdAt?.toDate?.().toISOString() ?? null
   //          };

   //          if (isInitial && ['modified', 'added'].includes(change.type)) return;

   //          if (change.type === 'added' && createdAt > startedAt) {
   //             onAdd?.(reservation);
   //          }

   //          if (change.type === 'modified') {
   //             onModify?.(reservation);
   //          }
   //       });

   //       if (isInitial) isInitial = false;
   //    });
   //    return unsubscribe;
   // }
}



