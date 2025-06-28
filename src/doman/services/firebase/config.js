import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Vite
   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

//* La función initializeApp de Firebase se usa para inicializar la conexión de tu aplicación con los servicios de Firebase.
const FirebaseApp = initializeApp(firebaseConfig);
/**
 FirebaseApp es una instancia que representa tu proyecto de Firebase y te permite acceder a los servicios que hayas configurado (como autenticación, base de datos, almacenamiento, etc.).
 */

//? La función getAuth se utiliza para configurar y obtener una instancia del servicio de autenticación de Firebase.
export const FirebaseAuth = getAuth(FirebaseApp);
/**
   FirebaseAuth: Es la instancia del servicio de autenticación. Con esta puedes realizar acciones como:
   Registrar usuarios.
   Iniciar sesión.
   Cerrar sesión.
   Manejar autenticación con terceros (Google, Facebook, GitHub, etc.).
 */


//TODO La función getFirestore inicializa y configura una instancia de Firestore, la base de datos NoSQL en tiempo real de Firebase.
export const FirebaseDB = getFirestore(FirebaseApp);
/**
 FirebaseDB: Es la instancia de la base de datos Firestore. Con esta puedes realizar operaciones CRUD (crear, leer, actualizar, eliminar) en la base de datos.
 */