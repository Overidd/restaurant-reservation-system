import { FirebaseDB } from './config';
import { typeStatusTable } from '@/ultils';
// import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import {
   collection,
   getDocs,
   query,
   where,
   onSnapshot,
   orderBy,
   limit,
} from 'firebase/firestore';



export class FirebaseDashboardService {
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
               timestamp: data?.timestamp ?? null,
               idReservation: doc.id,
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
               status: reservation?.status ?? typeStatusTable.AVAILABLE, // Pendiente, Confirmada
               chairs: Number(data.chairs),
               idRestaurant: data.idRestaurant?.id ?? null,
               createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
               hasReservar: reservation ? true : false,
               user: reservation?.user ?? null,
               timestamp: reservation?.timestamp ?? null,
               idReservation: reservation?.idReservation ?? null,
               relatedTables: reservation?.relatedTables ?? [],
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

   listenReservationsAddedAndModified({ dateStr, idRestaurant, hour, onAdd, onModify }) {
      const q = query(
         collection(FirebaseDB, 'reservations'),
         where('idRestaurant', '==', idRestaurant),
         where('date', '==', dateStr),
         where('status', 'in', ['pending', 'confirmed']),
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