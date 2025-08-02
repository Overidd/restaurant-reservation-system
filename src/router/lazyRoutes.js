import { lazy } from 'react';

export const LoginScreen = lazy(() => import('@/screen/auth/LoginScreen'))
export const RegisterScreen = lazy(() => import('@/screen/auth/RegisterScreen'))
export const RecoverScreen = lazy(() => import('@/screen/auth/RecoverScreen'))

export const HomeScreen = lazy(() => import('@/screen/home/HomeScreen'))
export const ProductScreen = lazy(() => import('@/screen/product/ProductScreen'))
export const LocationScreen = lazy(() => import('@/screen/location/LocationScreen'))
export const ReservationScreen = lazy(() => import('@/screen/reservation/ReservationScreen'))
export const SearchReservationScreen = lazy(() => import('@/screen/search/SearchReservationScreen'))

export const DashboardScreen = lazy(() => import('@/screen/dashboard/DashboardScreen'))
export const MapScreen = lazy(() => import('@/screen/dashboard/MapScreen'))
export const CalendarScreen = lazy(() => import('@/screen/dashboard/CalendarScreen'))
export const UserDetailScreen = lazy(() => import('@/screen/dashboard/UserDetailScreen'))
export const RestaurantScreen = lazy(() => import('@/screen/dashboard/RestaurantScreen'))