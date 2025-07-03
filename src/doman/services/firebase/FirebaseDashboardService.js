import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { FirebaseDB } from './config';
import { typeStatusTable } from '@/ultils';


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
      try {
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
            where('status', '==', 'confirmed'),
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

         const resul = tables.docs.map((doc) => {
            const data = doc.data();

            return {
               id: doc.id,
               ...data,
               status: reservedTablesIds.has(Number(doc.id)) ? typeStatusTable.BUSY : typeStatusTable.AVAILABLE,
               size: data.type,
               idRestaurant: data.idRestaurant?.id ?? null,
               createdAt: data.createdAt.toDate().toISOString(),
            }
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
}