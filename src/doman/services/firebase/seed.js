import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore/lite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const firebaseConfig = {
   apiKey: '--',
   authDomain: '--',
   projectId: '--',
   storageBucket: '--',
   messagingSenderId: '--',
   appId: '--',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loadJson = (filename) =>
   JSON.parse(readFileSync(join(__dirname, '..', '..', '..', 'json', filename), 'utf8'));

const seed = async () => {
   const locations = loadJson('locations.json');
   const restaurants = loadJson('restaurant.json');
   const tables = loadJson('tables.json');

   console.log('Cargando locations...');
   for (const loc of locations) {
      await setDoc(doc(db, 'locations', String(loc.id)), {
         name: loc.name,
         description: loc.description,
         latitud: loc.latitud,
         longitud: loc.longitud,
         image: loc.image,
         linkMap: loc.linkMap
      });
   }

   console.log('Cargando restaurants...');
   for (const r of restaurants) {
      const locationRef = doc(db, 'locations', String(r.idLocation));
      await setDoc(doc(db, 'restaurants', String(r.id)), {
         idLocation: locationRef,
         columns: r.columns,
         rows: r.rows,
         openTime: r.openTime,
         closeTime: r.closeTime,
         status: r.status,
         maxAdvanceDays: r.maxAdvanceDays,
         maxTables: r.maxTables,
         createdAt: new Date(r.createdAt),
         updatedAt: new Date(r.updatedAt)
      });
   }

   console.log('Cargando tables...');
   for (const t of tables) {
      const restaurantRef = doc(db, 'restaurants', String(t.idRestaurant));
      const tableRef = doc(collection(restaurantRef, 'tables'), String(t.id));
      await setDoc(tableRef, {
         idRestaurant: restaurantRef,
         name: t.name,
         description: t.description,
         chairs: t.chairs,
         image: t.image,
         isBlocked: t?.isBlocked || false,
         type: t.type,
         positionX: t.positionX,
         positionY: t.positionY,
         rotation: t.rotation,
         zone: t.zone,
         createdAt: new Date(t.createdAt)
      });
   }
};

seed()
   .then(() => console.log('Seed cargado'))
   .catch((err) => {
      console.error('Error cargando datos:', err);
   })