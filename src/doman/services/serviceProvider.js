import { FirebaseAuthService } from './firebase/FirebaseAuth';
import { FirebaseDashboardService } from './firebase/FirebaseDashboardService';
import { FirebaseReserveService } from './firebase/firebaseReserve';
import { FirebaseUserService } from './firebase/firebaseUserService';
import { UserSettingService } from './firebase/UserSettingService';

export const serviceProvider = new FirebaseReserveService()
export const authService = new FirebaseAuthService()
export const dasboardServiceProvider = new FirebaseDashboardService()

export const userServiceProvider = new FirebaseUserService()

export const userSettingProvider = new UserSettingService()