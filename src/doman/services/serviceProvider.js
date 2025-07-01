import { FirebaseReserveService } from './firebase/firebaseReserve';
import { FirebaseAuthService } from './firebase/FirebaseAuth';

export const serviceProvider = new FirebaseReserveService()
export const authService = new FirebaseAuthService()