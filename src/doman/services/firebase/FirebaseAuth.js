import {
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   onAuthStateChanged,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
   signInWithPopup,
   updateProfile
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore/lite';

import { FirebaseAuth, FirebaseDB } from './config';


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

export class FirebaseAuthService {
   constructor() {
      this.providerAuthGoogle = new GoogleAuthProvider();
   }

   async googleAuth() {
      try {
         const res = await signInWithPopup(FirebaseAuth, this.providerAuthGoogle);
         const credentials = GoogleAuthProvider.credentialFromResult(res);
         const token = credentials?.accessToken;
         const { uid, email, displayName, photoURL } = res.user;

         const userDoc = await getDoc(doc(FirebaseDB, 'users', uid));

         if (!userDoc.exists()) {
            const data = {
               id: uid,
               email: email,
               name: displayName,
               photoURL: photoURL,
               phone: '',
               address: '',
               role: 'user',
               createdAt: serverTimestamp(),
               updatedAt: serverTimestamp()
            }
            await setDoc(doc(FirebaseDB, 'users', uid), data);

            return {
               ok: true,
               token,
               user: {
                  ...data,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
               }
            }
         }

         const data = userDoc.data();
         return {
            ok: true,
            token,
            user: {
               ...data,
               id: uid,
               createdAt: data.createdAt.toDate()?.toISOString(),
               updatedAt: data.updatedAt.toDate()?.toISOString()
            }
         };
      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al iniciar sesión'
         };
      }
   }

   async register({ email, password, name, phone, address }) {
      try {
         const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
         await updateProfile(FirebaseAuth.currentUser, { displayName: name });
         const { uid, email: emailUser, displayName, photoURL } = res.user;

         const data = {
            id: uid,
            email: email ?? emailUser,
            name: name ?? displayName,
            photoURL: photoURL,
            phone: phone ?? '',
            address: address ?? '',
            role: 'user',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
         };

         await setDoc(doc(FirebaseDB, 'users', uid), data);

         return {
            ok: true,
            user: {
               ...data,
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString()
            }
         };

      } catch (error) {
         const code = error.code;
         console.error(error);
         return {
            ok: false,
            errorMessage: firebaseErrorMessages[code] || 'Ocurrió un error al iniciar sesión.',
         };
      }
   }


   async login({ email, password }) {
      try {
         const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);

         const userDoc = await getDoc(doc(FirebaseDB, 'users', res.user.uid));

         const data = userDoc.data();

         return {
            ok: true,
            user: {
               id: res.user.uid,
               email: data?.email ?? res.user.email,
               name: data?.name ?? res.user.displayName,
               photoURL: data?.photoURL ?? res.user.photoURL,
               phone: data?.phone ?? '',
               address: data?.address ?? '',
               role: data?.role ?? 'user'
            }
         };
      } catch (error) {
         const code = error.code;
         return {
            ok: false,
            errorMessage: firebaseErrorMessages[code] || 'Ocurrió un error al iniciar sesión.',
         };
      }
   }

   async logout() {
      await FirebaseAuth.signOut();
   }

   async checking() {
      try {
         const user = await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
               unsubscribe(); // Deja de escuchar después del primer evento.
               resolve(user);
            });
         });

         const userDoc = await getDoc(doc(FirebaseDB, 'users', user.uid));
         const data = userDoc.data();
         return {
            ok: true,
            isUserLogged: user !== null,
            user: {
               id: user.uid,
               email: data?.email ?? user.email,
               name: data?.name ?? user.displayName,
               photoURL: data?.photoURL ?? user.photoURL,
               phone: data?.phone ?? '',
               address: data?.address ?? '',
               role: data?.role ?? 'user'
            }
         }
      } catch (error) {
         const code = error.code;
         return {
            ok: false,
            errorMessage: firebaseErrorMessages[code] || 'Ocurrió un error al iniciar sesión.',
         };
      }
   }

   async recoverPassword(email) {
      try {
         await sendPasswordResetEmail(FirebaseAuth, email);
         return {
            ok: true
         };
      } catch (error) {
         console.log(error);
         return {
            ok: false,
            errorMessage: error.message || 'Error al iniciar sesión'
         };
      }
   }
}