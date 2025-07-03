import { FirebaseReserveService } from './firebase/firebaseReserve';
import { FirebaseAuthService } from './firebase/FirebaseAuth';
import { FirebaseDashboardService } from './firebase/FirebaseDashboardService';

export const serviceProvider = new FirebaseReserveService()
export const authService = new FirebaseAuthService()
export const dasboardServiceProvider = new FirebaseDashboardService()