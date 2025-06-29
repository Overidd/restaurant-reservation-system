import { FirebaseAuth } from './config';

import {
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   updateProfile
} from 'firebase/auth';

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
         return {
            ok: true,
            token,
            uid,
            email,
            name: displayName,
            photoURL,
         };
      } catch (error) {
         return {
            ok: false,
            errorMessage: error.message || 'Error al iniciar sesión'
         };
      }
   }

   async register({ email, password, name }) {
      try {
         const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
         await updateProfile(FirebaseAuth.currentUser, { displayName: name });
         return {
            ok: true,
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
            photoURL: res.user.photoURL
         }
      } catch (error) {
         const code = error.code;
         return {
            ok: false,
            errorMessage: firebaseErrorMessages[code] || 'Ocurrió un error al iniciar sesión.',
         };
      }
   }

   async login({ email, password }) {
      try {
         const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
         return {
            ok: true,
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
            photoURL: res.user.photoURL,
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
   "Promise constructor cannot be invoked without 'new'"


   async checking() {
      try {
         const user = await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
               unsubscribe(); // Deja de escuchar después del primer evento.
               resolve(user);
            });
         });

         return {
            ok: true,
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            isUserLogged: !!user
         }
      } catch (error) {
         const code = error.code;
         return {
            ok: false,
            errorMessage: firebaseErrorMessages[code] || 'Ocurrió un error al iniciar sesión.',
         };
      }
   }
}