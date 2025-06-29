import { FirebaseReserveService } from './firebase/farebaseReserve';
import { FirebaseAuthService } from './firebase/FirebaseAuth';

export const serviceProvider = new FirebaseReserveService()
export const authService = new FirebaseAuthService()