import { DateParser, typeStatusTable, validDateReservation, validHourReservation } from '@/ultils';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore/lite';
import { FirebaseDB } from './config';

export class UserSettingService {
   constructor() { }

   async cancelReservation(id) {
      try {
         if (!id) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const reservation = await getDoc(doc(FirebaseDB, 'reservations', id));

         if (!reservation.exists()) {
            throw new Error('No se encontro la reserva');
         }

         if (reservation.data()?.status !== typeStatusTable.PENDING) {
            throw new Error('Solo se puede cancelar reservas pendientes');
         }

         const reservationRef = doc(FirebaseDB, 'reservations', id);

         await updateDoc(reservationRef, {
            status: typeStatusTable.CANCELED,
            updatedAt: serverTimestamp()
         });

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

   async updatePhone({ phone, idUser }) {
      try {
         if (!idUser) {
            throw new Error('No se proporciono el id de la reserva');
         }

         const user = await getDoc(doc(FirebaseDB, 'users', idUser));

         if (!user.exists()) {
            throw new Error('No se encontro el usuario');
         }

         if (user.data().phone === phone) {
            const data = user.data();
            return {
               ok: true,
               isEqual: true,
               user: {
                  ...data,
                  id: user.id,
                  createdAt: data.createdAt.toDate().toISOString(),
                  updatedAt: data?.updatedAt?.toDate()?.toISOString(),
               }
            }
         }

         const userRef = doc(FirebaseDB, 'users', idUser);

         await updateDoc(userRef, {
            phone,
            updatedAt: serverTimestamp()
         })

         return {
            ok: true,
            isEqual: false,
            user: {
               ...user.data(),
               id: user.id,
               phone,
               createdAt: user.data().createdAt.toDate().toISOString(),
               updatedAt: new Date().toISOString(),
            }
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al actualizar el telefono'
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
               createdAt: DateParser.toString(new Date(dataUser?.createdAt?.toDate()?.toISOString())),
               updatedAt: DateParser.toString(new Date())
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

         if (!validDateReservation(dateStr)) {
            throw new Error('No se pueden actualizar la reserva en una fecha pasada');
         }

         if (!validHourReservation(hour)) {
            throw new Error('No es posible actualizar la reserva en esa hora pasada');
         }

         if (!tables.length) {
            throw new Error('No se proporciono las mesas');
         }

         const user = await getDoc(doc(FirebaseDB, 'users', idUser));

         if (!user.exists()) {
            throw new Error('No se encontro el usuario');
         }

         const reservationRef = doc(FirebaseDB, 'reservations', idReservation);

         const reservation = await getDoc(reservationRef);

         if (!reservation.exists()) {
            throw new Error('No se encontro la reserva');
         }

         if (reservation.data().status !== typeStatusTable.PENDING) {
            throw new Error('Solo es posible actualizar reservas pendientes');
         }

         const data = {
            hour,
            idUser: idUser ?? null,
            idRestaurant,
            diners: diners ?? 1,
            reason: reason ?? 'Sin motivo',
            comment: comment ?? 'Reserva por el panel de administrador',
            tables: tables,
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
            errorMessage: error.message || 'Error al actualizar la reserva'
         }
      }
   }
}
