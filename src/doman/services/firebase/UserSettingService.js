import { typeStatusTable } from '@/ultils';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { FirebaseDB } from './config';

export class UserSettingService {
   constructor() { }

   async cancelReservation(id) {
      try {
         if (!id) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservationRef = doc(FirebaseDB, 'reservations', id);
         await updateDoc(reservationRef, {
            status: typeStatusTable.CANCELED,
            updatedAt: serverTimestamp()
         });

         const reservation = await getDoc(doc(FirebaseDB, 'reservations', id));

         return {
            ok: true,
            reservation: {
               ...reservation.data(),
               id: reservation.id,
               createdAt: reservation.data().createdAt.toDate().toISOString()
            }
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al cancelar la reserva'
         }
      }
   }

   async getReservationByCode(code) {
      try {
         if (!code) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservations = await getDocs(query(
            collection(FirebaseDB, 'reservations'),
            where('code', '==', code),
         ));

         if (reservations.size <= 0) {
            throw new Error('No se encontro la reserva');
         }

         const reservation = reservations.docs[0];
         console.log(reservation.data());
         return {
            ok: true,
            reservation: {
               ...reservation.data(),
               id: reservation.id,
               createdAt: reservation.data().createdAt.toDate().toISOString(),
               updatedAt: reservation.data().updatedAt.toDate().toISOString()
            }
         }
      } catch (error) {
         console.error(error.message);
         return {
            ok: false,
            errorMessage: 'Error al obtener la reserva'
         }
      }
   }
}
