import {
   collection,
   getDocs,
   query,
   where
} from 'firebase/firestore/lite';

import { FirebaseDB } from './config';


export class FirebaseUserService {
   constructor() {
   }

   async getUserByEmail(email) {
      try {
         const res = await getDocs(query(collection(FirebaseDB, 'users'), where('email', '==', email)));

         if (res.empty) {
            throw new Error('No se encontro el cliente');
         }

         const user = res.docs[0].data();

         return {
            ok: true,
            uid: res.docs[0].id,
            id: res.docs[0].id,
            email: user.email,
            name: user.name,
            photoURL: user.photoURL,
            role: user.role
         }

      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al obtener el cliente'
         }
      }
   }
}