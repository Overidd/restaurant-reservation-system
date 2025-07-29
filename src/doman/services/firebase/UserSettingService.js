import { DateParser, typeStatusTable } from '@/ultils';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore/lite';
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



         return {
            ok: true,
            reservation: {
               ...reservation.data(),
               id: reservation.id,
               createdAt: DateParser.toString(reservation.data().createdAt.toDate()),
               updatedAt: reservation?.data()?.updatedAt?.toDate() ? DateParser.toString(reservation.data().updatedAt.toDate()) : null
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

   async updateProfile({ name, photoURL, phone, address, idUser }) {
      try {
         if (!idUser) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const user = await getDoc(doc(FirebaseDB, 'users', idUser));

         if (!user.exists()) {
            throw new Error('No se encontro el usuario');
         }

         const dataUser = user.data();

         const userRef = doc(FirebaseDB, 'users', idUser);

         const data = {
            name: name ?? dataUser.name,
            phone: phone ?? dataUser.phone,
            address: address ?? dataUser.address,
            photoURL: photoURL ?? dataUser.photoURL ?? null,
            updatedAt: serverTimestamp()
         }

         await updateDoc(userRef, data);

         return {
            ok: true,
            user: {
               ...data,
               id: user.id,
               createdAt: dataUser?.createdAt?.toDate()?.toISOString(),
               updatedAt: new Date().toISOString()
            }
         }
      } catch (error) {
         console.error(error.message);
         return {
            ok: false,
            errorMessage: 'Error al actualizar el perfil'
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
         const user = await getDoc(doc(FirebaseDB, 'users', idUser));

         if (!user.exists()) {
            throw new Error('No se encontro el usuario');
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
            email: email ?? user.data().email,
            phone: phone ?? user.data().phone,
            name: name ?? user.data().name,
            updatedAt: serverTimestamp()
         }

         await updateDoc(reservationRef, data);

         return {
            ok: true,
            reservation: {
               ...data,
               id: idReservation,
               createdAt: new Date().toISOString()
            }
         }
      } catch (error) {
         console.error(error.message);
         return {
            ok: false,
            errorMessage: 'Error al actualizar la reserva'
         }
      }
   }
}
